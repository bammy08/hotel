import { Link } from 'react-router-dom';
import { HotelType } from '../../../backend/src/shared/types';
import { AiFillStar } from 'react-icons/ai';

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);

  return (
    <div className="flex flex-col xl:flex-row border border-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="w-full xl:w-2/5 h-[250px] xl:h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between p-6 xl:p-8 flex-1 bg-white">
        {/* Hotel Info */}
        <div>
          <div className="flex items-center mb-2">
            <span className="flex items-center gap-1">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="text-yellow-400" />
              ))}
            </span>
            <span className="ml-2 text-sm text-gray-500">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
          >
            {hotel.name}
          </Link>
        </div>

        {/* Description */}
        <div className="mt-4 text-gray-600 line-clamp-3 text-sm leading-relaxed">
          {hotel.description}
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center mt-6">
          {/* Facilities */}
          <div className="flex flex-wrap gap-2">
            {hotel.facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full"
              >
                {facility}
              </span>
            ))}
            {hotel.facilities.length > 3 && (
              <span className="text-sm text-gray-500">
                +{hotel.facilities.length - 3} more
              </span>
            )}
          </div>

          {/* Price and View More */}
          <div className="flex flex-col items-end">
            <span className="text-lg font-bold text-gray-800">
              {formatPrice(hotel.pricePerNight)}{' '}
              <span className="text-sm">/night</span>
            </span>
            <Link
              to={`/detail/${hotel._id}`}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-500 transition"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
