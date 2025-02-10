import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Button from '../fragments/Button';
import Input from '../fragments/Input';
import { githubLogin, googleLogin } from '../Oauth2';
import { showErrorToast, showSuccessToast } from '../ToastNotification';
import ErrorHandler from '../utils/ErrorHandler';

function SignupForm() {
  const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [message,setMessage] =useState(null)
  // const themeClass = useThemeClass();
  const navigate = useNavigate();

  const signup = async (data) => {
    try {
      setSubmitting(true);
      const response = await axios.post('http://localhost:8080/auth/signup', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      if (response.status === 200) {
        showSuccessToast(response.data.message || 'Account created successfully!');
        navigate("/login")
        reset();
      } else {
        showErrorToast(response.data.message || 'An error occurred during signup.');
      }
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error); // Use the custom error handler
      // console.log("error :--- ", errorMessage)
      setMessage(errorMessage);
      showErrorToast(message || "Error during signup")
    } finally {
      setSubmitting(false);
      setFocus("userName");
    }
  };

  useEffect(() => {
    setFocus("userName");
  }, [setFocus]);

  return (
    <>
      <div className={`max-w-md mx-auto p-6 light border-t-8 pt-6 shadow-md dark:bg-gradient-to-r from-slate-800 to-slate-900 dark:text-darkText`}>
        <form onSubmit={handleSubmit(signup)} noValidate >
          <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
          <p className='mb-6'>Managing contacts on cloud ....</p>
          <div className="mb-4">
            <Input
              label="UserName"
              placeholder="Enter your userName"
              type="text"
              {...register("userName", {
                required: "UserName is required",
              })}
            />
            {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
          </div>
          <div className="mb-4">
            <Input
              label="PhoneNumber"
              placeholder="Enter your phoneNumber"
              type="number"
              {...register("phoneNumber", {
                required: "Phone number is required",
                validate: {
                  matchPattern: (value) => /^\d{10}$/.test(value) || "Phone number must be a valid 10-digit number",
                }
              })}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
          </div>
          <div className="mb-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                }
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div className="mb-6">
            <Input
              label="Write Something about yourself"
              placeholder="Tell us something about yourself"
              type="textarea"
              rows={10}
              {...register("about", {
                required: "Please tell us something about yourself",
              })}
            />
            {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg" disabled={submitting}>
            {submitting ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
        <div className="flex justify-between mt-4">
          <Button onClick={githubLogin} className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg flex items-center justify-center space-x-2 mr-2">
            <FaGithub size={20} />
            <span>Sign up with GitHub</span>
          </Button>
          <Button onClick={googleLogin} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2 ml-2">
            <FaGoogle size={20} />
            <span>Sign up with Google</span>
          </Button>
        </div>
      </div>
      <ToastContainer position='top-right' />
    </>
  );
}

export default SignupForm;
