import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Add Hotel Details
      </h1>
      <div className="flex flex-col gap-6">
        {/* Hotel Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hotel Name
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter the hotel name"
            {...register('name', { required: 'This field is required' })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* City and Country */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter the city"
              {...register('city', { required: 'This field is required' })}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter the country"
              {...register('country', { required: 'This field is required' })}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows={5}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter a description for the hotel"
            {...register('description', { required: 'This field is required' })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price Per Night */}
        <div className="md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Per Night
          </label>
          <input
            type="number"
            min={1}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter price per night"
            {...register('pricePerNight', {
              required: 'This field is required',
            })}
          />
          {errors.pricePerNight && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pricePerNight.message}
            </p>
          )}
        </div>

        {/* Star Rating */}
        <div className="md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Star Rating
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register('starRating', {
              required: 'This field is required',
            })}
          >
            <option value="" disabled>
              Select a rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 && 's'}
              </option>
            ))}
          </select>
          {errors.starRating && (
            <p className="text-red-500 text-sm mt-1">
              {errors.starRating.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
