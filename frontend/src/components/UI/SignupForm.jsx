import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from 'react-icons/fa';
import Button from '../fragments/Button';
import Input from '../fragments/Input';

function SignupForm() {
  const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (data) => {
    try {
      setSubmitting(true);
      const response = await axios.post('http://localhost:8080/api/signup', data);
      if (response.status >= 200 && response.status < 300) {
        // Reset form after successful submission
        console.log(response.data)
        reset();
        setFocus("username");
        // Additional success handling (e.g., redirecting)
      } else {
        setError("Error signing up, please try again");
      }
    } catch (error) {
      setError("Error submitting form");
      if (error.response) {
        setError(error.response.data);
      } else if (error.request) {
        setError("No response received");
      } else {
        setError(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  return (<div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
    <form onSubmit={handleSubmit(signup)} noValidate >
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <div className="mb-4">
        <Input
          label="Username"
          placeholder="Enter your username"
          type="text"
          {...register("username", {
            required: "Username is required",
          })}
        />
        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
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
      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg" disabled={submitting}>
        {submitting ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
    <div className="flex justify-between mt-4">
      <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg flex items-center justify-center space-x-2 mr-2">
        <FaGithub size={20} />
        <span>Sign up with GitHub</span>
      </Button>
      <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2 ml-2">
        <FaGoogle size={20} />
        <span>Sign up with Google</span>
      </Button>
    </div>
  </div>
  );
}

export default SignupForm;
