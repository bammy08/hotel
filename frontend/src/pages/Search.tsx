import { useQuery } from 'react-query';
import { useSearchContext } from '../contexts/SearchContext';
import * as apiClient from '../api-client';
import { useState } from 'react';
import StarRatingFilter from '../components/StarRatingFilter';
import FacilitiesFilter from '../components/FacilitiesFilter';
import PriceFilter from '../components/PriceFilter';
import HotelTypesFilter from '../components/HotelTypesFilter';
import SearchResultsCard from '../components/SearchResultsCard';
import Pagination from '../components/Pagination';

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>('');

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData } = useQuery(['searchHotels', searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotel) => hotel !== hotelType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 px-6 py-10 bg-gray-50 min-h-screen">
      {/* Filters Section */}
      <aside className="bg-white shadow-lg rounded-lg p-6 sticky top-10 h-fit">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b border-slate-300">
          Filters
        </h3>
        <div className="space-y-8">
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </aside>

      {/* Search Results Section */}
      <main className="flex flex-col gap-6">
        <div className="flex justify-between items-center bg-white shadow-md rounded-lg px-6 py-4">
          <span className="text-lg font-medium text-gray-700">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ''}
          </span>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-3 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price (Low to High)</option>
            <option value="pricePerNightDesc">Price (High to Low)</option>
          </select>
        </div>
        <div className="space-y-6">
          {hotelData?.data.map((hotel) => (
            <SearchResultsCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
        <Pagination
          page={hotelData?.pagination.page || 1}
          pages={hotelData?.pagination.pages || 1}
          onPageChange={(page) => setPage(page)}
        />
      </main>
    </div>
  );
};

export default Search;
