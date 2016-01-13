var OpenWeatherJS;
(function (OpenWeatherJS) {
    var Asserts = (function () {
        function Asserts() {
        }
        Asserts.isExists = function (value, message) {
            if (value == null) {
                throw new TypeError(message.replace('@', value));
            }
        };
        Asserts.isInRange = function (value, minimum, maximum, message) {
            if (typeof value !== 'number') {
                throw new TypeError(message.replace('@1', minimum.toString()).replace('@2', maximum.toString()).replace('@', value));
            }
            if ((value < minimum) || (value > maximum)) {
                throw new RangeError(message.replace('@1', minimum.toString()).replace('@2', maximum.toString()).replace('@', value));
            }
        };
        Asserts.isNumber = function (value, message) {
            if (typeof value !== 'number') {
                throw new TypeError(message.replace('@', value));
            }
        };
        Asserts.isString = function (value, message) {
            if (typeof value !== 'string') {
                throw new TypeError(message.replace('@', value));
            }
        };
        Asserts.isUrl = function (value, message) {
            var URLValidationRegExp = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
            var matcher = URLValidationRegExp;
            Asserts.isString(value, message);
            var match = value.match(matcher);
            if (!match) {
                throw new TypeError(message.replace('@', value));
            }
        };
        Asserts.isJSON = function (value, message) {
            try {
                var o = JSON.parse(value);
                if ((typeof o !== 'object') || (o == null)) {
                    throw new TypeError(message.replace('@', value));
                }
            }
            catch (e) {
                throw new TypeError(message.replace('@', value));
            }
        };
        Asserts.isInstanceofOf = function (value, type, message) {
            if ((value == null) || ((value instanceof type) === false)) {
                throw new TypeError(message.replace('@', value));
            }
        };
        return Asserts;
    })();
    OpenWeatherJS.Asserts = Asserts;
})(OpenWeatherJS || (OpenWeatherJS = {}));
var OpenWeatherJS;
(function (OpenWeatherJS) {
    var Location = (function () {
        function Location() {
        }
        Location.getById = function (id) {
            OpenWeatherJS.Asserts.isInRange(id, 1, 99999999, 'Location id value should be between 1 and 99999999.');
            var location = new Location();
            location.type = OpenWeatherJS.LocationType.ID;
            location.id = id;
            return location;
        };
        Location.getByName = function (name, country) {
            OpenWeatherJS.Asserts.isString(name, 'Location name is invalid.');
            var location = new Location();
            location.type = OpenWeatherJS.LocationType.NAME;
            location.name = name;
            if (country) {
                OpenWeatherJS.Asserts.isString(country, 'Location country is invalid.');
                location.country = country;
            }
            return location;
        };
        Location.getByCoordinates = function (latitude, longitude) {
            OpenWeatherJS.Asserts.isNumber(latitude, 'Location latitude is invalid.');
            OpenWeatherJS.Asserts.isNumber(longitude, 'Location longitude is invalid.');
            var location = new Location();
            location.type = OpenWeatherJS.LocationType.COORDINATES;
            location.latitude = latitude;
            location.longitude = longitude;
            return location;
        };
        Location.getByZip = function (zip, country) {
            OpenWeatherJS.Asserts.isString(zip, 'Location zip is invalid.');
            OpenWeatherJS.Asserts.isString(country, 'Location country is invalid.');
            var location = new Location();
            location.type = OpenWeatherJS.LocationType.ZIP;
            location.zip = zip;
            location.country = country;
            return location;
        };
        Location.prototype.equals = function (location) {
            if ((location == null) || ((location instanceof Location) === false)) {
                return false;
            }
            return location.getType() === this.type
                && location.getId() === this.id
                && location.getName() === this.name
                && location.getLatitude() === this.latitude
                && location.getLongitude() === this.longitude
                && location.getZip() === this.zip
                && location.getCountry() === this.country;
        };
        Location.prototype.getType = function () {
            return this.type;
        };
        Location.prototype.getId = function () {
            return this.id;
        };
        Location.prototype.getName = function () {
            return this.name;
        };
        Location.prototype.getLatitude = function () {
            return this.latitude;
        };
        Location.prototype.getLongitude = function () {
            return this.longitude;
        };
        Location.prototype.getZip = function () {
            return this.zip;
        };
        Location.prototype.getCountry = function () {
            return this.country;
        };
        Location.prototype.setType = function (type) {
            this.type = type;
        };
        Location.prototype.setId = function (id) {
            OpenWeatherJS.Asserts.isInRange(id, 1, 99999999, 'Location id value should be between 1 and 99999999. [' + id + ']');
            this.id = id;
        };
        Location.prototype.setName = function (name) {
            OpenWeatherJS.Asserts.isString(name, 'Location name is invalid.');
            this.name = name;
        };
        Location.prototype.setLatitude = function (latitude) {
            OpenWeatherJS.Asserts.isNumber(latitude, 'Location latitude is invalid.');
            this.latitude = latitude;
        };
        Location.prototype.setLongitude = function (longitude) {
            OpenWeatherJS.Asserts.isNumber(longitude, 'Location longitude is invalid.');
            this.longitude = longitude;
        };
        Location.prototype.setZip = function (zip) {
            OpenWeatherJS.Asserts.isString(zip, 'Location zip is invalid.');
            this.zip = zip;
        };
        Location.prototype.setCountry = function (country) {
            OpenWeatherJS.Asserts.isString(country, 'Location country is invalid.');
            this.country = country;
        };
        return Location;
    })();
    OpenWeatherJS.Location = Location;
})(OpenWeatherJS || (OpenWeatherJS = {}));
var OpenWeatherJS;
(function (OpenWeatherJS) {
    (function (LocationType) {
        LocationType[LocationType["ID"] = 0] = "ID";
        LocationType[LocationType["NAME"] = 1] = "NAME";
        LocationType[LocationType["COORDINATES"] = 2] = "COORDINATES";
        LocationType[LocationType["ZIP"] = 3] = "ZIP";
    })(OpenWeatherJS.LocationType || (OpenWeatherJS.LocationType = {}));
    var LocationType = OpenWeatherJS.LocationType;
})(OpenWeatherJS || (OpenWeatherJS = {}));
var OpenWeatherJS;
(function (OpenWeatherJS) {
    var JSONParser = (function () {
        function JSONParser() {
            this.REQUEST_NOT_INITIALIZED = 0;
            this.SERVER_CONNECTION_ESTABLISHED = 1;
            this.REQUEST_RECEIVED = 2;
            this.PROCESSING_REQUEST = 3;
            this.REQUEST_FINISHED_AND_RESPONSE_IS_READY = 4;
            this.OK = 200;
            this.PAGE_NOT_FOUND = 404;
            try {
                this.request = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) {
                try {
                    this.request = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (E) {
                    this.request = null;
                }
            }
            if ((this.request == null) && (typeof XMLHttpRequest != 'undefined')) {
                this.request = new XMLHttpRequest();
            }
        }
        JSONParser.prototype.parse = function (url, success, error) {
            OpenWeatherJS.Asserts.isUrl(url, 'URL is invalid.');
            this.request.onreadystatechange = function () {
                if (this.request.readyState === this.REQUEST_FINISHED_AND_RESPONSE_IS_READY) {
                    if (this.request.status === this.OK) {
                        OpenWeatherJS.Asserts.isJSON(this.request.responseText, 'JSON data is invalid.');
                        var json = JSON.parse(this.request.responseText);
                        if ((json.cod === undefined) || (json.cod !== 200)) {
                            error(this.request, 'Error code returned from API.');
                            return;
                        }
                        success(json, this.request);
                    }
                    else {
                        error(this.request, 'Unable to make a connection.');
                    }
                }
            }.bind(this);
            this.request.open('GET', url, true);
            this.request.timeout = 2000;
            this.request.ontimeout = function () {
                this.request.abort();
                throw new Error('Request timed out.');
            };
            this.request.send();
        };
        return JSONParser;
    })();
    OpenWeatherJS.JSONParser = JSONParser;
})(OpenWeatherJS || (OpenWeatherJS = {}));
var OpenWeatherJS;
(function (OpenWeatherJS) {
    var Forecast = (function () {
        function Forecast() {
        }
        Forecast.getHourlyForecast = function (location, success, error) {
            OpenWeatherJS.Asserts.isInstanceofOf(location, OpenWeatherJS.Location, 'Location type is invalid.');
            var url;
            var parser = new OpenWeatherJS.JSONParser();
            var report = new OpenWeatherJS.WeatherReport();
            switch (location.getType()) {
                case OpenWeatherJS.LocationType.ID:
                    url = 'http://api.openweathermap.org/data/2.5/forecast?id=' + location.getId() + '&mode=json&appid=5aed8cbbc1e19c962a8e514f59f8fe52';
                    console.log(url);
                    break;
                case OpenWeatherJS.LocationType.NAME:
                    url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + location.getName() + '&mode=json&appid=5aed8cbbc1e19c962a8e514f59f8fe52';
                    console.log(url);
                    break;
                case OpenWeatherJS.LocationType.COORDINATES:
                    url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + location.getLatitude() + '&lon=' + location.getLongitude();
                    break;
            }
            parser.parse(url, function (response, request) {
                var location;
                var entry;
                for (var x = 0; x < response.cnt; x++) {
                    entry = new OpenWeatherJS.WeatherEntry();
                    entry.setWeatherCondition(response.list[x].weather[0].id);
                    entry.setWeatherParameters(response.list[x].weather[0].main);
                    entry.setWeatherDescription(response.list[x].weather[0].description);
                    entry.setWeatherIconId(response.list[x].weather[0].icon);
                    entry.setTemperature(response.list[x].main.temp);
                    entry.setPressure(response.list[x].main.pressure);
                    entry.setHumidity(response.list[x].main.humidity);
                    entry.setMinimum(response.list[x].main.temp_min);
                    entry.setMaximum(response.list[x].main.temp_max);
                    entry.setSeaLevelPressure((response.list[x].main.sea_level !== undefined)
                        ? response.list[x].main.sea_level
                        : response.list[x].main.pressure);
                    entry.setGroundLevelPressure((response.list[x].main.grnd_level !== undefined)
                        ? response.list[x].main.grnd_level
                        : response.list[x].main.pressure);
                    entry.setWindSpeed(response.list[x].wind.speed);
                    entry.setWindDirection(response.list[x].wind.deg);
                    entry.setCloudine(response.list[x].clouds.all);
                    entry.setRainVolume(((response.list[x].rain !== undefined) && (response.list[x].rain['3h'] !== undefined))
                        ? response.list[x].rain['3h']
                        : 0);
                    entry.setSnowVolume(((response.list[x].snow !== undefined) && (response.list[x].snow['3h'] !== undefined))
                        ? response.list[x].snow['3h']
                        : 0);
                    location = new OpenWeatherJS.Location();
                    location.setId(response.city.id);
                    location.setName(response.city.name);
                    location.setLatitude(response.city.coord.lat);
                    location.setLongitude(response.city.coord.lon);
                    location.setCountry(response.city.country);
                    entry.setLocation(location);
                    entry.setTime(response.list[x].dt);
                    report.addEntry(entry);
                }
                success(report, request);
            }, function (request) {
                error(request);
            });
        };
        return Forecast;
    })();
    OpenWeatherJS.Forecast = Forecast;
})(OpenWeatherJS || (OpenWeatherJS = {}));
var OpenWeatherJS;
(function (OpenWeatherJS) {
    (function (WeatherCondition) {
        WeatherCondition[WeatherCondition["THUNDERSTORM_WITH_LIGHT_RAIN"] = 200] = "THUNDERSTORM_WITH_LIGHT_RAIN";
        WeatherCondition[WeatherCondition["THUNDERSTORM_WITH_RAIN"] = 201] = "THUNDERSTORM_WITH_RAIN";
        WeatherCondition[WeatherCondition["THUNDERSTORM_WITH_HEAVY_RAIN"] = 202] = "THUNDERSTORM_WITH_HEAVY_RAIN";
        WeatherCondition[WeatherCondition["LIGHT_THUNDERSTORM"] = 210] = "LIGHT_THUNDERSTORM";
        WeatherCondition[WeatherCondition["THUNDERSTORM"] = 211] = "THUNDERSTORM";
        WeatherCondition[WeatherCondition["HEAVY_THUNDERSTORM"] = 212] = "HEAVY_THUNDERSTORM";
        WeatherCondition[WeatherCondition["RAGGED_THUNDERSTORM"] = 221] = "RAGGED_THUNDERSTORM";
        WeatherCondition[WeatherCondition["THUNDERSTORM_WITH_LIGHT_DRIZZLE"] = 230] = "THUNDERSTORM_WITH_LIGHT_DRIZZLE";
        WeatherCondition[WeatherCondition["THUNDERSTORM_WITH_DRIZZLE"] = 231] = "THUNDERSTORM_WITH_DRIZZLE";
        WeatherCondition[WeatherCondition["THUNDERSTORM_WITH_HEAVY_DRIZZLE"] = 232] = "THUNDERSTORM_WITH_HEAVY_DRIZZLE";
        WeatherCondition[WeatherCondition["LIGHT_INTENSITY_DRIZZLE"] = 300] = "LIGHT_INTENSITY_DRIZZLE";
        WeatherCondition[WeatherCondition["DRIZZLE"] = 301] = "DRIZZLE";
        WeatherCondition[WeatherCondition["HEAVY_INTENSITY_DRIZZLE"] = 302] = "HEAVY_INTENSITY_DRIZZLE";
        WeatherCondition[WeatherCondition["LIGHT_INTENSITY_DRIZZLE_RAIN"] = 310] = "LIGHT_INTENSITY_DRIZZLE_RAIN";
        WeatherCondition[WeatherCondition["DRIZZLE_RAIN"] = 311] = "DRIZZLE_RAIN";
        WeatherCondition[WeatherCondition["HEAVY_INTENSITY_DRIZZLE_RAIN"] = 312] = "HEAVY_INTENSITY_DRIZZLE_RAIN";
        WeatherCondition[WeatherCondition["SHOWER_RAIN_AND_DRIZZLE"] = 313] = "SHOWER_RAIN_AND_DRIZZLE";
        WeatherCondition[WeatherCondition["HEAVY_SHOWER_RAIN_AND_DRIZZLE"] = 314] = "HEAVY_SHOWER_RAIN_AND_DRIZZLE";
        WeatherCondition[WeatherCondition["SHOWER_DRIZZLE"] = 321] = "SHOWER_DRIZZLE";
        WeatherCondition[WeatherCondition["LIGHT_RAIN"] = 500] = "LIGHT_RAIN";
        WeatherCondition[WeatherCondition["MODERATE_RAIN"] = 501] = "MODERATE_RAIN";
        WeatherCondition[WeatherCondition["HEAVY_INTENSITY_RAIN"] = 502] = "HEAVY_INTENSITY_RAIN";
        WeatherCondition[WeatherCondition["VERY_HEAVY_RAIN"] = 503] = "VERY_HEAVY_RAIN";
        WeatherCondition[WeatherCondition["EXTREME_RAIN"] = 504] = "EXTREME_RAIN";
        WeatherCondition[WeatherCondition["FREEZING_RAIN"] = 511] = "FREEZING_RAIN";
        WeatherCondition[WeatherCondition["LIGHT_INTENSITY_SHOWER_RAIN"] = 520] = "LIGHT_INTENSITY_SHOWER_RAIN";
        WeatherCondition[WeatherCondition["SHOWER_RAIN"] = 521] = "SHOWER_RAIN";
        WeatherCondition[WeatherCondition["HEAVY_INTENSITY_SHOWER_RAIN"] = 522] = "HEAVY_INTENSITY_SHOWER_RAIN";
        WeatherCondition[WeatherCondition["RAGGED_SHOWER_RAIN"] = 531] = "RAGGED_SHOWER_RAIN";
        WeatherCondition[WeatherCondition["LIGHT_SNOW"] = 600] = "LIGHT_SNOW";
        WeatherCondition[WeatherCondition["SNOW"] = 601] = "SNOW";
        WeatherCondition[WeatherCondition["HEAVY_SNOW"] = 602] = "HEAVY_SNOW";
        WeatherCondition[WeatherCondition["SLEET"] = 611] = "SLEET";
        WeatherCondition[WeatherCondition["SHOWER_SLEET"] = 612] = "SHOWER_SLEET";
        WeatherCondition[WeatherCondition["LIGHT_RAIN_AND_SNOW"] = 615] = "LIGHT_RAIN_AND_SNOW";
        WeatherCondition[WeatherCondition["RAIN_AND_SNOW"] = 616] = "RAIN_AND_SNOW";
        WeatherCondition[WeatherCondition["LIGHT_SHOWER_SNOW"] = 620] = "LIGHT_SHOWER_SNOW";
        WeatherCondition[WeatherCondition["SHOWER_SNOW"] = 621] = "SHOWER_SNOW";
        WeatherCondition[WeatherCondition["HEAVY_SHOWER_SNOW"] = 622] = "HEAVY_SHOWER_SNOW";
        WeatherCondition[WeatherCondition["MIST"] = 701] = "MIST";
        WeatherCondition[WeatherCondition["SMOKE"] = 711] = "SMOKE";
        WeatherCondition[WeatherCondition["HAZE"] = 721] = "HAZE";
        WeatherCondition[WeatherCondition["SAND_OR_DUST_WHIRLS"] = 731] = "SAND_OR_DUST_WHIRLS";
        WeatherCondition[WeatherCondition["FOG"] = 741] = "FOG";
        WeatherCondition[WeatherCondition["SAND"] = 751] = "SAND";
        WeatherCondition[WeatherCondition["DUST"] = 761] = "DUST";
        WeatherCondition[WeatherCondition["VOLCANIC_ASH"] = 762] = "VOLCANIC_ASH";
        WeatherCondition[WeatherCondition["SQUALLS"] = 771] = "SQUALLS";
        WeatherCondition[WeatherCondition["TORNADO"] = 781] = "TORNADO";
        WeatherCondition[WeatherCondition["CLEAR_SKY"] = 800] = "CLEAR_SKY";
        WeatherCondition[WeatherCondition["FEW_CLOUDS"] = 801] = "FEW_CLOUDS";
        WeatherCondition[WeatherCondition["SCATTERED_CLOUDS"] = 802] = "SCATTERED_CLOUDS";
        WeatherCondition[WeatherCondition["BROKEN_CLOUDS"] = 803] = "BROKEN_CLOUDS";
        WeatherCondition[WeatherCondition["OVERCAST_CLOUDS"] = 804] = "OVERCAST_CLOUDS";
        WeatherCondition[WeatherCondition["TORNADO_STORM"] = 900] = "TORNADO_STORM";
        WeatherCondition[WeatherCondition["TROPICAL_STORM"] = 901] = "TROPICAL_STORM";
        WeatherCondition[WeatherCondition["HURRICANE_STORM"] = 902] = "HURRICANE_STORM";
        WeatherCondition[WeatherCondition["COLD"] = 903] = "COLD";
        WeatherCondition[WeatherCondition["HOT"] = 904] = "HOT";
        WeatherCondition[WeatherCondition["WINDY"] = 905] = "WINDY";
        WeatherCondition[WeatherCondition["HAIL"] = 906] = "HAIL";
        WeatherCondition[WeatherCondition["CALM"] = 951] = "CALM";
        WeatherCondition[WeatherCondition["LIGHT_BREEZE"] = 952] = "LIGHT_BREEZE";
        WeatherCondition[WeatherCondition["GENTLE_BREEZE"] = 953] = "GENTLE_BREEZE";
        WeatherCondition[WeatherCondition["MODERATE_BREEZE"] = 954] = "MODERATE_BREEZE";
        WeatherCondition[WeatherCondition["FRESH_BREEZE"] = 955] = "FRESH_BREEZE";
        WeatherCondition[WeatherCondition["STRONG_BREEZE"] = 956] = "STRONG_BREEZE";
        WeatherCondition[WeatherCondition["HIGH_WIND"] = 957] = "HIGH_WIND";
        WeatherCondition[WeatherCondition["_NEAR_GALE"] = 957] = "_NEAR_GALE";
        WeatherCondition[WeatherCondition["GALE"] = 958] = "GALE";
        WeatherCondition[WeatherCondition["SEVERE_GALE"] = 959] = "SEVERE_GALE";
        WeatherCondition[WeatherCondition["STORM"] = 960] = "STORM";
        WeatherCondition[WeatherCondition["VIOLENT_STORM"] = 961] = "VIOLENT_STORM";
        WeatherCondition[WeatherCondition["HURRICANE"] = 962] = "HURRICANE";
    })(OpenWeatherJS.WeatherCondition || (OpenWeatherJS.WeatherCondition = {}));
    var WeatherCondition = OpenWeatherJS.WeatherCondition;
})(OpenWeatherJS || (OpenWeatherJS = {}));
var OpenWeatherJS;
(function (OpenWeatherJS) {
    var WeatherEntry = (function () {
        function WeatherEntry() {
        }
        WeatherEntry.prototype.getWeatherCondition = function () {
            return this.condition;
        };
        WeatherEntry.prototype.getWeatherParameters = function () {
            return this.main;
        };
        WeatherEntry.prototype.getWeatherDescription = function () {
            return this.description;
        };
        WeatherEntry.prototype.getWeatherIconId = function () {
            return this.icon;
        };
        WeatherEntry.prototype.getTemperature = function () {
            return this.temperature;
        };
        WeatherEntry.prototype.getPressure = function () {
            return this.pressure;
        };
        WeatherEntry.prototype.getHumidity = function () {
            return this.humidity;
        };
        WeatherEntry.prototype.getMinimum = function () {
            return this.minimum;
        };
        WeatherEntry.prototype.getMaximum = function () {
            return this.maximum;
        };
        WeatherEntry.prototype.getSeaLevelPressure = function () {
            return this.seaLevel;
        };
        WeatherEntry.prototype.getGroundLevelPressure = function () {
            return this.grndLevel;
        };
        WeatherEntry.prototype.getWindSpeed = function () {
            return this.windSpeed;
        };
        WeatherEntry.prototype.getWindDirection = function () {
            return this.windDegree;
        };
        WeatherEntry.prototype.getCloudiness = function () {
            return this.cloudiness;
        };
        WeatherEntry.prototype.getRainVolume = function () {
            return this.rainVolume;
        };
        WeatherEntry.prototype.getSnowVolume = function () {
            return this.snowVolume;
        };
        WeatherEntry.prototype.getLocation = function () {
            return this.location;
        };
        WeatherEntry.prototype.getTime = function () {
            return this.time;
        };
        WeatherEntry.prototype.setWeatherCondition = function (condition) {
            OpenWeatherJS.Asserts.isNumber(condition, 'Weather condition value is invalid.');
            if (typeof OpenWeatherJS.WeatherCondition[condition] === 'undefined') {
                throw new TypeError('Weather condition value is invalid.');
            }
            this.condition = condition;
        };
        WeatherEntry.prototype.setWeatherParameters = function (main) {
            OpenWeatherJS.Asserts.isString(main, 'Weather parameters value is invalid.');
            this.main = main;
        };
        WeatherEntry.prototype.setWeatherDescription = function (description) {
            OpenWeatherJS.Asserts.isString(description, 'Weather condition within the group is invalid.');
            this.description = description;
        };
        WeatherEntry.prototype.setWeatherIconId = function (icon) {
            OpenWeatherJS.Asserts.isString(icon, 'Weather icon id value is invalid.');
            this.icon = icon;
        };
        WeatherEntry.prototype.setTemperature = function (temperature) {
            OpenWeatherJS.Asserts.isNumber(temperature, 'Temperature value is invalid.');
            this.temperature = temperature;
        };
        WeatherEntry.prototype.setPressure = function (pressure) {
            OpenWeatherJS.Asserts.isNumber(pressure, 'Pressure value is invalid.');
            this.pressure = pressure;
        };
        WeatherEntry.prototype.setHumidity = function (humidity) {
            OpenWeatherJS.Asserts.isNumber(humidity, 'Humidity value is invalid.');
            this.humidity = humidity;
        };
        WeatherEntry.prototype.setMinimum = function (minimum) {
            OpenWeatherJS.Asserts.isNumber(minimum, 'Minimum temperature value is invalid.');
            this.minimum = minimum;
        };
        WeatherEntry.prototype.setMaximum = function (maximum) {
            OpenWeatherJS.Asserts.isNumber(maximum, 'Maximum temperature value is invalid.');
            this.maximum = maximum;
        };
        WeatherEntry.prototype.setSeaLevelPressure = function (seaLevel) {
            OpenWeatherJS.Asserts.isNumber(seaLevel, 'Sea level pressure value is invalid.');
            this.seaLevel = seaLevel;
        };
        WeatherEntry.prototype.setGroundLevelPressure = function (grndLevel) {
            OpenWeatherJS.Asserts.isNumber(grndLevel, 'Ground level pressure value is invalid.');
            this.grndLevel = grndLevel;
        };
        WeatherEntry.prototype.setWindSpeed = function (windSpeed) {
            OpenWeatherJS.Asserts.isNumber(windSpeed, 'Wind speed value is invalid.');
            this.windSpeed = windSpeed;
        };
        WeatherEntry.prototype.setWindDirection = function (windDegree) {
            OpenWeatherJS.Asserts.isNumber(windDegree, 'Wind direction value is invalid.');
            this.windDegree = windDegree;
        };
        WeatherEntry.prototype.setCloudiness = function (cloudiness) {
            OpenWeatherJS.Asserts.isNumber(cloudiness, 'Cloudiness value is invalid.');
            this.cloudiness = cloudiness;
        };
        WeatherEntry.prototype.setRainVolume = function (rainVolume) {
            OpenWeatherJS.Asserts.isNumber(rainVolume, 'Rain volume is invalid.');
            this.rainVolume = rainVolume;
        };
        WeatherEntry.prototype.setSnowVolume = function (snowVolume) {
            OpenWeatherJS.Asserts.isNumber(snowVolume, 'Snow volume is invalid.');
            this.snowVolume = snowVolume;
        };
        WeatherEntry.prototype.setLocation = function (location) {
            OpenWeatherJS.Asserts.isInstanceofOf(location, OpenWeatherJS.Location, 'Location value is invalid.');
            this.location = location;
        };
        WeatherEntry.prototype.setTime = function (time) {
            OpenWeatherJS.Asserts.isNumber(time, 'Time value is invalid.');
            this.time = time;
        };
        return WeatherEntry;
    })();
    OpenWeatherJS.WeatherEntry = WeatherEntry;
})(OpenWeatherJS || (OpenWeatherJS = {}));
var OpenWeatherJS;
(function (OpenWeatherJS) {
    var WeatherReport = (function () {
        function WeatherReport() {
        }
        WeatherReport.prototype.sortEntriesBy = function (test) {
        };
        WeatherReport.prototype.addEntry = function (entry) {
            if (this.entries === undefined) {
                this.entries = new Array();
            }
            this.entries.push(entry);
        };
        WeatherReport.prototype.getEntry = function (entry) {
            return this.entries[entry];
        };
        WeatherReport.prototype.getByDay = function (day) {
            var DailyEntries;
            if (DailyEntries === undefined) {
                DailyEntries = new Array();
            }
            for (var x = 0; x <= this.entries.length - 1; x++) {
                var CurrentDate = new Date(this.entries[x].getTime() * 1000);
                if (CurrentDate.getDay() == day) {
                    DailyEntries.push(this.entries[x]);
                }
            }
            return DailyEntries;
        };
        WeatherReport.prototype.getReport = function () {
            return this.entries;
        };
        return WeatherReport;
    })();
    OpenWeatherJS.WeatherReport = WeatherReport;
})(OpenWeatherJS || (OpenWeatherJS = {}));
//# sourceMappingURL=OpenWeatherJS.js.map