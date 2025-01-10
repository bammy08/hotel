import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">
        Guest Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Adults Input */}
        <label className="flex flex-col gap-2 text-gray-700 text-sm font-medium">
          Adults
          <input
            className="border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500 transition-all"
            type="number"
            min={1}
            {...register('adultCount', {
              required: 'Please specify the number of adults.',
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.adultCount?.message}
            </span>
          )}
        </label>

        {/* Children Input */}
        <label className="flex flex-col gap-2 text-gray-700 text-sm font-medium">
          Children
          <input
            className="border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500 transition-all"
            type="number"
            min={0}
            {...register('childCount', {
              required: 'Please specify the number of children.',
            })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
