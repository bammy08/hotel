import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: 'Registration Successful!', type: 'SUCCESS' });
      await queryClient.invalidateQueries('validateToken');
      navigate('/');
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <AiOutlineUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="First Name"
                {...register('firstName', {
                  required: 'First Name is required',
                })}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="relative">
              <AiOutlineUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Last Name"
                {...register('lastName', { required: 'Last Name is required' })}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="relative">
            <AiOutlineMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <AiOutlineLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <AiOutlineLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                validate: (val) => {
                  if (!val) {
                    return 'Confirm Password is required';
                  } else if (watch('password') !== val) {
                    return 'Passwords do not match';
                  }
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-lg hover:bg-blue-500 transition duration-200"
          >
            Create Account
          </button>
        </form>
        {/* Login Link */}
        <div className="mt-4 text-center text-sm">
          <p>
            Already have an account?{' '}
            <Link to="/sign-in" className="text-blue-600 underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
