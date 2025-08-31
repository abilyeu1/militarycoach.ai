// next imports
import Image from "next/image";
// public imports

import edit_icon from "../../../public/assets/edit.svg";
import logo from "../../../public/assets/milcoach-logo-1.svg";

//react imports
import Button from "@/components/atoms/Button";
import React, { useEffect, useState } from "react";
// formik imports
import { ErrorMessage, Field, FormikProvider, useFormik } from "formik";
// types imports

import { Certificate } from "@/types";
//react icons imports

//axios imports
import { URL } from "@/services/API";
import { PUT } from "@/services/API/AxiosRequests";

import { useDimension } from "@/hooks/useDimension";
import { updateUser } from "@/redux/slices/authSlice";

//redux imports
import { useAppSelector } from "@/redux/store/store";
import { useDispatch } from "react-redux";

//next imports
import { useRouter } from "next/router";

import { styles } from "@/styles/style";
import Cookies from "js-cookie";
//react icons
import { HiPlus } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";

import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

//data imports
import { levelOfEducation } from "../data/data";
import { FaHandPointUp } from "react-icons/fa";

const EditEducationForm = () => {
  const [educationErrorMessage, setEducationErrorMessage] =
    useState<string>("");
  const [certificateErrorMessage, setCertificateErrorMessage] =
    useState<string>("");

  const [showAddEducationButton, setShowAddEducationButton] =
    useState<boolean>(false);

  const [showAddCertificateButton, setShowAddCertificateButton] =
    useState<boolean>(false);

  // const certificateField = formik.values.name ? true

  const [workCertificates, setWorkCertificates] = useState<Certificate[]>([]);
  const router = useRouter();
  const [width] = useDimension();
  const [educationEditIndex, setEducationEditIndex] = useState<number>(-1);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userData = useAppSelector((state) => state.auth.user);
  const token = Cookies.get("accessToken");

  const editEducationsData = () => {
    //we are setting values from redux to formik fields
    formik.setFieldValue("educationsFields", userData?.education);
    formik.setFieldValue("certificatesField", userData?.certificates);
  };

  const formik = useFormik({
    initialValues: {
      levelOfEducation: "",
      nameOfInstitution: "",
      degreeAndFieldOfStudy: "",
      name: "",
      nameEdit: "",
      certificatesField: [],
      educationsFields: [],
      levelOfEducationEdit: "",
      AssociatesEdit: "",
      nameOfInstitutionEdit: "",
      degreeAndFieldOfStudyEdit: "",
    },

    onSubmit: async () => {
      setLoader(true);

      try {
        const educationWithUUIDs = formik.values.educationsFields.map(
          (education: any) => ({
            ...education,
            _id: uuidv4(),
          }),
        );

        const certificatesWithUUIDs = formik.values.certificatesField.map(
          (certif: any) => ({
            ...certif,
            _id: uuidv4(),
          }),
        );

        const payload = {
          education: educationWithUUIDs,
          certificates: certificatesWithUUIDs,
        };
        console.log("payload", payload);

        const res = await PUT(URL.USER_EDIT_PROFILE, payload, token);

        console.log("res", res);
        dispatch(updateUser(res.user));

        router.push("/profile");
        setLoader(false);

        toast.success("Education updated successfully... ");
      } catch (error) {
        console.log("error", error);
        setLoader(false);

        toast.error("something went wrong!");
      }
    },
  });

  const formSubmit = (e: any) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleInputChangeEducation = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
  };

  const handleAddEducations = () => {
    if (
      formik.values.levelOfEducation === "" ||
      formik.values.nameOfInstitution === "" ||
      formik.values.degreeAndFieldOfStudy === ""
    ) {
      setEducationErrorMessage("All fields are required");

      return;
    }

    let obj = {
      levelOfEducation: formik.values.levelOfEducation,
      nameOfInstitution: formik.values.nameOfInstitution,
      degreeAndFieldOfStudy: formik.values.degreeAndFieldOfStudy,
    };

    formik.setFieldValue("levelOfEducation", "");
    formik.setFieldValue("nameOfInstitution", "");
    formik.setFieldValue("degreeAndFieldOfStudy", "");
    formik.setFieldValue("educationsFields", [
      ...formik.values.educationsFields,
      obj,
    ]);
  };

  const handleEditChangeEducations = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof typeof formik.values,
  ) => {
    const { value } = event.target;
    formik.setFieldValue(field, value);
  };

  const handleDeleteEducations = (index: any) => {
    formik.setFieldValue(
      "educationsFields",
      formik.values.educationsFields.filter((_, i) => i !== index),
    );
  };

  const handleSaveEditEducations = (index: number) => {
    const updatedEducations = {
      ...userData?.education[index],
      levelOfEducation: formik.values.levelOfEducationEdit,
      nameOfInstitution: formik.values.nameOfInstitutionEdit,
      degreeAndFieldOfStudy: formik.values.degreeAndFieldOfStudyEdit,
    };

    const prevExp = formik.values.educationsFields;
    const p1 = prevExp.slice(0, educationEditIndex);
    const p2 = prevExp.slice(educationEditIndex + 1);
    const final = [...p1, updatedEducations, ...p2];
    formik.setFieldValue("educationsFields", final);

    setEducationEditIndex(-1);
  };

  const handleEditEducation = (index: number) => {
    setEducationEditIndex(index);
    const currentField: any = formik.values.educationsFields[index];
    formik.setFieldValue("levelOfEducationEdit", currentField.levelOfEducation);
    formik.setFieldValue(
      "nameOfInstitutionEdit",
      currentField.nameOfInstitution,
    );
    formik.setFieldValue(
      "degreeAndFieldOfStudyEdit",
      currentField.degreeAndFieldOfStudy,
    );
  };

  const handleCancelEditEducations = (index: number) => {
    setEducationEditIndex(-1);
  };

  // certificates sections starts

  const handleInputChangeCertificate = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
  };

  const handleAddCertificate = () => {
    if (formik.values.name === "") {
      setCertificateErrorMessage("All fields are required");

      return;
    }

    let obj = {
      name: formik.values.name,
    };

    setWorkCertificates((prevCertificate) => [...prevCertificate]);

    formik.setFieldValue("name", "");
    formik.setFieldValue("certificatesField", [
      ...formik.values.certificatesField,
      obj,
    ]);
  };

  const handleEditChangeCertificate = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof typeof formik.values,
  ) => {
    const { value } = event.target;
    formik.setFieldValue(field, value);
  };

  const handleDeleteCertificate = (index: any) => {
    formik.setFieldValue(
      "certificatesField",
      formik.values.certificatesField.filter((_, i) => i !== index),
    );
  };

  const handleSaveEditCertificate = (index: number) => {
    const updatedCertificate = {
      ...userData?.certificates[index],
      name: formik.values.nameEdit,
    };

    const prevExp = formik.values.certificatesField;
    const p1 = prevExp.slice(0, editIndex);
    const p2 = prevExp.slice(editIndex + 1);
    const final = [...p1, updatedCertificate, ...p2];
    formik.setFieldValue("certificatesField", final);

    setEditIndex(-1);
  };

  const handleEditCertificate = (index: number) => {
    setEditIndex(index);
    const currentField: any = formik.values.certificatesField[index];
    formik.setFieldValue("nameEdit", currentField.name);
  };

  const handleCancelEditCertificate = (index: number) => {
    setEditIndex(-1);
  };

  useEffect(() => {
    editEducationsData();
  }, []);

  const allFieldsFilled =
    formik.values.levelOfEducation &&
    formik.values.nameOfInstitution &&
    formik.values.degreeAndFieldOfStudy
      ? true
      : false;

  useEffect(() => {
    if (allFieldsFilled) {
      setShowAddEducationButton(true);
    } else {
      setShowAddEducationButton(false);
    }
  }, [allFieldsFilled]);

  return (
    <>
      <div className="flex min-h-[100vh] flex-col bg-[url('/assets/vectorBg.png')] bg-no-repeat px-4 md:px-0">
        <div className="px-4 md:px-16">
          <div className="my-20 hidden md:block">
            <Image src={logo} alt="logo" width={365} height={300} />
          </div>
          <div className="my:2 mt-4 flex items-center justify-between md:my-10 md:mt-20">
            <div>
              <p className="text-left text-[24px] font-bold md:text-[40px]">
                Education
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Button
                className=" h my-2 flex items-center justify-center bg-primary"
                type="button"
                onClick={handleAddEducations}
              >
                <HiPlus className="mr-2" /> Add Education
              </Button>
            </div>
          </div>

          <FormikProvider value={formik}>
            <form onSubmit={(e) => formSubmit(e)}>
              <div className="mb-10">
                <div className="rounded-xl border border-GrayBorder p-4 shadow-md">
                  <p className="ml-2 text-error">{educationErrorMessage}</p>
                  <div className=" block md:flex ">
                    <div className="mx-0 w-[100%] md:mx-2 lg:w-[32%]">
                      <label
                        htmlFor="levelOfEducation"
                        className="text-[14px] font-semibold text-[#5C5C5C]"
                      >
                        Level Of Education
                      </label>
                      <Field
                        as="select"
                        name="levelOfEducation"
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
                        <option label="Select Education Type" />
                        {levelOfEducation.map((option: any, index: number) => (
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
                        htmlFor="nameOfInstitution"
                        className="text-[14px] font-semibold text-[#5C5C5C]"
                      >
                        Name of Institution
                      </label>
                      <Field
                        id="nameOfInstitution"
                        name="nameOfInstitution"
                        type="text"
                        value={formik.values.nameOfInstitution}
                        placeholder="Enter Name"
                        className={` ${styles.inputFieldCss}`}
                        onChange={formik.handleChange}

                        // onChange={(e: any) => {
                        //   formik.handleChange;
                        //   handleInputChangeEducation(e);
                        // }}
                      />
                      <ErrorMessage
                        name="nameOfInstitution"
                        component="div"
                        className="text-error"
                      />
                    </div>
                    <div className="mx-0 w-[100%] md:mx-2 lg:w-[32%]">
                      <label
                        htmlFor="degreeAndFieldOfStudy"
                        className="text-[14px] font-semibold text-[#5C5C5C]"
                      >
                        Field of study (as applicable)
                      </label>
                      <Field
                        id="degreeAndFieldOfStudy"
                        name="degreeAndFieldOfStudy"
                        type="text"
                        placeholder="For Example Bachelors of Art in History"
                        value={formik.values.degreeAndFieldOfStudy}
                        className={` ${styles.inputFieldCss}`}
                        onChange={formik.handleChange}

                        // onChange={(e: any) => {
                        //   formik.handleChange;
                        //   handleInputChangeEducation(e);
                        // }}
                      />
                      <ErrorMessage
                        name="degreeAndFieldOfStudy"
                        component="div"
                        className="text-error"
                      />
                    </div>
                  </div>

                  <div className="">
                    <div className="flex w-full items-center justify-end">
                      <div className="flex w-full items-end justify-end">
                        <p
                          className={`my-2 transform-gpu text-lg text-primary transition-transform duration-300 focus:outline-none ${
                            showAddEducationButton ? "scale-100" : "scale-0"
                          }`}
                        >
                          Hey! Click Add to save your Education
                        </p>
                        <FaHandPointUp
                          className={`bouncing-image text-primary ${
                            showAddEducationButton
                              ? "opacity-1 scale-100"
                              : "scale-0 opacity-0"
                          }`}
                          size={30}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {formik.values.educationsFields &&
                  formik.values.educationsFields.length > 0 && (
                    <div>
                      {width > 1025 ? (
                        <div className="mt-5 rounded-xl border border-GrayBorder p-4 shadow-md">
                          <p className="mb-5 text-left text-[25px] text-primary">
                            Education
                          </p>

                          <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-3">
                              {" "}
                              <p className="my-1 text-left text-[14px] font-semibold text-[#5C5C5C]">
                                Education Type
                              </p>
                            </div>
                            <div className="col-span-3">
                              {" "}
                              <p className="my-1 text-left text-[14px] font-semibold text-[#5C5C5C]">
                                Name of Institution
                              </p>
                            </div>
                            <div className="col-span-3">
                              {" "}
                              <p className="my-1 text-left text-[14px] font-semibold text-[#5C5C5C]">
                                Field of study (as applicable)
                              </p>
                            </div>

                            <div className="col-span-1"></div>
                          </div>

                          <div className="flex md:block">
                            <div className="grid grid-cols-12 gap-4">
                              {formik.values.educationsFields.map(
                                (educations: any, index: number) => (
                                  <React.Fragment key={index}>
                                    {index === educationEditIndex ? (
                                      <>
                                        <div className="col-span-3 my-1">
                                          <Field
                                            as="select"
                                            name="levelOfEducation"
                                            value={
                                              formik.values.levelOfEducationEdit
                                            }
                                            onChange={(e: any) =>
                                              handleEditChangeEducations(
                                                e,
                                                index,
                                                "levelOfEducationEdit",
                                              )
                                            }
                                            className={`!lg:w-[70%] !placeholder:text-black mb-2 mt-2 !w-full rounded-lg border !border-gray bg-transparent px-4 py-2 text-black focus:outline-none sm:w-[80%] lg:py-[16px]`}
                                            style={{
                                              paddingRight: "30px", // Adjust this value as needed for the desired padding
                                              backgroundImage:
                                                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23000000' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>\")",
                                              backgroundPosition:
                                                "calc(100% - 10px) center",
                                              backgroundRepeat: "no-repeat",
                                              color: "gray",
                                              appearance: "none", // Hide the default dropdown arrow
                                            }}
                                          >
                                            <option label="Education Type" />
                                            {levelOfEducation.map(
                                              (option: any, index: number) => (
                                                <option
                                                  key={index}
                                                  value={option.value}
                                                  label={option.label}
                                                />
                                              ),
                                            )}
                                          </Field>
                                        </div>

                                        <div className="col-span-3 my-1">
                                          <input
                                            className="!placeholder:text-black mb-2 mt-2 w-full rounded-lg border !border-gray bg-transparent px-4 py-4  text-black focus:outline-none"
                                            type="text"
                                            value={
                                              formik.values
                                                .nameOfInstitutionEdit
                                            }
                                            onChange={(e) =>
                                              handleEditChangeEducations(
                                                e,
                                                index,
                                                "nameOfInstitutionEdit",
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="col-span-3 my-1">
                                          <input
                                            className="!placeholder:text-black mb-2 mt-2 w-full rounded-lg border !border-gray bg-transparent px-4 py-4  text-black focus:outline-none"
                                            type="text"
                                            value={
                                              formik.values
                                                .degreeAndFieldOfStudyEdit
                                            }
                                            onChange={(e) =>
                                              handleEditChangeEducations(
                                                e,
                                                index,
                                                "degreeAndFieldOfStudyEdit",
                                              )
                                            }
                                          />
                                        </div>

                                        <div className="col-span-3 my-1 flex items-center">
                                          <Button
                                            className="mx-1 bg-primary"
                                            onClick={() =>
                                              handleSaveEditEducations(index)
                                            }
                                          >
                                            Save
                                          </Button>
                                          <Button
                                            className="mx-1 bg-primary"
                                            onClick={() =>
                                              handleCancelEditEducations(index)
                                            }
                                          >
                                            Cancel
                                          </Button>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="col-span-12 lg:col-span-3">
                                          <p className="my-1 max-w-[110px] truncate md:max-w-[200px]">
                                            {educations.levelOfEducation}
                                          </p>
                                        </div>
                                        <div className="col-span-12 lg:col-span-3">
                                          <p className="my-1 max-w-[110px] truncate md:max-w-[200px]">
                                            {educations.nameOfInstitution}
                                          </p>
                                        </div>
                                        <div className="col-span-12 lg:col-span-3">
                                          <p className="my-1 max-w-[110px] truncate md:max-w-[200px]">
                                            {educations.degreeAndFieldOfStudy}
                                          </p>
                                        </div>

                                        <div className="flex ">
                                          <Image
                                            src={edit_icon}
                                            alt="edit button"
                                            width={24}
                                            height={24}
                                            onClick={() =>
                                              handleEditEducation(index)
                                            }
                                            className="cursor-pointer"
                                          />

                                          <RiDeleteBinLine
                                            className="mx-1 my-2 cursor-pointer text-[24px] text-primary"
                                            onClick={() =>
                                              handleDeleteEducations(index)
                                            }
                                          />
                                        </div>
                                      </>
                                    )}
                                  </React.Fragment>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-5 rounded-xl border border-GrayBorder p-4 shadow-md">
                          <p className="mb-5 text-left text-[25px] text-primary">
                            Education
                          </p>

                          <div className="grid grid-cols-3 gap-4">
                            {formik.values.educationsFields.map(
                              (educations: any, index: number) => (
                                <React.Fragment key={index}>
                                  {index === educationEditIndex ? (
                                    <>
                                      <div className="col-span-12">
                                        <div className="my-1">
                                          <Field
                                            as="select"
                                            name="levelOfEducation"
                                            value={
                                              educations.levelOfEducationEdit
                                            }
                                            onChange={(e: any) =>
                                              handleEditChangeEducations(
                                                e,
                                                index,
                                                "levelOfEducationEdit",
                                              )
                                            }
                                            className={`!lg:w-[70%] !placeholder:text-black mb-2 mt-2 !w-full rounded-lg border !border-gray bg-transparent px-4 py-2 text-black focus:outline-none sm:w-[80%] lg:py-[16px]`}
                                            style={{
                                              paddingRight: "30px", // Adjust this value as needed for the desired padding
                                              backgroundImage:
                                                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23000000' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>\")",
                                              backgroundPosition:
                                                "calc(100% - 10px) center",
                                              backgroundRepeat: "no-repeat",
                                              color: "gray",
                                              appearance: "none", // Hide the default dropdown arrow
                                            }}
                                          >
                                            <option label="Education Type" />
                                            {levelOfEducation.map(
                                              (option: any, index: number) => (
                                                <option
                                                  key={index}
                                                  value={option.value}
                                                  label={option.label}
                                                />
                                              ),
                                            )}
                                          </Field>
                                        </div>

                                        <div className="my-1 ">
                                          <input
                                            className="!placeholder:text-black mb-2 mt-2 w-full rounded-lg border !border-gray bg-transparent px-4 py-4  text-black focus:outline-none"
                                            type="text"
                                            value={
                                              formik.values
                                                .nameOfInstitutionEdit
                                            }
                                            onChange={(e) =>
                                              handleEditChangeEducations(
                                                e,
                                                index,
                                                "nameOfInstitutionEdit",
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="my-1 ">
                                          <input
                                            className="!placeholder:text-black mb-2 mt-2 w-full rounded-lg border !border-gray bg-transparent px-4 py-4  text-black focus:outline-none"
                                            type="text"
                                            value={
                                              formik.values
                                                .degreeAndFieldOfStudyEdit
                                            }
                                            onChange={(e) =>
                                              handleEditChangeEducations(
                                                e,
                                                index,
                                                "degreeAndFieldOfStudyEdit",
                                              )
                                            }
                                          />
                                        </div>

                                        <div className="col-span-1 my-1 flex w-full items-center">
                                          <Button
                                            className="mx-1 bg-primary"
                                            onClick={() =>
                                              handleSaveEditEducations(index)
                                            }
                                          >
                                            Save
                                          </Button>
                                          <Button
                                            className="mx-1 bg-primary"
                                            onClick={() =>
                                              handleCancelEditEducations(index)
                                            }
                                          >
                                            Cancel
                                          </Button>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div>
                                        <div className="col-span-2">
                                          {" "}
                                          <p className="my-1 text-left text-[14px] font-semibold text-[#5C5C5C]">
                                            Education Type
                                          </p>
                                        </div>
                                        <div className="col-span-2">
                                          {" "}
                                          <p className="my-1 text-left text-[14px] font-semibold text-[#5C5C5C]">
                                            Name of institute
                                          </p>
                                        </div>
                                        <div className="col-span-2">
                                          {" "}
                                          <p className="my-1 text-left text-[14px] font-semibold text-[#5C5C5C]">
                                            Field of study (as applicable)
                                          </p>
                                        </div>
                                      </div>

                                      <div>
                                        <div className="col-span-3">
                                          <p className="my-1 max-w-[110px] truncate md:max-w-[200px]">
                                            {educations.levelOfEducation}
                                          </p>
                                        </div>
                                        <div className="col-span-3">
                                          <p className="my-1 max-w-[110px] truncate md:max-w-[200px]">
                                            {educations.nameOfInstitution}
                                          </p>
                                        </div>
                                        <div className="col-span-3">
                                          <p className="my-1 max-w-[110px] truncate md:max-w-[200px]">
                                            {educations.degreeAndFieldOfStudy}
                                          </p>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex">
                                          <Image
                                            src={edit_icon}
                                            alt="edit button"
                                            width={24}
                                            height={24}
                                            onClick={() =>
                                              handleEditEducation(index)
                                            }
                                            className="cursor-pointer"
                                          />

                                          <RiDeleteBinLine
                                            className="mx-1 my-2 cursor-pointer text-[24px] text-primary"
                                            onClick={() =>
                                              handleDeleteEducations(index)
                                            }
                                          />
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </React.Fragment>
                              ),
                            )}
                          </div>

                          <div className="flex md:block">
                            <div className="grid grid-cols-12 gap-4"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                {/* certificates starts */}

                <div className="certificates">
                  <div className="mt-5">
                    <p className=" mb-0 text-left text-[24px] font-bold sm:mb-10 md:text-[40px]">
                      Certificates
                    </p>
                  </div>

                  <div className="rounded-xl border border-GrayBorder p-4 shadow-md">
                    <p className="ml-2 text-error">{certificateErrorMessage}</p>

                    <div className=" block items-end md:flex">
                      <div className="mx-0 w-[100%] md:mx-2 lg:w-[32%]">
                        <label
                          htmlFor="name"
                          className="text-[14px] font-semibold text-[#5C5C5C]"
                        >
                          Certificate
                        </label>

                        <Field
                          id="name"
                          name="name"
                          type="text"
                          value={formik.values.name}
                          placeholder="Enter Name"
                          className={` ${styles.inputFieldCss}`}
                          onChange={formik.handleChange}
                          // onChange={(e: any) => {
                          //   formik.handleChange;
                          //   handleInputChangeCertificate(e);
                          // }}
                          onKeyDown={(e: any) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (!workCertificates) {
                                return;
                              }
                              handleAddCertificate();
                            }
                          }}
                        />
                        <ErrorMessage
                          name="nameOfInstitution"
                          component="div"
                          className="text-error"
                        />
                      </div>
                      <div>
                        <Button
                          className=" h my-2 flex items-center justify-center bg-primary"
                          onClick={handleAddCertificate}
                          type="button"
                        >
                          <HiPlus className="mr-2" /> Add Certificates
                        </Button>
                      </div>
                    </div>
                  </div>

                  {formik.values.certificatesField &&
                    formik.values.certificatesField.length > 0 && (
                      <div className="mt-5 rounded-xl border border-GrayBorder p-4 shadow-md">
                        <p className="mb-5 text-left text-[25px] text-primary">
                          Certificate
                        </p>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-3">
                            <div>
                              {formik.values.certificatesField.map(
                                (cert: any, index: number) => (
                                  <div
                                    className="mt-2 block justify-between md:flex"
                                    key={index}
                                  >
                                    {index === editIndex ? (
                                      <>
                                        <div className="my-1">
                                          <input
                                            className="!placeholder:text-black mb-2 mt-2 w-full rounded-lg border !border-gray bg-transparent px-4 py-4  text-black focus:outline-none"
                                            type="text"
                                            value={formik.values.nameEdit}
                                            onChange={(e) =>
                                              handleEditChangeCertificate(
                                                e,
                                                index,
                                                "nameEdit",
                                              )
                                            }
                                          />
                                        </div>

                                        <div className="flex items-center">
                                          <Button
                                            className="mx-1 bg-primary px-[20px] lg:px-6"
                                            onClick={() =>
                                              handleSaveEditCertificate(index)
                                            }
                                          >
                                            Save
                                          </Button>
                                          <Button
                                            className="mx-1 bg-primary px-[20px] lg:px-6"
                                            onClick={() =>
                                              handleCancelEditCertificate(index)
                                            }
                                          >
                                            Cancel
                                          </Button>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div>
                                          <p>Certificate {index + 1}</p>
                                        </div>
                                        <div>
                                          <p className="my-1 max-w-[110px] truncate md:max-w-[200px]">
                                            {cert.name}
                                          </p>
                                        </div>
                                        <div className="flex">
                                          <Image
                                            src={edit_icon}
                                            alt="edit button"
                                            width={24}
                                            height={24}
                                            onClick={() =>
                                              handleEditCertificate(index)
                                            }
                                            className="cursor-pointer"
                                          />

                                          <RiDeleteBinLine
                                            className="mx-1 my-2 cursor-pointer text-[24px] text-primary"
                                            onClick={() =>
                                              handleDeleteCertificate(index)
                                            }
                                          />
                                        </div>
                                      </>
                                    )}
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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

                {/* certificates end */}
              </div>
            </form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
};

export default EditEducationForm;
