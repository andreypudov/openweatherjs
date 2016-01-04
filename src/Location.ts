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
			Asserts.isInRange(id, 1, 99999999, 'Location id is invalid');

			var location = new Location();

			location.type = LocationType.ID;
			location.id   = id;

			return location;
		}

		/**
		 * Constructs a new location instance by given name. 
		 * Throws a new TypeError if name is not a string.
		 *
		 * @param name - a location name value.
		 */
		static getByName(name: string): Location {
			Asserts.isString(name, 'Location name is invalid.');

			var location = new Location();

			location.type = LocationType.NAME;
			location.name = name;

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
	}
}