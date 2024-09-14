import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Button from '../fragments/Button';
import Input from '../fragments/Input';
import useThemeClass from '../ThemeClass';
import { showErrorToast, showSuccessToast } from '../ToastNotification';

function LoginForm() {
  const { register, handleSubmit,setFocus, setError, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const themeClass = useThemeClass();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true); // Show loading state
      const response = await axios.post('http://localhost:8080/auth/signin', data);

      // Handle success response
      if (response.status === 200) {
        showSuccessToast("Login successful!");
        const { jwtToken } = response.data;
        localStorage.setItem('authToken', jwtToken);
        navigate('/dashboard');
      }
    } catch (error) {
      // Handle cases based on error status code
      if (error.response) {
        const { status } = error.response;

        // Handle 401 Unauthorized (Invalid credentials)
        if (status === 401) {
          setError("username", { type: 'manual', message: "Invalid credentials" });
          setError("password", { type: 'manual', message: "Invalid credentials" });
          showErrorToast("Invalid username or password.");
        }
        // Handle 403 Forbidden (User is disabled or not allowed to login)
        else if (status === 403) {
          showErrorToast("Account is disabled or forbidden access.");
        }
        // Handle 500 Internal Server Error (Server-side issue)
        else if (status === 500) {
          showErrorToast("Server error. Please try again later.");
        }
        // Handle other response errors
        else {
          showErrorToast("An unexpected error occurred. Status code: " + status);
        }
      } else {
        // Handle errors not related to the server response (e.g., network errors)
        showErrorToast("Network error: " + error.message);
      }
    } finally {
      // Reset submitting state and focus on the username field
      setSubmitting(false);
      setTimeout(() => setFocus("username"), 100); // Set focus after slight delay
    }
  };

  useEffect(() => {
    // Use timeout to ensure the component is fully loaded before setting focus
    setTimeout(() => setFocus("username"), 100);
  }, [setFocus]);

  return (
    <>
      <div className={`max-w-md mx-auto p-6 ${themeClass} border-t-8 pt-6 shadow-md`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-2">Login Here</h2>
          <p className='mb-6'>Managing contacts on cloud ....</p>
          <div className="mb-4">
            <Input
              id="username"
              label="Username"
              placeholder="Enter Username"
              name="username"
              type="text"
              place
              {...register('username', { required: 'Username is required' })}
              className="border p-2 w-full"
            />
            {errors.username && <span className="text-red-500">{errors.username.message}</span>}
          </div>
          <div className="mb-4">
            <Input
              id="password"
              placeholder="Enter Password"
              label="Password"
              name="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="border p-2 w-full"
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg" disabled={submitting}>
            {submitting ? "logging in..." : "Login"}
          </Button>
        </form>
      </div>
      <ToastContainer position='top-right' />
    </>
  );
}

export default LoginForm;
