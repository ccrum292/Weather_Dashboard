var d = new Date();
var currentDate = '(' + (d.getMonth()+1)+ "/"+ d.getDate()+ "/" + d.getFullYear() + ')';


function todaysWeather(input){

    var queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=0c0fdca9577d3029019a275437cd2ba8";

    $.ajax({
        url: queryWeatherURL,
        method: "GET"
    }).then(function(response){
    
        var newRow = $("<div class='row'> <div class='col'> <div class='row' id='today-div'><div class='heading-div'></div></div> <div class='row' id='five-day-div'><div class='col' id='one'></div><div class='col' id='two'></div><div class='col' id='three'></div><div class='col' id='four'></div><div class='col' id='five'></div></div> </div> </div>")
        $("#main-display").append(newRow);

        // today-div
        var heading2 = $("<h2>"+ response.name +" "+ currentDate +"</h2>") 
        var iconEl = $("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".heading-div").append(heading2, iconEl)

        console.log(response)

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var weatherSpecifics = $("<ul id='today-list'><li>Temperature: " + response.main.temp +  " °F</li><li>Humidity: " + response.main.humidity + "%</li><li>Wind Speed: " + response.wind.speed+ " mph</li></ul>")
        $("#today-div").append(weatherSpecifics)
        var queryUvi = "http://api.openweathermap.org/data/2.5/uvi?appid=0c0fdca9577d3029019a275437cd2ba8&lat="+ lat + "&lon=" + lon;
        $.ajax({
            url: queryUvi,
            method: "GET"
        }).then(function(response2){
            console.log(response2)
            var uviLi = $("<li>UV Index: " + response2.value + "</li>");
            $("#today-list").append(uviLi);
        });

        // five-day-div

        



    });
}




todaysWeather("Bujumbura,Burundi")

