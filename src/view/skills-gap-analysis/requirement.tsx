import { FC } from "react";

// data imports
import { industryOfInterest, jobPositionLevel } from "../data/data";

// atoms imports
import Button from "@/components/atoms/Button";
import RightBar from "@/components/atoms/RightBar";

// components imports
import { useAppSelector } from "@/redux/store/store";
import { styles } from "@/styles/style";
import { SkillsGapAnalysisRequirementBarProps } from "@/types/tools.interface";
import Link from "next/link";
import { BiErrorCircle } from "react-icons/bi";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const RequirementBar: FC<SkillsGapAnalysisRequirementBarProps> = ({
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

  return (
    <>
      <RightBar className={`w-full lg:w-[28%]`}>
        <div className="flex h-[80vh] flex-col justify-between">
          <div>
            {/* <p className="text-[22px] font-bold mb-10">Skills gap analysis</p> */}

            <div>
              <label
                htmlFor="industryOfInterest"
                className="text-[14px] font-semibold text-[#5C5C5C]"
              >
                Industry Of Interest <span className="text-red-500">*</span>
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

            <div className="">
              <label
                htmlFor="jobPositionLevel"
                className="text-[14px] font-semibold text-[#5C5C5C]"
              >
                Job Position Level <span className="text-red-500">*</span>
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
                {/* <option value={userData?.jobPositionLevel ?? ""}>
                  {userData?.jobPositionLevel ?? "Select an option"}{" "}
                </option>{" "} */}
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
                htmlFor="monthsUntilSeparation"
                className="text-[14px] font-semibold text-[#5C5C5C]"
              >
                Months until separation
              </label>
              <input
                id="monthsUntilSeparation"
                name="monthsUntilSeparation"
                value={fields.monthsUntilSeparation}
                onChange={handleChange}
                type="number"
                min="0"
                placeholder="Enter job Months until seperation"
                className={` ${styles.inputFieldCss}`}
              />
            </div>

            <div>
              <label
                htmlFor="jobPositionLevel"
                className="text-[14px] font-semibold text-[#5C5C5C]"
              >
                Job Title
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                value={fields.jobTitle}
                onChange={handleChange}
                type="text"
                placeholder="Enter job title"
                className={` ${styles.inputFieldCss}`}
              />
            </div>
            <p className="text-error">{errorMessage}</p>

            <Button
              className={`w-full rounded-lg bg-[#63B017] px-4 py-2 font-bold text-white ${
                history.length > 0 ||
                userData?.freeMessagesLimitExhausted ||
                isGenerating
                  ? "pointer-events-none opacity-50"
                  : ""
              }  ${loader ? "pointer-events-none opacity-50" : ""}
              `}
              onClick={handleCareerWizardResponse}
              disabled={
                history.length > 0 || userData?.freeMessagesLimitExhausted
              }
            >
              Generate
            </Button>
          </div>

          {userData?.freeMessagesLimitExhausted && (
            <div className="flex justify-between rounded-lg bg-pink-200 p-4">
              <div>
                <BiErrorCircle size={24} className="text-red-600" />
              </div>
              <div className="ml-4">
                <p className="max-w-5xl text-[#565656]">
                  0 messages remaining.{" "}
                  <Link href="/pricing" className="font-bold text-[#648940]">
                    Upgrade your plan&nbsp;
                  </Link>
                  to use the tools.
                </p>
              </div>
            </div>
          )}
        </div>
      </RightBar>
    </>
  );
};

export default RequirementBar;
