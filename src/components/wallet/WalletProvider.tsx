import React, { createContext, useContext, ReactNode } from 'react';
import { useCrossplatformWallet, WalletAccount } from '../../utils/useCrossplatformWallet';
import { Transaction, VersionedTransaction, TransactionSignature } from '@solana/web3.js';

interface WalletContextType {
  account: WalletAccount | null;
  isConnecting: boolean;
  isConnected: boolean;
  platform: string;
  connect: () => Promise<WalletAccount>;
  disconnect: () => Promise<void>;
  signAndSendTransaction: (
    transaction: Transaction | VersionedTransaction,
    minContextSlot?: number
  ) => Promise<TransactionSignature>;
}

const WalletContext = createContext<WalletContextType | null>(null);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const walletUtils = useCrossplatformWallet();

  return (
    <WalletContext.Provider value={walletUtils}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextType {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}