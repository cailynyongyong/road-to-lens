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
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
    <header className="bg-black">
      <nav
        className="flex items-center justify-between p-6 mx-auto border border-gray-700 max-w-7xl lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
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
          <a
            href="/"
            className="text-sm font-semibold leading-6 text-green-500"
          >
            Home Feed
          </a>
          <a
            href="/findothers"
            className="text-sm font-semibold leading-6 text-green-500"
          >
            Find Others
          </a>
          <a
            href="/profile/0x01c634"
            className="text-sm font-semibold leading-6 text-green-500"
          >
            Profile
          </a>
        </Popover.Group>
        <button
          type="button"
          className="hidden lg:flex lg:flex-1 lg:justify-end"
          onClick={connect}
        >
          <span className="text-sm font-semibold leading-6 text-green-500">
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
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-black sm:max-w-sm sm:ring-1 sm:ring-white">
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
              <div className="py-6 space-y-2">
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
