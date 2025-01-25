// "use client";

// import { useTAppStore } from "@/store/appStore";
// import { Session } from "@chromia/ft4";
// import { createClient } from "postchain-client";
// import {
//   ReactNode,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// declare global {
//   interface Window {
//     ethereum: any;
//   }
// }

// // Create context for Chromia session
// const ChromiaContext = createContext<Session | undefined>(undefined);

// export function ContextProvider({ children }: { children: ReactNode }) {
//   // Initialize session and EVM address states
//   const { session: sessionSetup, setClient } = useTAppStore();
//   const [session, setSession] = useState<Session | undefined>(undefined);
//   // Additional state initialization will be defined here
//   useEffect(() => {
//     const handleClientSetup = (client: any) => {
//       setClient(client);
//     };
//     const initSession = async () => {
//       // 1. Initialize Client
//       const client = await createClient({
//         nodeUrlPool: "http://localhost:7740",
//         blockchainIid: 0,
//       });
//       handleClientSetup(client);
//       if (sessionSetup) {
//         setSession(sessionSetup);
//       }
//     };

//     initSession().catch(console.error);
//   }, [sessionSetup, setClient]);

//   return (
//     <ChromiaContext.Provider value={session}>
//       {children}
//     </ChromiaContext.Provider>
//   );
// }

// // Define hooks for accessing context
// export function useSessionContext() {
//   return useContext(ChromiaContext);
// }
// export function useSession() {
//   const session = useContext(ChromiaContext);
//   if (!session) {
//     throw new Error("useSession must be used within a SessionProvider");
//   }
//   return session;
// }
