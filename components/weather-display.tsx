import React from 'react';

interface WeatherDisplayProps {
  city: string;
  unitType: 'metric' | 'imperial';
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city, unitType }) => {
  // component logic
  return (
    <></>
  );
};

export default WeatherDisplay;