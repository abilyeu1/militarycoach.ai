// hooks import
import { useDimension } from "@/hooks/useDimension";

// types imports
import { SignUpFormValues } from "@/types";

//formik imports
import { ErrorMessage, Field, Form, Formik } from "formik";

// next imports
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// public imports
import guidanceImage from "../../../public/assets/login-side-img.png";

import logo from "../../../public/assets/milcoach-logo-1.svg";

// atoms imports
import Button from "@/components/atoms/Button";

const SelectRole = () => {
  const [width] = useDimension();
  const router = useRouter();

  return (
    <>
      <div className="flex h-[100vh] items-center">
        <div
          className={`mx-auto flex h-full w-[90%] flex-col justify-center bg-[url('/assets/vectorBg.png')] bg-no-repeat lg:w-[40%]`}
        >
          <div className="relative bottom-[250px] flex justify-center">
            <Image src={logo} alt="logo" width={365} height={300} />
          </div>

          <div className="flex flex-col items-center justify-center ">
            <div className="my-10">
              <p className="text-center text-[40px] font-bold ">Select Role</p>
            </div>
            <div className="block sm:flex">
              <Button
                className="mx-3 h-[70px]"
                type="submit"
                onClick={() =>
                  router.push("/military-personal-details?role=member")
                }
              >
                Military Member
              </Button>
              <Button
                className="mx-3 h-[70px]"
                type="submit"
                onClick={() =>
                  router.push("/military-personal-details?role=spouse")
                }
              >
                Military Spouse
              </Button>
            </div>
          </div>
        </div>

        {width > 1024 && (
          <div className="flex h-full w-[60%] flex-col items-center justify-center bg-[url('/assets/loginbg.png')]">
            <div className="h-[20%]">
              <p className="text-center text-[32px] font-bold ">
                Coaching for Military Professionals
              </p>

              <p className="mx-auto w-[50%] text-center text-[18px] font-normal text-lightGray">
                Welcome to militarycoach.ai your one-stop career coach for
                guidance, advice, and preparation as you make your
                military-to-civilian transition, offered completely FREE to all
                active-duty military members and their spouses.
              </p>
            </div>

            <div className="relative h-[60%] w-full">
              <Image
                src={guidanceImage}
                alt="guidanceImage"
                fill
                objectFit="contain"
              />
              {/* <img
              src="assets/login-side-img.png"
              alt="image"
              className="object-cover"
              // width="567px"
              // height="501"
            /> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectRole;
