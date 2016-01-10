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
    export class Forecast {
        /**
         * Returns a 5 day 3 hourly weather forecast for a given location value. 
         * Throws a new Error in case of connection failure and inavlid data recived.  
         *
         * @param location - a location value.
         * @return a current weather report for a given location.
         */
        static getHourlyForecast(location: Location, success: (entry: string, request: XMLHttpRequest) => void,
                error: (request: XMLHttpRequest) => void): void {
            Asserts.isInstanceofOf(location, Location, 'Location type is invalid.');

            //var entry = new WeatherEntry();
            var url: string;
            var parser = new JSONParser();

            switch (location.getType()) {
                /*case LocationType.ID:
                    url = 'Id';
                    console.log(url);
                    break;*/
                case LocationType.NAME:
                    url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + location.getName() + '&mode=json&appid=5aed8cbbc1e19c962a8e514f59f8fe52';
                    console.log(url);
                    break;
                /*case LocationType.COORDINATES:
                    url = 'Cords';
                    break;
                case LocationType.ZIP:
                    url = 'Zip';
                    break;*/
            }

            parser.parse(url, function(response: any, request: XMLHttpRequest) {
                //var entry = new WeatherEntry;
                var location = new Location();

                console.log(response);

                success(response.name, request);
            }, function(request: XMLHttpRequest) {
                error(request);
            });

            /*JSONParser.Parse(url, function(json) {
                /*var location = new Location();

                location.setId(json.id);
                location.setName(json.name)
                location.setLatitude(json.coord.lat);
                location.setLatitude(json.coord.lon);
                location.setZip(json.sys.country);
                */
              /*  console.log(json);

                //Here return an array for each count of result we got.
            });*/

            console.log('Forecast');
        }
    }
}