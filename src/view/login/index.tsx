// hooks import
import { useDimension } from "@/hooks/useDimension";

// types imports
import { SignUpFormValues } from "@/types";

//formik imports
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

// next imports
import Image from "next/image";

import Link from "next/link";

// public imports
import guidanceImage from "../../../public/assets/login-side-img.png";

// redux imports
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/slices/authSlice";

import logo from "../../../public/assets/milcoach-logo-1.svg";

// next imports
import { useRouter } from "next/router";
import { useState } from "react";

// atoms imports
import Button from "../../components/atoms/Button";

// imports react icons
import { AiOutlineEye } from "react-icons/ai";
import { GoEyeClosed } from "react-icons/go";

// styles imports
import { styles } from "@/styles/style";

// axios imports
import { POST } from "@/services/API/AxiosRequests";
import { URL } from "../../services/API/index";

// toast imports
import { toast } from "react-toastify";

import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [width] = useDimension();
  const router = useRouter();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(1).max(25),
  });

  const handleSubmit = async (values: SignUpFormValues) => {
    setLoader(true);
    try {
      const response = await POST(URL.LOGIN, {
        email: values.email,
        password: values.password,
      });

      dispatch(loginSuccess({ user: response.user, token: response.token }));
      Cookies.set("accessToken", response.token, { expires: 1 });
      toast.success("Login successful!");
      setLoader(false);
      router.push("/tools");
    } catch (error: any) {
      setLoader(false);
      const errorMessage =
        error.response.data.message ?? "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="flex h-[100vh] items-center bg-[#FBFBFB]">
        <div
          className={`mx-auto flex h-full w-[100%] flex-col bg-[url('/assets/vectorBg.png')] bg-[length:160px_180px] bg-no-repeat px-5 pt-10 md:justify-start md:bg-auto lg:w-[40%] lg:justify-center `}
        >
          <div className="flex flex-col items-center justify-center  lg:px-5">
            <div className="w-full lg:max-w-[442px]">
              <div className="my-5 mt-5 w-full lg:my-20 ">
                <Image src={logo} alt="logo" />
              </div>
              <div className="w-full">
                <p className="mb-5 text-left text-[28px] font-bold md:text-[40px] lg:mb-10">
                  Login
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center lg:px-5 ">
            <div className="w-full lg:w-[442px]">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={LoginSchema}
              >
                <Form>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-[14px] font-semibold text-[#5C5C5C]"
                    >
                      Email Address
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter Email Address"
                      className={`${styles.inputFieldCss}`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-error"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="relative text-[14px] font-semibold text-[#5C5C5C]"
                    >
                      Password
                      <Field
                        id="password"
                        name="password"
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Enter Password"
                        className={`${styles.inputFieldCss}`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
                        onClick={() =>
                          setPasswordVisibility(!isPasswordVisible)
                        }
                      >
                        {isPasswordVisible ? (
                          // Eye icon when password is visible
                          <GoEyeClosed className="relative top-6 text-[20px] text-textGray" />
                        ) : (
                          // Eye-slash icon when password is hidden
                          <AiOutlineEye className="relative top-6 text-[20px] text-textGray" />
                        )}
                      </button>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-error"
                    />
                    <Link
                      href="/forgot-password"
                      className="text-right font-semibold text-primary"
                    >
                      Forgot Password?
                    </Link>
                  </div>

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
                      "Login"
                    )}
                  </Button>
                  <div className="flex">
                    <p className="pr-1 font-normal text-gray">
                      Don’t have an account?
                    </p>
                    <Link href="/signup" className="font-semibold text-primary">
                      Sign Up
                    </Link>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>

        {width > 1024 && (
          <div className=" flex h-full w-[60%] flex-col items-center justify-center bg-[url('/assets/loginbg.png')]">
            <div className="h-[20%]">
              <p className="text-center text-[32px] font-bold ">
                Personalized Career Coaching for Military Professional
              </p>

              <p className=" mx-auto w-[50%] text-center text-[18px] font-normal text-lightGray">
                Welcome to military coach.ai, your premier destination for
                coaching and guidance as you navigate the journey from military
                service to civilian life.
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

export default Login;
