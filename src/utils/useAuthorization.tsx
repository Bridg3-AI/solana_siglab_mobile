import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { PublicKey, PublicKeyInitData } from "@solana/web3.js";
import { toUint8Array } from "js-base64";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

// Conditionally import mobile wallet adapter types only on Android
let AuthorizedAccount: any = null;
let AuthorizationResult: any = null;
let AuthorizeAPI: any = null;
let AuthToken: any = null;
let Base64EncodedAddress: any = null;
let DeauthorizeAPI: any = null;
let SignInPayloadWithRequiredFields: any = null;
let SignInPayload: any = null;

if (Platform.OS === 'android') {
  try {
    const walletAdapterTypes = require("@solana-mobile/mobile-wallet-adapter-protocol");
    AuthorizedAccount = walletAdapterTypes.Account;
    AuthorizationResult = walletAdapterTypes.AuthorizationResult;
    AuthorizeAPI = walletAdapterTypes.AuthorizeAPI;
    AuthToken = walletAdapterTypes.AuthToken;
    Base64EncodedAddress = walletAdapterTypes.Base64EncodedAddress;
    DeauthorizeAPI = walletAdapterTypes.DeauthorizeAPI;
    SignInPayloadWithRequiredFields = walletAdapterTypes.SignInPayloadWithRequiredFields;
    SignInPayload = walletAdapterTypes.SignInPayload;
  } catch (error) {
    console.warn("Mobile Wallet Adapter types not available on this platform");
  }
}

const CHAIN = "solana";
const CLUSTER = "devnet";
const CHAIN_IDENTIFIER = `${CHAIN}:${CLUSTER}`;

export type Account = Readonly<{
  address: Base64EncodedAddress;
  label?: string;
  publicKey: PublicKey;
}>;

type WalletAuthorization = Readonly<{
  accounts: Account[];
  authToken: AuthToken;
  selectedAccount: Account;
}>;

function getAccountFromAuthorizedAccount(account: AuthorizedAccount): Account {
  return {
    ...account,
    publicKey: getPublicKeyFromAddress(account.address),
  };
}

function getAuthorizationFromAuthorizationResult(
  authorizationResult: AuthorizationResult,
  previouslySelectedAccount?: Account
): WalletAuthorization {
  let selectedAccount: Account;
  if (
    // We have yet to select an account.
    previouslySelectedAccount == null ||
    // The previously selected account is no longer in the set of authorized addresses.
    !authorizationResult.accounts.some(
      ({ address }) => address === previouslySelectedAccount.address
    )
  ) {
    const firstAccount = authorizationResult.accounts[0];
    selectedAccount = getAccountFromAuthorizedAccount(firstAccount);
  } else {
    selectedAccount = previouslySelectedAccount;
  }
  return {
    accounts: authorizationResult.accounts.map(getAccountFromAuthorizedAccount),
    authToken: authorizationResult.auth_token,
    selectedAccount,
  };
}

function getPublicKeyFromAddress(address: Base64EncodedAddress): PublicKey {
  const publicKeyByteArray = toUint8Array(address);
  return new PublicKey(publicKeyByteArray);
}

function cacheReviver(key: string, value: any) {
  if (key === "publicKey") {
    return new PublicKey(value as PublicKeyInitData); // the PublicKeyInitData should match the actual data structure stored in AsyncStorage
  } else {
    return value;
  }
}

const AUTHORIZATION_STORAGE_KEY = "authorization-cache";

async function fetchAuthorization(): Promise<WalletAuthorization | null> {
  const cacheFetchResult = await AsyncStorage.getItem(
    AUTHORIZATION_STORAGE_KEY
  );

  if (!cacheFetchResult) {
    return null;
  }

  // Return prior authorization, if found.
  return JSON.parse(cacheFetchResult, cacheReviver);
}

async function persistAuthorization(
  auth: WalletAuthorization | null
): Promise<void> {
  await AsyncStorage.setItem(AUTHORIZATION_STORAGE_KEY, JSON.stringify(auth));
}

export const APP_IDENTITY = {
  name: "Solana Mobile Expo Template",
  uri: "https://fakedomain.com",
};

export function useAuthorization() {
  const queryClient = useQueryClient();
  const { data: authorization, isLoading } = useQuery({
    queryKey: ["wallet-authorization"],
    queryFn: () => fetchAuthorization(),
  });
  const { mutate: setAuthorization } = useMutation({
    mutationFn: persistAuthorization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet-authorization"] });
    },
  });

  const handleAuthorizationResult = useCallback(
    async (
      authorizationResult: AuthorizationResult
    ): Promise<WalletAuthorization> => {
      const nextAuthorization = getAuthorizationFromAuthorizationResult(
        authorizationResult,
        authorization?.selectedAccount
      );
      await setAuthorization(nextAuthorization);
      return nextAuthorization;
    },
    [authorization]
  );
  const authorizeSession = useCallback(
    async (wallet: AuthorizeAPI) => {
      const authorizationResult = await wallet.authorize({
        identity: APP_IDENTITY,
        chain: CHAIN_IDENTIFIER,
        auth_token: authorization?.authToken,
      });
      return (await handleAuthorizationResult(authorizationResult))
        .selectedAccount;
    },
    [authorization, handleAuthorizationResult]
  );
  const authorizeSessionWithSignIn = useCallback(
    async (wallet: AuthorizeAPI, signInPayload: SignInPayload) => {
      const authorizationResult = await wallet.authorize({
        identity: APP_IDENTITY,
        chain: CHAIN_IDENTIFIER,
        auth_token: authorization?.authToken,
        sign_in_payload: signInPayload,
      });
      return (await handleAuthorizationResult(authorizationResult))
        .selectedAccount;
    },
    [authorization, handleAuthorizationResult]
  );
  const deauthorizeSession = useCallback(
    async (wallet: DeauthorizeAPI) => {
      if (authorization?.authToken == null) {
        return;
      }
      await wallet.deauthorize({ auth_token: authorization.authToken });
      await setAuthorization(null);
    },
    [authorization]
  );
  return useMemo(
    () => ({
      accounts: authorization?.accounts ?? null,
      authorizeSession,
      authorizeSessionWithSignIn,
      deauthorizeSession,
      selectedAccount: authorization?.selectedAccount ?? null,
      isLoading,
    }),
    [authorization, authorizeSession, deauthorizeSession]
  );
}
