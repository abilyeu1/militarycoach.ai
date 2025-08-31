import React, { FC } from "react";

// data imports
import { style, tones } from "../data/data";

// atoms imports
import Button from "@/components/atoms/Button";
import RightBar from "@/components/atoms/RightBar";

// components imports
import Tips from "@/components/tips/Tips";
import { useAppSelector } from "@/redux/store/store";
import { styles } from "@/styles/style";
import { CoverLetterWizardRequirementBarProps } from "@/types/tools.interface";
import Link from "next/link";
import { BiErrorCircle } from "react-icons/bi";

const RequirementBar: FC<CoverLetterWizardRequirementBarProps> = ({
  handleGenerate,
  setFields,
  fields,
  errorMessage,
  setErrorMessage,
  isGenerating,
  coverLetterResponse,
}) => {
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFields((prev: any) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setErrorMessage("");
  };
  const userData = useAppSelector((state) => state.auth.user);

  return (
    <>
      <RightBar className={`w-full xl:w-[28%]`}>
        <div className="flex h-full flex-col justify-between">
          <div>
            <Tips position="items-end" top="top-[75%]">
              Paste in the job description for the job you&apos;re applying for
              and I&apos;ll create a draft cover letter for you to use!
            </Tips>

            <div>
              <label
                htmlFor="tone"
                className="text-[14px] font-semibold text-[#5C5C5C]"
              >
                Tone<span className="text-red-500">*</span>
              </label>
              <select
                value={fields.tone}
                onChange={handleChange}
                name="tone"
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
                <option label="Select Tone" />
                {tones.map((option: any, index: number) => (
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
                htmlFor="style"
                className="text-[14px] font-semibold text-[#5C5C5C]"
              >
                Style<span className="text-red-500">*</span>
              </label>
              <select
                value={fields.style}
                onChange={(e) => handleChange(e)}
                name="style"
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
                <option label="Select Style" />
                {style.map((option: any, index: number) => (
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
                htmlFor="jobDescription"
                className="text-[14px] font-semibold text-[#5C5C5C]"
              >
                Job Description<span className="text-red-500">*</span>
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
              className={`mt-2 w-full md:w-60 
              ${
                coverLetterResponse || userData?.freeMessagesLimitExhausted
                  ? "pointer-events-none opacity-50"
                  : ""
              }  ${isGenerating ? "pointer-events-none opacity-50" : ""}
              `}
              disabled={
                coverLetterResponse || userData?.freeMessagesLimitExhausted
              }
              onClick={handleGenerate}
            >
              Generate Cover Letter
            </Button>
          </div>
          <div className="">
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
        </div>
      </RightBar>
    </>
  );
};

export default RequirementBar;
