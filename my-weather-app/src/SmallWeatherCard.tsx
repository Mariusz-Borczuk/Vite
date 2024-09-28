import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';

interface SmallWeatherCardProps {
    location: string;
    onDelete: (location: string) => void;
}

const SmallWeatherCard: React.FC<SmallWeatherCardProps> = ({ location, onDelete }) => {
    const [weatherData, setWeatherData] = useState<any>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${location}`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data', error);
            }
        };

        fetchWeather();
    }, [location]);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/plain', location);
    };

    return (
        <div 
            className="small-card-container" 
            draggable 
            onDragStart={handleDragStart}
        >
            <div className="small-card">
                {weatherData ? (
                    <div>
                        <h3>{weatherData.location.name}</h3>
                        <p>{weatherData.current.temp_c} °C</p>
                        <p>{weatherData.current.condition.text}</p>
                        {/* Delete button */}
                        <button id='small-card-button-delete' onClick={() => onDelete(location)}>Delete</button>
                    </div>
                ) : (
                    // Display loading text while fetching data
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default SmallWeatherCard;