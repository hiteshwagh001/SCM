import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessToast = (message) => {
  toast.success(message, {
    autoClose: 5000,
    theme: 'colored',
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    autoClose: 5000,
    theme: 'colored',
  });
};
    