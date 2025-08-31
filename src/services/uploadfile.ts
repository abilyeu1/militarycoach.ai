import Cookies from "js-cookie";
import { POST } from "./API/AxiosRequests";
import { URL } from "./API";

// Service to upload a picture
// export const uploadFile = async (formData: any, token?: string) => {
//   const response = await POST(
//     URL.UPLOAD_FILE,
//     formData,
//     token || (Cookies.get("accessToken") as string)
//   );
//   return response;
// };

export const parseCV = async (formData: any, token?: string) => {
  const response = await POST(
    URL.PARSE_CV,
    formData,
    token || (Cookies.get("accessToken") as string),
  );
  return response;
};

// service for upload resume
export const uploadResumeHandler = async (
  resumeLink: string,
  token?: string,
) => {
  const response = await POST(
    URL.UPLOAD_RESUME(resumeLink),
    {},
    token || (Cookies.get("accessToken") as string),
  );
  return response;
};
