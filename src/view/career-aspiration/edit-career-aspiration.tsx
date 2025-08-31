//axios imports
import { PUT } from "@/services/API/AxiosRequests";
import { URL } from "@/services/API";
//react imports
import React, { useState } from "react";
import { toast } from "react-toastify";
//next imports
import { useRouter } from "next/router";
//styles imports
import { styles } from "@/styles/style";
//redux imports
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store/store";
import { updateUser } from "@/redux/slices/authSlice";
//atomsI imports
import Button from "@/components/atoms/Button";
//types imports
import { Field, FormikProvider, useFormik } from "formik";
//data imports
import { industryOfInterest, jobPositionLevel } from "@/view/data/data";

import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";

const EditCareerAspiration = () => {
  const token = Cookies.get("accessToken");
  const userData = useAppSelector((state: any) => state.auth.user);
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();

  const dispatch = useDispatch();

  const editWorExperienceData = () => {
    formik.setFieldValue("industryOfInterest", userData.industryOfInterest);
    formik.setFieldValue("positionOfInterest", userData.jobPositionOfInterest);
    formik.setFieldValue("jobPositionLevel", userData.jobPositionLevel);
    formik.setFieldValue("JobLocation", userData.JobLocation);
  };

  // const editAspiration = async () => {
  //   try {
  //     const requestBody = {
  //       industryOfInterest: formik.values.industryOfInterest,
  //       jobPositionOfInterest: formik.values.positionOfInterest,
  //       jobPositionLevel: formik.values.jobPositionLevel,
  //       JobLocation: formik.values.JobLocation,
  //     };

  //     const res = await PUT(URL.EDIT_ASPIRATION, requestBody, token);

  //     dispatch(updateUser(res.user));
  //   } catch (error) {
  //     console.log(error, "error");
  //   }
  // };

  // end skills chips

  const formik = useFormik({
    initialValues: {
      industryOfInterest: "",
      positionOfInterest: "",
      jobPositionLevel: "",
      JobLocation: "",
    },
    // validationSchema,
    onSubmit: async () => {
      setLoader(true);
      try {
        const payload = {
          industryOfInterest: formik.values.industryOfInterest,
          jobPositionOfInterest: formik.values.positionOfInterest,
          jobPositionLevel: formik.values.jobPositionLevel,
          JobLocation: formik.values.JobLocation,
        };

        const res = await PUT(URL.USER_EDIT_PROFILE, payload, token);

        dispatch(updateUser(res.user));
        setLoader(false);
        toast.success("Career Aspiration Updated. ");
        router.push("/profile");
      } catch (error) {
        setLoader(false);
        console.log("error", error);
      }
    },
  });

  const formSubmit = (e: any) => {
    e.preventDefault();
    formik.handleSubmit();
    // editAspiration();
  };

  React.useEffect(() => {
    editWorExperienceData();
  }, []);
  return (
    <>
      <div className="flex min-h-[100vh] flex-col bg-[url('/assets/vectorBg.png')] bg-no-repeat px-4 md:px-0">
        <div className="flex h-[100vh] items-center px-4 md:px-16">
          <FormikProvider value={formik}>
            <form onSubmit={(e) => formSubmit(e)} className="w-full">
              <div className="mt-5 md:mt-20">
                <p className="mb-0 text-left text-[20px] font-bold md:mb-10 md:text-[40px]">
                  Career Aspirations (Optional)
                </p>
                <div className="block md:flex">
                  <div className="mx-0 w-[100%] md:mx-2 lg:w-[32%]">
                    <label
                      htmlFor="industryOfInterest"
                      className="text-[14px] font-semibold text-[#5C5C5C]"
                    >
                      Industry of interest
                    </label>
                    <Field
                      as="select"
                      name="industryOfInterest"
                      className={`!lg:w-[70%] !placeholder:text-black mb-2 mt-2 !w-full rounded-lg border !border-gray bg-transparent px-4 py-2 text-black focus:outline-none sm:w-[80%] lg:py-[16px]`}
                      style={{
                        paddingRight: "30px", // Adjust this value as needed for the desired padding
                        backgroundImage:
                          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23000000' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>\")",
                        backgroundPosition: "calc(100% - 10px) center",
                        backgroundRepeat: "no-repeat",
                        color: "gray",
                        appearance: "none", // Hide the default dropdown arrow
                      }}
                      onChange={formik.handleChange}
                    >
                      <option label="Select" />
                      {industryOfInterest.map((option: any, index: number) => (
                        <option
                          key={index}
                          value={option.value}
                          label={option.label}
                        />
                      ))}
                    </Field>
                  </div>
                  <div className="mx-0 w-[100%] md:mx-2 lg:w-[32%]">
                    <label
                      htmlFor="positionOfInterest"
                      className="text-[14px] font-semibold text-[#5C5C5C]"
                    >
                      Job Position of Interest
                    </label>
                    <Field
                      id="positionOfInterest"
                      name="positionOfInterest"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.positionOfInterest}
                      placeholder="Enter Job Position"
                      className={` ${styles.inputFieldCss}`}
                    />
                  </div>
                  <div className="mx-0 w-[100%] md:mx-2 lg:w-[32%]">
                    <label
                      htmlFor="jobPositionLevel"
                      className="text-[14px] font-semibold text-[#5C5C5C]"
                    >
                      Job Position Level
                    </label>
                    <Field
                      as="select"
                      name="jobPositionLevel"
                      className={`!lg:w-[70%] !placeholder:text-black mb-2 mt-2 !w-full rounded-lg border !border-gray bg-transparent px-4 py-2 text-black focus:outline-none sm:w-[80%] lg:py-[16px]`}
                      style={{
                        paddingRight: "30px", // Adjust this value as needed for the desired padding
                        backgroundImage:
                          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23000000' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>\")",
                        backgroundPosition: "calc(100% - 10px) center",
                        backgroundRepeat: "no-repeat",
                        color: "black",
                        appearance: "none", // Hide the default dropdown arrow
                      }}
                    >
                      <option value="" label="Job Position Level" />
                      {jobPositionLevel.map((option: any, index: number) => (
                        <option
                          key={index}
                          value={option.value}
                          label={option.label}
                        />
                      ))}
                    </Field>
                  </div>
                </div>
                <div className="block md:flex">
                  <div className="mx-0 w-[100%] md:mx-2 lg:w-[32%]">
                    <label
                      htmlFor="JobLocation"
                      className="text-[14px] font-semibold text-[#5C5C5C]"
                    >
                      Job Location
                    </label>
                    <Field
                      id="JobLocation"
                      name="JobLocation"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.JobLocation}
                      placeholder="Enter Job Location"
                      className={` ${styles.inputFieldCss}`}
                    />
                  </div>
                </div>
              </div>
              <div className="my-10 flex justify-between">
                <Button type="button" onClick={() => router.push("/profile")}>
                  Cancel
                </Button>
                <Button type="submit">
                  {" "}
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
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
};

export default EditCareerAspiration;
