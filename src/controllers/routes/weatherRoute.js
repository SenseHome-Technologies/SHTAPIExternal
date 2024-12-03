'use strict';
const { currentWeather } = require('../../usecases/weather/weatherInteractorOpenWeather');
const { currentWeatherPersistence } = require('../../usecases/weather/currentWeatherPersistence');
const router = require('express').Router();

/**
 * @api {post} /weather/currentWeather Current weather
 * @apiName CurrentWeather
 * @apiGroup Weather
 * @apiParam {String} latitude coordinate
 * @apiParam {String} longitude coordinate
 * @apiSuccess {String} message Weather values obtained successfully
 * @apiSuccess {String} token JWT token for the user
 * @apiError {String} message Latitude or longitude are missing
 * @apiError {String} message Not authorized based in credentials
 * @apiError {String} message Coordinates not found
 */
router.route('/weather/currentWeather').post(
    // Define an asynchronous function to handle the weather route
    async (req, res) => {
        // Extract latitude and longitude from the request body
        const {latitude, longitude, exclude} = req.body;

        try {
            // Use weatherInteractorOpenWeather to attempt to get current weather with the provided latitude, longitude and exclude
            const weather = await currentWeather({currentWeatherPersistence}, {latitude, longitude, exclude});
            // Send the response with the status and weather data
            res.status(weather.status).send(weather);
        } catch (err) {
            // Log any errors that occur during the weather process
            console.log(err);
            // Rethrow the error to be handled by the caller
            throw err;
        }
    }
)

module.exports = router;
