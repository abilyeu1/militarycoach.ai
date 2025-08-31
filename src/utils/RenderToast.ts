import { toast } from "react-toastify";

export const NotificationStack = (
  type: "success" | "error",
  msg: string,
  autoClose?: any
) => {
  const defaultAutoClose =
    autoClose === undefined ? 15000 : autoClose === 0 ? false : autoClose;
  switch (type) {
    case "error":
      return toast.error(msg, {
        position: "top-right",
        autoClose: defaultAutoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    case "success":
      return toast.success(msg, {
        position: "top-left",
        autoClose: defaultAutoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    default:
      break;
  }
};
