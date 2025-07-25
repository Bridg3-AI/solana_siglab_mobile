// iOS-specific implementation of ConnectionProvider
import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";

interface ConnectionProviderProps {
  children: ReactNode;
  endpoint?: string;
}

const ConnectionContext = createContext<Connection | null>(null);

export function ConnectionProvider({ children, endpoint }: ConnectionProviderProps) {
  // Create a real connection for iOS using devnet by default
  const connection = useMemo(() => {
    const rpcEndpoint = endpoint || clusterApiUrl('devnet');
    return new Connection(rpcEndpoint, 'confirmed');
  }, [endpoint]);
  
  return (
    <ConnectionContext.Provider value={connection}>
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnection(): Connection {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
}