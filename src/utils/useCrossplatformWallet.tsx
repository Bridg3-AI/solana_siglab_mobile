import { Platform, Linking } from 'react-native';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { PublicKey, Transaction, VersionedTransaction, TransactionSignature } from '@solana/web3.js';
import * as Crypto from 'expo-crypto';
import nacl from 'tweetnacl';
import { encodeURL, decodeURL } from 'tweetnacl-util';
import bs58 from 'bs58';

// Initialize tweetnacl PRNG for iOS compatibility
if (Platform.OS === 'ios' && typeof nacl.setPRNG === 'function') {
  nacl.setPRNG((x: Uint8Array, n: number) => {
    const randomBytes = Crypto.getRandomBytes(n);
    for (let i = 0; i < n; i++) {
      x[i] = randomBytes[i];
    }
  });
}

// Import platform-specific modules conditionally
let transact: any = null;
if (Platform.OS === 'android') {
  try {
    transact = require("@solana-mobile/mobile-wallet-adapter-protocol-web3js").transact;
  } catch (error) {
    console.warn("Mobile Wallet Adapter not available");
  }
}

export interface WalletAccount {
  address: string;
  publicKey: PublicKey;
  label?: string;
}

interface PhantomSession {
  publicKey: string;
  session: string;
  sharedSecret: Uint8Array;
}

