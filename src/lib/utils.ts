import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


//success toast
export const showSuccess = (message?: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",

  });
}
export const showError = (message?: string) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 4000,
    theme: "colored",

  });
}

//info toast
export const showInfo = (message: string) => {
  toast.info(message, {
    position: "top-right",
    autoclose: 3000,
    theme: "light"
  })
}