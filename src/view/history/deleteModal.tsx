// React Imports
import { FC, Fragment } from "react";

// Npm Imports
import { Modal } from "react-responsive-modal";

// Types Imports
import { IChat } from "@/types/chat.interface";

// Axios Imports
import { DELETE } from "@/services/API/AxiosRequests";
import { URL } from "@/services/API";

// Npm Imports
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Components Imports
import Button from "@/components/atoms/Button";

interface IDeleteModalProps {
  open: boolean;
  setOpen: Function;
  setHistory: Function;
  chatID: string;
}

const DeleteModal: FC<IDeleteModalProps> = ({
  open,
  setOpen,
  setHistory,
  chatID,
}) => {
  const token = Cookies.get("accessToken");


  const deleteChat = async () => {
    try {
      setHistory((prev: any) =>
        prev.filter((item: IChat) => item._id !== chatID)
      );

      await DELETE(URL.DELETE_HISTORY_ID(chatID as string), token as string);

      setOpen(false);
      toast.success("Chat is successfully deleted.");
    } catch (error: any) {
      const errorMessage =
        error.response.data.message ?? "Chat is not deleted.";
      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };
  return (
    <Fragment>
      <Modal open={open} onClose={() => setOpen(!open)} center>
        <h2 className="text-xl font-semibold text-gray-800 mt-10">
          Are you sure you want to delete this chat
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          This action cannot be undone.
        </p>

        <div className="flex justify-end">
          <Button onClick={deleteChat} className="mr-2">
            Delete
          </Button>
          <Button
            onClick={() => setOpen(false)}
            className="bg-[red] color-white"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default DeleteModal;
