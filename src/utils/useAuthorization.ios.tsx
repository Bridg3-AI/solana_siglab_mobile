// iOS-specific implementation using cross-platform wallet
import { useCallback, useMemo, useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import { useCrossplatformWallet } from "./useCrossplatformWallet";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Account {
  address: string;
  label?: string;
  publicKey: PublicKey;
}

const ACCOUNT_STORAGE_KEY = 'solana_account_ios';

export function useAuthorization() {
  const { account: walletAccount, connect, disconnect } = useCrossplatformWallet();
  const [account, setAccount] = useState<Account | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);

  // Load saved account on mount
  useEffect(() => {
    const loadSavedAccount = async () => {
      try {
        const savedAccount = await AsyncStorage.getItem(ACCOUNT_STORAGE_KEY);
        if (savedAccount) {
          const parsedAccount = JSON.parse(savedAccount);
          const accountWithPublicKey = {
            ...parsedAccount,
            publicKey: new PublicKey(parsedAccount.address),
          };
          setAccount(accountWithPublicKey);
          setAccounts([accountWithPublicKey]);
        }
      } catch (error) {
        console.error('Failed to load saved account:', error);
      }
    };

    loadSavedAccount();
  }, []);

  // Update account when wallet account changes
  useEffect(() => {
    if (walletAccount) {
      const newAccount: Account = {
        address: walletAccount.address,
        publicKey: walletAccount.publicKey,
        label: walletAccount.label || 'iOS Wallet',
      };
      setAccount(newAccount);
      setAccounts([newAccount]);
      
      // Save to storage
      AsyncStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify({
        address: newAccount.address,
        label: newAccount.label,
      })).catch(console.error);
    } else {
      setAccount(null);
      setAccounts([]);
      AsyncStorage.removeItem(ACCOUNT_STORAGE_KEY).catch(console.error);
    }
  }, [walletAccount]);

  const authorizeSession = useCallback(async (wallet: any): Promise<Account> => {
    try {
      const connectedAccount = await connect();
      const account: Account = {
        address: connectedAccount.address,
        publicKey: connectedAccount.publicKey,
        label: connectedAccount.label || 'iOS Wallet',
      };
      return account;
    } catch (error) {
      console.error('Authorization failed:', error);
      throw error;
    }
  }, [connect]);

  const authorizeSessionWithSignIn = useCallback(
    async (wallet: any, signInPayload: any): Promise<Account> => {
      // For iOS, we'll use the same authorization flow as signIn is handled by the wallet app
      return await authorizeSession(wallet);
    },
    [authorizeSession]
  );

  const deauthorizeSession = useCallback(async (wallet: any): Promise<void> => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Deauthorization failed:', error);
      throw error;
    }
  }, [disconnect]);

  return useMemo(
    () => ({
      authorizeSession,
      authorizeSessionWithSignIn,
      deauthorizeSession,
      account,
      accounts,
    }),
    [authorizeSession, authorizeSessionWithSignIn, deauthorizeSession, account, accounts]
  );
}