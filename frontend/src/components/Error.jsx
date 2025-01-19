import { toast } from "react-toastify";

const notifySuccess = (message) => {
    toast.success(message, {
      className: "bg-green-500 text-white",
      progressClassName: "bg-green-700",
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      className: "bg-red-500 text-white",
      progressClassName: "bg-red-700",
    });
  };

  export { notifySuccess, notifyError };