// React Imports
import { FC, Fragment } from "react";

// Next JS Imports
import Image from "next/image";

// React Drag Drop Files Import
import { FileUploader } from "react-drag-drop-files";

// Assets Imports
import uploadIcon from "../../../public/assets/upload-icon.svg";

interface IResumeUploaderProps {
  handleChange: any;
  fileTypes: any;
}

const ResumeUploader: FC<IResumeUploaderProps> = ({
  handleChange,
  fileTypes,
}) => {
  return (
    <Fragment>
      <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#AAAAAA] bg-[#ECECEC]">
        <FileUploader
          handleChange={handleChange}
          onDrop={handleChange}
          name="file"
          types={fileTypes}
          className="file-uploader"
          style={{ display: "flex" }}
        >
          <div className="flex flex-col items-center">
            <p className="mb-2 text-[16px] text-[#9C9C9C]">
              Upload or drag and drop
            </p>
            <p className="text-[16px] text-[#9C9C9C]">
              PDF (Preferred), DOCX, DOC, RTF, TXT up to 5MB
            </p>
            <div className="my-2 flex w-full rounded-lg border border-[#5C5C5C] px-2 py-1 md:w-[220px] ">
              <div className="flex w-full cursor-pointer justify-center py-2 md:w-[300px]">
                <Image
                  src={uploadIcon}
                  alt="Upload Resume"
                  width={24}
                  height={24}
                />

                <button className="ml-2  text-[#5C5C5C]">
                  Upload a Resume
                </button>
              </div>
            </div>
          </div>
        </FileUploader>
      </div>
    </Fragment>
  );
};

export default ResumeUploader;
