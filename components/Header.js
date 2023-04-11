import { useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getTokenBalance() {
    setLoading(true);
    const config = {
      apiKey: "Zdzh4yYBpiLnFKG7NayO1tkZdWgwSOFY",
      network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(config);
    const data = await alchemy.core.getTokenBalances(userAddress);
    console.log(userAddress);
    // console.log(data);

    const tokenDataPromises = [];

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenData = alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress
      );
      tokenDataPromises.push(tokenData);
      console.log(tokenData);
    }
    console.log(await Promise.all(tokenDataPromises));
    setTokenDataObjects(await Promise.all(tokenDataPromises));
    setResults(data);

    setHasQueried(true);
    setLoading(false);
  }

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        console.log("connecting");
        await ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => {
            // Return the address of the wallet
            console.log(res);
            console.log("hello babo");
            setUserAddress(res[0]);
          });
      } catch (error) {
        console.log(error);
      }
      // const accounts = await ethereum.request({ method: "eth_accounts" });
    } else {
      alert("Please install Metamask!");
      //document.getElementById("login_button").innerHTML = "Please install MetaMask";
    }
  }

  return (
    <header className="sticky top-0 w-full bg-black">
      <nav
        className="flex justify-between max-w-full p-4 mx-auto border-b border-gray-700 lg:px-8"
        aria-label="Global"
      >
        <div className="flex ml-10 sm:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="w-auto h-8"
              src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=500"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6 text-green-500" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <label class="relative block">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg class="h-5 w-5 fill-slate-800" viewBox="0 0 20 20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="gray"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </svg>
            </span>
            <input
              class="placeholder:italic placeholder:text-slate-400 block text-slate-400 bg-slate-800 w-full border border-slate-800 rounded-md py-1 pl-9 pr-3 shadow-sm focus:outline-none sm:text-sm"
              placeholder="Search for anything..."
              type="text"
            />
          </label>
          <a
            href="/"
            className="px-2 py-1 text-sm font-semibold leading-6 text-green-500 rounded-lg hover:bg-green-50"
          >
            Home Feed
          </a>
          <a
            href="/findothers"
            className="px-2 py-1 text-sm font-semibold leading-6 text-green-500 rounded-lg hover:bg-green-50"
          >
            Find Others
          </a>
          <a
            href="/profile/0x01c634"
            className="px-2 py-1 text-sm font-semibold leading-6 text-green-500 rounded-lg hover:bg-green-50"
          >
            Profile
          </a>
        </Popover.Group>
        <button
          type="button"
          className="hidden lg:flex lg:flex-1 lg:justify-end"
          onClick={connect}
        >
          <span className="px-2 py-1 text-sm font-semibold leading-6 text-green-500 rounded-lg hover:bg-green-50">
            Connect Wallet <span aria-hidden="true">&rarr;</span>
          </span>
        </button>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-black sm:max-w-sm sm:border-l sm:border-gray-600">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="w-auto h-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=500"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2 border-b-2 border-gray-600">
                <a
                  href="/"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-green-500 rounded-lg hover:bg-green-50"
                >
                  Home Feed
                </a>
                <a
                  href="/findothers"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-green-500 rounded-lg hover:bg-green-50"
                >
                  Find Others
                </a>
                <a
                  href="/profile/0x01c634"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-green-500 rounded-lg hover:bg-green-50"
                >
                  Profile
                </a>
              </div>
              <div className="py-6">
                <button
                  type="button"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-green-500 rounded-lg hover:bg-green-50"
                  onClick={connect}
                >
                  <span className="font-semibold leading-6 text-green-500 text-m">
                    Connect Wallet <span aria-hidden="true">&rarr;</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
