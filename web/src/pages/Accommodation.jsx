import { useEffect, useState } from 'react';
import fetchAttractionCalendar from '../pages/fetchAttractionCalendar';

const Accommodation = () => {
  const [calendarData, setCalendarData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAttractionCalendar('PRFZkGSVnM5d');
      setCalendarData(data);
    };

    getData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Attraction Calendar</h1>
      {calendarData ? (
        <pre>{JSON.stringify(calendarData, null, 2)}</pre>
      ) : (
        <p>Loading or failed to fetch...</p>
      )}
    </div>
  );
};

export default Accommodation;
