// react imports
import { FC } from "react";

// atom imports
import LeftBar from "@/components/atoms/LeftBar";

// next imports

import Image from "next/image";

// public imports
import { useDimension } from "@/hooks/useDimension";
import edit from "../../../public/assets/edit.svg";
import save from "../../../public/assets/save.svg";
import copy from "../../../public/assets/copy.svg";
import { Circles } from "react-loader-spinner";
import ReactMarkdown from "react-markdown";

import Markdown from "react-markdown";
import { CoverLetterWizardChatBarProps } from "@/types/tools.interface";
import SkeletonCode from "@/components/skeletonCode/SkeletonCode";
import FunFacts from "@/components/skeletonCode/FunFacts";
import ModalFunFacts from "@/components/skeletonCode/ModalFunFacts";

const ChatBar: FC<CoverLetterWizardChatBarProps> = ({
  coverLetterResponse,
  isEditing,
  handleSaveClick,
  setIsEditing,
  setEditedText,
  handleEditClick,
  editedText,
  handleCopyClick,
  saveChat,
  loader,
  isGenerating,
  clearConversation,
  isSkeletonCodeVisible,
}) => {
  const [width] = useDimension();
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

  return (
    <>
      <LeftBar
        className={`w-full lg:mx-4 xl:w-[70%]`}
        title="Cover Letter Wizard"
        description="Generates a draft cover letter based on job description"
        routerPath={`history/cover-letter-wizard`}
      >
        {loader && (
          <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
            <Circles
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}

        <div className="flex flex-col justify-between">
          {coverLetterResponse.length > 1 ? (
            <ModalFunFacts isSkeletonCodeVisible={isSkeletonCodeVisible} />
          ) : (
            <FunFacts isSkeletonCodeVisible={isSkeletonCodeVisible} />
          )}
          <div className="scrollbar flex min-h-[68vh] flex-col justify-between overflow-auto overflow-x-hidden">
            <div>
              {coverLetterResponse && (
                <div
                  className={`scrollbar  mb-2 mr-0  overflow-auto overflow-x-hidden rounded-lg bg-[#F5F5F5] p-5 px-5 ${
                    coverLetterResponse.length > 0
                      ? "max-h-[72vh] min-h-[72vh]"
                      : "max-h-[60vh] min-h-[60vh]"
                  }`}
                >
                  <div className="mb-2 mr-0 mt-5 rounded-lg bg-[#F5F5F5] p-5 ">
                    <div className="flex justify-end">
                      <div className="flex">
                        {isEditing ? (
                          <>
                            <button
                              onClick={handleSaveClick}
                              className="mx-1 cursor-pointer"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setIsEditing(false);
                                setEditedText(coverLetterResponse);
                              }}
                              className="mx-1 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </>
                        ) : coverLetterResponse ? (
                          <>
                            <div className="mb-4 flex">
                              <Image
                                className="mx-1 cursor-pointer"
                                src={copy}
                                alt="copy"
                                width={24}
                                height={24}
                                onClick={handleCopyClick}
                              />

                              <Image
                                onClick={handleEditClick}
                                className="mx-1 cursor-pointer"
                                src={edit}
                                alt="edit"
                                width={24}
                                height={24}
                              />
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                    {isEditing ? (
                      <textarea
                        className="my-3 whitespace-break-spaces rounded-lg p-4 text-textGray"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        rows={30}
                        cols={
                          width > 1600
                            ? 105 // Large screens
                            : width > 1300
                            ? 80 // Medium-sized screens
                            : width > 768
                            ? 60 // Small screens
                            : 28 // Mobile screens
                        }
                      />
                    ) : (
                      <ReactMarkdown
                        className="markdown-content max-w-full"
                        components={components} // Use components prop for customization
                      >
                        {coverLetterResponse.replaceAll("\n\n", "\n")}
                      </ReactMarkdown>

                      // <Markdown className="whitespace-break-spaces p-2 text-textGray">

                      // </Markdown>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mx-4 mb-3 mt-5 flex justify-between">
            <div
              className={`flex cursor-pointer rounded-lg border border-primary p-2 ${
                coverLetterResponse?.length > 0
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
                  coverLetterResponse?.length > 0
                    ? " bg-[#EEFFDE]"
                    : " pointer-events-none opacity-50"
                } ${isGenerating && "pointer-events-none opacity-50"} `}
                onClick={clearConversation}
              >
                Clear Conversation
              </button>
            </div>
          </div>
        </div>
      </LeftBar>
    </>
  );
};

export default ChatBar;
