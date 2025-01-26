"use client";

import {
  Session,
  createKeyStoreInteractor,
  createSingleSigAuthDescriptorRegistration,
  createWeb3ProviderEvmKeyStore,
  hours,
  registerAccount,
  registrationStrategy,
  ttlLoginRule,
} from "@chromia/ft4";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getRandomUserName } from "@/utility/user";
import { createClient } from "postchain-client";


// Create context for Chromia session
const ChromiaContext = createContext<Session | undefined>(undefined);

declare global {
  interface Window {
    ethereum: any;
  }
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined); // For error tracking

  useEffect(() => {
    const initSession = async () => {
      try {
        console.log("Initializing Session");

        // 1. Ensure MetaMask is available
        if (!window.ethereum) {
          throw new Error("MetaMask is not installed or not connected");
        }

        // 2. Initialize Connection
        const client = await createClient({
          nodeUrlPool: "http://localhost:7740",
          blockchainIid: 0,
        });

        // 3. Connect with MetaMask
        const evmKeyStore = await createWeb3ProviderEvmKeyStore(window.ethereum);

        // 4. Get all accounts associated with the EVM address
        const evmKeyStoreInteractor = createKeyStoreInteractor(client, evmKeyStore);
        const accounts = await evmKeyStoreInteractor.getAccounts();

        if (accounts.length > 0) {
          alert("entered to to login account")
          // 5. Start a new session with existing account
          const { session } = await evmKeyStoreInteractor.login({
            accountId: accounts[0].id,
            config: {
              rules: ttlLoginRule(hours(2)),
              flags: ["MySession"],
            },
          });
          setSession(session);
         await alert("session started successfully");
        } else {
          alert("entered to create a new session")
          // 6. Create a new account by signing a message using MetaMask
          const authDescriptor = createSingleSigAuthDescriptorRegistration(
            ["A", "T"],
            evmKeyStore.id
          );
          const { session } = await registerAccount(
            client,
            evmKeyStore,
            registrationStrategy.open(authDescriptor, {
              config: {
                rules: ttlLoginRule(hours(2)),
                flags: ["mySession"],
              },
            }),
            {
              name: "register_user",
              args: [getRandomUserName()],
            }
          );
          setSession(session);

        }
        alert("session registered successfully")

        console.log("Session initialized");
      } catch (err: any) {
        setError(err.message); // Set error message
        console.error("Session initialization error:", err);
      }
    };

    initSession();

  }, []);

  return (
    <ChromiaContext.Provider value={session}>
      {error ? <div>Error: {error}</div> : children}
    </ChromiaContext.Provider>
  );
}

export function useSessionContext() {
  const session = useContext(ChromiaContext);
  alert("session started successfully+++++++"+ useSessionContext()+"  "+session);
  // if (!session) {
  //   throw new Error("useSessionContext must be used within a ContextProvider");
  // }
  return session;
}
