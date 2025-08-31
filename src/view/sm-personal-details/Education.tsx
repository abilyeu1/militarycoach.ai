import Button from "@/components/atoms/Button";

// types imports

// formik imports
import { ErrorMessage, Field } from "formik";
// next imports

import Image from "next/image";
// react imports
import React, { FC, useEffect, useState } from "react";
// react icons imports

import { BiEditAlt } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
// public imports

import edit_icon from "../../../public/assets/edit.svg";
import { useRouter } from "next/router";
import { useDimension } from "@/hooks/useDimension";
import { styles } from "@/styles/style";
import { EducationProps } from "@/types/signUpFormTypes";
import { TailSpin } from "react-loader-spinner";
import { FaHandPointUp } from "react-icons/fa";

const Education: FC<EducationProps> = ({
  handleInputChange,
  levelOfEducation,
  educations,
  editIndex,
  educationsEditIndex,
  handleEditChange,
  handleSaveEdit,
  handleCancelEdit,
  handleEdit,
  handleDelete,
  handleStepClick,
  handleAddEducation,

  handleAddCertificate,
  handleInputChangeCertificate,
  certificates,
  handleEditCertificate,
  handleSaveEditCertificate,
  handleCancelEditCertificate,
  handleDeleteCertificate,
  handleEditChangeCertificate,
  formik,
  educationErrorMessage,
  certificateErrorMessage,
  formSubmissionLoader,
}) => {
  const [width] = useDimension();

  const [showAddEducationButton, setShowAddEducationButton] =
    useState<boolean>(false);

  const [showAddCertificateButton, setShowAddCertificateButton] =
    useState<boolean>(false);

  // const certificateField = formik.values.name ? true

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
      <div className="mt-20">
        <div className="mb-0 flex items-center justify-between sm:mb-5">
          <p className="mb-0 text-left text-[24px]  font-bold md:text-[40px]">
            Education
          </p>

          <Button
            className="my-2 flex h-[40px] items-center justify-center bg-primary"
            onClick={handleAddEducation}
            type="button"
          >
            <HiPlus className="mr-2" /> Add Education
          </Button>
        </div>

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
              >
                <option label="Education Type" />
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
                //   handleInputChange(e);
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
                Field of study
              </label>
              <Field
                id="degreeAndFieldOfStudy"
                name="degreeAndFieldOfStudy"
                type="text"
                placeholder="For Example, Mathematics"
                value={formik.values.degreeAndFieldOfStudy}
                className={` ${styles.inputFieldCss}`}
                onChange={formik.handleChange}

                // onChange={(e: any) => {
                //   formik.handleChange;
                //   handleInputChange(e);
                // }}
              />
              <ErrorMessage
                name="degreeAndFieldOfStudy"
                component="div"
                className="text-error"
              />
            </div>
          </div>

          <div className="block md:flex">
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

        {educations && educations.length > 0 && (
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
                    {educations.map((educations: any, index: number) => (
                      <React.Fragment key={index}>
                        {index === educationsEditIndex ? (
                          <>
                            <div className="col-span-3 my-1">
                              <Field
                                as="select"
                                name="levelOfEducation"
                                value={educations.levelOfEducation}
                                onChange={(e: any) =>
                                  handleEditChange(e, index, "levelOfEducation")
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
                                value={educations.nameOfInstitution}
                                onChange={(e) =>
                                  handleEditChange(
                                    e,
                                    index,
                                    "nameOfInstitution",
                                  )
                                }
                              />
                            </div>
                            <div className="col-span-3 my-1">
                              <input
                                className="!placeholder:text-black mb-2 mt-2 w-full rounded-lg border !border-gray bg-transparent px-4 py-4  text-black focus:outline-none"
                                type="text"
                                value={educations.degreeAndFieldOfStudy}
                                onChange={(e) =>
                                  handleEditChange(
                                    e,
                                    index,
                                    "degreeAndFieldOfStudy",
                                  )
                                }
                              />
                            </div>

                            <div className="col-span-1 my-1 flex items-center">
                              <Button
                                className="mx-1 bg-primary"
                                onClick={() => handleSaveEdit(index)}
                              >
                                Save
                              </Button>
                              <Button
                                className="mx-1 bg-primary"
                                onClick={() => handleCancelEdit(index)}
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

                            <div className="flex justify-end">
                              <Image
                                src={edit_icon}
                                alt="edit button"
                                width={24}
                                height={24}
                                onClick={() => handleEdit(index)}
                                className="cursor-pointer"
                              />

                              <RiDeleteBinLine
                                className="mx-1 my-2 ml-3 cursor-pointer text-[24px] text-primary"
                                onClick={() => handleDelete(index)}
                              />
                            </div>
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-GrayBorder p-4 shadow-md">
                <p className="mb-5 text-left text-[25px] text-primary">
                  Education
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {educations.map((educations: any, index: number) => (
                    <React.Fragment key={index}>
                      {index === educationsEditIndex ? (
                        <>
                          <div className="col-span-12">
                            <div className="my-1">
                              <Field
                                as="select"
                                name="levelOfEducation"
                                value={educations.levelOfEducation}
                                onChange={(e: any) =>
                                  handleEditChange(e, index, "levelOfEducation")
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
                                value={educations.nameOfInstitution}
                                onChange={(e) =>
                                  handleEditChange(
                                    e,
                                    index,
                                    "nameOfInstitution",
                                  )
                                }
                              />
                            </div>
                            <div className="my-1 ">
                              <input
                                className="!placeholder:text-black mb-2 mt-2 w-full rounded-lg border !border-gray bg-transparent px-4 py-4  text-black focus:outline-none"
                                type="text"
                                value={educations.degreeAndFieldOfStudy}
                                onChange={(e) =>
                                  handleEditChange(
                                    e,
                                    index,
                                    "degreeAndFieldOfStudy",
                                  )
                                }
                              />
                            </div>

                            <div className="col-span-1 my-1 flex w-full items-center">
                              <Button
                                className="mx-1 bg-primary"
                                onClick={() => handleSaveEdit(index)}
                              >
                                Save
                              </Button>
                              <Button
                                className="mx-1 bg-primary"
                                onClick={() => handleCancelEdit(index)}
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
                              <p className="my-4 text-left text-[14px] font-semibold text-[#5C5C5C]">
                                Education Type
                              </p>
                            </div>
                            <div className="col-span-2">
                              {" "}
                              <p className="my-4 text-left text-[14px] font-semibold text-[#5C5C5C]">
                                Name of institute
                              </p>
                            </div>
                            <div className="col-span-2">
                              {" "}
                              <p className="my-4 text-left text-[14px] font-semibold text-[#5C5C5C]">
                                Field of study
                              </p>
                            </div>
                          </div>

                          <div>
                            <div className="col-span-3">
                              <p className="my-4 max-w-[110px] truncate md:max-w-[200px]">
                                {educations.levelOfEducation}
                              </p>
                            </div>
                            <div className="col-span-3">
                              <p className="my-4 max-w-[110px] truncate md:max-w-[200px]">
                                {educations.nameOfInstitution}
                              </p>
                            </div>
                            <div className="col-span-3">
                              <p className="my-4 max-w-[110px] truncate md:max-w-[200px]">
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
                                onClick={() => handleEdit(index)}
                                className="cursor-pointer"
                              />

                              <RiDeleteBinLine
                                className="mx-1 my-2 cursor-pointer text-[24px] text-primary"
                                onClick={() => handleDelete(index)}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex md:block">
                  <div className="grid grid-cols-12 gap-4"></div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* certificates */}

        <div>
          <p className="mb-0 mt-2 text-left text-[24px] font-bold sm:mb-10 md:text-[40px]">
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
                Certificates
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                placeholder="Enter Certificate"
                className={` ${styles.inputFieldCss}`}
                onChange={(e: any) => {
                  handleInputChangeCertificate(e);
                }}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (!certificates) {
                      return;
                    }
                    handleAddCertificate();
                  }
                }}
              />
              <ErrorMessage
                name="name"
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

        {certificates && certificates.length > 0 && (
          <div className="mt-5 rounded-xl border border-GrayBorder p-4 shadow-md">
            <p className="mb-5 text-left text-[25px] text-primary">
              Certificate
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <div>
                  {certificates.map((cert: any, index: number) => (
                    <div className="flex justify-between " key={index}>
                      {index === editIndex ? (
                        <>
                          <div className="my-1">
                            <input
                              className="!placeholder:text-black mb-2 mt-2 w-full rounded-lg border !border-gray bg-transparent px-4 py-4  text-black focus:outline-none"
                              type="text"
                              value={cert.name}
                              onChange={(e) =>
                                handleEditChangeCertificate(e, index, "name")
                              }
                            />
                          </div>

                          <div className="flex items-center">
                            <Button
                              className="mx-1 w-full bg-primary px-[10px] lg:px-6"
                              onClick={() => handleSaveEditCertificate(index)}
                            >
                              Save
                            </Button>
                            <Button
                              className=" mx-1 bg-primary px-[10px] lg:px-6"
                              onClick={() => handleCancelEditCertificate(index)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <p className="my-4">Certificate {index + 1}</p>
                          </div>
                          <div>
                            <p className="my-4 max-w-[110px] truncate md:max-w-[200px] ">
                              {cert.name}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Image
                              src={edit_icon}
                              alt="edit button"
                              width={24}
                              height={24}
                              onClick={() => handleEditCertificate(index)}
                              className="cursor-pointer"
                            />

                            <RiDeleteBinLine
                              className="mx-1 my-2 ml-3 cursor-pointer text-[24px] text-primary"
                              onClick={() => handleDeleteCertificate(index)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-between">
          <div>
            <Button
              className="flex cursor-pointer items-center rounded-lg bg-primary px-4 py-2 font-bold tracking-[3.5px] text-white"
              type="submit"
            >
              {formSubmissionLoader ? "Registering..." : "Skip"}
            </Button>
          </div>
          <div className="flex ">
            {width < 1024 ? (
              <div className="flex">
                <div>
                  <button
                    onClick={() => handleStepClick(1)}
                    className="flex items-center rounded-lg bg-primary px-4 py-3 font-bold text-white"
                  >
                    <BsArrowLeft className="mr-2 font-bold text-white" />
                  </button>
                </div>
                <div>
                  <button
                    type="submit"
                    className="ml-2 flex items-center rounded-lg bg-primary px-4 py-2 font-bold text-white"
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex">
                <div className="mx-2 flex items-center">
                  <button
                    onClick={() => handleStepClick(1)}
                    className="flex items-center rounded-lg border border-primary px-4 py-2 font-bold text-primary"
                  >
                    <BsArrowLeft className="mr-2 font-bold text-primary" />
                    Previous
                  </button>
                </div>
                <div className="flex items-center ">
                  <Button
                    type="submit"
                    className="flex items-center rounded-lg bg-primary px-4 py-2 font-bold text-white"
                  >
                    {formSubmissionLoader ? (
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
                      "Submit"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Education;
