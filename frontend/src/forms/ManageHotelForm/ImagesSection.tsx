import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch('imageUrls');

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      'imageUrls',
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">
        Hotel Images
      </h2>
      <div className="flex flex-col gap-6">
        {/* Existing Images Section */}
        {existingImageUrls?.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {existingImageUrls.map((url, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden shadow-lg group"
              >
                <img
                  src={url}
                  alt={`Hotel image ${index + 1}`}
                  className="w-full h-40 object-cover transition-transform transform group-hover:scale-105"
                />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* File Input Section */}
        <div className="flex flex-col items-start gap-4">
          <label
            htmlFor="imageFiles"
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition-all"
          >
            Upload Images
          </label>
          <input
            id="imageFiles"
            type="file"
            multiple
            accept="image/*"
            className="w-full text-gray-700 font-normal"
            {...register('imageFiles', {
              validate: (imageFiles) => {
                const totalLength =
                  imageFiles.length + (existingImageUrls?.length || 0);

                if (totalLength === 0) {
                  return 'At least one image should be added';
                }

                if (totalLength > 6) {
                  return 'Total number of images cannot be more than 6';
                }

                return true;
              },
            })}
          />
          {errors.imageFiles && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.imageFiles.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagesSection;
