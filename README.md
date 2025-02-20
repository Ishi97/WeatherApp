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
   - SCSS files are compiled to CSS and then CSS is converted to the min.css.

5. **Production-Ready Setup**  
   - Separate server for handling API calls.
  


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
  - `babel.config.json` - Configuration uses @babel/preset-env and @babel/preset-react to transpile modern JavaScript and JSX syntax for browser compatibility.

 

## Installation 

Follow these steps to set up and run the application on your local machine:

1. **Clone the Repository**
   
   git clone https://github.com/Ishi97/WeatherApp.git
   
   cd WeatherApp

3. **Install dependencies**
     
		 npm install
   
4. **Environment Variable**
   
     Place the given API key in .env
   
		 REACT_APP_API_KEY=YOUR_API_KEY_HERE
      
6. **Run the application**

	Open a terminal window and run the server:

	**Server API Endpoint:** - `http://localhost:4000/api/weather/city` – This is the URL structure to fetch weather 	data for a specified city.

	   node server.js
 
      Open a another terminal window and run the application:
   
	   npm start


 
## Application Screenshot 
<img src="https://github.com/user-attachments/assets/08f83e4b-bfa0-43a1-9b31-e0c610d9d676" alt="App Screenshot" width="400"/>

<img src="https://github.com/user-attachments/assets/7329ca74-b876-4cc0-93bd-97d8f8381b04" alt="App Screenshot" width="400"/>

<img src="https://github.com/user-attachments/assets/3d67b062-db89-4b55-853b-e732541242cd" alt="App Screenshot" width="400"/>

<img src="https://github.com/user-attachments/assets/7d633e23-9e9a-45b2-8453-8d4ad8303a42" alt="App Screenshot" width="400"/>

