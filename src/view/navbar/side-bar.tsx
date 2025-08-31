// next imports
import React, { useRef, useState } from "react";

//next imports
import Image from "next/image";
import Link from "next/link";

// react icons imports
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// public imports
import logo from "../../../public/assets/navbar-logo.svg";
import homeIcon from "../../../public/assets/home.svg";
import silver_badge from "../../../public/assets/silver-badge.svg";

import profile from "../../../public/assets/profile.png";
import support from "../../../public/assets/support.svg";
import subs from "../../../public/assets/subs.svg";
import subscribed_badge from "../../../public/assets/subscribed.svg";
import free_badge from "../../../public/assets/free.svg";

//redux imports
import { useAppSelector } from "@/redux/store/store";

const SideBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const ref = useRef<any>();
  const router = useRouter();
  const userData = useAppSelector((state: any) => state.auth.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeSidebar = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    toast.success("Logout successfully!");
    router.push("/login");
  };

  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (!isMenuOpen) return;
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        setIsMenuOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      <nav className="fixed z-[99] flex min-h-[8vh] w-full items-center justify-between bg-[#122100] p-0 px-6 md:p-4 md:px-16">
        <div className="flex items-center text-right text-white ">
          <button onClick={toggleMenu}>
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
                />
              )}
            </svg>
          </button>
        </div>

        <div className="text-lg font-semibold text-white">
          <Link href="/tools">
            <Image src={logo} width={185} height={33} alt="logo" />
          </Link>
        </div>

        <div className="h-[38px] w-[38px] rounded-full">
          <Link href="/profile">
            <div className="relative  h-10 w-10 overflow-hidden rounded-full bg-white">
              <svg
                className="text-gray-400 absolute -left-1 h-12 w-12"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </Link>
        </div>
      </nav>

      <div
        className={`duration-4000 fixed z-[999999]  flex h-[100dvh] w-[60%] flex-col  justify-between bg-[#122100] p-0 transition-all lg:p-4 	${
          isMenuOpen ? "block px-4" : "hidden"
        }`}
        ref={ref}
      >
        <div>
          <div className="flex w-full justify-end py-6">
            <RxCross2
              className="cursor-pointer text-white"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>

          <Link href="/tools">
            <Image
              src={logo}
              width={185}
              height={33}
              alt="logo"
              onClick={closeSidebar}
            />
          </Link>

          {userData?.stripeSubscriptionStatus === "active" ? (
            <Image
              className="mt-3"
              src={subscribed_badge}
              alt=""
              height={32}
              width={130}
            />
          ) : (
            <Image
              className="mt-3"
              src={free_badge}
              alt=""
              height={32}
              width={92}
            />
          )}

          <Link href="/profile" onClick={closeSidebar}>
            <div className="flex items-center py-3">
              <div className="relative  h-10 w-10 overflow-hidden rounded-full bg-white">
                <svg
                  className="text-gray-400 absolute -left-1 h-12 w-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <p className="ml-2 text-white">{userData?.fullName}</p>
            </div>
          </Link>

          <div className="flex items-center">
            <Image
              src={homeIcon}
              width={20}
              height={20}
              alt="logo"
              className="mr-2"
            />

            <Link href="/tools">
              <div
                className="mr-6 py-2 text-white transition duration-300"
                onClick={closeSidebar}
              >
                Home
              </div>
            </Link>
          </div>

          <div className="flex items-center">
            <Image
              src={subs}
              width={20}
              height={20}
              alt="logo"
              className="mr-2"
            />

            <Link
              href="/pricing"
              className="mr-6 py-2 text-white transition duration-300"
            >
              <div
                className="mr-6 py-2 text-white transition duration-300"
                onClick={closeSidebar}
              >
                Subscription
              </div>
            </Link>
          </div>

          <div className="flex items-center">
            <Image
              className="mr-4"
              src={support}
              alt=""
              height={18}
              width={18}
            />
            <Link
              href="/support"
              className="mr-6 py-2 text-white transition duration-300"
            >
              <div
                className="mr-6 py-2 text-white transition duration-300"
                onClick={closeSidebar}
              >
                Support
              </div>
            </Link>
          </div>
        </div>
        <div>
          <div
            className="flex cursor-pointer items-center py-4"
            onClick={handleLogout}
          >
            <RiLogoutCircleRLine className=" mr-4 text-white" />
            <p className="text-white">Logout</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
