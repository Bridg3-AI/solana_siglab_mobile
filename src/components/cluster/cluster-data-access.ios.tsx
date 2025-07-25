// iOS-specific dummy implementation of cluster data access
import { clusterApiUrl } from "@solana/web3.js";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export interface Cluster {
  name: string;
  endpoint: string;
  network: ClusterNetwork;
  active?: boolean;
}

export enum ClusterNetwork {
  Mainnet = "mainnet-beta",
  Testnet = "testnet", 
  Devnet = "devnet",
  Custom = "custom",
}

const ClusterContext = createContext<{
  selectedCluster: Cluster;
  clusters: Cluster[];
  setSelectedCluster: (cluster: Cluster) => void;
  getExplorerUrl: (path: string) => string;
} | null>(null);

export function ClusterProvider({ children }: { children: ReactNode }) {
  const [selectedCluster, setSelectedCluster] = useState<Cluster>({
    name: "devnet",
    endpoint: clusterApiUrl("devnet"),
    network: ClusterNetwork.Devnet,
    active: true,
  });

  const clusters: Cluster[] = [
    {
      name: "devnet",
      endpoint: clusterApiUrl("devnet"),
      network: ClusterNetwork.Devnet,
    },
    {
      name: "testnet",
      endpoint: clusterApiUrl("testnet"),
      network: ClusterNetwork.Testnet,
    },
  ];

  const getExplorerUrl = (path: string) => 
    `https://explorer.solana.com/${path}?cluster=${selectedCluster.network}`;

  const value = useMemo(
    () => ({
      selectedCluster,
      clusters,
      setSelectedCluster,
      getExplorerUrl,
    }),
    [selectedCluster, clusters]
  );

  return (
    <ClusterContext.Provider value={value}>
      {children}
    </ClusterContext.Provider>
  );
}

export function useCluster() {
  const context = useContext(ClusterContext);
  if (!context) {
    throw new Error("useCluster must be used within a ClusterProvider");
  }
  return {
    selectedCluster: context.selectedCluster,
    clusters: context.clusters,
    setSelectedCluster: context.setSelectedCluster,
    getExplorerUrl: context.getExplorerUrl,
  };
}