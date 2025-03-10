
"use client";

import React, { useState } from "react";

import {
  createKeyStoreInteractor,
  createSingleSigAuthDescriptorRegistration,
  createWeb3ProviderEvmKeyStore,
  hours,
  registerAccount,
  registrationStrategy,
  ttlLoginRule,
} from "@chromia/ft4";
import { getRandomUserName } from "@/utility/user";
import { CustomizedModalProps } from "./types";
import { useTAppStore } from "@/store/stateStore";
import { useRouter } from "next/navigation";
declare global {
  interface Window {
    ethereum: any;
  }
}

export default function CustomizedModal({
  isOpen,
  onClose,
  onLogin,
}: CustomizedModalProps) {
  const { client, setSession, setLogout } = useTAppStore();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const router = useRouter();
  if (!isOpen) return null;

  const handleWalletSelect = (wallet: string) => {
    setSelectedWallet(wallet);
  };
  const initSession = async () => {
    if (!client) {
      return;
    }
    if (!window.ethereum) {
      console.log("No ethereum provider found");
      return;
    }
    // 2. Connect with MetaMask
    const evmKeyStore = await createWeb3ProviderEvmKeyStore(window.ethereum);

    // 3. Get all accounts associated with evm address
    const { getAccounts, login } = createKeyStoreInteractor(
      client,
      evmKeyStore
    );
    const accounts = await getAccounts();
    if (accounts.length > 0) {
      const { session, logout } = await login({
        accountId: accounts[0].id,
        config: {
          flags: ["MySession"],
          rules: ttlLoginRule(hours(1)),
        },
        // loginKeyStore: createSessionStorageLoginKeyStore(),
      });
      console.log("Session initialized", session);
      setSession(session);
      setLogout(logout);
      router.push("/home");
    } else {
      // 5. Create a new account by signing a message using metamask
      const authDescriptor = createSingleSigAuthDescriptorRegistration(
        ["A", "T"],
        evmKeyStore.id
      );
      const { session, logout } = await registerAccount(
        client,
        evmKeyStore,
        registrationStrategy.open(authDescriptor, {
          config: {
            rules: ttlLoginRule(hours(2)),
            flags: ["MySession"],
          },
        }),
        {
          name: "register_user",
          args: [getRandomUserName()],
        }
      );
      setSession(session);
      setLogout(logout);
      router.push("/home");
    }
    console.log("Session initialized");
  };


  const handleConnect = () => {
    if (selectedWallet) {
      console.log("Selected Wallet:", selectedWallet);
      initSession().catch(console.error);
      localStorage.setItem("selectedWallet", selectedWallet);
      onLogin(selectedWallet);
    }
  };
  const getButtonClass = (wallet: string) =>
    `w-full flex items-center p-3 text-base font-bold text-gray-900 rounded-lg ${
      selectedWallet === wallet
        ? "bg-blue-100 border-2 border-blue-500"
        : "bg-gray-50 hover:bg-gray-100"
    } group hover:shadow`;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-md mb-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-sm p-4 ">
          <h5 className="mb-3 text-base text-center font-semibold text-gray-900 md:text-xl">
            Connect your wallet
          </h5>
          <p className="text-sm font-normal text-gray-500 text-center">
            Connect with one of our available wallet providers or create a new
            one
          </p>
          <p className="text-sm font-semibold text-amber-500 text-center mt-1">
            MetaMask is the recommended wallet for this application
          </p>
          <ul className="my-4 space-y-3">
            <li>
              <button
                onClick={() => handleWalletSelect("MetaMask")}
                className={`justify-between ${getButtonClass("MetaMask")}`}
              >
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="h-4"
                    viewBox="0 0 40 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M39.0728 0L21.9092 12.6999L25.1009 5.21543L39.0728 0Z"
                      fill="#E17726"
                    />
                    <path
                      d="M0.966797 0.0151367L14.9013 5.21656L17.932 12.7992L0.966797 0.0151367Z"
                      fill="#E27625"
                    />
                    <path
                      d="M32.1656 27.0093L39.7516 27.1537L37.1004 36.1603L27.8438 33.6116L32.1656 27.0093Z"
                      fill="#E27625"
                    />
                    <path
                      d="M7.83409 27.0093L12.1399 33.6116L2.89876 36.1604L0.263672 27.1537L7.83409 27.0093Z"
                      fill="#E27625"
                    />
                    <path
                      d="M17.5203 10.8677L17.8304 20.8807L8.55371 20.4587L11.1924 16.4778L11.2258 16.4394L17.5203 10.8677Z"
                      fill="#E27625"
                    />
                    <path
                      d="M22.3831 10.7559L28.7737 16.4397L28.8067 16.4778L31.4455 20.4586L22.1709 20.8806L22.3831 10.7559Z"
                      fill="#E27625"
                    />
                    <path
                      d="M12.4115 27.0381L17.4768 30.9848L11.5928 33.8257L12.4115 27.0381Z"
                      fill="#E27625"
                    />
                    <path
                      d="M27.5893 27.0376L28.391 33.8258L22.5234 30.9847L27.5893 27.0376Z"
                      fill="#E27625"
                    />
                    <path
                      d="M22.6523 30.6128L28.6066 33.4959L23.0679 36.1282L23.1255 34.3884L22.6523 30.6128Z"
                      fill="#D5BFB2"
                    />
                    <path
                      d="M17.3458 30.6143L16.8913 34.3601L16.9286 36.1263L11.377 33.4961L17.3458 30.6143Z"
                      fill="#D5BFB2"
                    />
                    <path
                      d="M15.6263 22.1875L17.1822 25.4575L11.8848 23.9057L15.6263 22.1875Z"
                      fill="#233447"
                    />
                    <path
                      d="M24.3739 22.1875L28.133 23.9053L22.8184 25.4567L24.3739 22.1875Z"

                      fill="#233447"
                    />
                    <path
                      d="M12.8169 27.0049L11.9606 34.0423L7.37109 27.1587L12.8169 27.0049Z"
                      fill="#CC6228"
                    />
                    <path
                      d="M27.1836 27.0049L32.6296 27.1587L28.0228 34.0425L27.1836 27.0049Z"
                      fill="#CC6228"
                    />
                    <path
                      d="M31.5799 20.0605L27.6165 24.0998L24.5608 22.7034L23.0978 25.779L22.1387 20.4901L31.5799 20.0605Z"
                      fill="#CC6228"
                    />
                    <path
                      d="M8.41797 20.0605L17.8608 20.4902L16.9017 25.779L15.4384 22.7038L12.3988 24.0999L8.41797 20.0605Z"
                      fill="#CC6228"
                    />
                    <path
                      d="M8.15039 19.2314L12.6345 23.7816L12.7899 28.2736L8.15039 19.2314Z"
                      fill="#E27525"
                    />
                    <path
                      d="M31.8538 19.2236L27.2061 28.2819L27.381 23.7819L31.8538 19.2236Z"
                      fill="#E27525"
                    />
                    <path
                      d="M17.6412 19.5088L17.8217 20.6447L18.2676 23.4745L17.9809 32.166L16.6254 25.1841L16.625 25.1119L17.6412 19.5088Z"
                      fill="#E27525"
                    />
                    <path
                      d="M22.3562 19.4932L23.3751 25.1119L23.3747 25.1841L22.0158 32.1835L21.962 30.4328L21.75 23.4231L22.3562 19.4932Z"
                      fill="#E27525"
                    />
                    <path
                      d="M27.7797 23.6011L27.628 27.5039L22.8977 31.1894L21.9414 30.5138L23.0133 24.9926L27.7797 23.6011Z"
                      fill="#F5841F"
                    />
                    <path
                      d="M12.2373 23.6011L16.9873 24.9926L18.0591 30.5137L17.1029 31.1893L12.3723 27.5035L12.2373 23.6011Z"
                      fill="#F5841F"
                    />
                    <path
                      d="M10.4717 32.6338L16.5236 35.5013L16.4979 34.2768L17.0043 33.8323H22.994L23.5187 34.2753L23.48 35.4989L29.4935 32.641L26.5673 35.0591L23.0289 37.4894H16.9558L13.4197 35.0492L10.4717 32.6338Z"
                      fill="#C0AC9D"
                    />
                    <path
                      d="M22.2191 30.231L23.0748 30.8354L23.5763 34.8361L22.8506 34.2234H17.1513L16.4395 34.8485L16.9244 30.8357L17.7804 30.231H22.2191Z"
                      fill="#161616"
                    />
                    <path
                      d="M37.9395 0.351562L39.9998 6.53242L38.7131 12.7819L39.6293 13.4887L38.3895 14.4346L39.3213 15.1542L38.0875 16.2779L38.8449 16.8264L36.8347 19.1742L28.5894 16.7735L28.5179 16.7352L22.5762 11.723L37.9395 0.351562Z"
                      fill="#763E1A"
                    />
                    <path
                      d="M2.06031 0.351562L17.4237 11.723L11.4819 16.7352L11.4105 16.7735L3.16512 19.1742L1.15488 16.8264L1.91176 16.2783L0.678517 15.1542L1.60852 14.4354L0.350209 13.4868L1.30098 12.7795L0 6.53265L2.06031 0.351562Z"
                      fill="#763E1A"
                    />
                    <path
                      d="M28.1861 16.2485L36.9226 18.7921L39.7609 27.5398L32.2728 27.5398L27.1133 27.6049L30.8655 20.2912L28.1861 16.2485Z"
                      fill="#F5841F"
                    />
                    <path
                      d="M11.8139 16.2485L9.13399 20.2912L12.8867 27.6049L7.72971 27.5398H0.254883L3.07728 18.7922L11.8139 16.2485Z"
                      fill="#F5841F"
                    />
                    <path
                      d="M25.5283 5.17383L23.0847 11.7736L22.5661 20.6894L22.3677 23.4839L22.352 30.6225H17.6471L17.6318 23.4973L17.4327 20.6869L16.9139 11.7736L14.4707 5.17383H25.5283Z"
                      fill="#F5841F"
                    />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    MetaMask

                    </span>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleWalletSelect("Coinbase Wallet")}
                className={getButtonClass("Coinbase Wallet")}
              >
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="h-5"
                    viewBox="0 0 292 292"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M145.7 291.66C226.146 291.66 291.36 226.446 291.36 146C291.36 65.5541 226.146 0.339844 145.7 0.339844C65.2542 0.339844 0.0400391 65.5541 0.0400391 146C0.0400391 226.446 65.2542 291.66 145.7 291.66Z"
                      fill="#3259A5"
                    />
                    <path
                      d="M195.94 155.5C191.49 179.08 170.8 196.91 145.93 196.91C117.81 196.91 95.0204 174.12 95.0204 146C95.0204 117.88 117.81 95.0897 145.93 95.0897C170.8 95.0897 191.49 112.93 195.94 136.5H247.31C242.52 84.7197 198.96 44.1797 145.93 44.1797C89.6904 44.1797 44.1104 89.7697 44.1104 146C44.1104 202.24 89.7004 247.82 145.93 247.82C198.96 247.82 242.52 207.28 247.31 155.5H195.94Z"
                      fill="white"
                    />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Coinbase Wallet
                  </span>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleWalletSelect("Fortmatic")}
                className={getButtonClass("Fortmatic")}
              >
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="h-4"
                    viewBox="0 0 96 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M72.0998 0.600098H48.3998H24.5998H0.799805V24.4001V48.2001V49.7001V71.8001V71.9001V95.5001H24.5998V72.0001V71.9001V49.8001V48.3001V24.5001H48.3998H72.1998H95.9998V0.700104H72.0998V0.600098Z"
                      fill="#617BFF"
                    />
                    <path
                      d="M48.5 71.8002H72.1V95.6002H73C79.1 95.6002 84.9 93.2002 89.2 88.9002C93.5 84.6002 95.9 78.8002 95.9 72.7002V48.2002H48.5V71.8002Z"
                      fill="#617BFF"
                    />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Fortmatic
                  </span>
                </div>
              </button>
            </li>
          </ul>
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="mt-4 w-32 h-12 px-4 bg-gray-500 text-white font-bold rounded-lg"
            style={{ borderRadius: "0.5rem" }}
          >
            Close
          </button>
          <button
            onClick={handleConnect}
            disabled={!selectedWallet}
            className="mt-4 w-32 h-12 px-4 bg-fuchsia-500 text-white font-bold rounded-lg disabled:bg-gray-300"
            style={{ borderRadius: "0.5rem" }}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}

