/**
 * The OpenWeatherJS Library.
 * The JavaScript library to work with weather information and forecasts data
 * provided by Open Weather Map. Built using TypeScript.
 *
 * The MIT License (MIT)
 *
 * Copyright (C) 2016 The OpenWeatherJS Project
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

module OpenWeatherJS {
    export class CurrentWeather {
        /**
         * Returns a current weather report for a given location value. 
         * Throws a new Error in case of connection failure and inavlid data recived.  
         *
         * @param location - a location value.
         * @param success  - a function to be run when an AJAX request is successfully completed.
         * @param error    - a function to be run when an AJAX request fails.
         * @param entry    - a current weather report for a given location
         * @param request  - a value contains the XMLHttpRequest object.
         */
        static getWeather(location: Location, success: (entry: WeatherEntry, request: XMLHttpRequest) => void, 
                error: (request: XMLHttpRequest) => void): void {
            Asserts.isInstanceofOf(location, Location, 'Location type is invalid.');
            
            var parser  = new JSONParser();
            var options = Options.getInstance();
            var url: string;
            
            /* generate an URL for API call */
            switch (location.getType()) {
            case LocationType.ID:
                url = 'http://api.openweathermap.org/data/2.5/weather?id=' + location.getId();
                break;
            case LocationType.NAME:
                var country = location.getCountry();
                url = 'http://api.openweathermap.org/data/2.5/weather?q=' + location.getName() 
                    + (country !== undefined) ? ', ' + country : '';
            break;
                case LocationType.COORDINATES:
                url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + location.getLatitude() 
                    + '&lon=' + location.getLongitude();
                break;
            case LocationType.ZIP:
                url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + location.getZip()
                    + ', ' + location.getCountry();
                break;
            }
            
            /* append API key to url */
            url = url + '&appid=' + options.getKey();

            parser.parse(url, function(response: any, request: XMLHttpRequest) {
                var entry    = new WeatherEntry();
                var location = new Location();
                
                location.setId(response.id);
                location.setName(response.name)
                location.setLatitude(response.coord.lat);
                location.setLongitude(response.coord.lon);
                location.setCountry(response.sys.country);
                
                entry.setLocation(location);
                
                success(entry, request);
            }, function(request: XMLHttpRequest) {
                error(request);
            });
        }
    }
}
