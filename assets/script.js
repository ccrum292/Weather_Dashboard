var d = new Date();
var currentDate = '(' + (d.getMonth()+1)+ "/"+ d.getDate()+ "/" + d.getFullYear() + ')';

$("#city-input-button").on('click', function(event){
    event.preventDefault();
    var inputVal = $("#city-input").val().trim();
    if (inputVal === ""){return}
    else{ displayingTodaysWeather(inputVal);
         // console.log(inputVal)
        $("#search-history-div").append($("<button type='submit' id='" +inputVal+ "' class='city-history-input-button'>"+inputVal+"</button>"))
    }
})

$(document).on('click', '.city-history-input-button', displayBasedOnHistoryButton);


function displayBasedOnHistoryButton (){
    event.preventDefault();
    displayingTodaysWeather($(this).attr("id"))
    
    
}

function displayingTodaysWeather(input){
    $("#main-display").empty();

    var queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=0c0fdca9577d3029019a275437cd2ba8";
    var newRow = $("<div class='row'> <div class='col'> <div class='row' id='today-div'><div class='heading-div'></div></div> <div class='row' id='five-day-div'></div> </div> </div>")
    $("#main-display").append(newRow);

    // today-div
    $.ajax({
        url: queryWeatherURL,
        method: "GET"
    }).then(function(response){
    
        var heading2 = $("<h2>"+ response.name +" "+ currentDate +"</h2>") 
        var iconEl = $("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".heading-div").append(heading2, iconEl)

        // console.log(response)

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var weatherSpecifics = $("<ul id='today-list'><li>Temperature: " + response.main.temp +  " °F</li><li>Humidity: " + response.main.humidity + "</li><li>Wind Speed: " + response.wind.speed+ " mph</li></ul>")
        $("#today-div").append(weatherSpecifics)

        var queryUvi = "http://api.openweathermap.org/data/2.5/uvi?appid=0c0fdca9577d3029019a275437cd2ba8&lat="+ lat + "&lon=" + lon;
        $.ajax({
            url: queryUvi,
            method: "GET"
        }).then(function(response2){
            // console.log(response2)
            var uviLi = $("<li>UV Index: " + response2.value + "</li>");
            $("#today-list").append(uviLi);
        });
    });

    // five-day-div 
 
    var queryForcast = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +input+ "&cnt=5&units=imperial&appid=166a433c57516f51dfab1f7edaed8413"
    // console.log(queryForcast)
     $.ajax({
        url: queryForcast,
        method: "GET"
     }).then(function(response3){
        // console.log(response3)

        function produceFutureDateFromApi (event){
            let unixTimestamp = event      
            var date = new Date(unixTimestamp * 1000);
            var forcastedDate = (date.getMonth()+1)+ "/"+ date.getDate()+ "/" + date.getFullYear()
            return forcastedDate;
            // console.log(forcastedDate);
        }
        
        $("#five-day-div").append($('<h3 id="forcast-heading">5-Day Forecast:</h3>'))
        for(var i =0; i<5; i++){
        var newForcastDiv = $("<div class='col'><div class='col blue-div'><h5 id='date' class='no-padding'>"+ produceFutureDateFromApi(response3.list[i].dt) + "</h4><ul class='no-padding'><li><img src='http://openweathermap.org/img/w/" + response3.list[i].weather[0].icon + ".png'></li><li>Temp: "+ response3.list[i].temp.day+ "°F</li><li>Humidity: "+ response3.list[i].humidity + "%</li> </ul></div></div>")
        $('#five-day-div').append(newForcastDiv);
        }
     });


}







