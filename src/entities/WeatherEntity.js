exports.WeatherEntity = class WeatherEntity {
    constructor(weather) {
        this.appId = weather.appId;
        this.latitude = weather.latitude;
        this.longitude = weather.longitude;
        this.mode = weather.mode;
        this.units = weather.units;
        this.language = weather.language;
    }
}