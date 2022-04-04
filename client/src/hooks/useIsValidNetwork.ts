import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { supportedChainIds } from "../connectors";

function useIsValidNetwork() {
  const { chainId } = useWeb3React();

  const isValidCompNetwork = useMemo(() => {
    return supportedChainIds.includes(chainId || 0);
  }, [chainId]);

  return {
    isValidNetwork: isValidCompNetwork,
  };
}

export default useIsValidNetwork;
