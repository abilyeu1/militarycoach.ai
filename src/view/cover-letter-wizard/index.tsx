//react imports

import React, { useEffect, useRef, useState } from "react";

// public imports

//axios imports
import { URL } from "@/services/API";
import { POST } from "@/services/API/AxiosRequests";

///next react imports
import { useRouter } from "next/router";

import { useDimension } from "@/hooks/useDimension";
import { calculateAge } from "@/utils/calculateAge";
import { Tools } from "@/utils/enums";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import ChatBar from "./chat-bar";
import RequirementBar from "./requirement-bar";
import { useAppSelector } from "@/redux/store/store";

const CoverLetterWizard = ({ conversation }: any) => {
  const [activeTab, setActiveTab] = useState<string>("tab2");
  const [width] = useDimension();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSkeletonCodeVisible, setIsSkeletonCodeVisible] =
    useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState(false);

  const userDetails = useAppSelector((state) => state.auth.user);
  const ageNumber = Number(userDetails?.age);

  const token = Cookies.get("accessToken");
  const [history, setHistory] = useState<any[]>([]);

  const [fields, setFields] = useState({
    tone: "",
    style: "",
    jobDescription: "",
  });
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const { query } = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [coverLetterResponse, setCoverLetterResponse] = useState<string>("");
  const [editedText, setEditedText] = useState(coverLetterResponse);

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const handleEditClick = () => {
    setEditedText(coverLetterResponse);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setCoverLetterResponse(editedText);
    setIsEditing(false);
  };

  const handleCoverLetterResponse = async () => {
    if (
      (fields.jobDescription === "" ||
        fields.style === "" ||
        fields.tone === "") &&
      !query.chatID
    ) {
      setErrorMessage("All fields are required");
      return;
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

      const promptDetails = {
        name: userDetails?.fullName,
        age: ageNumber,
        branchOfService: userDetails?.branchOfService,
        languages: userDetails?.languages,
        careers: careers,
        educations: userDetails?.education,
        professionalCertificates: userDetails?.certificates,
        ...fields,
        militaryRank: userDetails?.militaryRank,
      };

      // setLoader(true);

      setIsGenerating(true);

      const response = await POST(
        URL.COVER_LETTER_WIZARD,
        promptDetails,
        token,
      );
      setCoverLetterResponse(response.content);

      setIsGenerating(false);

      setIsSkeletonCodeVisible(false);
    } catch (error: any) {
      console.log("error", error);

      const errorMessage =
        error?.response?.data?.message ?? "Something went wrong.";

      setFields({
        tone: "",
        style: "",
        jobDescription: "",
      });

      setIsGenerating(false);

      setIsSkeletonCodeVisible(false);

      toast.error(errorMessage);
    }
  };

  const saveChat = async () => {
    try {
      const requestBody = {
        toolName: Tools.COVER_LETTER_WIZARD,
        conversation: [
          {
            role: "assistant",
            content: coverLetterResponse,
          },
        ],
      };

      await POST(URL.SAVE_CHAT, requestBody, token);
      toast.success("Chat saved successfully.");
    } catch (error) {
      console.log("error", error);
      toast.error("Chat not saved.");
    }
  };

  useEffect(() => {
    if (conversation) {
      setCoverLetterResponse(conversation.chat.conversation[0].content);
    }
  }, []);

  const clearConversation = () => {
    setCoverLetterResponse("");
  };

  const handleCopyClick = () => {
    toast.success("Copied");
    navigator.clipboard.writeText(coverLetterResponse).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    });
  };

  return (
    <>
      {/* These buttons will appear when the screen width is less than 1024 pixels.*/}
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

      <div className="  flex min-h-[78dvh] justify-center px-4 pb-5 pt-0 md:justify-between md:px-12 md:pb-0 lg:min-h-[92dvh] lg:pt-5">
        <div className="w-full">
          {width > 1024 && (
            <div className="flex h-full">
              <ChatBar
                coverLetterResponse={coverLetterResponse}
                isEditing={isEditing}
                handleSaveClick={handleSaveClick}
                setIsEditing={setIsEditing}
                setEditedText={setEditedText}
                handleEditClick={handleEditClick}
                editedText={editedText}
                handleCopyClick={handleCopyClick}
                saveChat={saveChat}
                loader={loader}
                isGenerating={isGenerating}
                clearConversation={clearConversation}
                isSkeletonCodeVisible={isSkeletonCodeVisible}
                setIsSkeletonCodeVisible={setIsSkeletonCodeVisible}
              />
              <RequirementBar
                errorMessage={errorMessage}
                handleGenerate={handleCoverLetterResponse}
                setFields={setFields}
                fields={fields}
                setErrorMessage={setErrorMessage}
                isGenerating={isGenerating}
                coverLetterResponse={coverLetterResponse}
              />
            </div>
          )}

          {width <= 1024 && activeTab === "tab1" && (
            <ChatBar
              coverLetterResponse={coverLetterResponse}
              isEditing={isEditing}
              handleSaveClick={handleSaveClick}
              setIsEditing={setIsEditing}
              setEditedText={setEditedText}
              handleEditClick={handleEditClick}
              editedText={editedText}
              handleCopyClick={handleCopyClick}
              saveChat={saveChat}
              isGenerating={isGenerating}
              loader={loader}
              clearConversation={clearConversation}
              isSkeletonCodeVisible={isSkeletonCodeVisible}
              setIsSkeletonCodeVisible={setIsSkeletonCodeVisible}
            />
          )}

          {width <= 1024 && activeTab === "tab2" && (
            <RequirementBar
              handleGenerate={handleCoverLetterResponse}
              setFields={setFields}
              fields={fields}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              isGenerating={isGenerating}
              coverLetterResponse={coverLetterResponse}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CoverLetterWizard;
