import { Platform } from "react-native";
import { Account, useAuthorization } from "./useAuthorization";
import {
  Transaction,
  TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";
import { useCallback, useMemo } from "react";

// Conditionally import mobile wallet adapter only on Android
let transact: any = null;
let SignInPayload: any = null;

if (Platform.OS === 'android') {
  try {
    transact = require("@solana-mobile/mobile-wallet-adapter-protocol-web3js").transact;
    SignInPayload = require("@solana-mobile/mobile-wallet-adapter-protocol").SignInPayload;
  } catch (error) {
    console.warn("Mobile Wallet Adapter not available on this platform");
  }
}

export function useMobileWallet() {
  const { authorizeSessionWithSignIn, authorizeSession, deauthorizeSession } =
    useAuthorization();

  const connect = useCallback(async (): Promise<Account> => {
    if (Platform.OS !== 'android' || !transact) {
      throw new Error('Mobile Wallet Adapter is only available on Android');
    }
    return await transact(async (wallet) => {
      return await authorizeSession(wallet);
    });
  }, [authorizeSession]);

  const signIn = useCallback(
    async (signInPayload: any): Promise<Account> => {
      if (Platform.OS !== 'android' || !transact) {
        throw new Error('Mobile Wallet Adapter is only available on Android');
      }
      return await transact(async (wallet) => {
        return await authorizeSessionWithSignIn(wallet, signInPayload);
      });
    },
    [authorizeSession]
  );

  const disconnect = useCallback(async (): Promise<void> => {
    if (Platform.OS !== 'android' || !transact) {
      throw new Error('Mobile Wallet Adapter is only available on Android');
    }
    await transact(async (wallet) => {
      await deauthorizeSession(wallet);
    });
  }, [deauthorizeSession]);

  const signAndSendTransaction = useCallback(
    async (
      transaction: Transaction | VersionedTransaction,
      minContextSlot: number,
    ): Promise<TransactionSignature> => {
      if (Platform.OS !== 'android' || !transact) {
        throw new Error('Mobile Wallet Adapter is only available on Android');
      }
      return await transact(async (wallet) => {
        await authorizeSession(wallet);
        const signatures = await wallet.signAndSendTransactions({
          transactions: [transaction],
          minContextSlot,
        });
        return signatures[0];
      });
    },
    [authorizeSession]
  );

  const signMessage = useCallback(
    async (message: Uint8Array): Promise<Uint8Array> => {
      if (Platform.OS !== 'android' || !transact) {
        throw new Error('Mobile Wallet Adapter is only available on Android');
      }
      return await transact(async (wallet) => {
        const authResult = await authorizeSession(wallet);
        const signedMessages = await wallet.signMessages({
          addresses: [authResult.address],
          payloads: [message],
        });
        return signedMessages[0];
      });
    },
    [authorizeSession]
  );

  return useMemo(
    () => ({
      connect,
      signIn,
      disconnect,
      signAndSendTransaction,
      signMessage,
    }),
    [signAndSendTransaction, signMessage]
  );
}
