var OpenWeatherJS;
(function (OpenWeatherJS) {
    var Asserts = (function () {
        function Asserts() {
        }
        Asserts.isExists = function (value, message) {
            if (value == null) {
                throw new TypeError(message);
            }
        };
        Asserts.isInRange = function (value, minimum, maximum, message) {
            if (typeof value !== 'number') {
                throw new TypeError(message);
            }
            if ((value < minimum) || (value > maximum)) {
                throw new RangeError(message);
            }
        };
        Asserts.isNumber = function (value, message) {
            if (typeof value !== 'number') {
                throw new TypeError(message);
            }
        };
        Asserts.isString = function (value, message) {
            if (typeof value !== 'string') {
                throw new TypeError(message);
            }
        };
        Asserts.isUrl = function (value, message) {
            var URLValidationRegExp = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
            var matcher = URLValidationRegExp;
            Asserts.isString(value, message);
            var match = value.match(matcher);
            if (!match) {
                throw new TypeError(message);
            }
        };
        Asserts.isJSONString = function (value, message) {
            try {
                var o = JSON.parse(value);
                if ((typeof o !== 'object') || (o == null)) {
                    throw new TypeError(message);
                }
            }
            catch (e) {
                throw new TypeError(message);
            }
        };
        Asserts.isInstanceofOf = function (value, type, message) {
            if ((value == null) || ((value instanceof type) === false)) {
                throw new TypeError(message);
            }
        };
        return Asserts;
    })();
    OpenWeatherJS.Asserts = Asserts;
})(OpenWeatherJS || (OpenWeatherJS = {}));
var OpenWeatherJS;
(function (OpenWeatherJS) {
    var CurrentWeather = (function () {
        function CurrentWeather() {
        }
        CurrentWeather.getWeather = function (location, success, error) {
            OpenWeatherJS.Asserts.isInstanceofOf(location, OpenWeatherJS.Location, 'Location type is invalid.');
            var parser = new OpenWeatherJS.JSONParser();
            var url;
            switch (location.getType()) {
                case OpenWeatherJS.LocationType.ID:
                    url = 'http://api.openweathermap.org/data/2.5/weather?id=' + location.getId();
                    break;
                case OpenWeatherJS.LocationType.NAME:
                    var country = location.getCountry();
                    url = 'http://api.openweathermap.org/data/2.5/weather?q=' + location.getName()
                        + (country !== undefined) ? ', ' + country : '';
                    break;
                case OpenWeatherJS.LocationType.COORDINATES:
                    url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + location.getLatitude()
                        + '&lon=' + location.getLongitude();
                    break;
                case OpenWeatherJS.LocationType.ZIP:
                    url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + location.getZip()
                        + ', ' + location.getCountry();
                    break;
            }
            parser.parse(url, function (response, request) {
                var entry = new OpenWeatherJS.WeatherEntry();
                var location = new OpenWeatherJS.Location();
                location.setId(response.id);
                location.setName(response.name);
                location.setLatitude(response.coord.lat);
                location.setLatitude(response.coord.lon);
                location.setZip(response.sys.country);
                success(entry, request);
            }, function (request) {
                error(request);
            });
        };
        return CurrentWeather;
    })();
    OpenWeatherJS.CurrentWeather = CurrentWeather;
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
            OpenWeatherJS.Asserts.isInRange(id, 1, 99999999, 'Location id value should be between 1 and 99999999.');
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
            if (success) {
                this.onSuccess(success);
            }
            if (error) {
                this.onError(error);
            }
            this.request.open('GET', url, true);
            this.request.timeout = 2000;
            this.request.ontimeout = function () {
                this.request.abort();
                throw new Error("Request timed out.");
            };
            this.request.send();
        };
        JSONParser.prototype.onSuccess = function (success) {
            this.request.onreadystatechange = function () {
                if ((this.request.readyState === this.REQUEST_FINISHED_AND_RESPONSE_IS_READY)
                    && (this.request.status === this.OK)) {
                    success(this.request.response, this.request);
                }
            }.bind(this);
        };
        JSONParser.prototype.onError = function (error) {
            this.request.onreadystatechange = function () {
                if ((this.request.readyState === this.REQUEST_FINISHED_AND_RESPONSE_IS_READY)
                    && (this.request.status !== this.OK)) {
                    error(this.request);
                }
            }.bind(this);
        };
        return JSONParser;
    })();
    OpenWeatherJS.JSONParser = JSONParser;
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
        return WeatherEntry;
    })();
    OpenWeatherJS.WeatherEntry = WeatherEntry;
})(OpenWeatherJS || (OpenWeatherJS = {}));
//# sourceMappingURL=OpenWeatherJS.js.map