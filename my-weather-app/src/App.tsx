import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WelcomeSign from './WelcomeSign'; 
import LocationSearch from './LocationSearch';
import SmallWeatherCard from './SmallWeatherCard';
import { saveToLocalStorage, getFromLocalStorage } from './localStorage';
import './App.scss';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<string>(getFromLocalStorage('currentLocation') || 'London');
  const [savedLocations, setSavedLocations] = useState<string[]>(JSON.parse(getFromLocalStorage('locations') || '[]'));
  const [showAdditionalValues, setShowAdditionalValues] = useState<boolean>(false);

  useEffect(() => {
    saveToLocalStorage('currentLocation', currentLocation);
    
    const fetchWeather = async (location: string) => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${location}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data', error);
      }
    };

    fetchWeather(currentLocation);
  }, [currentLocation]);

  // Save current location to saved locations
  const handleAddLocation = () => {
    if (!savedLocations.includes(currentLocation)) {
      const updatedLocations = [...savedLocations, currentLocation];
      setSavedLocations(updatedLocations);
      saveToLocalStorage('locations', JSON.stringify(updatedLocations));
    }
  };

  // Delete location from saved locations
  const handleDeleteLocation = (locationToDelete: string) => {
    const updatedLocations = savedLocations.filter(location => location !== locationToDelete);
    setSavedLocations(updatedLocations);
    saveToLocalStorage('locations', JSON.stringify(updatedLocations));
  };

  // Drag and drop functionality
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const cityName = e.dataTransfer.getData('text/plain');
    
    // Optionally trigger a search for the dropped city
    setCurrentLocation(cityName);
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default to allow drop
  };

  return (
    <div className="container"> 
      {/* Welcome Sign with animation */}
      <WelcomeSign />
      
      {/* Current Weather Display */}
      <LocationSearch setLocation={setCurrentLocation} />
      
      {/* Main Weather Card */} 
      {weatherData ? (
        <div className="main-card" onDrop={handleDrop} onDragOver={handleDragOver}>
          <h2 id='main-card-location-name'>Weather in {weatherData.location.name}</h2>
          <p id='main-card-temp'>Temperature: {String(weatherData.current.temp_c)} °C</p>
          <p id='main-card-icon-info'>Current weather icon: <img id='weather-icon' src={weatherData.current.condition.icon} alt="weather icon" /></p>
          
          {/* Button to show/hide additional values */}
          <button id='additional-val' onClick={() => setShowAdditionalValues(!showAdditionalValues)}>
              {showAdditionalValues ? 'Close' : '...'}
          </button>

          {/* Additional values */}
          {showAdditionalValues && (
              <div className='additional-values'>
                <p id='main-card-time'>Local time: {weatherData.location.localtime}</p>
                <p id='main-card-cond'>Condition: {weatherData.current.condition.text}</p>
                <p id='main-card-wind-spd'>Wind: {weatherData.current.wind_kph} km/h</p>
                <p id='main-card-humid'>Humidity: {weatherData.current.humidity} %</p>
              </div>
          )}

          <button onClick={handleAddLocation}>Save It</button> {/* Save button */}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
      
      {/* Display smaller elements for saved locations */}
      <h2>Saved Locations</h2>
      <div className="saved-locations">
        {savedLocations.map((location) => (
          <SmallWeatherCard 
            key={location} 
            location={location} 
            onDelete={handleDeleteLocation}  // Pass delete function to SmallWeatherCard
          />
        ))}
      </div>
    </div>
  );
};

export default App;