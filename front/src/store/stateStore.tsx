// import { Session } from "@chromia/ft4";
// import { IClient } from "postchain-client";
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";

// type Theme = "dark" | "light";

// type AppStore = {
//   theme: Theme;
//   toggleTheme: () => void;
//   setTheme: (theme: Theme) => void;
//   session: Session | undefined;
//   client: IClient | undefined;
//   logout: () => Promise<void> | undefined;
//   setSession: (session: Session | undefined) => void;
//   setClient: (client: IClient | undefined) => void;
//   setLogout: (logout: () => Promise<void>) => void;
// };

// export const useTAppStore = create<AppStore>()(
//   persist(
//     (set) => ({
//       // Theme-related states and actions
//       theme: "dark",
//       setTheme: (theme) => {
//         set({ theme });
//         document.documentElement.classList.toggle("dark", theme === "dark");
//       },
//       toggleTheme: () => {
//         set((state) => {
//           const newTheme = state.theme === "light" ? "dark" : "light";
//           document.documentElement.classList.toggle("dark");
//           return { theme: newTheme };
//         });
//       },
//       session: undefined,
//       client: undefined,
//       logout: () => Promise.resolve(undefined),
//       setSession: (session) => set({ session }),
//       setClient: (client) => set({ client }),
//       setLogout: (logout) => set({ logout }),
//     }),
//     {
//       name: "theme-storage",
//       storage: createJSONStorage(() => localStorage),
//       onRehydrateStorage: () => (state) => {
//         // Handle initial theme and rehydrate contextProvider props
//         if (typeof window !== "undefined") {
//           // If no stored theme, check system preference
//           if (
//             !localStorage.getItem("theme-storage") &&
//             window.matchMedia("(prefers-color-scheme: dark)").matches
//           ) {
//             state?.setTheme("dark");
//           } else if (state?.theme) {
//             // Otherwise apply stored theme
//             document.documentElement.classList.toggle(
//               "dark",
//               state.theme === "dark"
//             );
//           }
//           const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//           const handleChange = (e: MediaQueryListEvent) => {
//             state?.setTheme(e.matches ? "dark" : "light");
//           };
//           mediaQuery.addEventListener("change", handleChange);
//         }
//       },
//     }
//   )
// );
