/**
 * Base URL that will be treated as global start-point.
 */
let BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const URL = {
  // ======================== Auth ========================
  LOGIN: `${BASE_URL}/auth/login`,

  REGISTER: `${BASE_URL}/auth/register`,

  FORGOT_PASSWORD: `${BASE_URL}/auth/requestResetPassword`,

  RESET_PASSWORD: `${BASE_URL}/auth/resetPassword`,

  // ======================== User ========================

  PARSE_CV: `${BASE_URL}/openai/parse-cv`,

  UPLOAD_RESUME: (resumeLink: string) =>
    `${BASE_URL}/user/upload-cv/${resumeLink}`,

  USER_EDIT_PROFILE: `${BASE_URL}/user/edit-user-profile`,
  SUPPORT: `${BASE_URL}/user/support`,

  UPLOAD_FILE: `${BASE_URL}/S3/fileUpload`,

  EDIT_ASPIRATION: `${BASE_URL}/user/edit-careerAspiration`,

  ADD_EDIT_WORk_EXPERIENCE: `${BASE_URL}/user/edit-workExperience`,

  EDIT_CERTIFICATE: `${BASE_URL}/user/edit-certificate`,

  GET_USER: `${BASE_URL}/user/user-profile`,

  CHECK_EMAIL: (email: string) => `${BASE_URL}/user/check-email/${email}`,

  // ======================== OpenAI ========================

  BULLET_TRANSLATOR: `${BASE_URL}/openai/bullet-translator`,

  COVER_LETTER_WIZARD: `${BASE_URL}/openai/cover-letter-wizard`,

  CAREER_WIZARD: `${BASE_URL}/openai/career-wizard`,

  MOCK_INTERVIEW_PREP: `${BASE_URL}/openai/mock-interview`,

  SKILLS_GAP_ANALYSIS: `${BASE_URL}/openai/skills-gap-analysis`,

  INDUSTRY_RECOMMENDATION: `${BASE_URL}/openai/recommend-industry`,
  // ======================== Chats ========================

  SAVE_CHAT: `${BASE_URL}/chats/save-chat`,

  HISTORY_DATA: (slug: string) => `${BASE_URL}/chats/bySlug/slug?slug=${slug}`,

  DELETE_HISTORY_ID: (id: string) => `${BASE_URL}/chats/delete/${id}`,

  GET_CHAT_BY_ID: (id: string | string[] | undefined) =>
    `${BASE_URL}/chats/${id}`,

  // ======================== favourites ========================

  ADD_FAV: `${BASE_URL}/favourites/add-fav`,

  GET_FAV: `${BASE_URL}/favourites/get-fav`,

  DELETE_FAV: (id: string) => `${BASE_URL}/favourites/delete/${id}`,

  // ======================== Stripe ========================

  GET_PLANS: `${BASE_URL}/stripe/products`,

  CREATE_CHECKOUT_SESSION: `${BASE_URL}/stripe/create-checkout-session`,

  MANAGE_SUBSCRIPTION: `${BASE_URL}/stripe/manageSubscription`,

  GET_CURRENT_SUBSCRIPTION: `${BASE_URL}/stripe/current-subscription`,
};

export { URL, BASE_URL };
