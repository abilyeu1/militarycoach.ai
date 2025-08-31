import React, { FC } from "react";

// data imports
import {
  industryOfInterest,
  interviewFormatSelection,
  jobPositionLevel,
} from "../data/data";

// atoms imports
import Button from "@/components/atoms/Button";
import RightBar from "@/components/atoms/RightBar";

// components imports
import Tips from "@/components/tips/Tips";
import { useRouter } from "next/router";
import { BiErrorCircle } from "react-icons/bi";
import Link from "next/link";
import { useAppSelector } from "@/redux/store/store";
import { MockInterViewPrepRequirementBarProps } from "@/types/tools.interface";
import { styles } from "@/styles/style";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { PiArrowSquareInBold } from "react-icons/pi";

const RequirementBar: FC<MockInterViewPrepRequirementBarProps> = ({
  fields,
  setFields,
  handleCareerWizardResponse,
  loader,
  history,
  errorMessage,
  setErrorMessage,
  isGenerating,
}) => {
  const handleChange = (event: any) => {
    setFields((prev: any) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setErrorMessage("");
  };

  const userData = useAppSelector((state) => state.auth.user);

  const router = useRouter();
  return (
    <>
      <RightBar className={`w-full lg:w-[28%]`}>
        <div className="flex h-[80vh] flex-col justify-between">
          <div>
            <Button onClick={() => router.push("/profile")} className="my-4">
              Edit Profile
            </Button>

            <div>
              <label
                htmlFor="industryOfInterest"
                className="text-[14px] font-semibold text-[#5C5C5C]"
              >
                Industry Of Interest<span className="text-red-500">*</span>
              </label>
              <select
                value={fields.industryOfInterest}
                onChange={handleChange}
                name="industryOfInterest"
                className={`!lg:w-[70%] !placeholder:text-black mb-2 mt-2 !w-full rounded-lg border !border-gray bg-transparent px-4 py-3 text-black focus:outline-none sm:w-[80%]`}
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
                {/* <option value={userData?.industryOfInterest ?? ""}>
                  {userData?.industryOfInterest ?? "Select an option"}{" "}
                </option>{" "} */}
                <option label="Select" disabled />

                {industryOfInterest.map((option: any, index: number) => (
                  <option
                    key={index}
                    value={option.value}
                    label={option.label}
                  />
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="jobPositionLevel"
                className="text-[14px] font-semibold text-[#5C5C5C]"
              >
                Position Level<span className="text-red-500">*</span>
              </label>
              <select
                value={fields.jobPositionLevel}
                onChange={handleChange}
                name="jobPositionLevel"
                className={`!lg:w-[70%] !placeholder:text-black mb-2 mt-2 !w-full rounded-lg border !border-gray bg-transparent px-4 py-3 text-black focus:outline-none sm:w-[80%]`}
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
                <option label="Select" disabled />

                {jobPositionLevel.map((option: any, index: number) => (
                  <option
                    key={index}
                    value={option.value}
                    label={option.label}
                  />
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="jobPositionLevel"
                className="text-[14px] font-semibold text-[#5C5C5C]"
              >
                Interview Format Selection
                <span className="text-red-500">*</span>
              </label>
              <select
                value={fields.interviewFormatSelection}
                onChange={handleChange}
                name="interviewFormatSelection"
                className={`!lg:w-[70%] !placeholder:text-black mb-2 mt-2 !w-full rounded-lg border !border-gray bg-transparent px-4 py-3 text-black focus:outline-none sm:w-[80%]`}
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
                <option label="Interview format selection" disabled />
                {interviewFormatSelection.map((option: any, index: number) => (
                  <option
                    key={index}
                    value={option.value}
                    label={option.label}
                  />
                ))}
              </select>
            </div>
            <div>
              <p
                className="flex cursor-pointer items-center  text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
                onClick={() =>
                  window.open(
                    "/mock-interview-headline",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                Interview Format Definitions
                <PiArrowSquareInBold className="ml-1" />
              </p>
            </div>

            <div className="mt-3">
              <label
                htmlFor="jobTitle"
                className="text-[14px] font-semibold text-[#5C5C5C]"
              >
                Job Title/Position<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="jobTitle"
                value={fields.jobTitle}
                // value={userData?.workExperience[0].jobTitle ?? ""}
                onChange={handleChange}
                placeholder="Enter job title"
                className={` ${styles.inputFieldCss}`}
              />
            </div>

            <div>
              <label
                htmlFor="jobDescription"
                className="text-[14px] font-semibold text-[#5C5C5C]"
              >
                Job Description
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                value={fields.jobDescription}
                onChange={handleChange}
                rows={8}
                placeholder="Write Job Description"
                className={` ${styles.inputFieldCss}`}
              />
            </div>

            <p className="text-error">{errorMessage}</p>

            <Button
              className={`w-full rounded-lg bg-[#63B017] px-4 py-2 font-bold text-white ${
                history.length > 0 || isGenerating || loader
                  ? "pointer-events-none opacity-50"
                  : ""
              }
              `}
              onClick={handleCareerWizardResponse}
              disabled={history.length > 0}
            >
              Generate
            </Button>
          </div>
        </div>
      </RightBar>
    </>
  );
};

export default RequirementBar;
