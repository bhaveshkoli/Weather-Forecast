
const ApiKey = "5b70bc5ce8bdc30f0c8da5ab2cd91889";
const Apiurl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q="; 

const sarchBox = document.querySelector(".search input");
const sarchBtn = document.querySelector(".search button");
const body = document.querySelector("body");
const weatherIcons = document.querySelector(".weather-icons");
const slider = document.querySelector(".slider");

let lat = 19.0760; // Default latitude
let lon = 72.8777; // Default longitude

const dark = true;
   


async function weatherRepot (city){
   try{ 
        const respons = await fetch(Apiurl + city + `&appid=${ApiKey}`);
        let  data = await respons.json();
        
          lat = data.coord.lat ;
          lon = data.coord.lon ;

        if(respons.status == 404){
            alert('The city not found');
        }
        else{
            console.log(data);
            document.querySelector(".cityName").innerHTML =data.name;
            document.querySelector(".humi").innerHTML =data.main.humidity +"%";
            document.querySelector(".temperature").innerHTML =Math.round(data.main.temp) + "°c";
            document.querySelector(".wind").innerHTML =data.wind.speed +"km/h";
            
            // console.log(lat);
            // console.log(lon);
        
            const sunriseTime = new Date(data.sys.sunrise * 1000);
            const hours = sunriseTime.getHours() % 12 || 12;
            const minutes = String(sunriseTime.getMinutes()).padStart(2, "0");
            const ampm = sunriseTime.getHours() >= 12 ? "PM" : "AM";
            document.querySelector(".sunRice").innerHTML = `${hours}:${minutes} ${ampm}`;
        
            
            const sunsetTime = new Date(data.sys.sunset * 1000);
            const hour = sunsetTime.getHours() % 12 || 12;
            const minute = String(sunsetTime.getMinutes()).padStart(2, "0");
            const aMpM = sunsetTime.getHours() >= 12 ? "PM" : "AM";
            document.querySelector(".sunSet").innerHTML = `${hour}:${minute} ${aMpM}`;
            
        
        
        
        
            if (data.weather[0].main == "Clouds"){
                weatherIcons.src = "img/cloudy.png";  
                }
                else if(data.weather[0].main == "Rain"){
                    weatherIcons.src = "img/heavy-rain.png";
                }
                else if(data.weather[0].main == "Clear"){
                    weatherIcons.src = "img/sunny.png"
                }
                else if(data.weather[0].main == "Haze"){
                    weatherIcons.src = "img/haza.png";
                }
                else if(data.weather[0].main == "Smoke"){
                    weatherIcons.src = "img/haza.png";
                }
                else if(data.weather[0].main == "Drizzle"){
                    weatherIcons.src = "img/cloudyWithrain.png";
                }
                else if(data.weather[0].main == "Mist"){
                    weatherIcons.src = "img/mits.png";  
                }


                map.setView([lat, lon], 12);


            }
        }catch(error){
        
        }
    
}


sarchBtn.addEventListener("click", ()=>{
     weatherRepot(sarchBox.value);
        sarchBox.value = "";
     
        
    });



    // toggle button 
    if(dark){
        body.classList.add('dark');
    }
    else{
        body.classList.add('root')
    }


    slider.addEventListener('click', ()=>{
        body.classList.toggle('dark');
               
   })
   

//    this is map element
const map = L.map('map');
map.setView([lat, lon], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);  

