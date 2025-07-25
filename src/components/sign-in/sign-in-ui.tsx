import React, { useState, useCallback } from "react";
import { alertAndLog } from "../../utils/alertAndLog";
import { useWallet } from "../wallet";
import { useAuthorization } from "../../utils/useAuthorization";
import { useMobileWallet } from "../../utils/useMobileWallet";
import {
  SeekerText,
  SeekerButton,
  useSeekerTheme
} from '../seeker';

export function ConnectButton() {
  const { theme } = useSeekerTheme();
  const { connect, isConnecting, isConnected, account, platform } = useWallet();
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  
  const handleConnectPress = useCallback(async () => {
    try {
      if (authorizationInProgress || isConnecting) {
        return;
      }
      setAuthorizationInProgress(true);
      await connect();
    } catch (err: any) {
      alertAndLog(
        "Error during connect",
        err instanceof Error ? err.message : err
      );
    } finally {
      setAuthorizationInProgress(false);
    }
  }, [authorizationInProgress, connect]);
  
  const getButtonTitle = () => {
    if (authorizationInProgress || isConnecting) return 'Connecting...';
    if (isConnected) return `Connected (${platform})`;
    return 'Connect Wallet';
  };
  
  return (
    <SeekerButton
      title={getButtonTitle()}
      onPress={handleConnectPress}
      disabled={authorizationInProgress || isConnecting}
      variant="primary"
      size="md"
      style={{ flex: 1 }}
    />
  );
}

export function SignInButton() {
  const { theme } = useSeekerTheme();
  const { authorizeSession } = useAuthorization();
  const { signIn } = useMobileWallet();
  const [signInInProgress, setSignInInProgress] = useState(false);
  
  const handleSignInPress = useCallback(async () => {
    try {
      if (signInInProgress) {
        return;
      }
      setSignInInProgress(true);
      await signIn({
        domain: "seeker-insurance.app",
        statement: "Sign in to Seeker for secure GPS-based insurance access",
        uri: "https://seeker-insurance.app",
      });
    } catch (err: any) {
      alertAndLog(
        "Error during sign in",
        err instanceof Error ? err.message : err
      );
    } finally {
      setSignInInProgress(false);
    }
  }, [signInInProgress, authorizeSession]);
  
  const getButtonTitle = () => {
    if (signInInProgress) return 'Signing In...';
    return 'Sign In';
  };
  
  return (
    <SeekerButton
      title={getButtonTitle()}
      onPress={handleSignInPress}
      disabled={signInInProgress}
      variant="secondary"
      size="md"
      style={{ flex: 1 }}
    />
  );
}
