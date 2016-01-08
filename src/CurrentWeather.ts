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
         * @return a current weather trport for a given location.
         */
        static getWeather(location: Location): WeatherEntry {
            Asserts.isInstanceofOf(location, Location, 'Location type is invalid.');
            
            var entry = new WeatherEntry();
            var url: string;
            
            /* generate an URL for API call */
            switch (location.getType()) {
            case LocationType.ID:
                url = 'api.openweathermap.org/data/2.5/weather?id=' + location.getId();
                break;
            case LocationType.NAME:
                var country = location.getCountry();
                url = 'api.openweathermap.org/data/2.5/weather?q=' + location.getName() 
                    + (country !== undefined) ? ', ' + country : '';
            break;
                case LocationType.COORDINATES:
                url = 'api.openweathermap.org/data/2.5/weather?lat=' + location.getLatitude() 
                    + '&lon=' + location.getLongitude();
                break;
            case LocationType.ZIP:
                url = 'api.openweathermap.org/data/2.5/weather?zip=' + location.getZip()
                    + ', ' + location.getCountry();
                break;
            }
            
            JSONParser.parse(url, function(json) {
                var location = new Location();
                
                location.setId(json.id);
                location.setName(json.name)
                location.setLatitude(json.coord.lat);
                location.setLatitude(json.coord.lon);
                location.setZip(json.sys.country);
                
                return entry;
            });
            
            throw new TypeError('message 2');
            throw new Error('ddd');
            
            return entry;
        }
    }
}
