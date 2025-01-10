import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: 'Sign in Successful!', type: 'SUCCESS' });
      await queryClient.invalidateQueries('validateToken');
      navigate(location.state?.from?.pathname || '/');
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Sign In
        </h2>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          {/* Email Field */}
          <label className="text-gray-700 text-sm font-bold relative">
            Email
            <div className="flex items-center border rounded mt-1">
              <FiMail className="text-gray-400 ml-3" />
              <input
                type="email"
                className="w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r"
                {...register('email', { required: 'This field is required' })}
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </label>

          {/* Password Field */}
          <label className="text-gray-700 text-sm font-bold relative">
            Password
            <div className="flex items-center border rounded mt-1 relative">
              <FiLock className="text-gray-400 ml-3" />
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r"
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-3 text-gray-400"
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-500 transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center text-sm">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
