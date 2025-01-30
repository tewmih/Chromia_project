"use client";

import {
  Session,
} from "@chromia/ft4";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createClient } from "postchain-client";
import { useTAppStore } from "@/store/stateStore";

// Create context for Chromia session
const ChromiaContext = createContext<Session | undefined>(undefined);

declare global {
  interface Window {
    ethereum: any;
  }
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const { session: mainSession, setClient } = useTAppStore();
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined); // For error tracking

  useEffect(() => {
    const initSession = async () => {
      try {
        console.log("Initializing Session");

        // 1. Ensure MetaMask is available
        if (!window.ethereum) {
          throw new Error("MetaMask is not installed or not connected with internet");
        }

        // 2. Initialize Connection
        const client = await createClient({
          nodeUrlPool: "http://localhost:7740",
          blockchainIid: 0,
        });
        setClient(client);
        if (mainSession) {
          setSession(mainSession);
        }
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
  return useContext(ChromiaContext);
}
