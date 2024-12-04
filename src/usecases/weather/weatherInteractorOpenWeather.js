'use strict';

const {WeatherEntity} = require('../../entities/WeatherEntity');

exports.currentWeather = async ({currentWeatherPersistence}, {latitude, longitude, exclude}) => {
    try {
        // Create a new WeatherEntity with provided latitude, longitude and exclude
        const weather = new WeatherEntity({latitude, longitude, exclude});

        // Validate the latitude and longitude values
        if (!(weather.latitude && weather.longitude)) {
            return { status: 400, message: 'Latitude or longitude are missing' };
        }

        // Attempt to persist current weather and retrieve result
        return await currentWeatherPersistence(weather);
    } catch (err) {
        // Log any errors that occur during the login process
        console.error(err);
        // Rethrow the error to be handled by the caller
        throw err;
    }
}