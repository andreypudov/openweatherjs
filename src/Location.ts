/**
 * The OpenWeatherJS Library.
 * The JavaScript library to work with weather information and forecasts data 
 * provided by Open Weather Map. Built using TypeScript.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 The OpenWeatherJS Project
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
	export class Location {
		private type: LocationType;

		private id:        number;
		private name:      string;
		private latitude:  number;
		private longitude: number;
		private zip:       string;
		private country:   string;

		/**
		 * Constructs a new location instance by given id. 
		 * Throws a new RangeError in case id is out of range of 1 and 99999999. 
		 * Throws a new TypeError if id is not a number.
		 *
		 * @param id - a location id value.
		 */
		static getById(id: number): Location {
			Asserts.isInRange(id, 1, 99999999, 'Location id value should be between 1 and 99999999.');

			var location = new Location();

			location.type = LocationType.ID;
			location.id   = id;

			return location;
		}

		/**
		 * Constructs a new location instance by given name. 
		 * Throws a new TypeError if name is not a string.
		 *
		 * @param name    - a location name value.
         * @param country - a country name related to @name. An optional parameter.
		 */
		static getByName(name: string, country?: string): Location {
			Asserts.isString(name, 'Location name is invalid.'); 

			var location = new Location();

			location.type = LocationType.NAME;
			location.name = name;
            
            if (country) {
                Asserts.isString(country, 'Location country is invalid.');
                location.country = country;
            }

			return location;
		}

		/**
		 * Constructs a new location instance by given latitude and longitude. 
		 * Throws a new TypeError if latitude or longitude are not a nimber.
		 *
		 * @param latitude  - a location latitude value.
		 * @param longitude - a location longitude value.
		 */
		static getByCoordinates(latitude: number, longitude: number): Location {
			Asserts.isNumber(latitude, 'Location latitude is invalid.');
			Asserts.isNumber(longitude, 'Location longitude is invalid.');

			var location = new Location();

			location.type = LocationType.COORDINATES;
			location.latitude  = latitude;
			location.longitude = longitude;

			return location;
		}

		/**
		 * Constructs a new location instance by given zip and country. 
		 * Throws a new TypeError if zip or country are not a string.
		 *
		 * @param zip     - a location zip value.
		 * @param country - a location country value, coresponding to zip.
		 */
		static getByZip(zip: string, country: string): Location {
			Asserts.isString(zip, 'Location zip is invalid.');
			Asserts.isString(country, 'Location country is invalid.');

			var location = new Location();

			location.type = LocationType.ZIP;
			location.zip     = zip;
			location.country = country;

			return location;
		}
        
        /**
         * Returns a location type for this instance.
         * 
         * @return a location type for this instance.
         */
        getType(): LocationType {
            return this.type;
        }
        
        /**
         * Returns a location id for this instance.
         * 
         * @return a location id for this instance.
         */
        getId(): number {
            return this.id;
        }
        
        /**
         * Returns a location name for this instance.
         * 
         * @return a location name for this instance.
         */
        getName(): string {
            return this.name;
        }
        
        /**
         * Returns a location latitude for this instance.
         * 
         * @return a location latitude for this instance.
         */
        getLatitude(): number {
            return this.latitude;
        }
        
        /**
         * Returns a location longitude for this instance.
         * 
         * @return a location longitude for this instance.
         */
        getLongitude(): number {
            return this.longitude;
        }
        
        /**
         * Returns a location zip for this instance.
         * 
         * @return a location zip for this instance.
         */
        getZip(): string {
            return this.zip;
        }
        
        /**
         * Returns a location country for this instance.
         * 
         * @return a location country for this instance.
         */
        getCountry(): string {
            return this.country
        }
        
        setType(type: LocationType): void {
            
            this.type = type;
        }
        
        setId(id: number): void {
            Asserts.isInRange(id, 1, 99999999, 'Location id value should be between 1 and 99999999.');
            
            this.id = id;
        }

        setName(name: string): void {
            Asserts.isString(name, 'Location name is invalid.');
            
            this.name = name;
        }

        setLatitude(latitude: number): void {
            Asserts.isNumber(latitude, 'Location latitude is invalid.');
            
            this.latitude = latitude;
        }
        
        setLongitude(longitude: number): void {
            Asserts.isNumber(longitude, 'Location longitude is invalid.');
            
            this.longitude = longitude;
        }
        
        setZip(zip: string): void {
            Asserts.isString(zip, 'Location zip is invalid.');
            
            this.zip = zip;
        }
        
        setCountry(country: string): void {
            Asserts.isString(country, 'Location country is invalid.');
            
            this.country = country;
        }
	}
}