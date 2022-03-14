// script file for weather dashboard


///////////////////////////////////////////


// syntax for api request at openweather
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// my api key
// 1f014d2caab36f9e323d41016dbcba15

// function to retrieve data
// we want date, temp, wind, humidity, uv index for city
// for 5-day we want temp, wind, humidity

// we need to obtain lat/lon for each city too
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// displayed as coord in object


////////////////////////////////////////////

// target city container
var cityContainer = document.querySelector(".city-container");


// we target our header that will generate after user input
var cityHeader = document.querySelector(".city-header");


// we target our input element on our form
var cityInputEl = document.querySelector("#city");


// target container with city info so we can clear it
var cityCard = document.querySelector(".city-card");


// we target our container for city weather
var cityWeather = document.querySelector(".city-info");


// target forecast cards so we can clear them
var forecastCards = document.querySelector(".forecast-cards");


// target header in 5 day forecast
var fiveDayHeader = document.querySelector(".five-day");


// target icon for city
var cityIcon = document.querySelector(".city-icon");


// target icons for five day forecast
var day1Icon = document.querySelector(".day1-icon");
var day2Icon = document.querySelector(".day2-icon");
var day3Icon = document.querySelector(".day3-icon");
var day4Icon = document.querySelector(".day4-icon");
var day5Icon = document.querySelector(".day5-icon");


// we target our containers for 5-day forecast
var day1 = document.querySelector(".day1-card");
var day2 = document.querySelector(".day2-card");
var day3 = document.querySelector(".day3-card");
var day4 = document.querySelector(".day4-card");
var day5 = document.querySelector(".day5-card");


// target recent searches section
var recentSearch = document.querySelector(".recent-searches");


var localSearch = document.querySelector(".saved-searches");


// target recent searches header
var recentHeader = document.querySelector(".recent-header");


////////////////////////////////////////////////////


