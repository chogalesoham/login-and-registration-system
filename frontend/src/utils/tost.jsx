import toast from "react-hot-toast";

export const successToast = (msg) => {
  toast.success(msg, {
    position: "top-right",
  });
};
export const errorToast = (msg) => {
  toast.error(msg, {
    position: "top-right",
  });
};
