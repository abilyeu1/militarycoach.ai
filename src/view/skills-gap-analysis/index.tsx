//react imports

import React, { FC, useEffect, useState } from "react";

// public imports

//next imports
import { useRouter } from "next/router";

//react imports
import { toast } from "react-toastify";

//axios imports
import { URL } from "@/services/API";
import { POST } from "@/services/API/AxiosRequests";

//hooks imports

//hooks imports
import { useDimension } from "@/hooks/useDimension";

//redux imports
import { useAppSelector } from "@/redux/store/store";

//components imports
import Requirement from "./requirement";
import { calculateAge } from "@/utils/calculateAge";
import { Tools } from "@/utils/enums";
import Cookies from "js-cookie";
import { uuid } from "uuidv4";
import ChatBar from "./chat-bar";

interface Iprops {
  conversation: any;
}

const SkillsGapAnalysis: FC<Iprops> = ({ conversation }) => {
  const [activeTab, setActiveTab] = useState<string>("tab2");
  const [width] = useDimension();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [careerWizardResponse, setCareerWizardResponse] = useState("");
  const [isSkeletonCodeVisible, setIsSkeletonCodeVisible] =
    useState<boolean>(false);

  const [questions, setQuestions] = useState([]);

  const [selectedQuestion, setSelectedQuestion] = useState<string>("");

  const [startConversation, setStartConversation] = useState<boolean>(false);

  const [loader, setLoader] = useState<boolean>(false);

  const [history, setHistory] = useState<any[]>([]);

  const [chatId, setChatID] = useState<string | null>(null);

  const [fields, setFields] = useState({
    industryOfInterest: "",
    jobPositionLevel: "",
    monthsUntilSeparation: 0,
    jobTitle: "",
  });

  const handleQuestionClick = (ques: any) => {
    setSelectedQuestion(ques);
  };

  const userDetails = useAppSelector((state) => state.auth.user);

  const token = Cookies.get("accessToken");

  const { query, replace } = useRouter();

  const handleCareerWizardResponse = async () => {
    if (!fields.industryOfInterest || !fields.jobPositionLevel) {
      setErrorMessage("Required fields must be filled");
      return;
    }

    setStartConversation(true);

    let randomID;

    if (!chatId) {
      randomID = uuid();
      setChatID(randomID);
    }

    setIsSkeletonCodeVisible(false);

    try {
      setIsSkeletonCodeVisible(true);

      setActiveTab("tab1");
      const careers = userDetails?.workExperience.map((career: any) => {
        return {
          careerField: career.careerField,
          skills: career.skillsLeveragedInCareerField,
        };
      });

      const message = [
        ...history,
        {
          role: "user",
          content: selectedQuestion,
        },
      ];

      const promptDetails = {
        name: userDetails?.fullName,
        age: userDetails?.age,
        branchOfService: userDetails?.branchOfService,
        languages: userDetails?.languages,
        careers: careers,
        educations: userDetails?.education,
        professionalCertificates: userDetails?.certificates,
        industryOfInterest: fields.industryOfInterest,
        jobPositionLevel: fields.jobPositionLevel,
        monthsUntilSeparation: fields.monthsUntilSeparation,
        jobTitle: fields.jobTitle,
        militaryRank: userDetails?.militaryRank,
      };

      const requestBody = {
        message,
        promptDetails,
      };

      setIsGenerating(true);

      console.log(
        "query",
        query.chatID ? query.chatID : chatId ? chatId : randomID?.toString(),
      );

      const response = await POST(
        `${URL.SKILLS_GAP_ANALYSIS}/${
          query.chatID ? query.chatID : chatId ? chatId : randomID?.toString()
        }`,
        requestBody,
        token,
      );

      const basePrompt = response.basePrompt;

      setStartConversation(false);

      const hist = [
        {
          role: "user",
          content: selectedQuestion,
        },
        {
          role: "assistant",
          content: response.content,
        },
      ];
      if (history.length == 0) {
        hist.splice(1, 0, {
          role: "system",
          content: basePrompt,
        });
      }
      setHistory((prev) => [...prev, ...hist]);

      setCareerWizardResponse("");

      setQuestions(response.content.split("##").slice(1));

      toast.success("Generated Skills Gap Analysis");

      setIsGenerating(false);

      setIsSkeletonCodeVisible(false);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ?? "Something went wrong";

      console.log("error", errorMessage);

      setIsGenerating(false);

      setIsSkeletonCodeVisible(false);

      setFields({
        industryOfInterest: "",
        jobPositionLevel: "",
        monthsUntilSeparation: 0,
        jobTitle: "",
      });

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 10000,
      });
    } finally {
      setSelectedQuestion("");
    }
  };

  const saveChat = async () => {
    try {
      const requestBody = {
        chatID: query.chatID ?? null,
        toolName: Tools.SKILLS_GAP_ANALYSIS,
        conversation: history,
      };

      await POST(URL.SAVE_CHAT, requestBody, token);

      toast.success("Chat saved successfully.");
    } catch (error) {
      console.log("error", error);
      toast.error("Chat not saved.");
    }
  };

  const clearConversation = () => {
    setHistory([]);
    setCareerWizardResponse("");
    setQuestions([]);
    setSelectedQuestion("");
    setFields({
      industryOfInterest: "",
      jobPositionLevel: "",
      monthsUntilSeparation: 0,
      jobTitle: "",
    });
    if (query.chatID) {
      replace("/skills-gap-analysis", undefined, { shallow: true });
    }
  };
  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (conversation) {
      setHistory(conversation.chat.conversation);
    }
  }, []);
  return (
    <>
      {/* These buttons will appear when the screen width is less than 1024 pixels.*/}
      <div>
        <div className="flex  justify-center py-5 lg:hidden">
          <div className="rounded-xl bg-[#F5F5F5] p-3">
            <button
              className={`px-4 py-2 ${
                activeTab === "tab1"
                  ? "rounded-lg bg-primary text-white"
                  : "bg-gray-200 text-gray-700"
              } `}
              onClick={() => handleTabClick("tab1")}
            >
              Chat
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "tab2"
                  ? "rounded-lg bg-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleTabClick("tab2")}
            >
              Requirement
            </button>
          </div>
        </div>

        <div className="flex min-h-[78dvh] justify-center px-4 pb-5 pt-0 md:justify-between md:px-12 md:pb-0 lg:min-h-[92dvh] lg:pt-5">
          <div className="w-full">
            {width > 1024 && (
              <div className="flex h-full">
                <ChatBar
                  questions={questions}
                  careerWizardResponse={careerWizardResponse}
                  handleQuestionClick={handleQuestionClick}
                  selectedQuestion={selectedQuestion}
                  setSelectedQuestion={setSelectedQuestion}
                  handleCareerWizardResponse={handleCareerWizardResponse}
                  setStartConversation={setStartConversation}
                  startConversation={startConversation}
                  loader={loader}
                  clearConversation={clearConversation}
                  isGenerating={isGenerating}
                  saveChat={saveChat}
                  history={history}
                  isSkeletonCodeVisible={isSkeletonCodeVisible}
                />
                <Requirement
                  fields={fields}
                  setFields={setFields}
                  handleCareerWizardResponse={handleCareerWizardResponse}
                  loader={loader}
                  history={history}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  isGenerating={isGenerating}
                />
              </div>
            )}

            {width <= 1024 && activeTab === "tab1" && (
              <ChatBar
                questions={questions}
                careerWizardResponse={careerWizardResponse}
                handleQuestionClick={handleQuestionClick}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                handleCareerWizardResponse={handleCareerWizardResponse}
                setStartConversation={setStartConversation}
                startConversation={startConversation}
                loader={loader}
                clearConversation={clearConversation}
                saveChat={saveChat}
                history={history}
                isSkeletonCodeVisible={isSkeletonCodeVisible}
                isGenerating={isGenerating}
              />
            )}

            {width <= 1024 && activeTab === "tab2" && (
              <Requirement
                fields={fields}
                setFields={setFields}
                handleCareerWizardResponse={handleCareerWizardResponse}
                loader={loader}
                history={history}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                isGenerating={isGenerating}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillsGapAnalysis;
