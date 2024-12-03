const axios = require('axios');

exports.currentWeatherPersistence = async (weather) => {
    try {
        const params = {
            lat: weather.latitude,
            lon: weather.longitude,
            appid: process.env.WEATHER_KEY,
            units: 'metric',
            lang: 'en',
        };

        if (weather.exclude) {
            params.exclude = weather.exclude;
        }

        const response = await axios.get(process.env.WEATHER_URL, { params });

        if (response.status === 401) {
            return { status: 400, message: 'Not authorized based in credentials' };
        }

        if (response.status === 404) {
            return { status: 400, message: 'Coordinates not found' };
        }

        // Return success response with data
        return { status: 200, message: 'Weather values obtained successfully', token: response.data };
    } catch (error) {
        // Handle any errors during login process
        return { status: 500, message: error.message };
    }
}