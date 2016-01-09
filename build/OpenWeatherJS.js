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
                throw new TypeError('Value is not a number.');
            }
            if ((value < minimum) || (value > maximum)) {
                throw new RangeError('Location id value should be between 1 and 99999999');
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
                throw new Error(message);
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
    var Location = (function () {
        function Location() {
        }
        Location.getById = function (id) {
            OpenWeatherJS.Asserts.isInRange(id, 1, 99999999, 'Location id is invalid');
            var location = new Location();
            location.type = OpenWeatherJS.LocationType.ID;
            location.id = id;
            return location;
        };
        Location.getByName = function (name) {
            OpenWeatherJS.Asserts.isString(name, 'Location name is invalid.');
            var location = new Location();
            location.type = OpenWeatherJS.LocationType.NAME;
            location.name = name;
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
        }
        JSONParser.Parse = function (url, done) {
            OpenWeatherJS.Asserts.isUrl(url, 'URL is invalid.');
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4) {
                    try {
                        if (xmlHttp.status == 200) {
                            var obj = JSON.parse(xmlHttp.responseText);
                            OpenWeatherJS.Asserts.isJSONString(JSON.stringify(obj), 'Retrieved JSON is invalid.');
                            done(obj);
                        }
                    }
                    catch (err) {
                        throw new Error("Error connecting: " + err);
                    }
                }
            };
            xmlHttp.open('GET', url, true);
            xmlHttp.timeout = 2000;
            xmlHttp.ontimeout = function () {
                xmlHttp.abort();
                throw new Error("Request Timed Out.");
            };
            xmlHttp.send();
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
        Forecast.getHourlyForecast = function (location) {
            OpenWeatherJS.Asserts.isInstanceofOf(location, OpenWeatherJS.Location, 'Location type is invalid.');
            var url;
            switch (location.getType()) {
                case OpenWeatherJS.LocationType.NAME:
                    url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + location.getName() + '&mode=json&appid=5aed8cbbc1e19c962a8e514f59f8fe52';
                    console.log(url);
                    break;
            }
            OpenWeatherJS.JSONParser.Parse(url, function (json) {
                console.log(json);
            });
            console.log('Forecast');
        };
        return Forecast;
    })();
    OpenWeatherJS.Forecast = Forecast;
})(OpenWeatherJS || (OpenWeatherJS = {}));
//# sourceMappingURL=OpenWeatherJS.js.map