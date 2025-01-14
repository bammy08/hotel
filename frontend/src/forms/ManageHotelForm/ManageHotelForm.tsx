import { FormProvider, useForm } from 'react-hook-form';
import { HotelType } from '../../../../backend/src/shared/types';
import { useEffect } from 'react';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';
import { useNavigate } from 'react-router-dom';

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;
  const navigate = useNavigate();

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit(async (formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append('hotelId', hotel._id);
    }
    formData.append('name', formDataJson.name);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('description', formDataJson.description);
    formData.append('type', formDataJson.type);
    formData.append('pricePerNight', formDataJson.pricePerNight.toString());
    formData.append('starRating', formDataJson.starRating.toString());
    formData.append('adultCount', formDataJson.adultCount.toString());
    formData.append('childCount', formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    try {
      await onSave(formData); // Wait for the save operation to complete
      navigate('/my-hotels');
    } catch (error) {
      console.error('Failed to save hotel:', error);
      // Handle error (e.g., show a toast notification)
    }
  });

  return (
    <FormProvider {...formMethods}>
      <form
        className="flex flex-col gap-8 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto"
        onSubmit={onSubmit}
      >
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <div className="flex">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 font-bold rounded-lg hover:bg-blue-500 text-lg disabled:bg-gray-500"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
