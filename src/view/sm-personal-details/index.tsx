//next imports
import Image from "next/image";
import { useRouter } from "next/router";

//react imports
import React, {
  DOMAttributes,
  FC,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";

// public imports
import logo from "../../../public/assets/milcoach-logo-1.svg";

import { v4 as uuidv4 } from "uuid";

import classNames from "classnames";
import { FormikProvider, useFormik } from "formik";

// import cookies
import Cookies from "js-cookie";

//hooks
import { useDimension } from "@/hooks/useDimension";

//axios
import { URL } from "@/services/API";
import { POST } from "@/services/API/AxiosRequests";

//types
import { Certificate, Chip, Education, WorkExperience } from "@/types";
import { UserTypes } from "@/utils/enums";

//react icons
import { BiSolidUpArrow } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { levelOfEducation, skillsInCareerField } from "../data/data";

// import { toast } from "react-toastify";

// data imports
import { branchServiceToOrgMap } from "@/data/organizations";

//components imports
import MilitaryMembersPersonalDetails from "./military-member-personal-details";
import EducationComponent from "./Education";
import WorkExperienceComponent from "./WorkExperience";

import { parseCV } from "@/services/uploadfile";

import { toast } from "react-toastify";

import Lottie from "react-lottie";
import lottieJson from "../../data/lottie.json";
//redux imports
import * as Yup from "yup";
import { loginSuccess } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";

import {
  IMilitarianRegistrationForm,
  militarianRegistrationForm,
  militarianRegistrationFormInitialValues,
} from "./FormikSchema";
import ModalFunFacts from "@/components/skeletonCode/ModalFunFacts";

const MilitaryPersonalDetails: FC = () => {
  //------------------- hooks start -------------------

  const [width] = useDimension();

  const router = useRouter();

  const dispatch = useDispatch();

  //------------------- hooks end -------------------

  //------------------- states start -------------------

  const [editIndex, setEditIndex] = useState<number>(-1);

  const [educationsEditIndex, setEducationsEditIndex] = useState<number>(-1);

  const [currentStep, setCurrentStep] = useState<number>(1);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [educationErrorMessage, setEducationErrorMessage] =
    useState<string>("");

  const [certificateErrorMessage, setCertificateErrorMessage] =
    useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const [displaySuggestions, setDisplaySuggestions] = useState<boolean>(false);

  const [chipsSkills, setChipsSkills] = useState<Chip[]>([]);

  const [inputValueSkills, setInputValueSkills] = useState<string>("");

  const [inputValueSkillsEdit, setInputValueSkillsEdit] = useState<string>("");

  const [langError, setLangError] = useState<boolean>(false);

  const [educations, setEducations] = useState<Education[]>([]);

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  console.log("certificates===>", certificates);

  const [languages, setLanguages] = useState<string[]>([]);

  const [activeTab, setActiveTab] = useState<string>("onDuty");

  const [loader, setLoader] = useState<boolean>(false);

  const [formSubmissionLoader, setFormSubmissionLoader] =
    useState<boolean>(false);

  const steps = ["Personal Details", "Work Experience", "Education"];

  const onInputClick = () => {
    setDisplaySuggestions(!displaySuggestions);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setDisplaySuggestions(true);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieJson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  //------------------- formik start -------------------

  const isLastPage = currentStep < 3;

  const validationSchema = Yup.object().shape({
    ...militarianRegistrationForm,
    ...(isLastPage && {
      careerfieldEdit: Yup.string().required("Career Field is required!"),
    }),

    ...(isLastPage && {
      jobTitleEdit: Yup.string().required("Job title is required!"),
    }),

    ...(isLastPage && {
      skillsLeveragedInCareerFieldEdit: Yup.array().min(1, "Required!"),
    }),
    // age: Yup.string().required("Age is required!"),
  });

  // const onSelectLang = (selectedList: any) => {
  //   setLanguages(selectedList);

  //   // formik.setFieldValue("languages", selectedList);
  // };
  const onSelectLang = (e: any) => {
    setLanguages(Array.isArray(e) ? e.map((lang) => lang.label) : []);
  };

  const formik = useFormik({
    initialValues: militarianRegistrationFormInitialValues,

    validationSchema,

    onSubmit: async (values) => {
      console.log("formik.values.certificates", formik.values.certificates);
      console.log("clicked");

      console.log(formik.errors);
      try {
        setFormSubmissionLoader(true);

        const storedEmail = Cookies.get("email");

        const storedPassword = Cookies.get("password");

        const certificatesWithUUIDs = formik.values.certificates.map(
          (certificate: any) => ({
            ...certificate,
            _id: uuidv4(),
          }),
        );

        const experience = values.experience.map((exp: any) => {
          return {
            ...exp,
            _id: uuidv4(),
            skillsLeveragedInCareerField: exp.skillsLeveragedInCareerField.map(
              (skills: any) => skills.text,
            ),
          };
        });

        const educationWithUUIDs = formik.values.edu.map((education: any) => ({
          ...education,
          _id: uuidv4(),
        }));

        console.log("certificatesWithUUIDs", certificatesWithUUIDs);

        const payload = {
          // Personal Details
          email: storedEmail,
          password: storedPassword,
          type: UserTypes.MILITARY,
          profilePicture: "",
          fullName: values.fullName,
          JobLocation: values.JobLocation,

          age: !!values.age ? Number(values.age) : 0,
          militaryRank: values.rank,
          branchOfService: values.branchOfServices,
          languages: languages,
          // Work Experience
          workExperience: experience,
          // Career Aspiration
          industryOfInterest: values.industryOfInterest,
          jobPositionOfInterest: values.positionOfInterest,
          jobPositionLevel: values.jobPositionLevel,

          // Education
          education: educationWithUUIDs,

          // Certificates
          certificates: certificatesWithUUIDs,

          isAdmin: false,
        };

        console.log("payload", payload);
        console.log("values", values);

        // return;
        const response = await POST(URL.REGISTER, payload);

        Cookies.remove("password");

        Cookies.remove("confirmPassword");

        Cookies.remove("email");

        dispatch(loginSuccess({ user: response.user, token: response.token }));

        Cookies.set("accessToken", response.token, { expires: 4 });

        toast.success("User Created Successfully!");

        setFormSubmissionLoader(false);

        router.push("/tools");
      } catch (error: any) {
        const errorMessage =
          error.response.data.message ?? "Something went wrong!";

        console.error("Error", errorMessage);
        console.log(error);

        setFormSubmissionLoader(false);

        toast.error(errorMessage);
      }
    },
  });
  console.log("formikErrors", formik.errors);
  //------------------- formik end -------------------

  const formFiller = (values: IMilitarianRegistrationForm) => {
    console.log("values form filler", values);

    const certs = values.certificates.map((cert: any) => ({
      name: cert,
    }));

    const normalizedExps = values.workExperience?.map((exp: any) => {
      return {
        ...exp,
        skillsLeveragedInCareerField: exp.skillsLeveragedInCareerField.map(
          (skill: any, idx: number) => {
            return {
              id: idx,
              text: skill,
            };
          },
        ),
      };
    });

    formik.setFieldValue("fullName", values.fullName);
    formik.setFieldValue("JobLocation", values.JobLocation);
    formik.setFieldValue("levelOfEducation", values.levelOfEducation);
    formik.setFieldValue("branchOfServices", values.branchOfServices);
    formik.setFieldValue("careerField", values.careerField);
    formik.setFieldValue("jobTitle", values.jobTitle);
    formik.setFieldValue("skillsInCareerField", values.skillsInCareerField);
    formik.setFieldValue("experience", normalizedExps);
    setEducations(values.education);
    setCertificates(certs);
  };

  // validation for CV file extension
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement> | any,
  ) => {
    const file = e;

    if (file) {
      // Validate file type and size
      const allowedExtensions = ["doc", "docx", "pdf"];
      const maxFileSize = 5 * 1024 * 1024; // 5MB

      if (
        allowedExtensions.some((ext) =>
          file.name.toLowerCase().endsWith(`.${ext}`),
        ) &&
        file.size <= maxFileSize
      ) {
        const formData = new FormData();

        formData.append("file", file);

        try {
          setLoader(true);

          setTimeout(async () => {
            const resumeContent = await parseCV(formData);

            formFiller(resumeContent);

            setLoader(false);
          }, 1000);
          // setLoader(false);
        } catch (err: any) {
          console.error("Error uploading picture:", err);
          setLoader(false); // Hide loader
        }
      }
    }
  };

  //next and previous function

  const handleStepClick = useCallback(
    async (stepIndex: number, previous?: boolean) => {
      if (previous) {
        setCurrentStep(stepIndex);
        return;
      }

      // Form Flag
      let isSubmitAble: boolean = true;

      if (stepIndex === 1) {
        // Personal details fields validations
        const resp = await formik.validateForm();

        if (Object.keys(resp).length > 0) {
          if (resp.branchOfServices || resp.rank || resp.fullName) {
            toast.error("Please fill the required fields");
            isSubmitAble = false;
          }
        }

        // Validation of Languages
        if (languages && languages.length < 1) {
          setLangError(true);

          isSubmitAble = false;
        }

        // if Active Duty user or or non-active user
        if (activeTab === "onDuty") {
          if (
            formik.values.branchOfServices === "" ||
            formik.values.rank === ""
          ) {
            setErrorMessage("All fields are required");
            isSubmitAble = false;
          }
        }
      } else if (stepIndex === 2) {
        if (formik.values.experience.length < 1) {
          toast.error("Please add at least 1 work experience!");
          isSubmitAble = false;
        } else {
          formik.values.experience.map((exp) => {
            Object.keys(exp).map((key) => {
              if (key === "skillsLeveragedInCareerField") {
                if ((exp[key] as any).length < 1) isSubmitAble = false;
              } else {
                if (exp[key] === "") isSubmitAble = false;
              }
            });
          });
          if (!isSubmitAble) toast.error("Please fill the empty fields!");
        }
      }

      if (isSubmitAble) setCurrentStep(stepIndex + 1);
    },
    [formik, setCurrentStep, setLangError, setErrorMessage, toast, activeTab],
  );

  //------------------- work experience start -------------------

  const handleAddExperience = useCallback(() => {
    if (
      formik.values.careerField === "" ||
      formik.values.jobTitle === "" ||
      chipsSkills.length < 1
    ) {
      setErrorMessage("All fields are required");
      return;
    }

    setErrorMessage("");

    let obj = {
      careerField: formik.values.careerField,
      jobTitle: formik.values.jobTitle,
      skillsLeveragedInCareerField: formik.values.skillsInCareerField,
    };

    setChipsSkills([]);

    formik.setFieldValue("careerField", "");
    formik.setFieldValue("jobTitle", "");
    formik.setFieldValue("skillsLeveragedInCareerField", []);
    formik.setFieldValue("experience", [...formik.values.experience, obj]);
  }, [formik, setChipsSkills, setErrorMessage, chipsSkills]);

  const handleEditExperience = useCallback(
    (index: number) => {
      setEditIndex(index);

      const currentField: any = formik.values.experience[index];
      formik.setFieldValue("careerfieldEdit", currentField.careerField);
      formik.setFieldValue("jobTitleEdit", currentField.jobTitle);

      formik.setFieldValue(
        "skillsLeveragedInCareerFieldEdit",
        currentField.skillsLeveragedInCareerField,
      );
    },
    [formik, setEditIndex],
  );

  const handleSaveEditExperience = useCallback(async () => {
    let isSubmitAble: boolean = true;

    const error = await formik.validateForm();

    if (Object.keys(error).length > 0) {
      if (Object.keys(error).includes("careerfieldEdit")) {
        formik.setFieldTouched("careerfieldEdit", true, true);
        isSubmitAble = false;
      }
      if (Object.keys(error).includes("jobTitleEdit")) {
        formik.setFieldTouched("jobTitleEdit", true, true);
        isSubmitAble = false;
      }

      if (Object.keys(error).includes("skillsLeveragedInCareerFieldEdit")) {
        isSubmitAble = false;
      }
    }

    if (isSubmitAble) {
      const updatedExperience = {
        careerField: formik.values.careerfieldEdit,
        jobTitle: formik.values.jobTitleEdit,
        skillsLeveragedInCareerField:
          formik.values.skillsLeveragedInCareerFieldEdit,
      };

      const prevExperience = formik.values.experience;
      const p1 = prevExperience.slice(0, editIndex);
      const p2 = prevExperience.slice(editIndex + 1);
      const final = [...p1, updatedExperience, ...p2];
      formik.setFieldValue("experience", final);
      setEditIndex(-1);
    }
  }, [formik, setEditIndex]);

  const handleCancelEditExperience = useCallback(() => {
    setEditIndex(-1);
  }, [setEditIndex]);

  const handleEditChangeExperience = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      index: number,
      field: keyof WorkExperience,
    ) => {
      const { value } = event.target;
      formik.setFieldValue(field, value);
    },
    [formik],
  );

  const handleDeleteExperience = useCallback(
    (index: number) => {
      formik.setFieldValue(
        "experience",
        formik.values.experience.filter((_, i) => i !== index),
      );
    },
    [formik],
  );

  //chips of skills start

  const handleInputChangesSkills = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, mode?: string) => {
      if (mode === "normal") setInputValueSkills(e.target.value);
      else setInputValueSkillsEdit(e.target.value);
    },
    [setInputValueSkills, setInputValueSkillsEdit],
  );

  const handleInputKeyPressSkills = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, mode?: string) => {
      if (mode === "normal") {
        if (e.key === "Enter" && inputValueSkills.trim() !== "") {
          e.preventDefault();
          const newChipSkills: Chip = {
            id: Date.now(),
            text: inputValueSkills.trim(),
          };
          setChipsSkills((prev) => {
            formik.setFieldValue("skillsInCareerField", [
              ...prev,
              newChipSkills,
            ]);
            return [...prev, newChipSkills];
          });
          setInputValueSkills("");
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
    },
    [
      formik,
      setChipsSkills,
      inputValueSkills,
      inputValueSkillsEdit,
      setInputValueSkillsEdit,
    ],
  );

  const handleInputClickSkills = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, mode?: string) => {
      if (mode === "normal") {
        if (inputValueSkills.trim() !== "") {
          e.preventDefault();
          const newChipSkills: Chip = {
            id: Date.now(),
            text: inputValueSkills.trim(),
          };
          setChipsSkills((prev) => {
            formik.setFieldValue("skillsInCareerField", [
              ...prev,
              newChipSkills,
            ]);
            return [...prev, newChipSkills];
          });
          setInputValueSkills("");
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
    },
    [
      formik,
      setChipsSkills,
      inputValueSkills,
      inputValueSkillsEdit,
      setInputValueSkillsEdit,
    ],
  );

  const handleChipDeleteSkills = useCallback(
    (chipSkills: Chip, mode?: string) => {
      if (mode === "normal") {
        const updatedChipsSkills = chipsSkills.filter(
          (c) => c.id !== chipSkills.id,
        );
        setChipsSkills(updatedChipsSkills);
        formik.setFieldValue("skillsInCareerField", [...updatedChipsSkills]);
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
    },
    [formik, setChipsSkills, chipsSkills],
  );

  // end skills chips

  //------------------- work experience end -------------------

  //------------------- Education start -------------------

  const handleInputChangeEducation = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {},
    [],
  );

  const handleAddEducation = useCallback(() => {
    if (
      formik.values.levelOfEducation === "" ||
      formik.values.nameOfInstitution === ""
    ) {
      setEducationErrorMessage("All fields are required");
      toast.error("Fill all the fields");
      return;
    }

    setEducationErrorMessage("");

    let obj = {
      levelOfEducation: formik.values.levelOfEducation,
      nameOfInstitution: formik.values.nameOfInstitution,
      degreeAndFieldOfStudy: formik.values.degreeAndFieldOfStudy,
    };

    setEducations((prevEducations) => [...prevEducations, obj]);

    // Clear the form fields
    formik.setFieldValue("levelOfEducation", "");
    formik.setFieldValue("nameOfInstitution", "");
    formik.setFieldValue("degreeAndFieldOfStudy", "");
  }, [formik, setEducationErrorMessage, setEducations, toast]);

  const handleSaveEditEducations = useCallback(() => {
    setEducationsEditIndex(-1);
  }, [setEducationsEditIndex]);

  const handleEditEducations = useCallback(
    (index: number) => {
      setEducationsEditIndex(index);
    },
    [setEducationsEditIndex],
  );

  const handleCancelEditEducations = useCallback(() => {
    setEducationsEditIndex(-1);
  }, [setEducationsEditIndex]);

  const handleDeleteEducation = useCallback(
    (index: number) => {
      setEducations((prevEducations) =>
        prevEducations.filter((_, i) => i !== index),
      );
    },
    [setEducations],
  );

  const handleEditChangeEducations = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      index: number,
      field: keyof Education,
    ) => {
      const { value } = event.target;
      setEducations((prevEducations) => {
        const updatedEducations = [...prevEducations];
        updatedEducations[index][field] = value;
        return updatedEducations;
      });
    },
    [setEducations],
  );

  //add certificate

  const handleInputChangeCertificate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      formik.setFieldValue("name", val);
      const { name, value } = event.target;
    },
    [formik],
  );

  const handleAddCertificate = useCallback(() => {
    const { name } = formik.values;
    if (name.trim() === "") {
      setCertificateErrorMessage("Add Certificate");
      return;
    }
    setCertificateErrorMessage("");

    setCertificates((prevCertificates) => [...prevCertificates, { name }]);
    formik.setFieldValue("name", "");
  }, [formik, setCertificates, setCertificateErrorMessage]);

  const handleSaveEditCertificate = useCallback(() => {
    setEditIndex(-1);
  }, [setEditIndex]);

  const handleEditCertificate = useCallback(
    (index: number) => {
      setEditIndex(index);
    },
    [setEditIndex],
  );

  const handleCancelEditCertificate = useCallback(() => {
    setEditIndex(-1);
  }, [setEditIndex]);

  const handleDeleteCertificate = useCallback(
    (index: any) => {
      setCertificates((prevCertificates) =>
        prevCertificates.filter((_, i) => i !== index),
      );
    },
    [setCertificates],
  );

  const handleEditChangeCertificate = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      index: number,
      field: keyof Certificate,
    ) => {
      const { value } = event.target;
      setCertificates((prevCertificates) => {
        const updatedCertificates = [...prevCertificates];
        updatedCertificates[index][field] = value;
        return updatedCertificates;
      });
    },
    [setCertificates],
  );

  //------------------- Education end -------------------

  const formSubmit = (e: any) => {
    e.preventDefault();
    formik.setFieldValue("certificates", [...certificates]);
    formik.setFieldValue("edu", [...educations]);
    formik.handleSubmit(e);
  };

  useEffect(() => {
    if (formik.values.languages.length > 0) setLangError(false);
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [activeTab]);

  return (
    <Fragment>
      {loader && <ModalFunFacts isSkeletonCodeVisible={loader} />}

      <div className="min-h-[100vh] bg-white bg-[url('/assets/vectorBg.png')] bg-[length:160px_180px] bg-no-repeat md:bg-auto">
        <div className="container mx-auto  flex flex-col justify-center">
          <div className="mx-4 mt-20 md:mx-2">
            {width > 1024 ? (
              <Image src={logo} alt="logo" width={365} height={300} />
            ) : (
              <Image src={logo} alt="logo" width={245} height={300} />
            )}
          </div>

          {/* step form */}

          <div className="my-10 p-4">
            <div className="mx-[15px]  my-0 mb-4">
              <div className="mx-auto mb-4 flex w-[90%] items-center justify-between space-x-4">
                {steps.map((step, index: number) => (
                  <>
                    <div
                      key={index}
                      onClick={() => handleStepClick(index)}
                      className={classNames(
                        "relative z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full",
                        {
                          "circleButton bg-primary text-white outline-2 outline-offset-4":
                            index < currentStep - 1,
                          "bg-[#BFBFBF] text-white": index >= currentStep - 1,
                        },
                      )}
                    >
                      <div className="relative top-[28px] flex h-[80px] flex-col items-center justify-between">
                        <div>
                          {index < currentStep - 1 ? (
                            <MdDone className="mt-1 text-white" />
                          ) : (
                            <p className=" text-white"> {index + 1} </p>
                          )}
                        </div>
                        <div>
                          <BiSolidUpArrow
                            className={`mt-4 text-center ${
                              currentStep === index + 1
                                ? "text-primary"
                                : "text-lightGray"
                            } ${index < currentStep - 1 && "text-primary "} `}
                          />
                        </div>
                        <div
                          className={`flex h-full w-[100px] items-center justify-center rounded-full px-2 py-1 md:h-[31px] md:w-[161px]  ${
                            index < currentStep - 1
                              ? "bg-primary "
                              : "progressBar "
                          }`}
                        >
                          <p
                            className={`text-center text-[10px] md:text-[16px] ${
                              currentStep === index + 1
                                ? "font-bold text-primary"
                                : "text-lightGray"
                            } ${index < currentStep - 1 && "text-white"} `}
                          >
                            {step}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div
                className={`progressBar relative bottom-[38px] mx-auto h-[13px] w-[80%] rounded-xl sm:w-[90%]`}
              ></div>
            </div>

            <FormikProvider value={formik}>
              <form onSubmit={(e) => formSubmit(e)}>
                {currentStep === 1 && (
                  <MilitaryMembersPersonalDetails
                    formik={formik}
                    handleStepClick={handleStepClick}
                    handleFileChange={handleFileChange}
                    langError={langError}
                    onSelectLang={onSelectLang}
                    languages={languages}
                    setLanguages={setLanguages}
                  />
                )}

                {currentStep === 2 && (
                  <WorkExperienceComponent
                    handleInputClickSkills={handleInputClickSkills}
                    skills={skillsInCareerField}
                    formik={formik}
                    errorMessage={errorMessage}
                    handleStepClick={handleStepClick}
                    handleAddExperience={handleAddExperience}
                    // handleInputChange={handleInputChangeExperience}
                    editIndex={editIndex}
                    handleEditChange={handleEditChangeExperience}
                    handleSaveEdit={handleSaveEditExperience}
                    handleCancelEdit={handleCancelEditExperience}
                    handleEdit={handleEditExperience}
                    handleDelete={handleDeleteExperience}
                    chips={chipsSkills}
                    inputValue={inputValueSkills}
                    handleInputChanges={handleInputChangesSkills}
                    handleInputKeyPress={handleInputKeyPressSkills}
                    handleChipDelete={handleChipDeleteSkills}
                    inputValueSkillsEdit={inputValueSkillsEdit}
                  />
                )}

                {currentStep === 3 && (
                  <EducationComponent
                    formik={formik}
                    educationErrorMessage={educationErrorMessage}
                    handleAddEducation={handleAddEducation}
                    handleStepClick={handleStepClick}
                    handleInputChange={handleInputChangeEducation}
                    levelOfEducation={levelOfEducation}
                    educationsEditIndex={educationsEditIndex}
                    educations={educations}
                    handleEditChange={handleEditChangeEducations}
                    handleSaveEdit={handleSaveEditEducations}
                    handleCancelEdit={handleCancelEditEducations}
                    handleEdit={handleEditEducations}
                    handleDelete={handleDeleteEducation}
                    // add certificate
                    editIndex={editIndex}
                    certificates={certificates}
                    handleAddCertificate={handleAddCertificate}
                    handleEditCertificate={handleEditCertificate}
                    handleSaveEditCertificate={handleSaveEditCertificate}
                    handleCancelEditCertificate={handleCancelEditCertificate}
                    handleDeleteCertificate={handleDeleteCertificate}
                    handleEditChangeCertificate={handleEditChangeCertificate}
                    handleInputChangeCertificate={handleInputChangeCertificate}
                    certificateErrorMessage={certificateErrorMessage}
                    formSubmissionLoader={formSubmissionLoader}
                  />
                )}
              </form>
            </FormikProvider>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MilitaryPersonalDetails;
