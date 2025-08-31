// react imports
import { FC, Fragment } from "react";

// Mock Data Imports
import { branchOfServices, availableLanguages, ranks } from "../data/data";

// Custom Hooks Imports
import { useDimension } from "@/hooks/useDimension";

// NPM package Imports
import { ErrorMessage, Field } from "formik";
import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";

// React Icons Imports
import { BsArrowRight } from "react-icons/bs";

// Type imports
import { PersonalDetailsProps } from "@/types/signUpFormTypes";

// Style imports
import { styles } from "@/styles/style";

// Component Imports
import ResumeUploader from "./ResumeUploader";

const MilitaryMemberPersonalDetails: FC<PersonalDetailsProps> = ({
  handleStepClick,
  formik,
  handleFileChange,
  langError,
  onSelectLang,
  languages,
  setLanguages,
}) => {
  const [width] = useDimension();

  const fileTypes: String[] = ["pdf", "doc", "docx"];

  const handleChange = (file: any) => {
    handleFileChange(file);
    console.log("file", file);
  };

  return (
    <Fragment>
      <div className="mt-20">
        <div>
          <div className="flex items-center justify-between">
            <p className="mb-0 text-left text-[20px] font-bold md:mb-5 md:text-[40px]">
              Basic information
            </p>
          </div>

          <div className="">
            <p className="font-500 mb-4  text-[24px] text-[#5C5C5C]">
              Upload a resume
            </p>
            <ResumeUploader handleChange={handleChange} fileTypes={fileTypes} />
            <div className="my-5">
              <p className="font-600 text-[22px] text-[#5C5C5C] md:text-[23px]">
                Or complete Your Profile{" "}
                <span className="text-primary"> Manually </span>
              </p>
            </div>
          </div>

          <Fragment>
            {/* Top Section */}
            <div className="block lg:flex">
              {/* Full Name */}
              <div className="mx-0 mt-2 w-[100%] md:mx-2 lg:w-[32%]">
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
                  placeholder="Enter your name"
                  className={` ${styles.inputFieldCss}`}
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-error"
                />
              </div>

              {/* Age */}
              <div className="mx-0 mt-2 w-[100%] md:mx-2 lg:w-[32%]">
                <label
                  htmlFor="Age"
                  className="text-[14px] font-semibold text-[#5C5C5C]"
                >
                  Age (optional)
                </label>
                <Field
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter Age"
                  min="18"
                  value={formik.values.age == 0 ? "" : formik.values.age}
                  className={` ${styles.inputFieldCss}`}
                  // onChange={() => {
                  //   formik.handleChange;
                  // }}
                  onChange={formik.handleChange}
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-error"
                />
              </div>

              {/*Branch Of Service  */}
              <div className="mx-0 mt-2 w-[100%] md:mx-2 lg:w-[32%]">
                <label
                  htmlFor="branchOfServices"
                  className="text-[14px] font-semibold text-[#5C5C5C]"
                >
                  Branch of Service <span className="text-red-500">*</span>
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
                >
                  <option label="Select" />
                  {branchOfServices.map((option: any, index: number) => (
                    <option
                      key={index}
                      value={option.value}
                      label={option.label}
                    />
                  ))}
                </Field>
                <ErrorMessage
                  name="Branch of services"
                  component="div"
                  className="text-error"
                />
              </div>
            </div>

            {/* Bottom Section */}
            <div className=" block w-full md:flex">
              {/* Military Rank */}
              <div className="mx-0 mt-2 w-[100%] md:mx-2 lg:w-[32%]">
                <label
                  htmlFor="rank"
                  className="text-[14px] font-semibold text-[#5C5C5C]"
                >
                  Rank <span className="text-red-500">*</span>
                </label>
                <Field
                  as="select"
                  name="rank"
                  className={`!lg:w-[70%] !placeholder:text-black mb-2 mt-2 !w-full cursor-pointer rounded-lg border !border-gray bg-transparent px-4 py-2 py-2 text-black focus:outline-none sm:w-[80%] lg:lg:py-[16px]`}
                  style={{
                    paddingRight: "30px",
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23000000' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>\")",
                    backgroundPosition: "calc(100% - 10px) center",
                    backgroundRepeat: "no-repeat",
                    color: "black",
                    appearance: "none",
                  }}
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
                  name="rank"
                  component="div"
                  className="text-error"
                />
              </div>

              {/* Languages */}
              <div className="relative top-[10px] mx-0 mt-2 w-[100%] md:mx-2 lg:w-[32%]">
                <label
                  htmlFor="languages"
                  className="relative bottom-[8px] text-[14px] font-semibold text-[#5C5C5C]"
                >
                  Languages <span className="text-red-500">*</span>
                </label>
                {/* <div className="custom-multiselect flex w-full flex-wrap">
                  <Multiselect
                    isObject={false}
                    onSelect={(a) => {
                      setLanguages(a);
                    }}
                    onRemove={(a) => {
                      setLanguages(a);
                    }}
                    selectedValues={languages}
                    options={availableLanguages}
                    onKeyPressFn={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }

                      onSelectLang(e.target.value);
                      return;
                    }}
                    style={{ border: "1px solid #000", padding: "10px" }}
                  />

                  <div className="w-full">
                    {langError && (
                      <p className="text-error">Languages are required</p>
                    )}
                  </div>
                </div> */}

                <div className="">
                  <Select
                    options={availableLanguages}
                    onChange={onSelectLang}
                    isMulti
                  />
                </div>
                <ErrorMessage
                  name="languages"
                  component="div"
                  className="text-error"
                />

                <p className="text-error">{langError}</p>

                {/* <div className="custom-multiselect flex w-full flex-wrap">
                  <Multiselect
                    isObject={false}
                    onSelect={(a) => {
                      setLanguages(a);
                    }}
                    onRemove={(a) => {
                      setLanguages(a);
                    }}
                    selectedValues={languages}
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
                </div> */}
              </div>
            </div>
          </Fragment>
        </div>

        <div className="mt-20 flex w-full items-center justify-end">
          {width < 1024 ? (
            <div>
              <button
                onClick={() => handleStepClick(1)}
                className="ml-2 flex items-center rounded-lg bg-primary px-4 py-2 font-bold text-white"
              >
                <BsArrowRight className="mr-2 font-bold text-white" />
              </button>
            </div>
          ) : (
            <div className="flex w-full cursor-pointer items-center justify-end">
              <button
                type="button"
                onClick={() => handleStepClick(1)}
                className="flex items-center rounded-lg border border-primary px-4 py-2 font-bold text-primary"
              >
                Next
                <BsArrowRight className="ml-2 font-bold text-primary" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default MilitaryMemberPersonalDetails;
