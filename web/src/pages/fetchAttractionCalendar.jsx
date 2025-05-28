// fetchAttractionCalendar.js
import axios from 'axios';

const fetchAttractionCalendar = async (attractionId = 'PRFZkGSVnM5d') => {
  const options = {
    method: 'GET',
    url: 'https://booking-com.p.rapidapi.com/v1/attractions/calendar',
    params: {
      attraction_id: attractionId,
      currency: 'AED',
      locale: 'en-gb'
    },
    headers: {
      'x-rapidapi-key': 'e49c5654d6mshf61bece80d45c2ap15075djsn87339f6b32be',
      'x-rapidapi-host': 'booking-com.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log('API Success:', response.data);  // 🔍 Log success
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.status, error.message);  // 🔍 Log exact error
    return null;
  }
};

export default fetchAttractionCalendar;
