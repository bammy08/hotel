import { useFormContext } from 'react-hook-form';
import { hotelTypes } from '../../config/hotel-options-config';
import { HotelFormData } from './ManageHotelForm';

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch('type');

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hotel Type</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {hotelTypes.map((type, index) => (
          <label
            key={index}
            className={`cursor-pointer text-center text-sm font-medium py-2 px-4 rounded-lg transition-all ${
              typeWatch === type
                ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <input
              type="radio"
              value={type}
              {...register('type', {
                required: 'This field is required',
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold mt-2 block">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
