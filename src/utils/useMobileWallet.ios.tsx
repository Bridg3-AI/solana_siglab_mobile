// iOS-specific implementation using cross-platform wallet
import { useCallback, useMemo } from "react";
import {
  Transaction,
  TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";
import { useCrossplatformWallet } from "./useCrossplatformWallet";

export interface Account {
  address: string;
  label?: string;
  publicKey: any;
}

export function useMobileWallet() {
  const { 
    account, 
    connect: connectWallet, 
    disconnect: disconnectWallet, 
    signAndSendTransaction: signAndSend 
  } = useCrossplatformWallet();

  const connect = useCallback(async (): Promise<Account> => {
    try {
      const connectedAccount = await connectWallet();
      return {
        address: connectedAccount.address,
        publicKey: connectedAccount.publicKey,
        label: connectedAccount.label || 'iOS Wallet',
      };
    } catch (error) {
      console.error('iOS wallet connection failed:', error);
      throw error;
    }
  }, [connectWallet]);

  const signIn = useCallback(
    async (signInPayload: any): Promise<Account> => {
      // For iOS wallets, signIn is typically handled during the connect flow
      return await connect();
    },
    [connect]
  );

  const disconnect = useCallback(async (): Promise<void> => {
    try {
      await disconnectWallet();
    } catch (error) {
      console.error('iOS wallet disconnect failed:', error);
      throw error;
    }
  }, [disconnectWallet]);

  const signAndSendTransaction = useCallback(
    async (
      transaction: Transaction | VersionedTransaction,
      minContextSlot?: number,
    ): Promise<TransactionSignature> => {
      try {
        return await signAndSend(transaction, minContextSlot);
      } catch (error) {
        console.error('iOS transaction signing failed:', error);
        throw error;
      }
    },
    [signAndSend]
  );

  const signMessage = useCallback(
    async (message: Uint8Array): Promise<Uint8Array> => {
      // For now, throw an error as message signing via deeplink is complex
      // This could be implemented later if needed
      throw new Error('Message signing is not yet implemented for iOS wallets');
    },
    []
  );

  return useMemo(
    () => ({
      connect,
      signIn,
      disconnect,
      signAndSendTransaction,
      signMessage,
    }),
    [connect, signIn, disconnect, signAndSendTransaction, signMessage]
  );
}