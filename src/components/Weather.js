import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/Weather.min.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [currentLocationWeather, setCurrentLocationWeather] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Cache for storing previously fetched weather data (normalized by lower-case city name)
  const cacheRef = useRef({});

  // Handle input changes
  const handleInputChange = useCallback((e) => {
    setCityInput(e.target.value);
  }, []);

  // Trigger search when button is clicked or Enter is pressed
  const handleSearch = useCallback(() => {
    const trimmedCity = cityInput.trim();
    if (!trimmedCity) {
      setError('Please enter a city name.');
      setWeatherData(null);
      setCity('');
      return;
    }
    // When a new search is initiated, clear current location weather
    setCurrentLocationWeather(null);
    
    // Clear previous weather data and error if new city is entered.
    if (trimmedCity.toLowerCase() !== city) {
      setWeatherData(null);
      setError(null);
    }
    // Convert to lowercase to normalize caching and trigger API call
    setCity(trimmedCity.toLowerCase());
  }, [cityInput, city]);

  // Trigger search on Enter key press
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
  );

  // Effect for searching by city name
  useEffect(() => {
    if (!city) return;

    // Check if we have cached data for the city
    if (cacheRef.current[city]) {
      setWeatherData(cacheRef.current[city]);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        // Use the city route for searching by city name
        const apiUrl = `/api/weather/${city}`;
        const response = await fetch(apiUrl, { signal: controller.signal });
    
        if (!response.ok) {
          const errorDetails = await response.json(); // Get API error details
          console.error('Error details:', errorDetails);
    
          if (response.status === 404) {
            throw new Error("City not found. Please enter a valid city.");
          } else if (response.status === 401) {
            throw new Error("Invalid API key. Contact support.");
          } else if (response.status === 429) {
            throw new Error("Too many requests. Please wait and try again.");
          } else {
            throw new Error("Error fetching weather data.");
          }
        }
    
        const data = await response.json();
        setWeatherData(data);
        cacheRef.current[city] = data; // Cache result
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message); // Display error messages
          setWeatherData(null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWeather();

    // Cleanup: abort the fetch if city changes or component unmounts
    return () => {
      controller.abort();
    };
  }, [city]);

  // Effect for fetching current location weather on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Fetch weather data by current location.
            // Ensure your server supports this query (e.g., /api/weather?lat=xx&lon=yy)
            const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
            if (!response.ok) {
              throw new Error("Unable to fetch current location weather.");
            }
            const data = await response.json();
            setCurrentLocationWeather(data);
          } catch (err) {
            console.error("Current location error:", err);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="weather-container">
      <h1 tabIndex="0">Weather Details</h1>

      {/* Current location weather */}
      {currentLocationWeather && (
        <div className="current-location">
          <h2>Current Location Weather in {currentLocationWeather.name}</h2>
          <p>
            <strong>Temperature:</strong> {currentLocationWeather.main?.temp} °C
          </p>
          <p>
            <strong>Condition:</strong> {currentLocationWeather.weather?.[0]?.description}
          </p>
        </div>
      )}

      {/* Search Bar */}
      <div className="search-container">
        <label htmlFor="city-input">Enter City:</label>
        <input
          id="city-input"
          type="text"
          placeholder="Enter a city name"
          value={cityInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Enter city name"
        />
        <button onClick={handleSearch} aria-label="Search weather">
          Search
        </button>
      </div>

      {error && (
        <div role="alert" className="error" aria-live="assertive">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="loading" aria-live="polite">
          Loading weather data...
        </div>
      )}

      {weatherData && !isLoading && (
        <div className="weather-info">
          <h2>Weather in {weatherData.name || city}</h2>
          <p>
            <strong>Temperature:</strong> {weatherData.main?.temp} °C
          </p>
          <p>
            <strong>Condition:</strong> {weatherData.weather?.[0]?.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
