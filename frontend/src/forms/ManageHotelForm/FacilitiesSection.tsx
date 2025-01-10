import { useFormContext } from 'react-hook-form';
import { hotelFacilities } from '../../config/hotel-options-config';
import { HotelFormData } from './ManageHotelForm';

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">
        Choose Facilities
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {hotelFacilities.map((facility, index) => (
          <label
            key={index}
            className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all"
          >
            <input
              type="checkbox"
              value={facility}
              {...register('facilities', {
                validate: (facilities) =>
                  facilities?.length > 0 || 'At least one facility is required',
              })}
              className="w-4 h-4 text-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 rounded"
            />
            <span className="text-gray-700 text-sm font-medium">
              {facility}
            </span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-medium mt-4 block">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
