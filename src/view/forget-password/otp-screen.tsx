// hooks import
import { useDimension } from "@/hooks/useDimension";

//formik imports
import { ErrorMessage, Field, FormikProvider, useFormik } from "formik";

// next imports
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// public imports
import guidanceImage from "../../../public/assets/login-side-img.png";

import logo from "../../../public/assets/milcoach-logo-1.svg";

// atoms imports
import Button from "../../components/atoms/Button";
import { TailSpin } from "react-loader-spinner";

//redux imports
import * as Yup from "yup";

import { toast } from "react-toastify";
import { styles } from "@/styles/style";

//axios imports
import { URL } from "@/services/API";
import { POST } from "@/services/API/AxiosRequests";

import Cookies from "js-cookie";
import OtpInput from "react-otp-input";

//react imports
import { FC, useState } from "react";

// react icons
import { GoEyeClosed } from "react-icons/go";
import { AiOutlineEye } from "react-icons/ai";
import { IProps } from "@/types/defaultTypes";

const OneTimePassword: FC<IProps> = ({ query }) => {
  const [width] = useDimension();

  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const router = useRouter();
  const token = Cookies.get("accessToken");

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    newPassword: Yup.string().required("Password is required").min(1).max(25),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .min(1)
      .max(25),
  });

  const initialValues = {
    email: query.email || "",
    newPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoader(true);
      try {
        const payload = {
          email: formik.values.email,
          password: formik.values.newPassword,
          code: otp,
        };

        await POST(URL.RESET_PASSWORD, payload, token);
        setLoader(false);

        toast.success("Password changed successfully!.");
        router.push("/login");
      } catch (error) {
        console.error("Error:", error);
        toast.error("Password is not changed, Please try again later.");
      }
    },
  });

  const reSendOTP = async () => {
    if (formik.values.email === "" || formik.values.newPassword === "") {
      toast.error("Enter your email address");
    }

    try {
      const payload = {
        email: formik.values.email,
      };

      await POST(URL.FORGOT_PASSWORD, payload, token);

      toast.success("OTP sent to your email.");
    } catch (error) {
      console.log("Error:", error);
      toast.error("email is not sent. try again later.");
    }
  };

  return (
    <>
      <div className="flex h-[100vh] items-center bg-[#FBFBFB]">
        {loader && (
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
        )}
        <div
          className={`mx-auto flex h-full w-[100%] flex-col bg-[url('/assets/vectorBg.png')] bg-[length:160px_180px] bg-no-repeat px-5 pt-10 md:justify-start md:bg-auto lg:w-[40%] lg:justify-center `}
        >
          <div className="flex flex-col items-center justify-center  lg:px-5">
            <div className="w-full lg:max-w-[442px]">
              <div className="my-5 mt-5 w-full lg:my-20 ">
                <Image src={logo} alt="logo" width={365} height={300} />
              </div>
              <div className="mb-5 flex w-full items-center justify-between lg:mb-10">
                <p className="text-left text-[28px] font-bold  md:text-[40px]">
                  Verify OTP
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center lg:px-5 ">
            <div className="w-full lg:w-[442px]">
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-[14px] font-semibold text-[#5C5C5C]"
                    >
                      Enter OTP
                    </label>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span>-</span>}
                      renderInput={(props, index) => (
                        <input
                          {...props}
                          className="!lg:w-[70%] !placeholder:text-black mb-2  mt-2  !w-full rounded-lg border  !border-gray bg-transparent py-2  text-black focus:outline-none lg:py-4"
                          key={index}
                        />
                      )}
                    />
                  </div>
                  <label
                    htmlFor="email"
                    className="text-[14px] font-semibold text-[#5C5C5C]"
                  >
                    Email address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Email Address"
                    className={` pointer-events-none ${styles.inputFieldCss}`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-error"
                  />

                  <label
                    htmlFor="password"
                    className="relative text-[14px] font-semibold text-[#5C5C5C]"
                  >
                    Password
                    <Field
                      id="newPassword"
                      name="newPassword"
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Enter New Password"
                      className={` ${styles.inputFieldCss}`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
                      onClick={() => setPasswordVisibility(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? (
                        <GoEyeClosed className="relative top-6 text-[20px] text-textGray" />
                      ) : (
                        <AiOutlineEye className="relative top-6 text-[20px] text-textGray" />
                      )}
                    </button>
                  </label>
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-error"
                  />

                  <label
                    htmlFor="confirmPassword"
                    className="relative text-[14px] font-semibold text-[#5C5C5C]"
                  >
                    Confirm Password
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      placeholder="Enter Confirm Password"
                      className={` ${styles.inputFieldCss}`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
                      onClick={() =>
                        setConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                    >
                      {isConfirmPasswordVisible ? (
                        // Eye icon when password is visible
                        <GoEyeClosed className="relative top-6 text-[20px] text-textGray" />
                      ) : (
                        // Eye-slash icon when password is hidden
                        <AiOutlineEye className="relative top-6 text-[20px] text-textGray" />
                      )}
                    </button>
                  </label>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-error"
                  />

                  <Button className="mb-3 mt-5 w-full" type="submit">
                    Verify OTP Code
                  </Button>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <p className="pr-1 font-normal text-gray">Reset</p>
                      <button
                        type="submit"
                        onClick={reSendOTP}
                        className="font-semibold text-primary"
                      >
                        OTP
                      </button>
                    </div>
                    <div className="flex items-center">
                      <p className="pr-1 font-normal text-gray">Remember?</p>
                      <Link
                        href="/login"
                        className="font-semibold text-primary"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
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

export default OneTimePassword;
