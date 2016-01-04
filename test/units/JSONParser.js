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

 QUnit.test('JSONParser', function(assert){
   var url = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2de143494c0b295cca9337e1e96b00e0";
   var base = "cmc stations";
   var cityName = "London";
   var countryName = "GB";

   assert.equal(1, "1", "Equal");

   //Asynchronous call to OpenWeatherJS.JSONParser
   new OpenWeatherJS.JSONParser.Parse(url, function(json){
       assert.strictEqual(json.name, cityName, "The city name is London");
       assert.strictEqual(json.sys.country, countryName, "The city name is GB");
       assert.strictEqual(json.base, base, "The base is stations");

       assert.throws(function(){
         new OpenWeatherJS.JSONParser.Parse("example")
         }, new TypeError('URL is invalid.'),
         'URL is invalid.');
       });

   assert.throws(function(){
       new OpenWeatherJS.Asserts.isJSONString("example", "Retrieved JSON is invalid.")},
       new Error("SyntaxError: JSON.parse: unexpected character at line 1 column 1 of the JSON data"),
       'Retrieved JSON is invalid.');

   assert.throws(function(){
       new OpenWeatherJS.Asserts.isJSONString(1, "Retrieved JSON is invalid.")},
       new Error("TypeError: Retrieved JSON is invalid."),
       'Retrieved JSON is invalid.');

   //assert.strictEqual(json.name, cityName, "The city name is London");
   //assert.strictEqual(new OpenWeatherJS.JSONParser.Parse(url).sys.country, countryName, "The city name is GB");
   //assert.strictEqual(new OpenWeatherJS.JSONParser.Parse(url).base, base, "The base is stations");
 });
