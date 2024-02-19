const searchWeatherForm = document.querySelector(".search-weather-form");
const card = document.querySelector(".card");
const textWeather = document.querySelector(".weather");
const textTemperature = document.querySelector(".condition");
const textDate = document.querySelector(".date");
const textLocation = document.querySelector(".location");

async function fetchApi(city) {
  const capitalizedCity = city[0].toUpperCase() + city.slice(1);
  const url = `https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${capitalizedCity}&aqi=no`;

  try {
    card.style.visibility = "visible";
    const res = await (await fetch(url)).json();

    if (res.error) throw new Error("No data found");
    const {
      current: {
        temp_c: temperature,
        condition: { text: cond },
        is_day: isDay,
        last_updated: date,
      },
      location: { name: cityName },
    } = res;

    const myDate = new Date(date);
    const splittedDate = myDate.toString().split(" ").slice(0, 3);
    const formattedDate = `${splittedDate[0]}, ${splittedDate
      .slice(1)
      .join(" ")}`;

    // condition
    let classAndCondition = { className: "", condition: "" };
    if (cond.includes("cloud"))
      classAndCondition = {
        className: "card-cloudy-night",
        condition: "Cloudy",
      };
    else if (cond.includes("Rain") || cond.includes("Mist"))
      classAndCondition = {
        className: "card card-rain",
        condition: "Rainy",
      };
    else if (cond.includes("Sun") || cond.includes("Clear"))
      classAndCondition = {
        className: "card card-sunshine",
        condition: "Sunny",
      };

    ///
    card.className = `card ${classAndCondition.className}`;
    textWeather.textContent = classAndCondition.condition;
    textLocation.textContent = cityName;
    textDate.textContent = formattedDate;
    textTemperature.innerHTML = `${temperature}&deg;`;
  } catch (error) {
    console.log(error);
    card.style.visibility = "hidden";
  }
}

searchWeatherForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const [inputLocation] = e.target;
  fetchApi(inputLocation.value);
  inputLocation.value = "";
  inputLocation.blur();
});
