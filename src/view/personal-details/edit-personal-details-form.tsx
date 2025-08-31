// components imports

import Button from "@/components/atoms/Button";
// next imports

import Image from "next/image";
// react imports

import React, { useEffect, useState } from "react";
// public imports

import logo from "../../../public/assets/milcoach-logo-1.svg";

// formik imports
import { ErrorMessage, Field, FormikProvider, useFormik } from "formik";

import * as Yup from "yup";

// data imports
import { RxCross2 } from "react-icons/rx";
import { styles } from "@/styles/style";
import Select from "react-select";

import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/store/store";
import { availableLanguages, branchOfServices, ranks } from "../data/data";
import { PUT } from "@/services/API/AxiosRequests";
import { URL } from "@/services/API";
import { updateUser } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import Multiselect from "multiselect-react-dropdown";

const EditPersonalDetails = () => {
  const [langError, setLangError] = useState<string>();
  const [loader, setLoader] = useState<boolean>(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const userData = useAppSelector((state) => state.auth.user);

  // for language chips
  const setHandle = (e: any) => {
    setLanguages(Array.isArray(e) ? e.map((lang) => lang.label) : []);
  };

  // const onSelectLang = (selectedList: any) => {
  //   setLanguages(selectedList);
  // };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    branchOfServices: Yup.string().required("Branch of Services is required"),

    militaryRank: Yup.string().required("Rank is required"),
  });
  console.log(userData?.languages);

  const formik = useFormik({
    initialValues: {
      fullName: userData?.fullName || "",
      age: userData?.age || "",
      languages: userData?.languages || [],
      branchOfServices: userData?.branchOfService || "",
      militaryRank: userData?.militaryRank || "",
    },
    validationSchema,
    onSubmit: async () => {
      console.log("formik.error", formik.errors);
      setLoader(true);
      try {
        const payload = {
          languages: languages,
          fullName: formik.values.fullName,
          age: parseInt(formik.values.age),
          militaryRank: formik.values.militaryRank,
          branchOfService: formik.values.branchOfServices,
        };

        const res = await PUT(URL.USER_EDIT_PROFILE, payload, token);
        if (languages.length < 1) {
          setLangError("At least one language must be selected");
          setLoader(false);
        } else {
          dispatch(updateUser(res.user));
          setLoader(true); // Activate loader here
          router.push("/profile");
        }
      } catch (error) {
        console.log(error);
        setLoader(false);

        toast.error("something went wrong!");
      }
    },
  });
  // const [selectedOptions, setSelectedOptions] = useState<string[]>(
  //   formik.values.languages || [],
  // );

  const [languages, setLanguages] = useState<string[]>(
    formik.values.languages || [],
  );

  // const requireLangs = () => {};

  const formSubmit = (e: any) => {
    formik.handleSubmit();
    e.preventDefault();
  };
  console.log("formik.values", formik.values);

  console.log("languages===>", languages);

  return (
    <>
      <div className="flex min-h-[100vh] flex-col bg-[url('/assets/vectorBg.png')] bg-no-repeat px-4 md:px-0">
        <div className="px-4 md:px-16">
          <div className="my-20 hidden md:block">
            <Image src={logo} alt="logo" width={365} height={300} />
          </div>

          <FormikProvider value={formik}>
            <form onSubmit={(e) => formSubmit(e)}>
              <div>
                <div className="mt-20">
                  <div>
                    <p className="mb-0 text-left text-[20px] font-bold md:mb-10 md:text-[40px]">
                      Basic information
                    </p>

                    <div className=" block md:flex ">
                      <div className="mx-0 w-[100%] md:mx-2 lg:w-[32%]">
                        <label
                          htmlFor="fullName"
                          className="text-[14px] font-semibold text-[#5C5C5C]"
                        >
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <Field
                          id="fullName"
                          name="fullName"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.fullName}
                          placeholder="Enter Full Name"
                          className={`  ${styles.inputFieldCss}`}
                        />

                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className="text-error"
                        />
                      </div>

                      <div className="mx-0 w-[100%] md:mx-2 lg:w-[32%]">
                        <label
                          htmlFor="age"
                          className="text-[14px] font-semibold text-[#5C5C5C]"
                        >
                          Age
                        </label>
                        <Field
                          id="age"
                          name="age"
                          type="number"
                          onChange={formik.handleChange}
                          value={formik.values.age}
                          placeholder="Enter Age"
                          className={` ${styles.inputFieldCss}`}
                        />
                      </div>

                      <div className="relative mx-0 mt-2 h-[40px] w-[100%] md:mx-2 lg:w-[32%]">
                        <label
                          htmlFor="languages"
                          className="relative bottom-[8px] text-[14px] font-semibold text-[#5C5C5C]"
                        >
                          Languages <span className="text-red-500">*</span>
                        </label>
                        <div className="">
                          <Select
                            options={availableLanguages}
                            onChange={setHandle}
                            isMulti
                          />
                        </div>

                        <div className="mt-4">
                          {languages.map((language, index) => (
                            <div
                              key={index}
                              className="mb-2 mr-2 inline-block rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white"
                            >
                              {language}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* <div className="relative mx-0 mt-2 w-[100%] md:mx-2 lg:w-[32%]">
                        <label
                          htmlFor="languages"
                          className="relative bottom-[8px] text-[14px] font-semibold text-[#5C5C5C]"
                        >
                          Languages <span className="text-red-500">*</span>
                        </label>
                        <div className="custom-multiselect flex w-full flex-wrap">
                          <Multiselect
                            isObject={false}
                            onSelect={(a) => {
                              setLanguages(a);
                            }}
                            onRemove={(a) => {
                              setLanguages(a);
                            }}
                            selectedValues={formik.values.languages}
                            options={availableLanguages}
                            onKeyPressFn={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                              }

                              onSelectLang(e.target.value);
                              return;
                            }}
                            style={{
                              border: "1px solid #000",
                              padding: "10px",
                            }}
                          />

                          <ErrorMessage
                            name="languages"
                            component="div"
                            className="text-error"
                          />

                          <p className="text-error">{langError}</p>
                        </div>
                      </div> */}
                    </div>
                    <div className=" block md:flex ">
                      {/*Branch Of Service  */}
                      <div className="mx-0 mt-2 w-[100%] md:mx-2 lg:w-[32%]">
                        <label
                          htmlFor="branchOfServices"
                          className="text-[14px] font-semibold text-[#5C5C5C]"
                        >
                          Branch of Service{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="branchOfServices"
                          className={`!lg:w-[70%] !placeholder:text-black mb-2 mt-2 !w-full cursor-pointer rounded-lg border !border-gray bg-transparent px-4 py-2 text-black focus:outline-none sm:w-[80%] lg:py-[16px]`}
                          style={{
                            paddingRight: "30px",
                            backgroundImage:
                              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23000000' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>\")",
                            backgroundPosition: "calc(100% - 10px) center",
                            backgroundRepeat: "no-repeat",
                            color: "black",
                            appearance: "none",
                          }}
                          onChange={formik.handleChange}
                        >
                          <option label="Select" />
                          {branchOfServices.map(
                            (option: any, index: number) => (
                              <option
                                key={index}
                                value={option.value}
                                label={option.label}
                              />
                            ),
                          )}
                        </Field>
                        <ErrorMessage
                          name="branchOfServices"
                          component="div"
                          className="text-error"
                        />
                      </div>
                      <div className="mx-0 mt-2 w-[100%] md:mx-2 lg:w-[32%]">
                        <label
                          htmlFor="militaryRank"
                          className="text-[14px] font-semibold text-[#5C5C5C]"
                        >
                          Ranks
                          <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="militaryRank"
                          className={`!lg:w-[70%] !placeholder:text-black mb-2 mt-2 !w-full cursor-pointer rounded-lg border !border-gray bg-transparent px-4 py-2 text-black focus:outline-none sm:w-[80%] lg:py-[16px]`}
                          style={{
                            paddingRight: "30px",
                            backgroundImage:
                              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23000000' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>\")",
                            backgroundPosition: "calc(100% - 10px) center",
                            backgroundRepeat: "no-repeat",
                            color: "black",
                            appearance: "none",
                          }}
                          onChange={formik.handleChange}
                        >
                          <option label="Select" />
                          {ranks.map((option: any, index: number) => (
                            <option
                              key={index}
                              value={option.value}
                              label={option.label}
                            />
                          ))}
                        </Field>
                        <ErrorMessage
                          name="militaryRank"
                          component="div"
                          className="text-error"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-10 flex justify-between">
                  <Button onClick={() => router.push("/profile")}>
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
                          visible={true}
                          strokeWidth={4}
                        />
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
};

export default EditPersonalDetails;
