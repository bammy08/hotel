import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from './../api-client';
import { AiFillStar } from 'react-icons/ai';
import GuestInfoForm from '../forms/GuestInfoForm/GuestInfoForm';

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    'fetchHotelById',
    () => apiClient.fetchHotelById(hotelId || ''),
    {
      enabled: !!hotelId,
    }
  );

  // Format price in Naira
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="container mx-auto p-6 space-y-8 bg-gray-50">
      {/* Hotel Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          {Array.from({ length: hotel.starRating }).map((_, index) => (
            <AiFillStar key={index} className="text-yellow-500" />
          ))}
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800">{hotel.name}</h1>
        <p className="text-gray-600 text-lg">
          Experience luxury and comfort at {hotel.name}.
        </p>
      </div>

      {/* Hotel Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotel.imageUrls.map((image, index) => (
          <div
            key={index}
            className="h-[300px] bg-gray-100 rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={image}
              alt={hotel.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Hotel Facilities */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Facilities
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {hotel.facilities.map((facility, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-blue-100 text-blue-600 text-sm font-medium py-2 px-4 rounded-md shadow"
            >
              {facility}
            </div>
          ))}
        </div>
      </div>

      {/* Hotel Description and Booking */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            About {hotel.name}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {hotel.description}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Book Your Stay
          </h3>
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
          <p className="text-sm text-gray-500 mt-4">
            Price per night:{' '}
            <span className="font-bold text-gray-800">
              {formatPrice(hotel.pricePerNight)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
