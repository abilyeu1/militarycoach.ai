//react imports

import React, { FC, useEffect, useState } from "react";

// public imports

import { useDimension } from "@/hooks/useDimension";
import { URL } from "@/services/API";
import { POST } from "@/services/API/AxiosRequests";
import { calculateAge } from "@/utils/calculateAge";
import { Tools } from "@/utils/enums";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { uuid } from "uuidv4";
import ChatBar from "./chat-bar";
import Requirement from "./requirement";
import { useAppSelector } from "@/redux/store/store";

interface Iprops {
  conversation: any;
}

const MockInterViewPrep: FC<Iprops> = ({ conversation }) => {
  const [activeTab, setActiveTab] = useState<string>("tab2");

  const [inputValue, setInputValue] = useState<string>("");
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(
    null,
  );
  const [displaySuggestions, setDisplaySuggestions] = useState<boolean>(false);

  const onInputClick = () => {
    setDisplaySuggestions(!displaySuggestions);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setDisplaySuggestions(true);
  };

  const [width] = useDimension();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSkeletonCodeVisible, setIsSkeletonCodeVisible] =
    useState<boolean>(false);
  const [careerWizardResponse, setCareerWizardResponse] = useState("");

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [questions, setQuestions] = useState([]);

  const [selectedQuestion, setSelectedQuestion] = useState<string>("");

  const [startConversation, setStartConversation] = useState<boolean>(false);

  const [history, setHistory] = useState<any[]>([]);

  const [chatId, setChatID] = useState<string | null>(null);

  const [fields, setFields] = useState({
    industryOfInterest: "",
    jobPositionLevel: "",
    interviewFormatSelection: "",
    jobTitle: "",
    jobDescription: "",
  });

  const handleQuestionClick = (ques: any) => {
    setSelectedQuestion(ques);
  };

  const userDetails = useAppSelector((state) => state.auth.user);

  const token = Cookies.get("accessToken");

  const { query, replace } = useRouter();

  const handleCareerWizardResponse = async () => {
    setStartConversation(true);

    let randomID;

    if (
      (fields.interviewFormatSelection === "" ||
        fields.jobTitle === "" ||
        fields.jobPositionLevel === "") &&
      !query.chatID
    ) {
      setErrorMessage("Required fields must be filled");
      return;
    }

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
        interviewFormat: fields.interviewFormatSelection,
        militaryRank: userDetails?.militaryRank,
      };

      const requestBody = {
        message,
        promptDetails,
      };

      // setLoader(true);
      setIsGenerating(true);

      const response = await POST(
        `${URL.MOCK_INTERVIEW_PREP}/${
          query.chatID ? query.chatID : chatId ? chatId : randomID?.toString()
        }`,
        requestBody,
        token,
      );

      /**
       * If query id is available use query id
       * If Chat ID state is empty use random ID
       * If chat id state has ID then use chatID
       */

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

      toast.success("Generated mock interview prep");
      setIsGenerating(false);
      // setLoader(false);
      setIsSkeletonCodeVisible(false);
    } catch (error: any) {
      console.log(
        "error",
        error.response.data.message ?? "Something went wrong",
      );

      setIsGenerating(false);

      setIsSkeletonCodeVisible(false);

      toast.error(error.response.data.message ?? "Something went wrong");
    } finally {
      setSelectedQuestion("");
      // setLoader(false);
    }
  };

  const saveChat = async () => {
    try {
      const requestBody = {
        chatID: query.chatID ?? null,
        toolName: Tools.MOCK_INTERVIEW_PREP,
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

    if (query.chatID) {
      replace("/mock-interview-prep", undefined, { shallow: true });
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
        <div className="flex justify-center py-5 lg:hidden">
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
                  saveChat={saveChat}
                  history={history}
                  isGenerating={isGenerating}
                  isSkeletonCodeVisible={isSkeletonCodeVisible}
                />
                <Requirement
                  setErrorMessage={setErrorMessage}
                  fields={fields}
                  setFields={setFields}
                  handleCareerWizardResponse={handleCareerWizardResponse}
                  loader={loader}
                  history={history}
                  errorMessage={errorMessage}
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
                isGenerating={isGenerating}
                saveChat={saveChat}
                history={history}
                isSkeletonCodeVisible={isSkeletonCodeVisible}
              />
            )}

            {width <= 1024 && activeTab === "tab2" && (
              <Requirement
                isGenerating={isGenerating}
                fields={fields}
                setErrorMessage={setErrorMessage}
                setFields={setFields}
                handleCareerWizardResponse={handleCareerWizardResponse}
                loader={loader}
                history={history}
                errorMessage={errorMessage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MockInterViewPrep;
