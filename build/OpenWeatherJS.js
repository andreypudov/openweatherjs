var OpenWeatherJS;
(function (OpenWeatherJS) {
    var Asserts = (function () {
        function Asserts() {
        }
        Asserts.IsExists = function (value, message) {
            if (value == null) {
                throw new TypeError(message);
            }
        };
        Asserts.IsInRange = function (value, minimum, maximum, message) {
            if (typeof value !== 'number') {
                throw new TypeError('Value is not a number.');
            }
            if ((value < minimum) || (value > maximum)) {
                throw new RangeError('Location id value should be between 1 and 99999999');
            }
        };
        Asserts.IsNumber = function (value, message) {
            if (typeof value !== 'number') {
                throw new TypeError(message);
            }
        };
        Asserts.IsString = function (value, message) {
            if (typeof value !== 'string') {
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
            OpenWeatherJS.Asserts.IsInRange(id, 1, 99999999, 'Location id is invalid');
            var location = new Location();
            location.type = OpenWeatherJS.LocationType.ID;
            location.id = id;
            return location;
        };
        Location.getByName = function (name) {
            OpenWeatherJS.Asserts.IsString(name, 'Location name is invalid.');
            var location = new Location();
            location.type = OpenWeatherJS.LocationType.NAME;
            location.name = name;
            return location;
        };
        Location.getByCoordinates = function (latitude, longitude) {
            OpenWeatherJS.Asserts.IsNumber(latitude, 'Location latitude is invalid.');
            OpenWeatherJS.Asserts.IsNumber(longitude, 'Location longitude is invalid.');
            var location = new Location();
            location.type = OpenWeatherJS.LocationType.COORDINATES;
            location.latitude = latitude;
            location.longitude = longitude;
            return location;
        };
        Location.getByZip = function (zip, country) {
            OpenWeatherJS.Asserts.IsString(zip, 'Location zip is invalid.');
            OpenWeatherJS.Asserts.IsString(country, 'Location country is invalid.');
            var location = new Location();
            location.type = OpenWeatherJS.LocationType.ZIP;
            location.zip = zip;
            location.country = country;
            return location;
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
//# sourceMappingURL=OpenWeatherJS.js.map