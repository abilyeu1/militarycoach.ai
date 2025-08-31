// hooks import
import { useDimension } from "@/hooks/useDimension";

//formik imports
import { ErrorMessage, Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

// next imports
import Image from "next/image";

// public imports
import guidanceImage from "../../../public/assets/login-side-img.png";

// atoms imports
import Button from "../../components/atoms/Button";
import { useState } from "react";

// imports react icons

import { styles } from "@/styles/style";

//import axios
import { URL } from "../../services/API/index";
import { POST } from "@/services/API/AxiosRequests";

import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";

// redux imports
import { useAppSelector } from "@/redux/store/store";

const Support = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const userDetails = useAppSelector((state) => state.auth.user);

  // const fullName = `${userDetails?.firstName} ${userDetails?.lastName}`;

  const token = Cookies.get("accessToken");
  const [width] = useDimension();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email"),
    name: Yup.string(),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: userDetails?.email,
      name: userDetails?.fullName,
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      resetForm();
      setLoader(true);

      try {
        const payload = {
          question: values.message,
        };
        await POST(URL.SUPPORT, payload, token);
        setLoader(false);

        toast.success("Response submitted! Thank for your feedback.");
      } catch (error) {
        setLoader(false);
        console.log("error", error);
      }
    },
  });

  return (
    <>
      <div className="flex h-[100vh] items-center bg-[#FBFBFB]">
        <div
          className={`mx-auto flex h-full w-[90%] flex-col pt-10 md:justify-start lg:w-[50%] lg:justify-center `}
        >
          <div className="flex flex-col items-center justify-center  lg:px-5">
            <div className="w-full lg:max-w-[442px]">
              <div className="w-full">
                <p className=" mb-5 text-left text-[28px] font-bold md:text-[40px] lg:mb-10">
                  Support
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center lg:px-5 ">
            <div className="w-full lg:w-[442px]">
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                  <label
                    htmlFor="name"
                    className="text-[14px] font-semibold text-[#5C5C5C]"
                  >
                    Name
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Albert"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      className={`pointer-events-none ${styles.inputFieldCss}`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-error"
                    />
                    <label
                      htmlFor="email"
                      className="text-[14px] font-semibold text-[#5C5C5C]"
                    >
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Albert@gmail.com"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      className={`pointer-events-none ${styles.inputFieldCss}`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-error"
                    />
                  </label>

                  <div>
                    <label
                      htmlFor="message"
                      className="text-[14px] font-semibold text-[#5C5C5C]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      onChange={formik.handleChange}
                      value={formik.values.message}
                      rows={9}
                      placeholder="Your Message"
                      className={` ${styles.inputFieldCss}`}
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-error"
                    />
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
                      "Send"
                    )}
                  </Button>
                </form>
              </FormikProvider>
            </div>
          </div>
        </div>

        {width > 1024 && (
          <div className="flex h-full w-[50%] flex-col items-center justify-center bg-[url('/assets/loginbg.png')]">
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

export default Support;
