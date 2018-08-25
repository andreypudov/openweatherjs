/**
 * The OpenWeatherJS Library.
 * The JavaScript library to work with weather information and forecasts data
 * provided by Open Weather Map. Built using TypeScript.
 *
 * The MIT License (MIT)
 *
 * Copyright (C) 2018 The OpenWeatherJS Project
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
         * @return a current WeatherReport for a given location.
         */
        static getHourlyForecast(location: Location, success: (entry: WeatherReport, request: XMLHttpRequest) => void,
                error: (request: XMLHttpRequest, message: string) => void): void {
            Asserts.isInstanceofOf(location, Location, 'Location type is invalid.');

            var url: string;
            var options = Options.getInstance();
            var parser  = new JSONParser();
            var report  = new WeatherReport();

            switch (location.getType()) {
                case LocationType.ID:
                    url = 'https://api.openweathermap.org/data/2.5/forecast?id=' + location.getId() + '&mode=json';
                    break;
                case LocationType.NAME:
                    url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + location.getName() + '&mode=json';
                    break;
                case LocationType.COORDINATES:
                    url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + location.getLatitude() + '&lon=' + location.getLongitude();
                    break;
            }

            /* set API language value */
            url = url + '&lang=' + Languages[options.getLanguage()].toLowerCase();
            
            /* set API units value */
            url = url + '&units=' + Units[options.getUnits()].toLowerCase();

            /* append API key to url */
            url = url + '&appid=' + options.getKey();

            parser.parse(url, function(response: any, request: XMLHttpRequest) {
                var location: any;
                var entry:    any;

                for (var index = 0; index < response.cnt; ++index) {   
                    entry = new WeatherEntry();
                    
                    entry.setWeatherCondition(response.list[index].weather[0].id);
                    entry.setWeatherParameters(response.list[index].weather[0].main);
                    entry.setWeatherDescription(response.list[index].weather[0].description);
                    entry.setWeatherIconId(response.list[index].weather[0].icon);

                    entry.setTemperature(response.list[index].main.temp);
                    entry.setPressure(response.list[index].main.pressure);
                    entry.setHumidity(response.list[index].main.humidity);
                    entry.setMinimum(response.list[index].main.temp_min);
                    entry.setMaximum(response.list[index].main.temp_max);

                    entry.setSeaLevelPressure((response.list[index].main.sea_level != undefined)
                        ? response.list[index].main.sea_level
                        : response.list[index].main.pressure);
                    entry.setGroundLevelPressure((response.list[index].main.grnd_level != undefined)
                        ? response.list[index].main.grnd_level
                        : response.list[index].main.pressure);

                    entry.setWindSpeed((response.list[index].wind != undefined) 
                        ? response.list[index].wind.speed 
                        : 0);
                    entry.setWindDirection((response.list[index].wind != undefined) 
                        ? response.list[index].wind.deg 
                        : 0);

                    entry.setCloudiness(response.list[index].clouds.all);
                       
                    entry.setRainVolume(((response.list[index].rain != undefined) && (response.list[index].rain['3h'] != undefined))
                        ? response.list[index].rain['3h']
                        : 0);
                    entry.setSnowVolume(((response.list[index].snow != undefined) && (response.list[index].snow['3h'] != undefined))
                        ? response.list[index].snow['3h']
                        : 0);

                    location = new Location();
                    location.setId(response.city.id);
                    location.setName(response.city.name);
                    location.setLatitude(response.city.coord.lat);
                    location.setLongitude(response.city.coord.lon);
                    location.setCountry(response.city.country);
                    
                    entry.setLocation(location);
                    entry.setTime(response.list[index].dt);

                    report.addEntry(entry);
                }

                success(report, request);
            }, function(request: XMLHttpRequest, message: string) {
                error(request, message);
            });
        }
    }
}