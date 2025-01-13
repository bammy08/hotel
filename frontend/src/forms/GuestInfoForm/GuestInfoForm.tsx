import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSearchContext } from '../../contexts/SearchContext';
import { useAppContext } from '../../contexts/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate('/sign-in', { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(pricePerNight);

  return (
    <div className="p-6 bg-blue-300 rounded-lg shadow-md border border-gray-200 space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800">
        {formattedPrice} <span className="text-sm font-normal">/ night</span>
      </h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
        className="space-y-4"
      >
        {/* Check-in and Check-out */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in
            </label>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue('checkIn', date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Select date"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out
            </label>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue('checkOut', date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Select date"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Adult and Child Count */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adults
            </label>
            <input
              type="number"
              min={1}
              max={20}
              {...register('adultCount', {
                required: 'This field is required',
                min: {
                  value: 1,
                  message: 'There must be at least one adult',
                },
                valueAsNumber: true,
              })}
              className={`w-full p-2 border rounded-md ${
                errors.adultCount
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.adultCount && (
              <span className="text-sm text-red-500 mt-1">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Children
            </label>
            <input
              type="number"
              min={0}
              max={20}
              {...register('childCount', {
                valueAsNumber: true,
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          {isLoggedIn ? (
            <button className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-500 focus:ring-2 focus:ring-blue-400">
              Book Now
            </button>
          ) : (
            <button className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-500 focus:ring-2 focus:ring-blue-400">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
