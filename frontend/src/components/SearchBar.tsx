import { FormEvent, useState } from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import { MdTravelExplore } from 'react-icons/md';
import { FaCalendarAlt, FaUser, FaChild } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate('/search');
  };

  // const handleClear = () => {
  //   setDestination('');
  //   setCheckIn(null);
  //   setCheckOut(null);
  //   setAdultCount(1);
  //   setChildCount(0);
  // };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-orange-400  rounded-lg shadow-lg p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center"
    >
      {/* Destination Input */}
      <div className="flex items-center bg-gray-100 px-4 py-5 rounded-lg shadow-sm">
        <MdTravelExplore size={25} className="text-blue-600 mr-2" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      {/* Adults and Children Inputs */}
      <div className="flex items-center gap-4 bg-gray-100 px-4 py-5 rounded-lg shadow-sm">
        <div className="flex items-center">
          <FaUser size={20} className="text-blue-600 mr-2" />
          <input
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
            placeholder="Adults"
            className="w-16 text-center bg-transparent focus:outline-none text-gray-700"
          />
        </div>
        <div className="flex items-center">
          <FaChild size={20} className="text-blue-600 mr-2" />
          <input
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
            placeholder="Children"
            className="w-16 text-center bg-transparent focus:outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Check-In Date Picker */}
      <div className="flex items-center bg-gray-100 px-4 py-5 rounded-lg shadow-sm">
        <FaCalendarAlt size={20} className="text-blue-600 mr-2" />
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="w-full bg-transparent focus:outline-none text-gray-700"
        />
      </div>

      {/* Check-Out Date Picker */}
      <div className="flex items-center bg-gray-100 px-4 py-5 rounded-lg shadow-sm">
        <FaCalendarAlt size={20} className="text-blue-600 mr-2" />
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsEnd
          startDate={checkIn}
          endDate={checkOut}
          minDate={checkIn || minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="w-full bg-transparent focus:outline-none text-gray-700"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-5 font-semibold hover:bg-blue-500 transition"
        >
          Search
        </button>
        <button
          type="button"
          // onClick={handleClear}
          className="flex-1 bg-red-600 text-white rounded-lg px-4 py-5 font-semibold hover:bg-red-500 transition"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
