    var cityButton;
    var buttonsArray;
    if (localStorage.getItem("buttonsKey") !== null)

    {
        buttonsArray = JSON.parse(localStorage.getItem('buttonsKey'));
        $("#createBtn").empty();
        for(var i = 0; i < buttonsArray.length; i++){       
        $("#createBtn").append(`<button class="dynamicBtn btnArray mt-1" onclick="showinfo(${buttonsArray[i]});">${buttonsArray[i]}<span class="closeicon" onclick="deleteCity(${buttonsArray[i]});"><i class="fa fa-window-close"></i></span></button><br/>`);
        }
    }
    $(".btn-search").on("click", createBtn);
    
    function createBtn(e){
        e.preventDefault();
        var cityButton = $("#search-input").val().toUpperCase();
        if (localStorage.getItem("buttonsKey") == null){
        var buttonsArray = [];
        buttonsArray.push(cityButton);  
        $("#createBtn").append(`<button class="dynamicBtn mt-1">${cityButton}</button>`);
        localStorage.setItem('buttonsKey', JSON.stringify(buttonsArray));
        } 
        else{   
            buttonsArray = JSON.parse(localStorage.getItem('buttonsKey'));
            if(buttonsArray.indexOf(cityButton) == -1){
            buttonsArray.push(cityButton); 
            console.log(cityButton)
            $("#createBtn").prepend(`<button class="dynamicBtn mt-1" onclick="showinfo(${cityButton})">${cityButton}</button>`);   
            }
            localStorage.setItem('buttonsKey', JSON.stringify(buttonsArray));
        }
    showinfo(cityButton);
    }

console.log(cityButton);


function showinfo(cityButton){   
var APIKey = "7635c7831665c79d31c4b8a3b9478080";
var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityButton}&units=metric&APPID=` + APIKey;
// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
url: queryURL,
method: "GET"
}).then(mainSectionInfo);

var queryURLNew = `https://api.openweathermap.org/data/2.5/forecast?q=${cityButton}&units=metric&APPID=` + APIKey;
$.ajax({
url: queryURLNew,
method: "GET"
}).then(forecastSection);
}    

function mainSectionInfo(response){ 
var cityButton = $("#search-input").val().toUpperCase(); 
let today = moment().format('L');   
console.log(response);
let imgsrc = response.weather[0].icon;
var imgURL= "http://openweathermap.org/img/w/" + imgsrc + ".png";    
$(".city").html(`<h4> ${cityButton}(${today}) <img src="${imgURL}"></h4>`);
$(".temp").text("Temperature:" + " " + response.main.temp);
$(".humidity").text("Humidity:" + " " + response.main.humidity);
$(".wind").text("Wind:" + " " + response.wind.speed)
$(".uv").text("UV Index:" + " " + response.wind.speed)
$(".section1-sub").css("border", "1px solid lightgrey")

 }

function forecastSection(response){ 
    
var cityButton = $("#search-input").val().toUpperCase();
console.log(response); 
$(".forecastHead").html(`<h4> 5-Day Forecast: </h4>`);
$(".forecast").css("background-color", "blue");
$(".forecast").css("border-radius", "5px");
$(".forecast").css("padding", "3px 0");
let today = moment().format('L');
let day1date = moment().add(1,'days').format('l');
let day1temp = response.list[9].main.temp; 
console.log(response.list[9].main.temp);
let day1hdity = response.list[9].main.humidity;
let day1icon = response.list[9].weather[0].icon;
var iconurl1= "http://openweathermap.org/img/w/" + day1icon + ".png";
console.log(`the humidity is ${day1hdity}`);
$(".day1temp").text(`Temp: ${day1temp}`);
$(".day1humdity").text(`Humidity: ${day1hdity}`);
$(".day1date").text(day1date);
$(".day1icon").empty();
$(".day1icon").append(`<img src="${iconurl1}">`);

let day2date = moment().add(2,'days').format('l');
let day2temp = response.list[17].main.temp;
let day2hdity = response.list[17].main.humidity;
let day2icon = response.list[17].weather[0].icon;
var iconurl2= "http://openweathermap.org/img/w/" + day1icon + ".png";
$(".day2temp").text(`Temp: ${day2temp}`);
$(".day2humdity").text(`Humidity: ${day2hdity}`);
$(".day2date").text(day2date)
$(".day2icon").empty()
$(".day2icon").append(`<img src="${iconurl2}">`);

let day3date = moment().add(3,'days').format('l');
let day3temp = response.list[25].main.temp;
let day3hdity = response.list[25].main.humidity;
let day3icon = response.list[25].weather[0].icon;
var iconurl3= "http://openweathermap.org/img/w/" + day1icon + ".png";
$(".day3temp").text(`Temp: ${day3temp}`);
$(".day3humdity").text(`Humidity: ${day3hdity}`);
$(".day3date").text(day3date);
$(".day3icon").empty();
$(".day3icon").append(`<img src="${iconurl3}">`);

let day4date = moment().add(4,'days').format('l');
let day4temp = response.list[32].main.temp;
let day4hdity = response.list[32].main.humidity;
let day4icon = response.list[32].weather[0].icon;
var iconurl4= "http://openweathermap.org/img/w/" + day1icon + ".png";
$(".day4temp").text(`Temp: ${day4temp}`);
$(".day4humdity").text(`Humidity: ${day4hdity}`);
$(".day4date").text(day4date);
$(".day4icon").empty();
$(".day4icon").append(`<img src="${iconurl4}">`);

let day5date = moment().add(5,'days').format('l');
console.log(`${day5date}`)
let day5temp = response.list[39].main.temp;
let day5hdity = response.list[39].main.humidity;
let day5icon = response.list[39].weather[0].icon;
var iconurl5= "http://openweathermap.org/img/w/" + day1icon + ".png";
$(".day5temp").text(`Temp: ${day5temp}`);
$(".day5humdity").text(`Humidity: ${day5hdity}`);
$(".day5date").text(day5date);
$(".day5icon").empty();
$(".day5icon").append(`<img src="${iconurl5}">`);
} 

function deleteCity(buttonsArray){
    const index = buttonsArray.indexOf(buttonsArray[i]);
    buttonsArray.splice(index, 1);

}