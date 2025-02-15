'use strict'

const axios = require('axios');
// require('dotenv').config();

exports.currentWeatherPersistence = async (weather) => {
    try {
        // Parameters to include in call to openWeather API
        const params = {
            lat: weather.latitude,
            lon: weather.longitude,
            appid: process.env.WEATHER_KEY,
            units: 'metric',
            lang: 'en',
        };

        // Base Url for OpenWeather API
        const url = "https://api.openweathermap.org/data/2.5/weather";

        // Make the request to OpenWeather API
        const response = await axios.get(url, {params});

        // Treat message errors from Open Weather API
        switch (response.status) {
            case 401:
                return { status: 400, message: 'Not authorized based in credentials' };
            case 404:
                return { status: 400, message: 'Coordinates not found' };
            case 429:
                return { status: 400, message: 'Exceeded the number of calls permitted to Open Weather API' };
            case 500:
            case 502:
            case 503:
            case 504:
                return { status: 400, message: 'Something went wrong with the request' };
        }

        // Return success response with data
        return { status: 200, message: 'Weather values obtained successfully', data: response.data };
    } catch (error) {
        // Handle any errors during login process
        return { status: 500, message: error.message };
    }
}