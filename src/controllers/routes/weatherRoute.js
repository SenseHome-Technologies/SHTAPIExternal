'use strict';
const { currentWeather } = require('../../usecases/weather/weatherInteractorOpenWeather');
const { currentWeatherPersistence } = require('../../usecases/weather/currentWeatherPersistence');
const router = require('express').Router();


/**
 * @api {post} /api/weather/currentWeather Get Current Weather
 * @apiName GetCurrentWeather
 * @apiGroup Weather
 * 
 * @apiParam {Number} latitude Latitude of the location.
 * @apiParam {Number} longitude Longitude of the location.
 * @apiParam {String} [exclude] Data to exclude from the weather response.
 * 
 * @apiSuccess {Number} status Response status code.
 * @apiSuccess {Object} token Weather data.
 * 
 * @apiError {Number} status Error status code.
 * @apiError {String} message Error message.
 */
router.route('/weather/currentWeather').post(
    async (req, res) => {
        const {latitude, longitude, exclude} = req.body;

        try {
            const weather = await currentWeather({currentWeatherPersistence}, {latitude, longitude, exclude});
            res.status(weather.status).send(weather);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
)

module.exports = router;
