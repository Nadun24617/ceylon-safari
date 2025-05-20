import React, { useEffect, useState } from 'react';
import axios from 'axios';

const cities = [
  { name: 'Colombo', id: '-2176252' },
  { name: 'Kandy', id: '-2216342' },
  { name: 'Galle', id: '-2214562' },
  { name: 'Jaffna', id: '-2223103' },
  { name: 'Nuwara Eliya', id: '-2231444' }
];

const Accommodations = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); // To track the current page

  // Fetch data based on cities and page number
  const fetchAllCities = async () => {
    setLoading(true);
    setError(null);
    const allResults = [];

    try {
      await Promise.all(
        cities.map(async (city) => {
          const response = await axios.get(
            'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
            {
              params: {
                dest_id: city.id,
                dest_type: 'city',
                adults_number: '2',
                room_number: '1',
                locale: 'en-us',
                page_number: page, // Page number for pagination
                include_adjacency: 'true',
              },
              headers: {
                'X-RapidAPI-Key': '7d278d7fe2mshd6156570733fc4bp1917e0jsn84984e93855c', // Replace with your actual API key
                'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com',
              },
            }
          );
          allResults.push(...(response.data.result || []));
        })
      );
      setPlaces(allResults);
    } catch (err) {
      console.error(err);
      setError('Failed to load accommodations.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or page changes
  useEffect(() => {
    fetchAllCities();
  }, [page]);

  // Pagination handlers
  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
        All Accommodations in Sri Lanka
      </h1>

      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading accommodations...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : places.length === 0 ? (
        <div className="text-center text-gray-500">No accommodations found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <div key={place.hotel_id} className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <img
                src={place.main_photo_url}
                alt={place.hotel_name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-blue-800">{place.hotel_name}</h2>
                <p className="text-gray-600">{place.address}</p>
                <p className="mt-2 text-green-700 font-medium">
                  Price: {place.min_total_price} {place.currency_code}
                </p>
                <a
                  href={place.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          className="px-4 py-2 bg-gray-600 text-white rounded-md mr-2"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className="px-4 py-2 bg-gray-600 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Accommodations;
