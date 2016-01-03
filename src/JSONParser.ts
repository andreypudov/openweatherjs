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

 module OpenWeatherJS{
 	export class JSONParser{
    /**
		 * Sends a XMLHttpRequest to the given url returning the JSON
     * response from the url. Throws a TypeError if a bad url is placed in parameters,
     * throws Error on timeout and internet connection failure.
		 *
		 * @param url   - URL to send request to.
     * @param done - Callback function letting you use the parsed object.
		 * @return Object - JSON Object.
		 */
    static Parse(url: string, done: (obj: any) => void): void{
      Asserts.isUrl (url, 'URL is invalid.');
      var xmlHttp = new XMLHttpRequest ();

      xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState == 4) {
            try{
              if (xmlHttp.status == 200) {
                var obj = JSON.parse(xmlHttp.responseText);
                Asserts.isJSONString(obj, 'Retrieved JSON is invalid.')
                done(obj);
              }
            }catch(err){
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
    }
 	}
 }
