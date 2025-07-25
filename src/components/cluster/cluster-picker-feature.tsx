import { ClusterNetwork, useCluster } from "./cluster-data-access";
import { RadioButton, Text } from "react-native-paper";
import { ClusterPickerRadioButtonGroupRow } from "./cluster-ui";

function clusternetworkToIndex(clusterName: string): number {
  switch (clusterName) {
    case ClusterNetwork.Devnet:
      return 0;
    case ClusterNetwork.Testnet:
      return 1;
    default:
      throw Error("Invalid cluster selected");
  }
}

export default function ClusterPickerFeature() {
  let selectedCluster, clusters, setSelectedCluster;
  
  try {
    const clusterData = useCluster();
    selectedCluster = clusterData.selectedCluster;
    clusters = clusterData.clusters;
    setSelectedCluster = clusterData.setSelectedCluster;
  } catch (error) {
    // Fallback when ClusterProvider is not available
    const defaultCluster = {
      name: "devnet",
      endpoint: "https://api.devnet.solana.com",
      network: ClusterNetwork.Devnet,
    };
    selectedCluster = defaultCluster;
    clusters = [
      defaultCluster,
      {
        name: "testnet",
        endpoint: "https://api.testnet.solana.com", 
        network: ClusterNetwork.Testnet,
      }
    ];
    setSelectedCluster = () => {}; // No-op function
  }

  const [devNetCluster, testNetCluster] = clusters;

  return (
    <>
      <Text variant="headlineMedium">Cluster:</Text>
      <RadioButton.Group
        onValueChange={(newClusternetwork) =>
          setSelectedCluster(clusters[clusternetworkToIndex(newClusternetwork)])
        }
        value={selectedCluster.network}
      >
        <ClusterPickerRadioButtonGroupRow cluster={devNetCluster} />
        <ClusterPickerRadioButtonGroupRow cluster={testNetCluster} />
      </RadioButton.Group>
    </>
  );
}
