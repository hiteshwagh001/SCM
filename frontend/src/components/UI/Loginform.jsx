import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Button from '../fragments/Button';
import Input from '../fragments/Input';

function Loginform() {
  const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const login = async (data) => {
    try {
      setSubmitting(true);
      const response = await axios.post('http://localhost:8080/api/login', data);
      if (response.status >= 200 && response.status < 300) {
        // Reset form after successful submission
        console.log(response.data)
        reset();
        setFocus("email");
        // Additional success handling (e.g., redirecting)
      } else {
        setError("Invalid email or password");
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
    setFocus("email");
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(login)} noValidate className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
        {submitting ? "Submitting..." : "Sign in"}
      </Button>
    </form>
  );
}

export default Loginform