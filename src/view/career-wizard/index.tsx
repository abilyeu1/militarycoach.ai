//react imports

import { FC, useEffect, useState } from "react";

// public imports

//redux imports
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { updateUser } from "@/redux/slices/authSlice";

import { useDimension } from "@/hooks/useDimension";

//axios imports
import { URL } from "@/services/API";
import { POST } from "@/services/API/AxiosRequests";

//next/react imports
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { calculateAge } from "@/utils/calculateAge";
import { Tools } from "@/utils/enums";
import Cookies from "js-cookie";
import { uuid } from "uuidv4";
import ChatBar from "./chat-bar";
import Requirement from "./requirement";

interface IProps {
  conversation: any;
}

const CareerWizard: FC<IProps> = ({ conversation }) => {
  const [activeTab, setActiveTab] = useState<string>("tab2");

  const [jobLocation, setJobLocation] = useState<string>("");

  const [displaySuggestions, setDisplaySuggestions] = useState<boolean>(false);

  const [width] = useDimension();

  const [careerWizardResponse, setCareerWizardResponse] = useState<string>("");

  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const [loader, setLoader] = useState<boolean>(false);

  const [recommendations, setRecommendations] = useState<string[]>([]);

  const [isSkeletonCodeVisible, setIsSkeletonCodeVisible] =
    useState<boolean>(false);

  const [questions, setQuestions] = useState([]);

  const [selectedQuestion, setSelectedQuestion] = useState<string>("");

  const [startConversation, setStartConversation] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [history, setHistory] = useState<any[]>([]);

  const [chatId, setChatID] = useState<string | null>(null);

  const [fields, setFields] = useState({
    jobLocation: "",
    industryOfInterest: "",
  });
  const handleQuestionClick = (ques: any) => {
    setSelectedQuestion(ques);
  };

  const userDetails = useAppSelector((state) => state.auth.user);

  const token = Cookies.get("accessToken");

  const dispatch = useAppDispatch();

  const { query, replace } = useRouter();

  const onInputClick = () => {
    setDisplaySuggestions(!displaySuggestions);
  };

  const handleCareerWizardResponse = async () => {
    // if (fields.jobLocation && !query.chatID) {
    //   setErrorMessage("Required field must be filled");
    //   return;
    // }

    setStartConversation(true);

    let randomID;

    if (!chatId) {
      randomID = uuid();
      setChatID(randomID);
    }
    setIsSkeletonCodeVisible(false);

    try {
      // setLoader(true);
      setIsGenerating(true);
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
        militaryRank: userDetails?.militaryRank,
        jobLocation: fields.jobLocation,
      };

      const requestBody = {
        message,
        promptDetails,
      };

      const response = await POST(
        `${URL.CAREER_WIZARD}/${
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

      dispatch(updateUser(response.user));

      toast.success("Generated career wizard");

      setIsGenerating(false);

      setIsSkeletonCodeVisible(false);
      // setLoader(false);
    } catch (error: any) {
      console.log("error", error);

      const errorMessage =
        error?.response?.data?.message ?? "Something went wrong";

      setIsGenerating(false);

      setIsSkeletonCodeVisible(false);

      toast.error(errorMessage);
    } finally {
      setSelectedQuestion("");
    }
  };

  const saveChat = async () => {
    try {
      const requestBody = {
        chatID: query.chatID ?? null,
        toolName: Tools.CAREER_WIZARD,
        conversation: history,
      };

      const response = await POST(URL.SAVE_CHAT, requestBody, token);

      toast.success("Chat saved successfully.");
    } catch (error) {
      console.log("error", error);
      toast.error("Chat not saved.");
    }
  };

  const clearConversation = () => {
    setFields({
      jobLocation: "",
      industryOfInterest: "",
    });
    setHistory([]);
    setCareerWizardResponse("");
    setQuestions([]);
    setSelectedQuestion("");
    if (query.chatID) {
      replace("/career-wizard/", undefined, { shallow: true });
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

  useEffect(() => {
    // Add an event listener for the beforeunload event
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (e: any) => {
    // Display a custom message in the confirmation dialog
    const confirmationMessage =
      "Your unsaved changes may be lost. Do you want to continue?";
    e.returnValue = confirmationMessage;

    // Use window.confirm to show the custom message
    if (!window.confirm(confirmationMessage)) {
      // If the user clicks "Cancel" in the confirmation dialog, prevent page refresh
      e.preventDefault();
    }
  };

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
                  setErrorMessage={setErrorMessage}
                  careerWizardResponse={careerWizardResponse}
                  handleQuestionClick={handleQuestionClick}
                  selectedQuestion={selectedQuestion}
                  setSelectedQuestion={setSelectedQuestion}
                  handleCareerWizardResponse={handleCareerWizardResponse}
                  setStartConversation={setStartConversation}
                  startConversation={startConversation}
                  clearConversation={clearConversation}
                  saveChat={saveChat}
                  history={history}
                  loader={loader}
                  isGenerating={isGenerating}
                  isSkeletonCodeVisible={isSkeletonCodeVisible}
                  setIsSkeletonCodeVisible={setIsSkeletonCodeVisible}
                />
                <Requirement
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  fields={fields}
                  setFields={setFields}
                  handleCareerWizardResponse={handleCareerWizardResponse}
                  loader={loader}
                  history={history}
                  isGenerating={isGenerating}
                  jobLocation={jobLocation}
                  setJobLocation={setJobLocation}
                  setRecommendations={setRecommendations}
                  recommendations={recommendations}
                />
              </div>
            )}

            {width <= 1024 && activeTab === "tab1" && (
              <ChatBar
                setErrorMessage={setErrorMessage}
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
                setIsSkeletonCodeVisible={setIsSkeletonCodeVisible}
              />
            )}

            {width <= 1024 && activeTab === "tab2" && (
              <Requirement
                fields={fields}
                setFields={setFields}
                setErrorMessage={setErrorMessage}
                errorMessage={errorMessage}
                handleCareerWizardResponse={handleCareerWizardResponse}
                loader={loader}
                history={history}
                isGenerating={isGenerating}
                jobLocation={jobLocation}
                setJobLocation={setJobLocation}
                setRecommendations={setRecommendations}
                recommendations={recommendations}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerWizard;
