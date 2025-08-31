// react imports
import { FC } from "react";
//public imports
import home from "../../../public/assets/home.svg";
import logo from "../../../public/assets/navbar-logo.svg";
// import profile from "../../../public/assets/profile.png";
import silver_badge from "../../../public/assets/silver-badge.svg";
import subs from "../../../public/assets/subs.svg";
import support from "../../../public/assets/support.svg";
import tool from "../../../public/assets/tool.svg";
import subscribed_badge from "../../../public/assets/subscribed.svg";
import free_badge from "../../../public/assets/free.svg";

// next imports

import Image from "next/image";
import Link from "next/link";

// react imports

import { useAppSelector } from "@/redux/store/store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { IoIosArrowDown } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { toast } from "react-toastify";

const Navbar: FC = () => {
  const router = useRouter();

  const userData = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    toast.success("Logout successful!", {
      position: "top-right",
      autoClose: 3000,
    });
    router.push("/login");
  };

  return (
    <nav className=" flex min-h-[8vh] items-center justify-between bg-[#122100] px-16">
      <div className="text-lg font-semibold text-white">
        <Image
          src={logo}
          width={255}
          height={46}
          alt="logo"
          className="cursor-pointer"
          onClick={() => router.push("/tools")}
        />
      </div>

      <div className="flex text-center text-white ">
        <Link href="/tools" className="mr-6 transition duration-300">
          <div className="flex items-center">
            <Image
              src={home}
              width={20}
              height={20}
              alt="logo"
              className="mr-2"
            />
            Home
          </div>
        </Link>
        <div className="group relative mr-6 inline-block">
          <div className="flex items-center">
            <Image
              src={tool}
              width={20}
              height={20}
              alt="logo"
              className="mr-2"
            />

            <p className="transition duration-300">Tools</p>
            <div className=" absolute z-10 mt-[260px] hidden w-32 rounded-lg bg-[#122100] py-2 shadow-lg group-hover:block">
              <Link
                href="/career-wizard"
                className="block px-4 py-2 text-left text-[12px] capitalize text-white transition duration-300 hover:border-b"
              >
                Career Wizard
              </Link>
              <Link
                href="/bullet-translator"
                className="block px-4 py-2 text-left text-[12px] capitalize text-white transition duration-300 hover:border-b"
              >
                Bullet translator
              </Link>
              <Link
                href="/cover-letter-wizard"
                className="block px-4 py-2 text-left text-[12px] capitalize text-white transition duration-300 hover:border-b"
              >
                Cover letter wizard
              </Link>
              <Link
                href="/skills-gap-analysis"
                className="block px-4 py-2 text-left text-[12px] capitalize text-white transition duration-300 hover:border-b"
              >
                Skills gap analysis
              </Link>
              <Link
                href="/mock-interview-prep"
                className="block px-4 py-2 text-left text-[12px] capitalize text-white transition duration-300 hover:border-b"
              >
                Mock Interview Prep
              </Link>
            </div>
            <IoIosArrowDown className="ml-2 text-[16px]" />
          </div>
        </div>
        <Link href="/pricing" className="mr-6 transition duration-300">
          <div className="flex items-center">
            <Image
              src={subs}
              width={20}
              height={20}
              alt="logo"
              className="mr-2"
            />
            Subscriptions
          </div>
        </Link>
      </div>

      <div className="flex w-[350px] items-center justify-end text-right text-white">
        {userData?.stripeSubscriptionStatus === "active" ? (
          <Image
            className="mr-2"
            src={subscribed_badge}
            alt="subscribed_logo"
            height={32}
            width={130}
          />
        ) : (
          <Image
            className="mr-2"
            src={free_badge}
            alt=""
            height={32}
            width={92}
          />
        )}
        <Link href="/profile">
          <div className="flex items-center">
            <div className="bg-gray-100 dark:bg-gray-600 relative h-10 w-10 overflow-hidden rounded-full">
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

            <p className="mx-2 max-w-[100px] truncate text-white">
              {userData?.fullName}
            </p>
          </div>
        </Link>

        <Link href="/support">
          <div className="ml-5  flex items-center rounded-full">
            <Image src={support} alt="" height={18} width={18} />
          </div>
        </Link>

        <div className="ml-6">
          <RiLogoutCircleRLine
            className="cursor-pointer text-[18px]"
            onClick={handleLogout}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
