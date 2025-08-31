// react imports
import React from "react";
// next imports

import Link from "next/link";
import Image from "next/image";
// public imports

import edit_icon from "../../../public/assets/edit.svg";
import profile from "../../../public/assets/profile.png";
import profileImage from "../../../public/assets/profile-avatar.png";

// hooks imports
import { useAppSelector } from "@/redux/store/store";
import { profileStyles } from "@/styles/style";

const ProfileCards = () => {
  const userData = useAppSelector((state: any) => state.auth.user);
  // console.log("job location", userData.JobLocation);.

  const age = userData.age;
  const extractField = (items: any, field: any) =>
    items.map((item: any) => item[field]).join(", ");

  const careerFields = extractField(userData.workExperience, "careerField");
  const jobTitle = extractField(userData.workExperience, "jobTitle");

  const skillsLeveragedInCareerField = extractField(
    userData.workExperience,
    "skillsLeveragedInCareerField",
  );
  const levelOfEducation = extractField(userData.education, "levelOfEducation");
  const nameOfInstitution = extractField(
    userData.education,
    "nameOfInstitution",
  );
  const degreeAndFieldOfStudy = extractField(
    userData.education,
    "degreeAndFieldOfStudy",
  );

  const hasProfilePicture =
    userData.profilePictures !== null && userData.profilePictures !== undefined;

  // Define the default image JSX
  // const defaultImage = <Image src={profile} alt="" height={38} width={38} />;
  const defaultImage = (
    <Image
      src={profileImage}
      alt=""
      height={38}
      width={38}
      className="rounded-full"
    />
  );

  return (
    <div className="card rounded-xl bg-white p-5 shadow-lg">
      <div className="flex items-center">
        <div>
          {hasProfilePicture ? (
            <img
              src={userData.profilePictures}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="bg-gray-100 dark:bg-gray-600 relative h-10 w-10 overflow-hidden rounded-full">
              <svg
                className="text-gray-400 absolute -left-1 h-12 w-12"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          )}
        </div>

        <div>
          <p className="ml-4 text-[17px] md:text-[24px]">{userData.fullName}</p>
        </div>
      </div>

      <div className="my-2 block md:flex">
        <div className="card mx-0 my-4 rounded-xl bg-white p-5 shadow-lg md:mx-2 md:w-[50%]">
          <div className="flex justify-between">
            <p className="mb-5 text-[25px] text-primary">Basic Information</p>
            <Link href="/edit-personal-details">
              <Image src={edit_icon} alt="edit button" width={24} height={24} />
            </Link>
          </div>
          <div className={`${profileStyles.contentDiv}`}>
            <p className={`${profileStyles.heading}`}>Full Name</p>
            <p
              className={`max-w-[110px] truncate lg:max-w-[200px] ${profileStyles.textColor}`}
            >
              {userData.fullName}
            </p>
          </div>
          <div className={`${profileStyles.contentDiv}`}>
            <p className={`${profileStyles.heading}`}>Age</p>
            <p
              className={`max-w-[110px] truncate lg:max-w-[200px] ${profileStyles.textColor}`}
            >
              {/* {userData.age} */}
              {age > 0 ? age : "N/A"}
            </p>
          </div>
          <div className={`${profileStyles.contentDiv}`}>
            <p className={`${profileStyles.heading}`}>Branch Of Service</p>
            <p
              className={`max-w-[110px] truncate lg:max-w-[200px] ${profileStyles.textColor}`}
            >
              {userData.branchOfService}
            </p>
          </div>
          <div className={`${profileStyles.contentDiv}`}>
            <p className={`${profileStyles.heading}`}>Email Address</p>
            <p
              className={`max-w-[110px] truncate lg:max-w-[200px] ${profileStyles.textColor}`}
            >
              {userData.email}
            </p>
          </div>
          <div className={`${profileStyles.contentDiv}`}>
            <p className={`${profileStyles.heading}`}>Language</p>
            <p
              className={`max-w-[110px] truncate lg:max-w-[200px] ${profileStyles.textColor}`}
            >
              {userData.languages.join(", ")}
            </p>
          </div>
        </div>

        <div className="card  mx-0 my-4 rounded-xl bg-white p-5 shadow-lg md:mx-2 md:w-[50%]">
          <div className="flex justify-between">
            <p className="text-[22px] text-primary md:text-[25px]">
              Work Experience
            </p>

            <Link href="/edit-work-experience">
              <Image src={edit_icon} alt="edit button" width={24} height={24} />{" "}
            </Link>
          </div>

          <div className={`${profileStyles.contentDiv}`}>
            <p className={`${profileStyles.heading}`}>Career</p>
            <p
              className={`max-w-[110px] truncate lg:max-w-[200px] ${profileStyles.textColor}`}
            >
              {careerFields}
            </p>
          </div>
          <div className={`${profileStyles.contentDiv}`}>
            <p className={`${profileStyles.heading}`}>Job title</p>
            <p
              className={`max-w-[110px] truncate lg:max-w-[200px] ${profileStyles.textColor}`}
            >
              {jobTitle}
            </p>
          </div>

          <div className={`${profileStyles.contentDiv}`}>
            <p className={`${profileStyles.heading}`}>
              Skills leveraged in career field
            </p>
            <p
              className={`max-w-[110px] truncate lg:max-w-[200px] ${profileStyles.textColor}`}
            >
              {skillsLeveragedInCareerField}
            </p>
          </div>
        </div>
      </div>

      <div className="my-2 block md:flex">
        <div className="card mx-0 my-4 rounded-xl bg-white p-5 shadow-lg md:mx-2 md:w-[50%]">
          <div className="flex justify-between">
            <p className="text-[22px] text-primary md:text-[25px]">Education</p>

            <Link href="/edit-education">
              <Image src={edit_icon} alt="edit button" width={24} height={24} />{" "}
            </Link>
          </div>

          <div className={`${profileStyles.contentDiv}`}>
            <p className={`${profileStyles.heading}`}>Education Type</p>
            <p
              className={`max-w-[110px] truncate lg:max-w-[200px] ${profileStyles.textColor}`}
            >
              {levelOfEducation ? levelOfEducation : "N/A"}
            </p>
          </div>
          <div className={`${profileStyles.contentDiv}`}>
            <p className={`${profileStyles.heading}`}>Name of Institution</p>
            <p
              className={`max-w-[110px] truncate lg:max-w-[200px] ${profileStyles.textColor}`}
            >
              {nameOfInstitution ? nameOfInstitution : "N/A"}
            </p>
          </div>
          <div className={`${profileStyles.contentDiv}`}>
            <p className={`${profileStyles.heading}`}>
              Field of study (as applicable)
            </p>
            <p
              className={`max-w-[110px] truncate lg:max-w-[200px] ${profileStyles.textColor}`}
            >
              {degreeAndFieldOfStudy ? degreeAndFieldOfStudy : "N/A"}
            </p>
          </div>
        </div>
        <div className="card  mx-0 my-4 rounded-xl bg-white p-5 shadow-lg md:mx-2 md:w-[50%]">
          <div className="flex justify-between">
            <div className="flex">
              <p className="text-[22px] text-primary md:text-[25px]">
                Career Aspirations
              </p>
            </div>
            <Link href="/edit-career-aspiration">
              <Image src={edit_icon} alt="edit button" width={24} height={24} />{" "}
            </Link>
          </div>

          <div className={`${profileStyles.contentDiv}`}>
            <p className={`${profileStyles.heading}`}>Industry Of Interest</p>
            <p
              className={`max-w-[110px] truncate lg:max-w-[200px] ${profileStyles.textColor}`}
            >
              {userData.industryOfInterest
                ? userData.industryOfInterest
                : "N/A"}
            </p>
          </div>
          <div className={`${profileStyles.contentDiv}`}>
            <p className={`${profileStyles.heading}`}>
              Job Position (s) of interest
            </p>
            <p
              className={`max-w-[110px] truncate lg:max-w-[200px] ${profileStyles.textColor}`}
            >
              {userData.jobPositionOfInterest
                ? userData.jobPositionOfInterest
                : "N/A"}
            </p>
          </div>
          <div className={`${profileStyles.contentDiv}`}>
            <p className={`${profileStyles.heading}`}>Job Position Level</p>
            <p
              className={`max-w-[110px] truncate lg:max-w-[200px] ${profileStyles.textColor}`}
            >
              {userData.jobPositionLevel ? userData.jobPositionLevel : "N/A"}
            </p>
          </div>
          <div className={`${profileStyles.contentDiv}`}>
            <p className={`${profileStyles.heading}`}>Job Location</p>
            <p
              className={`max-w-[110px] truncate lg:max-w-[200px] ${profileStyles.textColor}`}
            >
              {userData.JobLocation ? userData.JobLocation : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCards;
