import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessToast = (message) => {
  toast.success(message, {
    autoClose: 3000,
    theme: 'colored',
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    autoClose: 2000,
    theme: 'colored',
  });
};
