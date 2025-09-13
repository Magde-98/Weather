const apiKey = "84b15ee760764492867135311251109";
const cityInput = document.getElementById("search");
const searchBtn = document.getElementById("submit");
const forecast = document.getElementById("forecast");


async function fetchWeather(city) {
  try {
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`);
    const data = await res.json();

    data.error ? showError(data.error.message) : displayWeather(data);
  } catch {
    showError("Something went wrong!");
  }
}

function showError(msg) {
  forecast.innerHTML = `
    <div class="col-12">
      <div class="alert alert-danger text-center">
        <i class="fa-solid fa-triangle-exclamation"></i> ${msg}
      </div>
    </div>`;
}


function displayWeather(data) {
  forecast.innerHTML = "";

  const daysMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthsMap = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  for (let i = 0; i < data.forecast.forecastday.length; i++) {
    let day = data.forecast.forecastday[i];
    let date = new Date(day.date);

    let dayName = daysMap[date.getDay()];
    let fullDate = `${date.getDate()} ${monthsMap[date.getMonth()]}`;

    if (i === 0) {
      forecast.innerHTML += `
        <div class="col-md-4">
          <div class="card p-4 h-100">
            <div class="d-flex justify-content-between">
              <span>${dayName}</span>
              <span>${fullDate}</span>
            </div>
            <h4 class="mt-3">${data.location.name}</h4>
            <h2 class="big-temp">${day.day.avgtemp_c}ºC</h2>
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            <p class="mt-2 Sunny">${day.day.condition.text}</p>
            <div class="d-flex justify-content-between mt-3">
              <span><i class="fa-solid fa-umbrella icon-small"></i>${day.day.daily_chance_of_rain}%</span>
              <span><i class="fa-solid fa-wind icon-small"></i>${day.day.maxwind_kph} km/h</span>
              <span><i class="fa-solid fa-compass icon-small"></i>${day.day.condition.text}</span>
            </div>
          </div>
        </div>`;
    } else {

      forecast.innerHTML += `
        <div class="col-md-4">
          <div class="card text-center p-4 h-100">
            <span class="mb-2">${dayName}</span>
            <div class="d-flex justify-content-center py-3">
               <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            </div>
            <h4 class="mt-2">${day.day.avgtemp_c}ºC</h4>
            <span>${day.day.mintemp_c}º</span>
            <p class="mt-3 Sunny">${day.day.condition.text}</p>
          </div>
        </div>`;
    }
  }
}


searchBtn.addEventListener("click", () => fetchWeather(cityInput.value.trim()));

cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && cityInput.value.trim() !== "") {
    fetchWeather(cityInput.value.trim());
  }
});


fetchWeather("Cairo");

