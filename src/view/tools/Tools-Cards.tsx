// react imports
import { Fragment } from "react";

//next imports
import Image from "next/image";
import Link from "next/link";

//react icons imports
import { BsArrowRight } from "react-icons/bs";
import { GiQueenCrown } from "react-icons/gi";

// public imports
import bridge from "../../../public/assets/bridge.svg";
import bullet from "../../../public/assets/bullet.svg";
import career from "../../../public/assets/career.svg";
import cover from "../../../public/assets/letter.svg";
import liveInterview from "../../../public/assets/live-interview.svg";
import mock from "../../../public/assets/mock.svg";
import salary from "../../../public/assets/salary.svg";
import skill from "../../../public/assets/skills.svg";
import cv from "../../../public/assets/cv.svg";

const cardData = [
  {
    index: 0,
    image: career.src,
    title: "Career Wizard",
    description: "Provides civilian career paths based on member's profile",
    pathName: "/career-wizard",
    ButtonText: "Get Started",
    pricing: "Free",
    status: "released",
  },
  {
    index: 1,
    image: skill.src,
    title: "Skills Gap Analysis",
    description: "What you need to do to achieve your career goals",
    pathName: "/skills-gap-analysis",
    ButtonText: "Get Started",
    pricing: "Premium",
    status: "released",
  },
  {
    index: 2,
    image: cover.src,
    title: "Cover Letter Wizard",
    description: "Generates a draft cover letter based on job description",
    pathName: "/cover-letter-wizard",
    ButtonText: "Get Started",
    pricing: "Premium",
    status: "released",
  },
  {
    index: 3,
    image: bullet.src,
    title: "Bullet Translator",
    description:
      "Translates (legacy version) military bullets into CV/Resume bullets",
    pathName: "/bullet-translator",
    ButtonText: "Get Started",
    pricing: "Premium",
    status: "released",
  },
  {
    index: 4,
    image: mock.src,
    title: "Mock Interview Prep",
    description:
      "Generates interview questions and what your response could be",
    pathName: "/mock-interview-prep",
    ButtonText: "Get Started",
    pricing: "Premium",
    status: "released",
  },
  {
    index: 6,
    image: liveInterview.src,
    title: "Live Interview Prep",
    description:
      "Record an answer live to your questions and receive feedback on how to improve your response",
    pathName: "",
    ButtonText: "Coming Soon",
    pricing: "Premium",
    status: "coming-soon",
  },
  {
    index: 7,
    image: salary.src,
    title: "Salary Negotiator",
    description:
      "The information you need to fight for the salary that you deserve",
    pathName: "",
    ButtonText: "Coming Soon",
    status: "coming-soon",
  },
  {
    index: 8,
    image: bridge.src,
    title: "SkillBridge Wizard",
    description:
      "Find the DoD SkillBridge Program that’s right for you. Ask any questions you may have",
    pathName: "",
    ButtonText: "Coming Soon",
    status: "coming-soon",
  },
  {
    index: 9,
    image: cv.src,
    title: "CV Builder",
    description:
      "Create a professional resume/CV using information from your profile",
    pathName: "",
    ButtonText: "Coming Soon",
    status: "coming-soon",
  },
];

const ToolsCards = () => {
  return (
    <Fragment>
      <div className="mx-4 my-5 flex flex-wrap">
        {cardData.map((card, index) => (
          <div key={index} className="mb-6 w-full px-4 md:w-1/2 lg:w-1/3">
            <div
              className={` flex min-h-[300px]  items-center overflow-hidden rounded-xl border-GrayBorder shadow
              ${
                card.status === "coming-soon"
                  ? "relative z-10 bg-[#DFDFDF] opacity-[70%]"
                  : "bg-white"
              } 
            
            `}
            >
              <div className="h-full w-full p-7">
                <div className="h-[80%]">
                  <div className="flex justify-between">
                    <Image
                      src={card.image}
                      alt={card.title}
                      className="mb-4"
                      width={55}
                      height={55}
                      priority={true}
                    />
                    {card.status === "coming-soon"
                      ? null
                      : null
                        // <div className="flex h-[30px] items-center rounded-full bg-[#E7FBD4] p-1 px-3">
                        //   <GiQueenCrown
                        //     className={`relative right-1 text-primary ${
                        //       card.title === "Career Wizard" ? "hidden" : "flex"
                        //     }`}
                        //   />
                        //   <span
                        //     className={`text-[13px] font-bold ${
                        //       card.title === "Career Wizard"
                        //         ? "text-black"
                        //         : "text-primary"
                        //     }`}
                        //   >
                        //     {card.pricing}
                        //   </span>
                        // </div>
                    }
                  </div>

                  <h3
                    className={`mb-2 text-xl font-semibold  ${
                      card.status === "coming-soon"
                        ? "text-[#122100]"
                        : "text-textGray"
                    } `}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`mb-4 tracking-wide ${
                      card.status === "coming-soon"
                        ? "text-[#565656]"
                        : "text-textGray"
                    } `}
                  >
                    {card.description}
                  </p>
                </div>
                <div className="h-[20%]">
                  <div className="flex">
                    {card.status === "coming-soon" ? (
                      <div className="flex cursor-not-allowed items-center  rounded-lg bg-[#93978F] px-6 py-3 text-white">
                        {card.ButtonText}
                        <BsArrowRight className="ml-2 hidden" />
                      </div>
                    ) : (
                      <Link
                        href={card.pathName}
                        className="flex items-center rounded-lg  bg-primary px-6 py-3 text-white"
                      >
                        {card.ButtonText}
                        <BsArrowRight className="ml-2 block" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ToolsCards;
