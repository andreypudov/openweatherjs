# OpenWeatherJS
The JavaScript library to work with weather information and forecasts data provided by Open Weather Map.
Built using TypeScript.

#Usage
We start initialization of the library by setting the options. To set the options we call the Options class like this:
```
	//New Options object
	var options = OpenWeatherJS.Options.getInstance();
	//Set the api key the library should use
    options.setKey('2de143494c0b295cca9337e1e96b00e0');
    //Set which temperature units to use (Default is Kelvin)
    options.setUnits(OpenWeatherJS.Units.DEFAULT);
```
After we set the options we get the desired location
```
 // City id list can be downloaded here: http://openweathermap.org/current
 var location = OpenWeatherJS.Location.getById(6198442);

 //We can also get by name and city
 var location = OpenWeatherJS.Location.getByName('London','UK');
```
After that we can use the location object to get the current weather for that location: 
```
var report = OpenWeatherJS.CurrentWeather.getWeather(location, 
        function(entry, request) {
            //API Call success
            
            OpenWeatherJS.WeatherCondition[entry.getWeatherCondition()]
            entry.getWeatherDescription();
            entry.getWeatherIconId();
            
            entry.getTemperature();
            entry.getPressure();
            entry.getHumidity();
            
            entry.getMinimum();
            entry.getMaximum();
            
            entry.getSeaLevelPressure();
            entry.getGroundLevelPressure();
            
            entry.getWindSpeed();
            entry.getWindDirection();
            
            entry.getCloudiness();
            entry.getRainVolume();
            entry.getSnowVolume();
            
            entry.getLocation().getId();
            entry.getLocation().getName();
            entry.getLocation().getLatitude();
            entry.getLocation().getLongitude();
            entry.getLocation().getCountry();
            
            entry.getTime();
            
            done();
        }.bind(this), 
        function(request, message) {
            //API Call Failed
            done();
        }.bind(this));
```
You can use the values freely as you'd like, as you see there is alot of coverage so if you would like to for example display a complete weather report on your website this would be a great choice since it covers everything from temperature to pressure and cloudiness.

#Learn More
Visit our wiki: [OpenWeatherJS Wiki](https://github.com/andreypudov/OpenWeatherJS/wiki)