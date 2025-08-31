// react imports
import { FC, useEffect, useRef } from "react";

// atom imports
import LeftBar from "@/components/atoms/LeftBar";

// next imports

import Image from "next/image";

// react-icons imports

// public imports
import { toast } from "react-toastify";
//public imports
import save from "../../../public/assets/save.svg";
import copy from "../../../public/assets/copy.svg";
import send from "../../../public/assets/send.svg";
import ReactMarkdown from "react-markdown";

// react icons imports
import { Circles } from "react-loader-spinner";
import Markdown from "react-markdown";
import SkeletonCode from "@/components/skeletonCode/SkeletonCode";

// types imports
import { MockInterViewPrepChatBarProps } from "@/types/tools.interface";
import FunFacts from "@/components/skeletonCode/FunFacts";
import ModalFunFacts from "@/components/skeletonCode/ModalFunFacts";

const ChatBar: FC<MockInterViewPrepChatBarProps> = ({
  questions,
  careerWizardResponse,
  handleQuestionClick,
  selectedQuestion,
  setSelectedQuestion,
  handleCareerWizardResponse,

  startConversation,
  loader,
  clearConversation,
  history,
  isGenerating,
  saveChat,
  isSkeletonCodeVisible,
}: any) => {
  const handleChange = (e: any) => {
    setSelectedQuestion(e.target.value);
  };

  const handleClick = () => {
    if (history.length > 1 || careerWizardResponse.length) {
      handleCareerWizardResponse();
    }
  };

  const renderLink = (props: any) => {
    const { href, children } = props;
    const isExternal = /^(https?:)?\/\//.test(href);

    const linkProps = {
      href,
      target: isExternal ? "_blank" : undefined,
      rel: isExternal ? "noopener noreferrer" : undefined,
      className: isExternal ? "external-link" : undefined,
    };

    return <a {...linkProps}>{children}</a>;
  };

  const components = {
    a: renderLink, // Use the renderLink function for rendering links
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [history]);

  return (
    <>
      <LeftBar
        className={`w-full lg:mx-4 lg:w-[70%]`}
        title="Mock Interview Prep"
        description="Generates interview questions and what your response could be"
        routerPath={`history/mock-interview-prep`}
      >
        {loader && (
          <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
            <Circles
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="circles-loading"
              visible={true}
            />
          </div>
        )}

        <div className="flex flex-col justify-between">
          <div className="">
            {history.length > 1 ? (
              <ModalFunFacts isSkeletonCodeVisible={isSkeletonCodeVisible} />
            ) : (
              <FunFacts isSkeletonCodeVisible={isSkeletonCodeVisible} />
            )}
            <div
              className="scrollbar max-h-[64vh] min-h-[64vh] overflow-auto overflow-x-hidden px-1 md:px-5"
              ref={containerRef}
            >
              <div className="my-5 flex ">
                <div
                  className={`mb-2 ml-1 mr-0 flex-1 rounded-lg p-1 md:ml-4 md:mr-10 md:p-5 lg:relative `}
                >
                  {history.slice(2).map((item: any, index: number) => (
                    <div
                      key={index}
                      className={`${
                        item.role === "user"
                          ? "flex justify-end"
                          : "flex justify-start"
                      }`}
                    >
                      {item.content && (
                        <pre
                          className={`relative my-5 whitespace-pre-line ${
                            item.role === "user"
                              ? "my-2 rounded-xl border border-primary p-2 text-left text-primary md:max-w-[60%] lg:p-3 lg:text-right"
                              : "rounded-xl bg-[#F5F5F5] p-5 pt-[50px] md:max-w-[60%]"
                          }`}
                        >
                          {item.role === "assistant" && (
                            <div>
                              <Image
                                className="absolute right-5 top-5 mx-1 cursor-pointer"
                                src={copy}
                                alt="copy"
                                width={24}
                                height={24}
                                onClick={() => {
                                  navigator.clipboard
                                    .writeText(item.content.split("##")[0])
                                    .then(() => {
                                      toast.success("Copied");
                                    });
                                }}
                              />
                            </div>
                          )}
                          <ReactMarkdown
                            className="markdown-content max-w-full"
                            components={components} // Use components prop for customization
                          >
                            {item.content
                              .split("##")[0]
                              .replaceAll("\n\n", "\n")}
                          </ReactMarkdown>
                        </pre>
                      )}
                    </div>
                  ))}

                  {careerWizardResponse && careerWizardResponse.length > 0 && (
                    <>
                      {selectedQuestion && selectedQuestion.length > 0 && (
                        <div className="flex justify-end">
                          <p className="md:max-w-[60%]w-full my-2 cursor-pointer rounded-xl border border-primary p-2 text-left text-primary lg:p-3 lg:text-right">
                            {selectedQuestion}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="rounded-xl bg-[#F5F5F5] p-5 md:max-w-[60%]">
                          {careerWizardResponse}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {!startConversation && (
                <div className="mb-10 flex  flex-col md:items-end">
                  {questions.map((ques: any, index: number) => (
                    <p
                      key={index}
                      className="md:max-w-[60%]w-full my-2 cursor-pointer rounded-xl border border-primary p-2 text-left text-[13px] text-primary md:text-[16px] lg:p-3 lg:text-right"
                      onClick={() => handleQuestionClick(ques)}
                    >
                      {ques}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="mx-4 mb-3 flex justify-between">
                <div
                  className={`flex cursor-pointer rounded-lg border border-primary p-2 ${
                    careerWizardResponse.length > 0 || history.length > 0
                      ? " bg-[#EEFFDE]"
                      : " pointer-events-none opacity-50"
                  } ${isGenerating && "pointer-events-none opacity-50"} `}
                  onClick={saveChat}
                >
                  <Image src={save} alt="find" width={24} height={24} />
                  <p className="px-2 text-[14px] text-primary md:text-[16px]">
                    Save
                  </p>
                </div>

                <div>
                  <button
                    className={`rounded-lg bg-primary px-2 py-3 text-[14px] text-white md:px-6 md:py-3 md:text-[16px] ${
                      careerWizardResponse.length > 0 || history.length > 0
                        ? " bg-[#EEFFDE]"
                        : " pointer-events-none opacity-50"
                    } ${isGenerating && "pointer-events-none opacity-50"} `}
                    onClick={clearConversation}
                  >
                    Clear Conversation
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-[60%] md:w-[90%]">
                  <input
                    type="text"
                    value={selectedQuestion}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (!selectedQuestion) {
                          return;
                        }
                        handleClick();
                      }
                    }}
                    placeholder="Send a message"
                    className={`!lg:w-[70%] !placeholder:text-black mb-2 mt-2 !w-full rounded-lg border !border-gray bg-transparent px-4 py-3 text-black  focus:outline-none sm:w-[80%]  ${
                      loader ? "pointer-events-none opacity-50" : ""
                    }  ${isGenerating && "pointer-events-none opacity-50"} ${
                      history.length > 1 || careerWizardResponse.length
                        ? "cursor-auto"
                        : "pointer-events-none opacity-50"
                    } `}
                    disabled={loader}
                  />
                </div>
                <div className="ml-3">
                  <div
                    className={`flex rounded-lg bg-primary px-10 py-3 text-white  md:px-6 ${
                      history.length > 1 || careerWizardResponse.length
                        ? "cursor-pointer"
                        : "pointer-events-none opacity-50"
                    } ${isGenerating && "pointer-events-none opacity-50"} `}
                    onClick={handleClick}
                  >
                    <p className="mr-2 hidden md:block">Send</p>
                    <Image
                      className="hidden md:block"
                      src={send}
                      alt="find"
                      width={24}
                      height={24}
                    />
                    <Image
                      className="block md:hidden"
                      src={send}
                      alt="find"
                      width={28}
                      height={28}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LeftBar>
    </>
  );
};

export default ChatBar;
