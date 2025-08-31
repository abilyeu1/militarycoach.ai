import React from "react";
import { interviewQuestions } from "../data/data";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";

const Headline = () => {
  return (
    <>
      <div className="flex min-h-[92vh] flex-col justify-center px-4 py-10 md:px-16">
        <div className=" my-10 flex w-full flex-col justify-start rounded-xl border border-GrayBorder bg-white p-5 px-4 pt-10 md:my-0">
          <div>
            <div className="flex items-center">
              <Link href="/mock-interview-prep">
                <BsArrowLeft className="mr-2 cursor-pointer text-[20px] font-bold text-primary" />
              </Link>
              <p className="text-[32px] font-bold text-primary">Headline</p>
            </div>
            <hr className="my-4 border border-GrayBorder" />
            <ul>
              {interviewQuestions.map((question: any, index: number) => (
                <div key={index} className="my-3">
                  <p className="text-[24px] font-bold">{question.title}:</p>

                  <p> {question.description}:</p>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Headline;