// we create a function for the form
var formSubmitHandler = function(event) {


    // prevents browser refresh
    event.preventDefault();


    // retrieve value from input, trim removes unecessary spaces
    var city = cityInputEl.value.trim();


    // we must first obtain lat/lon by inputting city
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1f014d2caab36f9e323d41016dbcba15"


    // we fetch data for coordinates
    fetch(url).then(function(response) {


        // we only want to run this function if response is good
        if (response.ok === true) {
            response.json().then(function(data) {
                

                // retrieve value from input, trim removes unecessary spaces
                var city = cityInputEl.value.trim();

                cityHeader.textContent = city;


                // we populate a recent searches area with user input
                // this value will need to be put into localStorage
                var recentSearchEl = document.createElement("p");
                recentSearchEl.textContent = city;
                recentSearch.appendChild(recentSearchEl);
                
                // create empty array for storage
                savedSearches = [];

            
                // we add search to array
                savedSearches.push(city);


                // we stringify it
                localStorage.setItem("city", JSON.stringify(savedSearches));
              

                // now we have values for lat/lon, put them into other url fetch
                console.log(data.coord.lat, data.coord.lon);
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                // dont forget to designate units=imperial
                var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&units=imperial&appid=1f014d2caab36f9e323d41016dbcba15"
                fetch(url).then(function(response) {


                    // response must be reformatted via json(), this we receive as promise which must have .then method following
                    response.json().then(function(data) {

                        console.log(data);
                    
                        // we have our data, now we need to display it


                        // we need to show dates for today and 5 day
                        var today = new Date();
                        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        var day1Date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
                        var day2Date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+2);
                        var day3Date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+3);
                        var day4Date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+4);
                        var day5Date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+5);


                        // we need containers for date, temp, wind, humidity, uv index
                        var dateContainer = document.createElement("p");
                        var tempContainer = document.createElement("p");
                        var windContainer = document.createElement("p");
                        var humidityContainer = document.createElement("p");
                        var uvContainer = document.createElement("p");


                        // we must generate text content in each container
                        dateContainer.textContent = "Today's Date: " + date;
                        tempContainer.textContent = "Temp: " + data.current.temp + " Farenheit";
                        windContainer.textContent =  "Wind-speed: " + data.current.wind_speed;
                        humidityContainer.textContent = "Humidity: " + data.current.humidity;
                        uvContainer.textContent = "UV index: " + data.current.uvi; 

                        weather = JSON.stringify(data.current.weather[0].main)
                        console.log(weather);
                        if (weather == "Clouds") {
                            cityIcon.classList.add("fa-cloud");
                        };
                        if (weather == "Clear") {
                            cityIcon.classList.add("fa-sun")
                        };
                        if (weather == "Rain") {
                            cityIcon.classList.add("fa-cloud-showers-heavy");
                        };
                        if (weather == "Snow") {
                            cityIcon.classList.add("fa-snowflake");
                        };
                        if (weather == "Thunderstorm") {
                            cityIcon.classList.add("fa-cloud-bolt");
                        };

    
                        // uv color coding
                        if (data.current.uvi < 2) {
                            uvContainer.classList.add("bg-success");
                        }
                        
                        if (data.current.uvi >= 2) {
                            uvContainer.classList.add("bg-warning");
                        }

                        if (data.current.uvi >= 5) {
                            uvContainer.classList.add("bg-danger");
                        }


                        // these containers must now be appended to parent container
                        cityWeather.appendChild(dateContainer);
                        cityWeather.appendChild(tempContainer);
                        cityWeather.appendChild(windContainer);
                        cityWeather.appendChild(humidityContainer);
                        cityWeather.appendChild(uvContainer);
                        cityWeather.appendChild(cityIcon);


                        // add bootstrap styling 
                        cityWeather.classList.add("border-primary", "w-100");
                        forecastCards.classList.add("card", "border-secondary", "w-100");
                        cityCard.classList.add("card", "border-secondary", "w-100");
                        recentSearch.classList.add("card", "border-secondary", "w-100");
                        cityContainer.classList.add("card", "w-100");


                        // create 5-day forecast header and info containers
                        fiveDayHeader.textContent = "5-Day Forecast:";
                        var day1DateContainer = document.createElement("p");
                        var day1Temp = document.createElement("p");
                        var day1Wind = document.createElement("p");
                        var day1Hum = document.createElement("p");

                        var day2DateContainer = document.createElement("p");
                        var day2Temp = document.createElement("p");
                        var day2Wind = document.createElement("p");
                        var day2Hum = document.createElement("p");

                        var day3DateContainer = document.createElement("p");
                        var day3Temp = document.createElement("p");
                        var day3Wind = document.createElement("p");
                        var day3Hum = document.createElement("p");

                        var day4DateContainer = document.createElement("p");
                        var day4Temp = document.createElement("p");
                        var day4Wind = document.createElement("p");
                        var day4Hum = document.createElement("p");

                        var day5DateContainer = document.createElement("p");
                        var day5Temp = document.createElement("p");
                        var day5Wind = document.createElement("p");
                        var day5Hum = document.createElement("p");


                        // put info into containers for Day 1
                        
                        day1DateContainer.textContent = day1Date;
                        
                        
                        // must stringify data from object
                        day1Temp.textContent = "Temp: " + JSON.stringify(data.daily[0].temp.day) + " Farenheit";
                        day1Wind.textContent = "Wind-speed: " + JSON.stringify(data.daily[0].wind_speed);
                        day1Hum.textContent = "Humidity: " + JSON.stringify(data.daily[0].humidity);
                    
                        


                        // append containers 
                        day1.appendChild(day1DateContainer);
                        day1.appendChild(day1Temp);
                        day1.appendChild(day1Wind);
                        day1.appendChild(day1Hum);


                        // day 2
                        day2DateContainer.textContent = day2Date;
                        day2Temp.textContent = "Temp: " + JSON.stringify(data.daily[1].temp.day) + " Farenheit";
                        day2Wind.textContent = "Wind-speed: " + JSON.stringify(data.daily[1].wind_speed);
                        day2Hum.textContent = "Humidity: " + JSON.stringify(data.daily[1].humidity);

                        // append containers
                        day2.appendChild(day2DateContainer);
                        day2.appendChild(day2Temp);
                        day2.appendChild(day2Wind);
                        day2.appendChild(day2Hum);


                        // day 3
                        day3DateContainer.textContent= day3Date;
                        day3Temp.textContent = "Temp: " + JSON.stringify(data.daily[2].temp.day) + " Farenheit";
                        day3Wind.textContent = "Wind-speed: " + JSON.stringify(data.daily[2].wind_speed);
                        day3Hum.textContent = "Humidity: " + JSON.stringify(data.daily[2].humidity);


                        // append containers
                        day3.appendChild(day3DateContainer);
                        day3.appendChild(day3Temp);
                        day3.appendChild(day3Wind);
                        day3.appendChild(day3Hum);


                        // day 4
                        day4DateContainer.textContent = day4Date;
                        day4Temp.textContent = "Temp: " + JSON.stringify(data.daily[3].temp.day) + " Farenheit";
                        day4Wind.textContent = "Wind-speed: " + JSON.stringify(data.daily[3].wind_speed);
                        day4Hum.textContent = "Humidity: " + JSON.stringify(data.daily[3].humidity);

                        // append containers
                        day4.appendChild(day4DateContainer);
                        day4.appendChild(day4Temp);
                        day4.appendChild(day4Wind);
                        day4.appendChild(day4Hum);


                        // day 5
                        day5DateContainer.textContent= day5Date;
                        day5Temp.textContent = "Temp: " + JSON.stringify(data.daily[4].temp.day) + " Farenheit";
                        day5Wind.textContent = "Wind-speed: " + JSON.stringify(data.daily[4].wind_speed);
                        day5Hum.textContent = "Humidity: " + JSON.stringify(data.daily[4].humidity);

                        // append containers
                        day5.appendChild(day5DateContainer);
                        day5.appendChild(day5Temp);
                        day5.appendChild(day5Wind);
                        day5.appendChild(day5Hum);


                        // add bootstrap styling for organization
                        day1.classList.add("card", "border-primary", "w-100");
                        day2.classList.add("card", "border-primary", "w-100");
                        day3.classList.add("card", "border-primary", "w-100");
                        day4.classList.add("card", "border-primary", "w-100");
                        day5.classList.add("card", "border-primary", "w-100");
                    });
                });
            });
            
            
        }
        // else statement for responses that fail
        else {
            window.alert("Please enter a valid city!");
        }
    });
}
        
        
 


