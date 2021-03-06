$(document).ready(function () {
    $(".searchBtn").on("click", function () {
        var value = $("#input").val();
        $("#input").val("");
        $(".currentWeather").empty();
        

        searchWeather(value);
        
        
    });

    function rowMake(city) {
        var li = $("<li>").text(city);
        $("#history").append(li)
    }

    function searchWeather(city) {

        var apiKey = "a3a8b5a637ecc8da9f768ef50c854fbb"

        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`,
            dataType: "json"
        }).then(function (res) {
            console.log(res.sys.sunrise)

            if (history.indexOf(city) === -1) {
                history.push(city)
                localStorage.setItem("history", JSON.stringify(history))
            }
            var currentUnix = res.sys.sunrise;
            var unixConvert = currentUnix * 1000;
            var currentDateCalc = new Date (unixConvert);
            var curDateNorm = currentDateCalc.toLocaleString().split(",");
            var curDateFinal = curDateNorm[0];
            var cardContent = $("<div>");
            var name = $("<h3>").text(res.name);
            var curDate = $("<h3>").text(curDateFinal);
            var currentPic = res.weather[0].icon
            var currentIcon = "https://openweathermap.org/img/wn/" + currentPic + ".png"
            var temp = $("<h4>").text("Temperature: " + res.main.temp + " F");
            var humidity = $("<h4>").text("Humidity: " + res.main.humidity + "%");
            var wind = $("<h4>").text("Wind Speed: " + res.wind.speed + " MPH");
            var currentImg = $("<img>").attr("src", currentIcon).attr("style", "width: 100px")

            var long = res.coord.lon
            var lat = res.coord.lat

            cardContent.append(name);
            cardContent.append(curDate);
            cardContent.append(currentImg);
            cardContent.append(temp);
            cardContent.append(humidity);
            cardContent.append(wind);

            $(".currentWeather").append(cardContent)

            $.ajax({
                type: "GET",
                url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=${apiKey}&units=imperial`,
                dataType: "json"
            }).then(function (res) {

                var uVindex = $("<h4>").text("UV Index: " + res.current.uvi);

                for (let index = 0; index <= 4; index++) {
                    var dayNumber = index +1;
                    var fiveDayPic = res.daily[index].weather[0].icon;
                    //Here is where I start the calculation for the date
                    var unixTimestamp = res.daily[index].sunrise;
                    var unixMili = unixTimestamp * 1000;
                    var calcDate = new Date(unixMili);
                    //Here I am converting date to a string and then splitting out what I want at ,
                    var finalDate = calcDate.toLocaleString().split(",");
                    //Here I am setting the final date (cant believe it worked)
                    var test = finalDate[0];
                    var date = $("<p>").text(test);
                    var temp= $("<p>").text("Temp: " + res.daily[index].temp.day + " F");
                    var humidity = $("<p>").text("Humidity: " + res.daily[index].humidity + " %");
                    var fiveDayIcon = "https://openweathermap.org/img/wn/" + fiveDayPic + ".png";
                    var imageEl = $("<img>").attr("src", fiveDayIcon).attr("style", "width: 50px");
                    
                    
                    $("#day" + dayNumber).append(date);
                    $("#day" + dayNumber).append(temp);
                    $("#day" + dayNumber).append(humidity);
                    $("#day" + dayNumber).append(imageEl);
                    

                }
            
                cardContent.append(uVindex)

                // function uvIndexFun (){
                //     if(uVindex>10){
                        
                        
                //     }
                
                
                // }

            })


        })
    }
    // function searchFiveDay(city) {

    //     var apiKey = "a3a8b5a637ecc8da9f768ef50c854fbb"






    // }


    //INITIAL FUNCTIONS

    var history = JSON.parse(localStorage.getItem("history")) || [];

    if (history.length > 0) {
        searchWeather(history[history.length - 1])
    }
    for (let i = 0; i < history.length; i++) {
        //  call function to make row
        rowMake(history[i]);

    }
})







// input (city name)
// users with click submit btn
//  - grab the value from input (wht the user typed)
// call function to search for weather

// search weather function
// - check value of argument , check to see is it exsists in hostory array
// - make api call for current weather of city
// - do notate for data that we want 
// append data to html
// call 5 day forcast fucntion
// call uVindex function



//5day forecast function
// - another ajax call 
//- for loop through data array
//      - dynamically make a div, addclass 
//      - append data to div
//      - append div to div on html file



//uv index function
// ajax call
// append data to current weather div


//row make

// make dynamic li tag inset city name
//append to UL on html


// INitial FUNCTIONS

//CHECK LOCAL STORAGE FOR PAST SEARCHES
    // IF PAST SEARCHES ARE TRU PUT THEM INSIDE OF AN ARRAy
    //grab the last item in that array and pass as an argument to searchweather function
    // for loop the array
    //  call function rowmake
