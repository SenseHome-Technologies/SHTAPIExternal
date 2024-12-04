'use strict';
const { currentWeather } = require('../../usecases/weather/weatherInteractorOpenWeather');
const { currentWeatherPersistence } = require('../../usecases/weather/currentWeatherPersistence');
const router = require('express').Router();


/**
 * @api {post} /api/weather/currentWeather Get Current Weather
 * @apiName GetCurrentWeather
 * @apiGroup Weather
 * 
 * @apiParam {Number} [latitude] Latitude of the location.
 * @apiParam {Number} [longitude] Longitude of the location.
 * @apiParam {String} [exclude] Data to exclude from the weather response.
 * 
 * @apiSuccess {Number} status Response status code.
 * @apiSuccess {Object} token Weather data.
 * 
 * @apiError {Number} status Error status code.
 * @apiError {String} message Error message.
 */
router.route('/weather/currentWeather').post(
    // Define an asynchronous function to handle the currentWeather route
    async (req, res) => {
        // Extract latitude, longitude and exclude from the request body
        const {latitude, longitude, exclude} = req.body;

        try {
            // Use weatherInteractorOpenWeather to attempt get the weather with the provided data
            const weather = await currentWeather({currentWeatherPersistence}, {latitude, longitude, exclude});
            // Send the response with the status and weather data
            res.status(weather.status).send(weather);
        } catch (err) {
            // Log any errors that occur during the login process
            console.log(err);
            // Rethrow the error to be handled by the caller
            throw err;
        }
    }
)

module.exports = router;
