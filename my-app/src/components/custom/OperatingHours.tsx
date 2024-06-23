import React from 'react';

interface OperatingHoursProps {
  hours: { [key: string]: string }[] | string;
}

const OperatingHours: React.FC<OperatingHoursProps> = ({ hours }) => {
  console.log('OperatingHours component received hours:', hours); // Debugging log

  let parsedHours: { [key: string]: string }[] = [];
  if (typeof hours === 'string') {
    try {
      parsedHours = JSON.parse(hours);
    } catch (error) {
      console.error('Error parsing operating hours:', error);
    }
  } else if (Array.isArray(hours)) {
    parsedHours = hours;
  } else {
    console.error('Invalid format for operating hours:', hours);
  }

  if (!parsedHours || parsedHours.length === 0) {
    return <p>No operating hours available.</p>;
  }

  return (
    <div className='mt-4'>
      <h2 className="text-2xl font-bold mb-4">Operating Hours</h2>
      <ul className="list-disc list-inside text-gray-600">
        {parsedHours.map((hour: { [key: string]: string }, index: number) => {
          const day = Object.keys(hour)[0];
          const time = hour[day];
          return (
            <li key={index}>
              <span className="capitalize">{day}:</span> {time}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OperatingHours;
