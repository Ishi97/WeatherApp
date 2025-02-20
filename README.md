# WeatherApp

A simple **React** single-page application (SPA) that displays weather data using a public openWeather API. The application shows the user’s current location weather by default, and also allows users to search for the weather in any city. Error messages are displayed if the city name is missing or invalid.



## Features

1. **Current Location Weather**  
   - Automatically fetches and displays weather details for the user’s current location on page load.

2. **City Search**  
   - Allows users to enter a city name and fetch weather details.

3. **Error Handling**  
   - Shows an error message if the input field is empty.  
   - Shows an error message if the city name is invalid or not found.

4. **SCSS Preprocessing**  
   - Uses SCSS for styling. SCSS files are compiled to CSS and then used in the application.

5. **Production-Ready Setup**  
   - Separate server for handling API calls.

---

## Project Structure

- **WeatherApp/**
    - **public/**
      - `index.html` – Main HTML file
    - **src/**
      - **components/**
        - `Weather.js` – Component to display weather data
      - **scss/**
        - `Weather.styles.scss` – Main SCSS stylesheet (compiled to CSS)
        - `Weather.styles.css`  - CSS 
        - `Weather.styles.min.css` - Minified CSS
      - **test/**
      	- `Weather.test.js` - Unit test cases for weather Component
         
  - **server/** – Node.js
    - `server.js` – Server entry point
    - `package.json` – Server dependencies and scripts
  - `App.js` – Root application component
  - `index.js` – React entry point
  - `.env` – Environment file (contains API keys)  
---

## Installation 

Follow these steps to set up and run the application on your local machine:

1. **Clone the Repository**
   
   git clone https://github.com/Ishi97/WeatherApp.git
   
   cd WeatherApp

3. **Install dependencies**
     
		 npm install
   
4. **Run the appliaction**

	Open a terminal window and run the server:

	```bash
	   node server.js

 In another terminal window to run app:

```bash
       npm start
