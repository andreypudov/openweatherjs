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
    export class JSONParser {
        
        public REQUEST_NOT_INITIALIZED                = 0;
        public SERVER_CONNECTION_ESTABLISHED          = 1;
        public REQUEST_RECEIVED                       = 2;
        public PROCESSING_REQUEST                     = 3;
        public REQUEST_FINISHED_AND_RESPONSE_IS_READY = 4;
        
        public OK             = 200;
        public PAGE_NOT_FOUND = 404;
        
        private request: XMLHttpRequest;
        
        /**
         * Constructs and initializes an instance on JSONParser.
         */
        constructor() {
            try {
                this.request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    this.request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                    this.request = null;
                }
            }
            
            if ((this.request == null) && (typeof XMLHttpRequest != 'undefined')) {
                this.request = new XMLHttpRequest();
            }
        }
        
        /**
        * Sends a XMLHttpRequest to the given url returning the JSON
        * response from the url. Throws a TypeError if a bad url is placed in parameters, 
        * or invalid JSON is received from API provider. Throws Error on connection timeout 
        * and on internet connection failure.
        *
        * @param url     - URL to send request to.
        * @param success - a function to be run when an AJAX request is successfully completed.
        * @param error   - a function to be run when an AJAX request fails.
        * @param request - a value contains the XMLHttpRequest object.
        * @param message - a mesage details of the exception.
        */
        public parse(url: string, success?: (response: any, request: XMLHttpRequest) => void, 
                error?: (request: XMLHttpRequest, message: string) => void): void {
            Asserts.isUrl(url, 'URL is invalid.');
            
            /* specifies a function to be run when an AJAX request is successfully completed or fails */
            this.request.onreadystatechange = function() {
                if (this.request.readyState === this.REQUEST_FINISHED_AND_RESPONSE_IS_READY) {
                    if (this.request.status === this.OK) {
                        Asserts.isJSON(this.request.responseText, 'JSON data is invalid.');
                        
                        var json = JSON.parse(this.request.responseText);
                        if ((json.cod === undefined) || (parseInt(json.cod) !== 200)) {
                            error(this.request, 'Error code returned from API.');
                            return;
                        }
                        
                        success(json, this.request);
                    } else {
                        error(this.request, 'Unable to make a connection.');
                    }
                }
            }.bind(this)

            this.request.open('GET', url, true);
            this.request.timeout   = 2000;
            this.request.ontimeout = function() {
                this.request.abort();
                throw new Error('Request timed out.');
            };
            
            this.request.send();
        } 
    }
 }
