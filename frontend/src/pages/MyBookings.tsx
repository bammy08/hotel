import { useQuery } from 'react-query';
import * as apiClient from '../api-client';

const MyBookings = () => {
  const { data: hotels } = useQuery(
    'fetchMyBookings',
    apiClient.fetchMyBookings
  );

  if (!hotels || hotels.length === 0) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-900">My Bookings</h1>
      {hotels.map((hotel) => (
        <div
          // key={hotel.id}
          className="flex flex-col lg:flex-row items-stretch border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white"
        >
          {/* Hotel Image */}
          <div className="lg:w-1/3 h-64 lg:h-auto">
            <img
              src={hotel.imageUrls[0]}
              alt={`${hotel.name} Image`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Hotel Details */}
          <div className="flex flex-col p-6 lg:p-8 flex-grow">
            {/* Hotel Name and Location */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{hotel.name}</h2>
              <p className="text-sm text-gray-500">
                {hotel.city}, {hotel.country}
              </p>
            </div>

            {/* Booking Details */}
            <div className="mt-4 space-y-4">
              {hotel.bookings.map((booking, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-blue-50 border border-gray-100"
                >
                  <div className="flex ">
                    <span className="text-gray-600 font-medium mr-2">
                      Dates:
                    </span>
                    <span className="text-gray-800">
                      {new Date(booking.checkIn).toDateString()} -{' '}
                      {new Date(booking.checkOut).toDateString()}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 font-medium mr-2">
                      Guests:
                    </span>
                    <span className="text-gray-800">
                      {booking.adultCount} adults, {booking.childCount} children
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            {/* <div className="mt-6">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
