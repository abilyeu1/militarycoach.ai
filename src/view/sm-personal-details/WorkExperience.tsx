// atoms imports

import Button from "@/components/atoms/Button";

// formik imports

import { ErrorMessage, Field } from "formik";
// next imports

import Image from "next/image";
// react imports

import React, { FC, useEffect, useState } from "react";
// react icons imports

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";

// public imports

import edit_icon from "../../../public/assets/edit.svg";

// types imports
import { WorkExperienceProps } from "@/types/signUpFormTypes";

// react-select imports
import { industryOfInterest, jobPositionLevel } from "../data/data";
import { useDimension } from "@/hooks/useDimension";
// styles imports
import { styles } from "@/styles/style";
// react icons
import { RxCross2 } from "react-icons/rx";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { FaHandPointUp } from "react-icons/fa";

const WorkExperience: FC<WorkExperienceProps> = ({
  handleAddExperience,
  editIndex,
  handleEditChange,
  handleSaveEdit,
  handleCancelEdit,
  handleEdit,
  handleDelete,
  handleStepClick,
  formik,
  errorMessage,
  inputValueSkillsEdit,
  chips,
  inputValue,
  handleInputChanges,
  handleInputKeyPress,
  handleChipDelete,
  handleInputClickSkills,
}) => {
  const [width] = useDimension();

  const [showAddExperienceButton, setShowAddExperienceButton] = useState(false);

  const allFieldsFilled =
    formik.values.careerField &&
    formik.values.jobTitle &&
    formik.values.skillsInCareerField?.length > 0
      ? true
      : false;

  useEffect(() => {
    if (allFieldsFilled) {
      setShowAddExperienceButton(true);
    } else {
      setShowAddExperienceButton(false);
    }
  }, [allFieldsFilled]);

  return (
    <>
      <div className="mt-20">
        <div>
          <div className="mb-0 flex items-center justify-between sm:mb-5">
            <p className="mb-0 text-left text-[24px]  font-bold md:text-[40px]">
              Work Experience
            </p>
          </div>

          <div className="rounded-xl border border-GrayBorder p-4 shadow-md">
            <div className="flex justify-between">
              <div>
                <p className="ml-2 text-error">{errorMessage}</p>
              </div>
              <div>
                <Button
                  className="mb-5 mt-2 flex h-[40px] items-center justify-center bg-primary"
                  onClick={handleAddExperience}
                  type="button"
                >
                  <HiPlus className="mr-2" /> Add Career
                </Button>
              </div>
            </div>
            <div className=" block md:flex ">
              <div className="mx-0 w-[100%] md:mx-2 lg:w-[32%]">
                <label
                  htmlFor="careerField"
                  className="text-[14px] font-semibold text-[#5C5C5C]"
                >
                  Career Field <span className="text-red-500">*</span>
                </label>
                <Field
                  id="careerField"
                  name="careerField"
                  value={formik.values.careerField}
                  type="text"
                  placeholder="Enter Career"
                  className={` ${styles.inputFieldCss}`}
                  onChange={formik.handleChange}
                />
                <ErrorMessage
                  name="careerField"
                  component="div"
                  className="text-error"
                />
              </div>
              <div className="mx-0 w-[100%] md:mx-2 lg:w-[40%]">
                <label
                  htmlFor="jobTitle"
                  className="text-[14px] font-semibold text-[#5C5C5C]"
                >
                  Job Title/Position <span className="text-red-500">*</span>
                </label>
                <Field
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  placeholder="Enter Job Title"
                  value={formik.values.jobTitle}
                  className={` ${styles.inputFieldCss}`}
                  onChange={formik.handleChange}
                />
                <ErrorMessage
                  name="jobTitle"
                  component="div"
                  className="text-error"
                />
              </div>

              <div className="mx-0 w-[100%] md:mx-2 lg:w-[32%]">
                <label
                  htmlFor="skillsInCareerField"
                  className="text-[14px] font-semibold text-[#5C5C5C]"
                >
                  Skills Leveraged in Career Field{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChanges(e, "normal")}
                    onKeyDown={(e) => handleInputKeyPress(e, "normal")}
                    placeholder="Input skill and press “Return” to add"
                    className={`${styles.inputFieldCss}`}
                  />

                  <div className="flex w-full justify-end">
                    <div
                      className="flex  cursor-pointer items-center rounded-lg bg-primary p-2 text-white"
                      onClick={(e) => handleInputClickSkills(e, "normal")}
                    >
                      <HiPlus className="mb-2 mr-2" /> Add Skills
                    </div>
                  </div>
                  {chips.map((chip: any, index: number) => (
                    <div
                      key={index}
                      className="m-1 flex items-center rounded-full bg-[#E7FBD4] p-2 px-3 text-white"
                    >
                      <p className="text-black"> {chip.text} </p>

                      <RxCross2
                        onClick={() => handleChipDelete(chip, "normal")}
                        className="ml-2 cursor-pointer rounded-full bg-slate-400 text-[20px] font-semibold  text-white focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex w-full items-center justify-end">
              <p
                className={`my-2 transform-gpu text-lg text-primary transition-transform duration-300 focus:outline-none ${
                  showAddExperienceButton ? "scale-100" : "scale-0"
                }`}
              >
                Hey! Click Add to save your experience
              </p>
              <FaHandPointUp
                className={`bouncing-image text-primary ${
                  showAddExperienceButton
                    ? "opacity-1 scale-100"
                    : "scale-0 opacity-0"
                }`}
                size={30}
              />
            </div>
          </div>
        </div>

        {formik.values.experience?.length > 0 && (
          <div>
            {width > 1025 ? (
              <div className="mt-20 rounded-xl border border-GrayBorder p-4 shadow-md">
                <div className="flex justify-between">
                  <p className="mb-5 text-left text-[25px] text-primary">
                    Work Experience
                  </p>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3">
                    {" "}
                    <p className="my-3 text-left text-[14px] font-semibold text-[#5C5C5C]">
                      Career Field
                    </p>
                  </div>
                  <div className="col-span-3">
                    {" "}
                    <p className="my-3 text-left text-[14px] font-semibold text-[#5C5C5C]">
                      Job Title/Position
                    </p>
                  </div>

                  <div className="col-span-4">
                    {" "}
                    <p className="my-1 ml-3 text-left text-[14px] font-semibold text-[#5C5C5C]">
                      Skills
                    </p>
                  </div>
                  <div className="col-span-1"></div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  {formik.values.experience.map(
                    (experience: any, index: number) => (
                      <React.Fragment key={index}>
                        {index === editIndex ? (
                          <>
                            <div className="col-span-3 my-1">
                              <input
                                className="!placeholder:text-black  mb-2 mt-2 w-full rounded-lg border !border-gray bg-transparent px-4 py-4  text-black focus:outline-none"
                                type="text"
                                value={formik.values.careerfieldEdit}
                                onChange={(e) =>
                                  handleEditChange(e, index, "careerfieldEdit")
                                }
                              />
                              <ErrorMessage
                                name="careerfieldEdit"
                                component="div"
                                className="text-error"
                              />
                            </div>
                            <div className="col-span-3 my-1">
                              <input
                                className="!placeholder:text-black  mb-2 mt-2 w-full rounded-lg border !border-gray bg-transparent px-4 py-4  text-black focus:outline-none"
                                type="text"
                                value={formik.values.jobTitleEdit}
                                onChange={(e) =>
                                  handleEditChange(e, index, "jobTitleEdit")
                                }
                              />
                              <ErrorMessage
                                name="jobTitleEdit"
                                component="div"
                                className="text-error"
                              />
                            </div>

                            <div className="col-span-3 my-1 w-full">
                              <div className="flex flex-wrap">
                                <input
                                  type="text"
                                  value={inputValueSkillsEdit}
                                  onChange={handleInputChanges}
                                  onKeyPress={handleInputKeyPress}
                                  placeholder="Enter SKills"
                                  className={`${styles.inputFieldCss}`}
                                />

                                {formik.errors
                                  .skillsLeveragedInCareerFieldEdit && (
                                  <p className="text-error">
                                    Skills are required
                                  </p>
                                )}
                                {formik.values.skillsLeveragedInCareerFieldEdit.map(
                                  (chip: any, index: number) => {
                                    return (
                                      <div
                                        key={index}
                                        className="m-1 flex items-center rounded-full bg-[#E7FBD4] p-2 px-3 text-white"
                                      >
                                        <p className="text-black">
                                          {" "}
                                          {chip.text}{" "}
                                        </p>

                                        <RxCross2
                                          onClick={() => handleChipDelete(chip)}
                                          className="ml-2 cursor-pointer rounded-full bg-slate-400 text-[20px] font-semibold  text-white focus:outline-none"
                                        />
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                            <div className="col-span-2 my-1 mt-3 block w-full md:flex">
                              <Button
                                className="mx-1 h-fit bg-primary"
                                onClick={() => handleSaveEdit(index)}
                              >
                                Save
                              </Button>
                              <Button
                                className="mx-1 h-fit bg-primary"
                                onClick={() => handleCancelEdit()}
                              >
                                Cancel
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-span-12 lg:col-span-3">
                              <p className="my-1 block text-left  text-[14px] font-semibold text-[#5C5C5C] lg:hidden">
                                Career
                              </p>
                              <p className="my-1 max-w-[110px] truncate md:max-w-[200px]">
                                {experience.careerField}
                              </p>
                            </div>
                            <div className=" col-span-12 lg:col-span-3 ">
                              <p className="my-1 block text-left  text-[14px] font-semibold text-[#5C5C5C] lg:hidden">
                                Job Position
                              </p>
                              <p className="my-1 max-w-[110px] truncate md:max-w-[350px]">
                                {experience.jobTitle}
                              </p>
                            </div>

                            <div className="col-span-12 lg:col-span-4">
                              <p className="my-1 block text-left  text-[14px] font-semibold text-[#5C5C5C] lg:hidden">
                                Skills
                              </p>
                              <div className=" md:grid-cols-3">
                                <div className="flex flex-wrap">
                                  {experience.skillsLeveragedInCareerField.map(
                                    (chip: any, index: number) => (
                                      <div
                                        key={index}
                                        className="m-1 flex items-center rounded-full bg-[#E7FBD4] p-2 px-3 text-white"
                                      >
                                        <p className="text-black">
                                          {" "}
                                          {chip.text}{" "}
                                        </p>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-span-12 items-baseline justify-end md:flex lg:col-span-2">
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
                    ),
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-20 rounded-xl border border-GrayBorder p-4 shadow-md">
                <p className="mb-5 text-left text-[25px] text-primary">
                  Work Experience
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {formik.values.experience.map(
                    (experience: any, index: number) => (
                      <React.Fragment key={index}>
                        {index === editIndex ? (
                          <>
                            <div className="col-span-2 my-1">
                              <input
                                className="!placeholder:text-black  mb-2 mt-2 w-full rounded-lg border !border-gray bg-transparent px-4 py-4  text-black focus:outline-none"
                                type="text"
                                value={formik.values.careerfieldEdit}
                                onChange={(e) =>
                                  handleEditChange(e, index, "careerfieldEdit")
                                }
                              />
                            </div>
                            <div className="col-span-2 my-1">
                              <input
                                className="!placeholder:text-black  mb-2 mt-2 w-full rounded-lg border !border-gray bg-transparent px-4 py-4  text-black focus:outline-none"
                                type="text"
                                value={formik.values.jobTitleEdit}
                                onChange={(e) =>
                                  handleEditChange(e, index, "jobTitleEdit")
                                }
                              />
                            </div>

                            <div className="col-span-2 my-1 w-full">
                              <div className="flex flex-wrap">
                                <input
                                  type="text"
                                  value={inputValueSkillsEdit}
                                  onChange={handleInputChanges}
                                  onKeyPress={handleInputKeyPress}
                                  placeholder="Enter SKills"
                                  className={`${styles.inputFieldCss}`}
                                />

                                <div className="flex w-full justify-end">
                                  <HiPlus
                                    onClick={(e) =>
                                      handleInputClickSkills(e, "normal")
                                    }
                                    className="block h-[30px] w-[40px] cursor-pointer rounded-lg bg-primary p-2 text-white md:hidden"
                                  />
                                </div>
                                {formik.values.skillsLeveragedInCareerFieldEdit.map(
                                  (chip: any, index: number) => {
                                    return (
                                      <div
                                        key={index}
                                        className="m-1 flex items-center rounded-full bg-[#E7FBD4] p-2 px-3 text-white"
                                      >
                                        <p className="text-black">
                                          {" "}
                                          {chip.text}{" "}
                                        </p>

                                        <RxCross2
                                          onClick={() => handleChipDelete(chip)}
                                          className="ml-2 cursor-pointer rounded-full bg-slate-400 text-[20px] font-semibold  text-white focus:outline-none"
                                        />
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                            <div className="col-span-1 my-1 w-full md:flex">
                              <Button
                                className="mx-1 h-fit w-full bg-primary"
                                onClick={() => handleSaveEdit(index)}
                              >
                                Save
                              </Button>
                              <Button className="mx-1 my-1 h-fit w-full bg-primary">
                                Cancel
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <div className="col-span-2">
                                {" "}
                                <p className="my-4 text-left text-[14px] font-semibold text-[#5C5C5C]">
                                  Career
                                </p>
                              </div>
                              <div className="col-span-2">
                                {" "}
                                <p className="my-4 text-left text-[14px] font-semibold text-[#5C5C5C]">
                                  Job Position
                                </p>
                              </div>

                              <div className="col-span-4">
                                {" "}
                                <p className="my-4 text-left text-[14px] font-semibold text-[#5C5C5C]">
                                  Skills
                                </p>
                              </div>
                              <div className="col-span-1"></div>
                            </div>
                            <div>
                              <div className=" col-span-12 lg:col-span-2 ">
                                <p className="my-4 max-w-[110px] truncate md:max-w-[200px]">
                                  {experience.careerField}
                                </p>
                              </div>
                              <div className=" col-span-12 lg:col-span-2 ">
                                <p className="my-4 max-w-[110px] truncate md:max-w-[200px]">
                                  {experience.jobTitle}
                                </p>
                              </div>

                              <div className=" block md:grid md:grid-cols-3">
                                <div className="flex flex-wrap">
                                  {experience.skillsLeveragedInCareerField.map(
                                    (chip: any, index: number) => (
                                      <div
                                        key={index}
                                        className="m-1 flex items-center rounded-[10px] bg-[#E7FBD4] p-2 px-3 text-white"
                                      >
                                        <p className="text-black">
                                          {" "}
                                          {chip.text}{" "}
                                        </p>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="h-[40px]">
                              <div className="col-span-12 flex items-baseline justify-end lg:col-span-2 ">
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
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-5 rounded-xl border border-GrayBorder px-4 py-8 shadow-md md:mt-20">
          <div className=" mb-0 items-center md:mb-10">
            <p className="text-left text-[20px] font-bold md:text-[40px]">
              Career Aspirations
            </p>
            <p className="text-[18px] font-bold text-primary">
              If you are not sure what you want to do, you can leave this blank
            </p>
          </div>
          <div className=" block md:flex">
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
              <input
                type="text"
                name="JobLocation"
                onChange={formik.handleChange}
                value={formik.values.JobLocation}
                placeholder="Enter job location"
                className={` ${styles.inputFieldCss}`}
              />
            </div>
          </div>
        </div>

        <div className="mb-20 mt-10 flex justify-between">
          <div></div>
          <div className="flex">
            {width < 1024 ? (
              <div className="flex">
                <div>
                  <button
                    type="button"
                    onClick={() => handleStepClick(1, true)}
                    className="flex items-center rounded-lg bg-primary px-4 py-2 font-bold text-white"
                  >
                    <BsArrowLeft className="mr-2 font-bold text-white" />
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => handleStepClick(2)}
                    className="ml-2 flex items-center rounded-lg bg-primary px-4 py-2 font-bold text-white"
                  >
                    <BsArrowRight className="mr-2 font-bold text-white" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex">
                <div className="mx-2 flex items-center">
                  <button
                    type="button"
                    onClick={() => handleStepClick(1, true)}
                    className="flex items-center rounded-lg border border-primary px-4 py-2 font-bold text-primary"
                  >
                    <BsArrowLeft className="mr-2 font-bold text-primary" />
                    Previous
                  </button>
                </div>
                <div className="flex items-center ">
                  <button
                    type="button"
                    onClick={() => handleStepClick(2)}
                    className="flex items-center rounded-lg border border-primary px-4 py-2 font-bold text-primary"
                  >
                    Next
                    <BsArrowRight className="ml-2 font-bold text-primary" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkExperience;