export function useCrossplatformWallet() {
  const [account, setAccount] = useState<WalletAccount | null>(null);
  const [phantomSession, setPhantomSession] = useState<PhantomSession | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Generate encryption keys for Phantom communication
  const generateKeyPair = useCallback(async () => {
    try {
      // Ensure PRNG is available before generating keys
      if (Platform.OS === 'ios' && typeof nacl.setPRNG === 'function') {
        nacl.setPRNG((x: Uint8Array, n: number) => {
          const randomBytes = Crypto.getRandomBytes(n);
          for (let i = 0; i < n; i++) {
            x[i] = randomBytes[i];
          }
        });
      }
      
      const keyPair = nacl.box.keyPair();
      return {
        publicKey: keyPair.publicKey,
        secretKey: keyPair.secretKey,
      };
    } catch (error) {
      console.error('Key pair generation failed:', error);
      throw new Error('Failed to generate encryption keys. Crypto random generator not available.');
    }
  }, []);

  // Create shared secret for encryption
  const createSharedSecret = useCallback((theirPublicKey: Uint8Array, ourSecretKey: Uint8Array) => {
    return nacl.box.before(theirPublicKey, ourSecretKey);
  }, []);

  // Encrypt data for Phantom
  const encryptData = useCallback((data: any, sharedSecret: Uint8Array) => {
    try {
      // Use Expo crypto for nonce generation on iOS for better reliability
      let nonce: Uint8Array;
      if (Platform.OS === 'ios') {
        const randomBytes = Crypto.getRandomBytes(24);
        nonce = new Uint8Array(randomBytes);
      } else {
        nonce = nacl.randomBytes(24);
      }
      
      const message = new TextEncoder().encode(JSON.stringify(data));
      const encrypted = nacl.box.after(message, nonce, sharedSecret);
      
      return {
        nonce: bs58.encode(nonce),
        data: bs58.encode(encrypted),
      };
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt data. Random generator not available.');
    }
  }, []);

  // Decrypt data from Phantom
  const decryptData = useCallback((encryptedData: string, nonce: string, sharedSecret: Uint8Array) => {
    const decrypted = nacl.box.open.after(
      bs58.decode(encryptedData),
      bs58.decode(nonce),
      sharedSecret
    );
    
    if (!decrypted) {
      throw new Error('Failed to decrypt data');
    }
    
    return JSON.parse(new TextDecoder().decode(decrypted));
  }, []);

  // Connect to Phantom via deeplink (iOS/Android)
  const connectPhantom = useCallback(async (): Promise<WalletAccount> => {
    try {
      setIsConnecting(true);
      
      // Generate our key pair
      const keyPair = await generateKeyPair();
      const appUrl = 'solana-siglab://'; // Your app's custom URL scheme
      
      // Create connection URL
      const connectUrl = new URL('https://phantom.app/ul/v1/connect');
      connectUrl.searchParams.append('app_url', appUrl);
      connectUrl.searchParams.append('dapp_encryption_public_key', bs58.encode(keyPair.publicKey));
      connectUrl.searchParams.append('redirect_link', appUrl);
      connectUrl.searchParams.append('cluster', 'devnet');
      
      // Open Phantom app
      const canOpen = await Linking.canOpenURL(connectUrl.toString());
      if (!canOpen) {
        throw new Error('Phantom app is not installed');
      }
      
      await Linking.openURL(connectUrl.toString());
      
      // Return a promise that resolves when connection is established
      return new Promise((resolve, reject) => {
        const handleUrl = (url: string) => {
          try {
            const urlObj = new URL(url);
            const params = urlObj.searchParams;
            
            if (params.get('errorCode')) {
              reject(new Error(params.get('errorMessage') || 'Connection failed'));
              return;
            }
            
            const phantomPublicKey = params.get('phantom_encryption_public_key');
            const data = params.get('data');
            const nonce = params.get('nonce');
            
            if (!phantomPublicKey || !data || !nonce) {
              reject(new Error('Invalid response from Phantom'));
              return;
            }
            
            // Create shared secret
            const sharedSecret = createSharedSecret(
              bs58.decode(phantomPublicKey),
              keyPair.secretKey
            );
            
            // Decrypt response
            const decryptedData = decryptData(data, nonce, sharedSecret);
            
            const walletAccount: WalletAccount = {
              address: decryptedData.public_key,
              publicKey: new PublicKey(decryptedData.public_key),
              label: 'Phantom Wallet',
            };
            
            // Store session info
            setPhantomSession({
              publicKey: decryptedData.public_key,
              session: decryptedData.session,
              sharedSecret,
            });
            
            setAccount(walletAccount);
            resolve(walletAccount);
            
            // Clean up listener
            subscription.remove();
          } catch (error) {
            reject(error);
          }
        };
        
        // Listen for return from Phantom
        const subscription = Linking.addEventListener('url', handleUrl);
        
        // Timeout after 60 seconds
        setTimeout(() => {
          subscription.remove();
          reject(new Error('Connection timeout'));
        }, 60000);
      });
    } catch (error) {
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, [generateKeyPair, createSharedSecret, decryptData]);

  // Connect to MWA (Android only)
  const connectMWA = useCallback(async (): Promise<WalletAccount> => {
    if (Platform.OS !== 'android' || !transact) {
      throw new Error('Mobile Wallet Adapter is only available on Android');
    }
    
    try {
      const result = await transact(async (wallet: any) => {
        const authResult = await wallet.authorize({
          cluster: 'devnet',
          identity: {
            name: 'Solana SigLab Mobile',
            uri: 'https://solanamobile.com',
            icon: 'favicon.ico',
          },
        });
        
        return {
          address: authResult.accounts[0].address,
          publicKey: new PublicKey(authResult.accounts[0].address),
          label: authResult.accounts[0].label || 'MWA Wallet',
        };
      });
      
      return result;
    } catch (error) {
      console.error('MWA connection failed:', error);
      throw error;
    }
  }, []);

  // Universal connect function
  const connect = useCallback(async (): Promise<WalletAccount> => {
    try {
      if (Platform.OS === 'android' && transact) {
        // Prefer MWA on Android if available
        try {
          return await connectMWA();
        } catch (error) {
          console.warn('MWA connection failed, falling back to Phantom deeplink');
          return await connectPhantom();
        }
      } else {
        // Use Phantom deeplink on iOS or as fallback
        return await connectPhantom();
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
      throw error;
    }
  }, [connectMWA, connectPhantom]);

  // Sign and send transaction via Phantom
  const signAndSendTransactionPhantom = useCallback(
    async (transaction: Transaction | VersionedTransaction): Promise<TransactionSignature> => {
      if (!phantomSession) {
        throw new Error('Not connected to Phantom');
      }
      
      try {
        const serializedTransaction = transaction.serialize({ requireAllSignatures: false });
        const appUrl = 'solana-siglab://';
        
        // Encrypt transaction data
        const transactionData = {
          transaction: bs58.encode(serializedTransaction),
          session: phantomSession.session,
        };
        
        const encrypted = encryptData(transactionData, phantomSession.sharedSecret);
        
        // Create sign URL  
        const signUrl = new URL('https://phantom.app/ul/v1/signAndSendTransaction');
        // Use the original public key, not the shared secret
        const keyPair = await generateKeyPair();
        signUrl.searchParams.append('dapp_encryption_public_key', bs58.encode(keyPair.publicKey));
        signUrl.searchParams.append('nonce', encrypted.nonce);
        signUrl.searchParams.append('data', encrypted.data);
        signUrl.searchParams.append('redirect_link', appUrl);
        
        await Linking.openURL(signUrl.toString());
        
        // Return promise for signature
        return new Promise((resolve, reject) => {
          const handleUrl = (url: string) => {
            try {
              const urlObj = new URL(url);
              const params = urlObj.searchParams;
              
              if (params.get('errorCode')) {
                reject(new Error(params.get('errorMessage') || 'Transaction failed'));
                return;
              }
              
              const data = params.get('data');
              const nonce = params.get('nonce');
              
              if (!data || !nonce) {
                reject(new Error('Invalid response from Phantom'));
                return;
              }
              
              const decryptedData = decryptData(data, nonce, phantomSession.sharedSecret);
              resolve(decryptedData.signature);
              
              subscription.remove();
            } catch (error) {
              reject(error);
            }
          };
          
          const subscription = Linking.addEventListener('url', handleUrl);
          
          setTimeout(() => {
            subscription.remove();
            reject(new Error('Transaction timeout'));
          }, 60000);
        });
      } catch (error) {
        throw error;
      }
    },
    [phantomSession, encryptData, decryptData]
  );

  // Sign and send transaction via MWA (Android)
  const signAndSendTransactionMWA = useCallback(
    async (transaction: Transaction | VersionedTransaction): Promise<TransactionSignature> => {
      if (!transact) {
        throw new Error('MWA not available');
      }
      
      try {
        const result = await transact(async (wallet: any) => {
          const signedTransactions = await wallet.signAndSendTransactions({
            transactions: [transaction],
          });
          
          return signedTransactions[0].signature;
        });
        
        return result;
      } catch (error) {
        console.error('MWA transaction failed:', error);
        throw error;
      }
    },
    []
  );

  // Universal sign and send function
  const signAndSendTransaction = useCallback(
    async (
      transaction: Transaction | VersionedTransaction,
      minContextSlot?: number
    ): Promise<TransactionSignature> => {
      if (!account) {
        throw new Error('Wallet not connected');
      }
      
      if (Platform.OS === 'android' && transact) {
        // Use MWA if available
        return await signAndSendTransactionMWA(transaction);
      } else {
        // Use Phantom deeplink
        return await signAndSendTransactionPhantom(transaction);
      }
    },
    [account, signAndSendTransactionMWA, signAndSendTransactionPhantom]
  );

  // Disconnect wallet
  const disconnect = useCallback(async (): Promise<void> => {
    setAccount(null);
    setPhantomSession(null);
  }, []);

  return useMemo(
    () => ({
      account,
      isConnecting,
      connect,
      disconnect,
      signAndSendTransaction,
      isConnected: !!account,
      platform: Platform.OS,
    }),
    [account, isConnecting, connect, disconnect, signAndSendTransaction]
  );
}