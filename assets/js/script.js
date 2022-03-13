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


// we target our containers for 5-day forecast
var day1 = document.querySelector(".day1-card");
var day2 = document.querySelector(".day2-card");
var day3 = document.querySelector(".day3-card");
var day4 = document.querySelector(".day4-card");
var day5 = document.querySelector(".day5-card");


// target recent searches section
var recentSearch = document.querySelector(".recent-searches");


// target recent searches header
var recentHeader = document.querySelector(".recent-header");


////////////////////////////////////////////////////


// we create a function for the form
var formSubmitHandler = function(event) {


    // prevents browser refresh
    event.preventDefault();


    // retrieve value from input, trim removes unecessary spaces
    var city = cityInputEl.value.trim();


    // we populate a recent searches area with user input
    recentHeader.textContent = "Recent Searches:";
    var recentSearchEl = document.createElement("p");
    recentSearchEl.textContent = city;
    recentSearch.appendChild(recentHeader);
    recentSearch.appendChild(recentSearchEl);
    


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

                        // these containers must now be appended to parent container
                        cityWeather.appendChild(dateContainer);
                        cityWeather.appendChild(tempContainer);
                        cityWeather.appendChild(windContainer);
                        cityWeather.appendChild(humidityContainer);
                        cityWeather.appendChild(uvContainer);


                        // create 5-day forecast header and info containers
                        fiveDayHeader.textContent = "5-Day Forecast:";
                        var day1DateContainer = document.createElement("p");
                        var day1Temp = document.createElement("p");
                        var day1Wind = document.createElement("p");
                        var day1Hum = document.createElement("p");


                        // put info into containers for Day 1
                        
                        day1DateContainer.textContent = day1Date;
                        // must stringify data from object
                        day1Temp.textContent = "Temp: " + JSON.stringify(data.daily[0].temp.day) + " Farenheit";
                        day1Wind.textContent = data.daily.wind_speed;
                        day1Hum.textContent = data.daily.humidity;
                    
                        


                        // append containers 
                        day1.appendChild(day1DateContainer);
                        day1.appendChild(day1Temp);
                        day1.appendChild(day1Wind);
                        day1.appendChild(day1Hum);


                        // day 2


                        // append containers


                        // day 3


                        // append containers


                        // day 4


                        // append containers


                        // day 5


                        // append containers
                        
                    });
                });
            });

            //clears city input field
            cityInputEl.value = "";
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


clearBtn.addEventListener("click", function() {
    cityCard.textContent = "";
    forecastCards.textContent = "";
    
})


//////////////////////////////////////////////////////

// we want searches to be saved, let's try a function



////////////////////////////////////////////////////////

// we must also set up localStorage so people can see info form cities that have been searched