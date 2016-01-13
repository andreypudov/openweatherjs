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
    export class WeatherEntry {
        private condition:   WeatherCondition; /* weather condition id */
        private main:        string;           /* group of weather parameters */
        private description: string;           /* weather condition within the group */
        private icon:        string;           /* weather icon id */
        
        private temperature: number;           /* temperature */
        private pressure:    number;           /* atmospheric pressure, hPa */
        private humidity:    number;           /* humidity, % */
        private minimum:     number;           /* minimum temperature at the moment */
        private maximum:     number;           /* maximum temperature at the moment */
        private seaLevel:    number;           /* atmospheric pressure on the sea level, hPa */
        private grndLevel:   number;           /* atmospheric pressure on the ground level, hPa */
        
        private windSpeed:   number;           /* wind speed */
        private windDegree:  number;           /* wind direction */
        
        private cloudiness:  number;           /* cloudiness, % */
        private rainVolume:  number;           /* rain volume for the last 3 hours */
        private snowVolume:  number;           /* snow volume for the last 3 hours */
        
        private location:    Location;         /* city id, name, country code and coordinates */
        private time:        number;           /* time of data calculation, unix, UTC */
        
        /**
         * Returns weather condition value.
         * 
         * @return weather condition value.
         */
        public getWeatherCondition(): WeatherCondition {
            return this.condition;
        }
        
        /**
         * Returns group of weather parameters.
         * 
         * @return a group of weather parameters.
         */
        public getWeatherParameters(): string {
            return this.main;
        }
        
        /**
         * Returns weather condition within the group.
         * 
         * @return a weather condition within the group.
         */
        public getWeatherDescription(): string {
            return this.description;
        }
        
        /**
         * Returns weather icon id.
         * 
         * @return a weather icon id.
         */
        public getWeatherIconId(): string {
            return this.icon;
        }
        
        /**
         * Returns temperature value.
         * 
         * @return temperature value.
         */
        public getTemperature(): number {
            return this.temperature;
        }
        
        /**
         * Returns atmospheric pressure value.
         * 
         * @return atmospheric pressure value.
         */
        public getPressure(): number {
            return this.pressure;
        }
        
        /**
         * Returns humidity value.
         * 
         * @return humidity value.
         */
        public getHumidity(): number {
            return this.humidity;
        }
        
        /**
         * Returns minimum temperature at the moment.
         * 
         * @return minimum temperature at the moment.
         */
        public getMinimum(): number {
            return this.minimum;
        }
        
        /**
         * Returns maximum temperature at the moment.
         * 
         * @return maximum temperature at the moment.
         */
        public getMaximum(): number {
            return this.maximum;
        }
        
        /**
         * Returns atmospheric pressure on the sea level.
         * 
         * @return atmospheric pressure on the sea level.
         */
        public getSeaLevelPressure(): number {
            return this.seaLevel;
        }
        
        /**
         * Returns atmospheric pressure on the ground level.
         * 
         * @return atmospheric pressure on the ground level.
         */
        public getGroundLevelPressure(): number {
            return this.grndLevel;
        }
        
        /**
         * Returns wind speed value.
         * 
         * @return wind speed value.
         */
        public getWindSpeed(): number {
            return this.windSpeed;
        }
        
        /**
         * Returns wind direction value.
         * 
         * @return wind direction value.
         */
        public getWindDirection(): number {
            return this.windDegree;
        }
        
        /**
         * Returns cloudiness value.
         * 
         * @return cloudiness value.
         */
        public getCloudiness(): number {
            return this.cloudiness;
        }
        
        /**
         * Returns rain volume for the last 3 hours.
         * 
         * @return rain volume for the last 3 hours.
         */
        public getRainVolume(): number {
            return this.rainVolume;
        }
        
        /**
         * Returns snow volume for the last 3 hours.
         * 
         * @return snow volume for the last 3 hours.
         */
        public getSnowVolume(): number {
            return this.snowVolume;
        }
        
        /**
         * Returns city location including id, name, country code and coordinates.
         * 
         * @return city location including id, name, country code and coordinates.
         */
        public getLocation(): Location {
            return this.location;
        }
        
        /**
         * Returns time of data calculation.
         * 
         * @return time of data calculation.
         */
        public getTime(): number {
            return this.time;
        }
        
        /**
         * Sets weather condition value. Throws a new TypeError in case condition 
         * value is an invalid type.
         * 
         * @param condition - a weather condition value.
         */
        public setWeatherCondition(condition: WeatherCondition): void {
            Asserts.isNumber(condition, 'Weather condition value is invalid.');
            
            if (typeof WeatherCondition[condition] === 'undefined') {
                throw new TypeError('Weather condition value is invalid.');
            }
            
            this.condition = condition;
        }
        
        /**
         * Sets group of weather parameters.
         * 
         * @param main - a group of weather parameters.
         */
        public setWeatherParameters(main: string): void {
            Asserts.isString(main, 'Weather parameters value is invalid.');
            
            this.main = main;
        }
        
        /**
         * Sets weather condition within the group.
         * 
         * @param description - a weather condition within the group.
         */
        public setWeatherDescription(description: string): void {
            Asserts.isString(description, 'Weather condition within the group is invalid.');
            
            this.description = description;
        }
        
        /**
         * Sets weather icon id value.
         * 
         * @param icon - a weather icon id value.
         */
        public setWeatherIconId(icon: string): void {
            Asserts.isString(icon, 'Weather icon id value is invalid.')
            
            this.icon = icon;
        }
        
        /**
         * Sets temperature value.
         * 
         * @param temperature - a temperature value.
         */
        public setTemperature(temperature: number): void {
            Asserts.isNumber(temperature, 'Temperature value is invalid.');
            
            this.temperature = temperature;
        }
        
        /**
         * Sets atmospheric pressure value.
         * 
         * @param pressure - an atmospheric pressure value.
         */
        public setPressure(pressure: number): void {
            Asserts.isNumber(pressure, 'Pressure value is invalid.');
            
            this.pressure = pressure;
        }
        
        /**
         * Sets humidity value.
         * 
         * @param humidity - a humidity value.
         */
        public setHumidity(humidity: number): void {
            Asserts.isNumber(humidity, 'Humidity value is invalid.');
            
            this.humidity = humidity;
        }
        
        /**
         * Sets minimum temperature at the moment.
         * 
         * @param minimum - a minimum temperature at the moment.
         */
        public setMinimum(minimum: number): void {
            Asserts.isNumber(minimum, 'Minimum temperature value is invalid.');
            
            this.minimum = minimum;
        }
        
        /**
         * Sets maximum temperature at the moment.
         * 
         * @param maximum - a maximum temperature at the moment.
         */
        public setMaximum(maximum: number): void {
            Asserts.isNumber(maximum, 'Maximum temperature value is invalid.');
            
            this.maximum = maximum;
        }
        
        /**
         * Sets atmospheric pressure on the sea level.
         * 
         * @param seaLevel - an atmospheric pressure on the sea level.
         */
        public setSeaLevelPressure(seaLevel: number): void {
            Asserts.isNumber(seaLevel, 'Sea level pressure value is invalid.');
            
            this.seaLevel = seaLevel;
        }
        
        /**
         * Sets atmospheric pressure on the ground level.
         * 
         * @param grndLevel - an atmospheric pressure on the ground level.
         */
        public setGroundLevelPressure(grndLevel: number): void {
            Asserts.isNumber(grndLevel, 'Ground level pressure value is invalid.');
            
            this.grndLevel = grndLevel;
        }
        
        /**
         * Sets wind speed value.
         * 
         * @param windSpeed - a wind speed value.
         */
        public setWindSpeed(windSpeed: number): void {
            Asserts.isNumber(windSpeed, 'Wind speed value is invalid.');
            
            this.windSpeed = windSpeed;
        }
        
        /**
         * Sets wind direction value.
         * 
         * @param windDegree - a wind direction value.
         */
        public setWindDirection(windDegree: number): void {
            Asserts.isNumber(windDegree, 'Wind direction value is invalid.');
            
            this.windDegree = windDegree;
        }
        
        /**
         * Sets cloudiness value.
         * 
         * @param cloudiness - a cloudiness value.
         */
        public setCloudiness(cloudiness: number): void {
            Asserts.isNumber(cloudiness, 'Cloudiness value is invalid.');
            
            this.cloudiness = cloudiness;
        }
        
        /**
         * Sets rain volume for the last 3 hours.
         * 
         * @param rainVolume - a rain volume for the last 3 hours.
         */
        public setRainVolume(rainVolume: number): void {
            Asserts.isNumber(rainVolume, 'Rain volume is invalid.');
            
            this.rainVolume = rainVolume;
        }
        
        /**
         * Sets snow volume for the last 3 hours.
         * 
         * @param snowVolume - a snow volume for the last 3 hours.
         */
        public setSnowVolume(snowVolume: number): void {
            Asserts.isNumber(snowVolume, 'Snow volume is invalid.');
            
            this.snowVolume = snowVolume;
        }
        
        /**
         * Sets city location including id, name, country code and coordinates. Throws a new 
         * TypeError in case location value is an invalid type.
         * 
         * @param location - city location including id, name, country code and coordinates.
         */
        public setLocation(location: Location): void {
            Asserts.isInstanceofOf(location, Location, 'Location value is invalid.');
            
            this.location = location;
        }
        
        /**
         * Sets time of data calculation.
         * 
         * @param time - a time of data calculation.
         */
        public setTime(time: number): void {
            Asserts.isNumber(time, 'Time value is invalid.');
            
            this.time = time;
        }
    }
}