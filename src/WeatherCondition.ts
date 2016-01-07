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
    export enum WeatherCondition {
        /* thunderstorm */
        THUNDERSTORM_WITH_LIGHT_RAIN    = 200,
        THUNDERSTORM_WITH_RAIN          = 201,
        THUNDERSTORM_WITH_HEAVY_RAIN    = 202,
        LIGHT_THUNDERSTORM              = 210,
        THUNDERSTORM                    = 211,
        HEAVY_THUNDERSTORM              = 212,
        RAGGED_THUNDERSTORM             = 221,
        THUNDERSTORM_WITH_LIGHT_DRIZZLE = 230,
        THUNDERSTORM_WITH_DRIZZLE       = 231,
        THUNDERSTORM_WITH_HEAVY_DRIZZLE = 232,

        /* drizzle */
        LIGHT_INTENSITY_DRIZZLE         = 300,
        DRIZZLE                         = 301,
        HEAVY_INTENSITY_DRIZZLE         = 302,
        LIGHT_INTENSITY_DRIZZLE_RAIN    = 310,
        DRIZZLE_RAIN                    = 311,
        HEAVY_INTENSITY_DRIZZLE_RAIN    = 312,
        SHOWER_RAIN_AND_DRIZZLE         = 313,
        HEAVY_SHOWER_RAIN_AND_DRIZZLE   = 314,
        SHOWER_DRIZZLE                  = 321,

        /* rain */
        LIGHT_RAIN                      = 500,
        MODERATE_RAIN                   = 501,
        HEAVY_INTENSITY_RAIN            = 502,
        VERY_HEAVY_RAIN                 = 503,
        EXTREME_RAIN                    = 504,
        FREEZING_RAIN                   = 511,
        LIGHT_INTENSITY_SHOWER_RAIN     = 520,
        SHOWER_RAIN                     = 521,
        HEAVY_INTENSITY_SHOWER_RAIN     = 522,
        RAGGED_SHOWER_RAIN              = 531,

        /* snow */
        LIGHT_SNOW                      = 600,
        SNOW                            = 601,
        HEAVY_SNOW                      = 602,
        SLEET                           = 611,
        SHOWER_SLEET                    = 612,
        LIGHT_RAIN_AND_SNOW             = 615,
        RAIN_AND_SNOW                   = 616,
        LIGHT_SHOWER_SNOW               = 620,
        SHOWER_SNOW                     = 621,
        HEAVY_SHOWER_SNOW               = 622,

        /* atmosphere */
        MIST                            = 701,
        SMOKE                           = 711,
        HAZE                            = 721,
        SAND_OR_DUST_WHIRLS             = 731,
        FOG                             = 741,
        SAND                            = 751,
        DUST                            = 761,
        VOLCANIC_ASH                    = 762,
        SQUALLS                         = 771,
        TORNADO                         = 781,

        /* clear */
        CLEAR_SKY                       = 800,

        /* clouds */
        FEW_CLOUDS                      = 801,
        SCATTERED_CLOUDS                = 802,
        BROKEN_CLOUDS                   = 803,
        OVERCAST_CLOUDS                 = 804,

        /* extreme */
        TORNADO_STORM                   = 900,
        TROPICAL_STORM                  = 901,
        HURRICANE_STORM                 = 902,
        COLD                            = 903,
        HOT                             = 904,
        WINDY                           = 905,
        HAIL                            = 906,

        /* additional */
        CALM                            = 951,
        LIGHT_BREEZE                    = 952,
        GENTLE_BREEZE                   = 953,
        MODERATE_BREEZE                 = 954,
        FRESH_BREEZE                    = 955,
        STRONG_BREEZE                   = 956,
        HIGH_WIND,_NEAR_GALE            = 957,
        GALE                            = 958,
        SEVERE_GALE                     = 959,
        STORM                           = 960,
        VIOLENT_STORM                   = 961,
        HURRICANE                       = 962
    }
}
