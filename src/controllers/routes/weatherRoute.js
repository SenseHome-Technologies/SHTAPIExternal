'use strict';
const weatherInteractorOpenWeather = require('../../usecases/weather/weatherInteractorOpenWeather');
const { currentWeatherPersistence } = require('../../usecases/weather/currentWeatherPersistence');
const router = require('express').Router();


/**
 * @api {post} /api/weather/currentWeather Get Current Weather
 * @apiName GetCurrentWeather
 * @apiGroup Weather
 * @apiDescription Retrieve current weather information based on latitude and longitude.
 *
 * @apiParam {Number} [latitude] Latitude of the location.
 * @apiParam {Number} [longitude] Longitude of the location.
 *
 * @apiSuccess {Number} status Response status code.
 * @apiSuccess {Object} data Weather data.
 *
 * @apiError {Number} status Error status code.
 * @apiError {String} message Error message.
 */
router.route('/weather/currentWeather').post(
    // Define an asynchronous function to handle the currentWeather route
    async (req, res) => {
        // Extract latitude and longitude from the request body
        const {latitude, longitude} = req.body;

        try {
            // Use weatherInteractorOpenWeather to attempt to get the weather with the provided data
            const weather = await weatherInteractorOpenWeather.currentWeather({currentWeatherPersistence}, {latitude, longitude});
            // Send the response with the status and weather data
            res.status(weather.status).send(weather);
        } catch (err) {
            // Log any errors that occur during the process
            console.log(err);
            // Rethrow the error to be handled by the caller
            throw err;
        }
    }
)

module.exports = router;
