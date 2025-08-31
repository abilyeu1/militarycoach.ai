// hooks import
import { useDimension } from "@/hooks/useDimension";

//formik imports
import { ErrorMessage, Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

// next imports
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

// public imports
import guidanceImage from "../../../public/assets/login-side-img.png";

import logo from "../../../public/assets/milcoach-logo-1.svg";

// atoms imports
import { toast } from "react-toastify";
import Button from "../../components/atoms/Button";

// axios imports

import { URL } from "@/services/API";
import { POST } from "@/services/API/AxiosRequests";

import { styles } from "@/styles/style";
import Cookies from "js-cookie";

// react icons
import { HiOutlineArrowLeft } from "react-icons/hi";
import { TailSpin } from "react-loader-spinner";

const ForgetPassword = () => {
  const [width] = useDimension();

  const router = useRouter();

  const token = Cookies.get("accessToken");

  const [loader, setLoader] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const initialValues = {
    email: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values) => {
      setLoader(true);
      try {
        const payload = {
          email: formik.values.email,
        };

        await POST(URL.FORGOT_PASSWORD, payload, token);

        toast.success("OTP sent to your email.");

        router.push({
          pathname: "/one-time-password",
          query: { email: values.email },
        });
        setLoader(false);
      } catch (error: any) {
        setLoader(false);

        const errorMessage =
          error?.response?.data?.message ?? "Something went wrong";

        toast.error(errorMessage);
      }
    },
  });

  return (
    <>
      <div className="flex h-[100vh] items-center bg-[#FBFBFB]">
        <div
          className={`mx-auto flex h-full w-[100%] flex-col bg-[url('/assets/vectorBg.png')] bg-[length:160px_180px] bg-no-repeat px-5 pt-10 md:justify-start md:bg-auto lg:w-[40%] lg:justify-center `}
        >
          <div className="flex flex-col items-center justify-center  lg:px-5">
            <div className="w-full lg:max-w-[442px]">
              <div className="my-5 mt-5 w-full lg:my-20 ">
                <Image src={logo} alt="logo" width={365} height={300} />
              </div>
              <div className="mb-5 flex w-full items-center justify-between lg:mb-10">
                <HiOutlineArrowLeft
                  className="cursor-pointer text-[22px] text-primary"
                  onClick={() => router.push("/login")}
                />

                <p className="text-left text-[28px] font-bold  md:text-[40px]">
                  Forgot Password
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center lg:px-5 ">
            <div className="w-full lg:w-[442px]">
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                  <label
                    htmlFor="email"
                    className="text-[14px] font-semibold text-[#5C5C5C]"
                  >
                    Email Address
                  </label>

                  <Field
                    type="text"
                    name="email"
                    placeholder="Enter email address"
                    className={` ${styles.inputFieldCss}`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-error"
                  />

                  <Button className="mb-3 mt-5 w-full" type="submit">
                    {loader ? (
                      <div className="flex justify-center">
                        <TailSpin
                          height="20"
                          width="40"
                          color="#fff"
                          ariaLabel="tail-spin-loading"
                          radius="1"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          strokeWidth={4}
                        />
                      </div>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </form>
              </FormikProvider>
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
                Welcome to Military coach, your premier destination for coaching
                and guidance as you navigate the journey from military service
                to civilian life, ensuring a seamless adaptation to civilian
                life and unlocking rewarding career pathways.
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

export default ForgetPassword;
