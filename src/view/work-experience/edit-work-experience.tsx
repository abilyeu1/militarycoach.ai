//redux imports
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store/store";
import { updateUser } from "@/redux/slices/authSlice";

//formik imports
import { ErrorMessage, Field, FormikProvider, useFormik } from "formik";

//public imports
import edit_icon from "../../../public/assets/edit.svg";

//next imports
import Image from "next/image";
import { useRouter } from "next/router";

//react imports
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

//hooks imports
import { useDimension } from "@/hooks/useDimension";

//atoms imports
import Button from "@/components/atoms/Button";

//types imports
import { Chip } from "@/types";

//react icons imports
import { RiDeleteBinLine } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

//axios imports
import { URL } from "@/services/API";
import { PUT } from "@/services/API/AxiosRequests";

//styles imports
import { styles } from "@/styles/style";

import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { FaHandPointUp } from "react-icons/fa";

const EditWorkExperienceForm = () => {
  const [width] = useDimension();
  const router = useRouter();
  const token = Cookies.get("accessToken");

  const [inputValue, setInputValue] = useState<string>("");
  const [inputValueSkillsEdit, setInputValueSkillsEdit] = useState<string>("");
  const [showAddExperienceButton, setShowAddExperienceButton] = useState(false);

  const [loader, setLoader] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const userData = useAppSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const editWorExperienceData = () => {
    const workExps = userData?.workExperience?.map(
      (item: any, index: number) => {
        return {
          ...item,
          skillsLeveragedInCareerField: item.skillsLeveragedInCareerField?.map(
            (chip: string, idx: number) => {
              return { text: chip, id: idx };
            },
          ),
        };
      },
    );
    formik.setFieldValue("experience", workExps);
  };

  // Generate a UUID
  const _id = uuidv4();

  const formik = useFormik({
    initialValues: {
      experience: [],
      careerField: "",
      jobTitle: "",
      careerfieldEdit: "",
      jobTitleEdit: "",
      skillsLeveragedInCareerFieldEdit: [],
      skillsInCareerFieldEdit: [],
    },
    // validationSchema,
    onSubmit: async () => {
      setLoader(true);

      try {
        const exps = formik.values.experience.map((w: any) => {
          return {
            ...w,
            _id: uuidv4(),
            skillsLeveragedInCareerField: w.skillsLeveragedInCareerField.map(
              (skills: any) => skills.text,
            ),
          };
        });

        const payload = {
          workExperience: exps,
        };

        const response = await PUT(URL.USER_EDIT_PROFILE, payload, token);

        dispatch(updateUser(response.user));
        setLoader(false);
        toast.success("Experience Updated. ");
        router.push("/profile");
      } catch (error: any) {
        setLoader(false);

        toast.error("All fields are required");
      }
    },
  });

  const formSubmit = (e: any) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  // const handleInputChangeExperience = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const { name, value } = event.target;
  // };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    const { name, value } = event.target;
  };

  const handleAddExperience = () => {
    if (
      formik.values.careerField === "" ||
      formik.values.jobTitle === "" ||
      chips.length < 1
    ) {
      setErrorMessage("All fields are required");

      return;
    }

    setErrorMessage("");

    let obj = {
      careerField: formik.values.careerField,
      jobTitle: formik.values.jobTitle,
      skillsLeveragedInCareerField: formik.values.skillsInCareerFieldEdit,
    };

    setChips([]);

    formik.setFieldValue("careerField", "");
    formik.setFieldValue("jobTitle", "");
    formik.setFieldValue("skillsLeveragedInCareerField", []);
    formik.setFieldValue("experience", [...formik.values.experience, obj]);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    const currentField: any = formik.values.experience[index];
    formik.setFieldValue("careerfieldEdit", currentField.careerField);
    formik.setFieldValue("jobTitleEdit", currentField.jobTitle);

    formik.setFieldValue(
      "skillsLeveragedInCareerFieldEdit",
      currentField.skillsLeveragedInCareerField,
    );
  };

  const handleCancelEdit = (index: number) => {
    setEditIndex(-1);
  };

  const [chips, setChips] = useState<Chip[]>([]);

  const handleEditChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof typeof formik.values,
  ) => {
    const { value } = event.target;
  };

  const handleDelete = (index: any) => {
    formik.setFieldValue(
      "experience",
      formik.values.experience.filter((_, i) => i !== index),
    );
  };

  //chips of skills start

  const handleInputChanges = (
    e: React.ChangeEvent<HTMLInputElement>,
    mode?: string,
  ) => {
    if (mode === "normal") setInputValue(e.target.value);
    else setInputValueSkillsEdit(e.target.value);
  };

  const handleInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    mode?: string,
  ) => {
    if (mode === "normal") {
      if (e.key === "Enter" && inputValue.trim() !== "") {
        e.preventDefault();
        const newChipSkills: Chip = {
          id: Date.now(),
          text: inputValue.trim(),
        };
        setChips((prev) => {
          formik.setFieldValue("skillsInCareerFieldEdit", [
            ...prev,
            newChipSkills,
          ]);
          return [...prev, newChipSkills];
        });
        setInputValue("");
        return;
      }
    }

    if (e.key === "Enter" && inputValueSkillsEdit.trim() !== "") {
      e.preventDefault();

      const newChipSkills: Chip = {
        id: Date.now(),
        text: inputValueSkillsEdit.trim(),
      };

      formik.setFieldValue("skillsLeveragedInCareerFieldEdit", [
        ...formik.values.skillsLeveragedInCareerFieldEdit,
        newChipSkills,
      ]);

      setInputValueSkillsEdit("");
    }
  };

  const handleInputClickSkills = (e: any, mode?: string) => {
    if (mode === "normal") {
      if (inputValue.trim() !== "") {
        e.preventDefault();
        const newChipSkills: Chip = {
          id: Date.now(),
          text: inputValue.trim(),
        };
        setChips((prev) => {
          formik.setFieldValue("skillsInCareerFieldEdit", [
            ...prev,
            newChipSkills,
          ]);
          return [...prev, newChipSkills];
        });
        setInputValue("");
        return;
      }
    }

    if (inputValueSkillsEdit.trim() !== "") {
      e.preventDefault();

      const newChipSkills: Chip = {
        id: Date.now(),
        text: inputValueSkillsEdit.trim(),
      };

      formik.setFieldValue("skillsLeveragedInCareerFieldEdit", [
        ...formik.values.skillsLeveragedInCareerFieldEdit,
        newChipSkills,
      ]);

      setInputValueSkillsEdit("");
    }
  };

  const handleSaveEdit = (index: number) => {
    const updatedExperience = {
      ...userData?.workExperience[index],
      careerField: formik.values.careerfieldEdit,
      jobTitle: formik.values.jobTitleEdit,
      skillsLeveragedInCareerField:
        formik.values.skillsLeveragedInCareerFieldEdit,
    };

    const prevExp = formik.values.experience;
    const p1 = prevExp.slice(0, editIndex);
    const p2 = prevExp.slice(editIndex + 1);
    const final = [...p1, updatedExperience, ...p2];
    formik.setFieldValue("experience", final);

    setEditIndex(-1);
  };

  const handleChipDelete = (chipSkills: Chip, mode?: string) => {
    if (mode === "normal") {
      const updatedChipsSkills = chips.filter((c) => c.id !== chipSkills.id);
      setChips(updatedChipsSkills);
      formik.setFieldValue("skillsInCareerFieldEdit", [...updatedChipsSkills]);
    } else {
      const selectedChips = formik.values.skillsLeveragedInCareerFieldEdit;

      const updatedChipsSkills = selectedChips.filter(
        (c) => (c as any).id !== chipSkills.id,
      );

      formik.setFieldValue(
        "skillsLeveragedInCareerFieldEdit",
        updatedChipsSkills,
      );
    }
  };

  const allFieldsFilled =
    formik.values.careerField &&
    formik.values.jobTitle &&
    formik.values.skillsInCareerFieldEdit.length > 0
      ? true
      : false;

  useEffect(() => {
    if (allFieldsFilled) {
      setShowAddExperienceButton(true);
    } else {
      setShowAddExperienceButton(false);
    }
  }, [allFieldsFilled]);

  useEffect(() => {
    editWorExperienceData();
  }, []);
  return (
    <>
      <div className="flex min-h-[100vh] flex-col bg-[url('/assets/vectorBg.png')] bg-no-repeat px-4 md:px-0">
        <div className="px-4 md:px-16">
          <FormikProvider value={formik}>
            <form onSubmit={(e) => formSubmit(e)}>
              <div className="mt-20">
                <div className="">
                  <div className="mb-0 flex items-center justify-between sm:mb-5">
                    <p className="mb-0 text-left text-[24px]  font-bold md:text-[40px]">
                      Work Experience
                    </p>

                    <Button
                      className="my-2 flex h-[40px] items-center justify-center bg-primary"
                      onClick={handleAddExperience}
                      type="button"
                    >
                      <HiPlus className="mr-2" /> Add
                    </Button>
                  </div>
                  <div className="rounded-xl border border-GrayBorder p-4 shadow-md">
                    <p className="ml-2 text-error">{errorMessage}</p>
                    <div className=" block md:flex ">
                      <div className="mx-0 w-[100%] md:mx-2 lg:w-[32%]">
                        <label
                          htmlFor="careerField"
                          className="text-[14px] font-semibold text-[#5C5C5C]"
                        >
                          Career Field
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
                      <div className="mx-0 w-[100%] md:mx-2 lg:w-[32%]">
                        <label
                          htmlFor="jobTitle"
                          className="text-[14px] font-semibold text-[#5C5C5C]"
                        >
                          Job Title/Position
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
                          htmlFor="skillsInCareerFieldEdit"
                          className="text-[14px] font-semibold text-[#5C5C5C]"
                        >
                          Skills leveraged in career field
                        </label>
                        <div className="flex flex-wrap">
                          <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => handleInputChanges(e, "normal")}
                            onKeyPress={(e) => handleInputKeyPress(e, "normal")}
                            placeholder="Enter SKills"
                            className={`${styles.inputFieldCss}`}
                          />

                          <div className="flex w-full justify-end">
                            <HiPlus
                              onClick={(e) =>
                                handleInputClickSkills(e, "normal")
                              }
                              className="h-[30px] w-[40px] cursor-pointer rounded-lg bg-primary p-2 text-white"
                            />
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

                    <div className="block md:flex">
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
                </div>

                {formik.values.experience?.length > 0 && (
                  <div className="">
                    {width > 1025 ? (
                      <div className="mt-20 rounded-xl border border-GrayBorder p-4 shadow-md">
                        <p className="mb-5 text-left text-[25px] text-primary">
                          Work Experience
                        </p>

                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-2">
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
                              Skills leveraged in career field
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
                                    <div className="col-span-2 my-1">
                                      <input
                                        className="!placeholder:text-black  mb-2 mt-2 w-full rounded-lg border !border-gray bg-transparent px-4 py-4  text-black focus:outline-none"
                                        type="text"
                                        value={formik.values.careerfieldEdit}
                                        onChange={(e) =>
                                          handleEditChange(
                                            e,
                                            index,
                                            "careerfieldEdit",
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="col-span-3 my-1">
                                      <input
                                        className="!placeholder:text-black  mb-2 mt-2 w-full rounded-lg border !border-gray bg-transparent px-4 py-4  text-black focus:outline-none"
                                        type="text"
                                        value={formik.values.jobTitleEdit}
                                        onChange={(e) =>
                                          handleEditChange(
                                            e,
                                            index,
                                            "jobTitleEdit",
                                          )
                                        }
                                      />
                                    </div>

                                    <div className="col-span-4 my-1 w-full">
                                      <div className="flex flex-wrap">
                                        <input
                                          type="text"
                                          value={inputValueSkillsEdit}
                                          onChange={handleInputChanges}
                                          onKeyPress={handleInputKeyPress}
                                          placeholder="Enter SKills"
                                          className={`${styles.inputFieldCss}`}
                                        />
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
                                                  onClick={() =>
                                                    handleChipDelete(chip)
                                                  }
                                                  className="ml-2 cursor-pointer rounded-full bg-slate-400 text-[20px] font-semibold  text-white focus:outline-none"
                                                />
                                              </div>
                                            );
                                          },
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-span-2 my-1 mt-4 block w-full md:flex">
                                      <Button
                                        className="mx-1 h-fit w-full bg-primary"
                                        onClick={() => handleSaveEdit(index)}
                                      >
                                        Save
                                      </Button>
                                      <Button
                                        className="mx-1 h-fit w-full bg-primary"
                                        onClick={() => handleCancelEdit(index)}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="col-span-12 lg:col-span-2">
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
                                      <div className=" scrollbar 	h-[10vh] overflow-auto  overflow-x-hidden md:grid-cols-3">
                                        <div className="flex flex-wrap">
                                          {experience.skillsLeveragedInCareerField?.map(
                                            (chip: any, index: number) => (
                                              <div
                                                key={index}
                                                className="m-1 flex items-center rounded-full bg-[#E7FBD4] p-2 px-3 text-white"
                                              >
                                                <p className="text-center text-[12px] text-black md:first:text-[16px]">
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
                                          handleEditChange(
                                            e,
                                            index,
                                            "careerfieldEdit",
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="col-span-2 my-1">
                                      <input
                                        className="!placeholder:text-black  mb-2 mt-2 w-full rounded-lg border !border-gray bg-transparent px-4 py-4  text-black focus:outline-none"
                                        type="text"
                                        value={formik.values.jobTitleEdit}
                                        onChange={(e) =>
                                          handleEditChange(
                                            e,
                                            index,
                                            "jobTitleEdit",
                                          )
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
                                              handleInputClickSkills(e)
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
                                                  onClick={() =>
                                                    handleChipDelete(chip)
                                                  }
                                                  className="ml-2 cursor-pointer rounded-full bg-slate-400 text-[20px] font-semibold  text-white focus:outline-none"
                                                />
                                              </div>
                                            );
                                          },
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-span-1 my-1 block w-full items-center md:flex">
                                      <Button
                                        className="mx-1 my-1 h-fit w-full bg-primary"
                                        onClick={() => handleSaveEdit(index)}
                                      >
                                        Save
                                      </Button>

                                      <Button
                                        className="mx-1 my-1 w-full bg-primary"
                                        onClick={() => handleCancelEdit(index)}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="">
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

                                      <div className=" scrollbar block h-[10vh]  overflow-auto overflow-x-hidden  md:grid md:grid-cols-3">
                                        <div className="flex flex-wrap">
                                          {experience.skillsLeveragedInCareerField.map(
                                            (chip: any, index: number) => (
                                              <div
                                                key={index}
                                                className="m-1 flex items-center rounded-full bg-[#E7FBD4] p-2 px-3 text-white"
                                              >
                                                <p className="text-center text-[12px] text-black md:text-[16px]">
                                                  {" "}
                                                  {chip.text}{" "}
                                                </p>
                                              </div>
                                            ),
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="col-span-12 flex items-baseline justify-end lg:col-span-2">
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

export default EditWorkExperienceForm;