//////////////////////////////////////////////


// we target our submit button
var submitBtn = document.querySelector(".submit-btn");


// we add eventListener, then run our function to fetch data from openweather
submitBtn.addEventListener("click", formSubmitHandler);
    


// we target clear button
var clearBtn = document.querySelector(".clear-btn")


// when we hit clear the info goes away, but we want to keep the city we searched
// we need to implement a getLocalStorage function
clearBtn.addEventListener("click", function(event) {
    

    // clears search field and page content
    cityInputEl.textContent = "";
    cityCard.textContent = "";
    forecastCards.textContent = "";
    
    
})



//////////////////////////////////////////////////////


// we must also set up localStorage so people can see info from cities that have been searched
// we want search results to remain on page
var getLocalStorage = function() {


    // we retrieve item from localStorage
    var items = localStorage.getItem("city");
    
    
    // must be parsed since it is in string format
    savedSearches = JSON.parse(items);


    // we set textContent equal to value of savedSearches
    localSearch.textContent = savedSearches;  
}

getLocalStorage();


/////////////////////////////////////////////////////


// we are adding event listener to old search
localSearch.addEventListener ("click", function() {
    oldSearch(localSearch.val);
})

// this function will run old search into fetch request
var oldSearch = function () {
    
    var oldcity = localStorage.getItem("city");
    
    var city = savedSearches;

    // we must first obtain lat/lon by inputting city
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1f014d2caab36f9e323d41016dbcba15"
   
   
    // we fetch data for coordinates
    fetch(url).then(function(response) {
   
   
        // we only want to run this function if response is good
        if (response.ok === true) {
            response.json().then(function(data) {
   
                cityHeader.textContent = city;
   
   
                // now we have values for lat/lon, put them into other url fetch
                console.log(data.coord.lat, data.coord.lon);
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                // dont forget to designate units=imperial
                var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&units=imperial&appid=1f014d2caab36f9e323d41016dbcba15"
                fetch(url).then(function(response) {
   
   
                    // response must be reformatted via json(), this we receive as promise which must have .then method following
                    response.json().then(function(data) {
   
                        console.log(data);
                       
                        // we have our data, now we need to display it
   
   
                        // we need to show dates for today and 5 day
                        var today = new Date();
                        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        var day1Date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
                        var day2Date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+2);
                        var day3Date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+3);
                        var day4Date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+4);
                        var day5Date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+5);
   
   
                        // we need containers for date, temp, wind, humidity, uv index
                        var dateContainer = document.createElement("p");
                        var tempContainer = document.createElement("p");
                        var windContainer = document.createElement("p");
                        var humidityContainer = document.createElement("p");
                        var uvContainer = document.createElement("p");
                        

                        

                        // we must generate text content in each container
                        dateContainer.textContent = "Today's Date: " + date;
                        tempContainer.textContent = "Temp: " + data.current.temp + " Farenheit";
                        windContainer.textContent =  "Wind-speed: " + data.current.wind_speed;
                        humidityContainer.textContent = "Humidity: " + data.current.humidity;
                        uvContainer.textContent = "UV index: " + data.current.uvi;
                        

                        // need to choose icon based on weather




                        // uv color coding
                        if (data.current.uvi < 2) {
                            uvContainer.classList.add("bg-success");
                        }
                        
                        if (data.current.uvi >= 2) {
                            uvContainer.classList.add("bg-warning");
                        }

                        if (data.current.uvi >= 5) {
                            uvContainer.classList.add("bg-danger");
                        }

   
                        // these containers must now be appended to parent container
                        cityWeather.appendChild(dateContainer);
                        cityWeather.appendChild(tempContainer);
                        cityWeather.appendChild(windContainer);
                        cityWeather.appendChild(humidityContainer);
                        cityWeather.appendChild(uvContainer);
   

                        // add bootstrap styling 
                        cityWeather.classList.add("border-primary", "w-100");
                        forecastCards.classList.add("card", "border-secondary", "w-100");
                        cityCard.classList.add("card", "border-secondary", "w-100");
                        recentSearch.classList.add("card", "border-secondary", "w-100");
                        cityContainer.classList.add("card", "w-100");


   
                        // create 5-day forecast header and info containers
                        fiveDayHeader.textContent = "5-Day Forecast:";
                        var day1Icon = document.createElement("i")
                        var day1DateContainer = document.createElement("p");
                        var day1Temp = document.createElement("p");
                        var day1Wind = document.createElement("p");
                        var day1Hum = document.createElement("p");
                        
                        var day2Icon = document.createElement("i")
                        var day2DateContainer = document.createElement("p");
                        var day2Temp = document.createElement("p");
                        var day2Wind = document.createElement("p");
                        var day2Hum = document.createElement("p");
                        
                        var day3Icon = document.createElement("i")
                        var day3DateContainer = document.createElement("p");
                        var day3Temp = document.createElement("p");
                        var day3Wind = document.createElement("p");
                        var day3Hum = document.createElement("p");
                        
                        var day4Icon = document.createElement("i")
                        var day4DateContainer = document.createElement("p");
                        var day4Temp = document.createElement("p");
                        var day4Wind = document.createElement("p");
                        var day4Hum = document.createElement("p");
   
                        var day5Icon = document.createElement("i")
                        var day5DateContainer = document.createElement("p");
                        var day5Temp = document.createElement("p");
                        var day5Wind = document.createElement("p");
                        var day5Hum = document.createElement("p");
   
   
                        // put info into containers for Day 1
                           
                        day1DateContainer.textContent = day1Date;
                           
                           
                        // must stringify data from object
                        day1Temp.textContent = "Temp: " + JSON.stringify(data.daily[0].temp.day) + " Farenheit";
                        day1Wind.textContent = "Wind-speed: " + JSON.stringify(data.daily[0].wind_speed);
                        day1Hum.textContent = "Humidity: " + JSON.stringify(data.daily[0].humidity);
                       
                           
   
   
                        // append containers 
                        day1.appendChild(day1DateContainer);
                        day1.appendChild(day1Temp);
                        day1.appendChild(day1Wind);
                        day1.appendChild(day1Hum);
    
   
                        // day 2
                        day2DateContainer.textContent = day2Date;
                        day2Temp.textContent = "Temp: " + JSON.stringify(data.daily[1].temp.day) + " Farenheit";
                        day2Wind.textContent = "Wind-speed: " + JSON.stringify(data.daily[1].wind_speed);
                        day2Hum.textContent = "Humidity: " + JSON.stringify(data.daily[1].humidity);
   
                        // append containers
                        day2.appendChild(day2DateContainer);
                        day2.appendChild(day2Temp);
                        day2.appendChild(day2Wind);
                        day2.appendChild(day2Hum);
   
                        // day 3
                        day3DateContainer.textContent= day3Date;
                        day3Temp.textContent = "Temp: " + JSON.stringify(data.daily[2].temp.day) + " Farenheit";
                        day3Wind.textContent = "Wind-speed: " + JSON.stringify(data.daily[2].wind_speed);
                        day3Hum.textContent = "Humidity: " + JSON.stringify(data.daily[2].humidity);
   
                        // append containers
                        day3.appendChild(day3DateContainer);
                        day3.appendChild(day3Temp);
                        day3.appendChild(day3Wind);
                        day3.appendChild(day3Hum);
   
                        // day 4
                        day4DateContainer.textContent = day4Date;
                        day4Temp.textContent = "Temp: " + JSON.stringify(data.daily[3].temp.day) + " Farenheit";
                        day4Wind.textContent = "Wind-speed: " + JSON.stringify(data.daily[3].wind_speed);
                        day4Hum.textContent = "Humidity: " + JSON.stringify(data.daily[3].humidity);
   
                        // append containers
                        day4.appendChild(day4DateContainer);
                        day4.appendChild(day4Temp);
                        day4.appendChild(day4Wind);
                        day4.appendChild(day4Hum);
   
                        // day 5
                        day5DateContainer.textContent= day5Date;
                        day5Temp.textContent = "Temp: " + JSON.stringify(data.daily[4].temp.day) + " Farenheit";
                        day5Wind.textContent = "Wind-speed: " + JSON.stringify(data.daily[4].wind_speed);
                        day5Hum.textContent = "Humidity: " + JSON.stringify(data.daily[4].humidity);
   
                        // append containers
                        day5.appendChild(day5DateContainer);
                        day5.appendChild(day5Temp);
                        day5.appendChild(day5Wind);
                        day5.appendChild(day5Hum);


                        // add bootstrap styling for organization
                        day1.classList.add("card", "border-primary", "w-100");
                        day2.classList.add("card", "border-primary", "w-100");
                        day3.classList.add("card", "border-primary", "w-100");
                        day4.classList.add("card", "border-primary", "w-100");
                        day5.classList.add("card", "border-primary", "w-100");
                    });
                });
            });
               
               
        }
           // else statement for responses that fail
           else {
               window.alert("Please enter a valid city!");
           }
       });
   }

////////////////////////////////////////////////////////////////

// to setup color-coded uv data, we must know more about uv index
// if uv < 2 = favorable
// if uv > 3 or < 5 = moderate
// if uv > 5 = severe

// must add icons for weather conditions
// need to choose icon based on weather
    //("fa-solid", "fa-cloud");
      
    //("fa-solid", "fa-sun");
      
    //("fa-solid", "fa-snowflake");
      
    //("fa-solid", "fa-cloud-showers-heavy");

    //("fa-solid", "fa-cloud-drizzle");
    
    //("fa-solid", "fa-cloud-bolt");
    
    //("fa-solid", "fa-sun");