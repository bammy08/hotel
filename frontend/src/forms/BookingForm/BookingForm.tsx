import { useForm } from 'react-hook-form';
import {
  PaymentIntentResponse,
  UserType,
} from '../../../../backend/src/shared/types';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { useSearchContext } from '../../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import * as apiClient from '../../api-client';
import { useAppContext } from '../../contexts/AppContext';

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const { hotelId } = useParams();

  const { showToast } = useAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ message: 'Booking Saved!', type: 'SUCCESS' });
      },
      onError: () => {
        showToast({ message: 'Error saving booking', type: 'ERROR' });
      },
    }
  );

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === 'succeeded') {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl bg-white shadow-lg p-6 border border-gray-200"
    >
      {/* Form Title */}
      <h1 className="text-2xl font-bold text-gray-800">Confirm Your Details</h1>

      {/* User Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="block">
          <span className="text-sm text-gray-500">First Name</span>
          <input
            type="text"
            readOnly
            disabled
            {...register('firstName')}
            className="mt-1 block w-full p-2 rounded-md border-gray-300 bg-gray-100 text-gray-700 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-sm text-gray-500">Last Name</span>
          <input
            type="text"
            readOnly
            disabled
            {...register('lastName')}
            className="mt-1 block w-full p-2 rounded-md border-gray-300 bg-gray-100 text-gray-700 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm text-gray-500">Email</span>
          <input
            type="email"
            readOnly
            disabled
            {...register('email')}
            className="mt-1 block w-full p-2 rounded-md border-gray-300 bg-gray-100 text-gray-700 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          />
        </label>
      </div>

      {/* Price Summary */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Price Summary</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-lg font-medium text-gray-800">
            Total Cost: ₦
            {paymentIntent.totalCost.toLocaleString('en-NG', {
              minimumFractionDigits: 2,
            })}
          </p>
          <p className="text-sm text-gray-500">Includes taxes and charges</p>
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Payment Details</h2>
        <div className="border rounded-md p-3 bg-gray-50">
          <CardElement
            id="payment-element"
            className="text-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={`px-5 py-3 text-white font-semibold rounded-lg focus:outline-none transition 
          ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-500'} `}
        >
          {isLoading ? 'Saving...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
