import { FC, Fragment, useEffect, useState } from "react";

// data imports

// atoms imports
import Button from "@/components/atoms/Button";
import RightBar from "@/components/atoms/RightBar";

// components imports
import Tips from "@/components/tips/Tips";
import { useRouter } from "next/router";

//redux imports
import { useAppSelector } from "@/redux/store/store";

//react icons imports
import { CareerWizardRequirementBarProps } from "@/types/tools.interface";

import { styles } from "@/styles/style";
import { industryOfInterest } from "../data/data";
import { GET } from "@/services/API/AxiosRequests";
import { URL } from "@/services/API";
import { FaLightbulb } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";

const RequirementBar: FC<CareerWizardRequirementBarProps> = ({
  fields,
  setFields,
  handleCareerWizardResponse,
  loader,
  history,
  errorMessage,
  setErrorMessage,
  isGenerating,
  setRecommendations,
  recommendations,
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

  const [recommendationLoader, setRecommendationLoader] =
    useState<boolean>(false);

  const userData = useAppSelector((state) => state.auth.user);

  const token = useAppSelector((state) => state.auth.token);

  const profileStatus = userData?.profileStatus;

  const router = useRouter();

  const getRecommendations = async () => {
    if (recommendationLoader) {
      toast.error("Please wait for the suggestions to be generated");
      return;
    }

    try {
      setRecommendationLoader(true);
      const { recommendations } = await GET(
        URL.INDUSTRY_RECOMMENDATION,
        token as string,
      );

      setRecommendations(JSON.parse(recommendations));

      setRecommendationLoader(false);
    } catch (error) {
      setRecommendationLoader(false);
      console.error("error", error);
    }
  };

  return (
    <Fragment>
      <RightBar className={`w-full lg:w-[30%]`}>
        <div className="flex h-[80vh] flex-col justify-between">
          <div>
            {profileStatus === "complete" ? (
              ""
            ) : (
              <Fragment>
                <Tips position="items-end" top="top-[75%]">
                  For a better experience, complete your profile! If you know
                  what job you want, use the Skill Gap Analysis tool!
                </Tips>
                <Button
                  onClick={() => router.push("/profile")}
                  className="my-4"
                >
                  Edit Profile
                </Button>
              </Fragment>
            )}

            <div className="">
              <div>
                <label
                  htmlFor="industryOfInterest"
                  className="text-[14px] font-semibold text-[#5C5C5C]"
                >
                  Industry Of Interest
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

              <div
                className="
                flex items-center justify-end gap-1 text-[#5C5C5C] hover:text-[#63B017]
              "
                onClick={getRecommendations}
              >
                <p
                  className="
                cursor-pointer text-right text-[14px] font-semibold 
                "
                >
                  Need AI suggestions?{" "}
                </p>
                <FaLightbulb />
              </div>
            </div>

            <div>
              <label
                htmlFor="jobLocation"
                className="text-[14px] font-semibold text-[#5C5C5C]"
              >
                Job Location
              </label>
              <input
                type="text"
                name="jobLocation"
                value={fields.jobLocation}
                onChange={handleChange}
                placeholder="Enter job location"
                className={` ${styles.inputFieldCss}`}
              />
            </div>

            <div className="">
              {recommendationLoader ? (
                <div className="my-3 text-center">
                  <TailSpin
                    height="40"
                    width="40"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{
                      justifyContent: "center",
                      marginBottom: "10px",
                    }}
                    wrapperClass=""
                    visible={true}
                  />
                  <p
                    className="
                  ml-2 text-[14px] font-semibold text-[#5C5C5C]
                  "
                  >
                    Suggestions are being generated, please wait a few seconds
                  </p>
                </div>
              ) : (
                <Fragment>
                  <p className="my-1 text-[22px] font-bold">
                    {recommendations && recommendations.length > 0
                      ? "Suggested Industries for You"
                      : ""}
                  </p>
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    {recommendations.map((recommendation: string) => (
                      <p
                        key={recommendation}
                        className="m-1 mb-1 rounded-full bg-[#E7FBD4] p-2 px-2 py-2 text-center font-semibold text-black"
                      >
                        {recommendation}
                      </p>
                    ))}
                  </div>
                </Fragment>
              )}
            </div>
            <p className="text-error">{errorMessage}</p>

            <Button
              className={`w-full rounded-lg bg-[#63B017] px-4 py-2 font-bold text-white ${
                history.length > 0 || isGenerating || loader
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
              onClick={handleCareerWizardResponse}
            >
              Generate
            </Button>
          </div>
        </div>
      </RightBar>
    </Fragment>
  );
};

export default RequirementBar;
