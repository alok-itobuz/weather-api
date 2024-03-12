const searchWeatherForm = document.querySelector(".search-weather-form");
const card = document.querySelector(".card");
const textWeather = document.querySelector(".weather");
const textTemperature = document.querySelector(".condition");
const textDate = document.querySelector(".date");
const textLocation = document.querySelector(".location");

let prevClassName = "";

function renderPage(res) {
  const {
    temp_c: temperature,
    condition: cond,
    last_updated: date,
    name: cityName,
  } = res.data;

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
      className: "card-rain",
      condition: "Rainy",
    };
  else if (cond.includes("Sun") || cond.includes("Clear"))
    classAndCondition = {
      className: "card-sunshine",
      condition: "Sunny",
    };
  if (!classAndCondition.className) throw new Error("Unknown weather");

  prevClassName
    ? card.classList.replace(prevClassName, classAndCondition.className)
    : card.classList.add(classAndCondition.className);
  prevClassName = classAndCondition.className;
  card.classList.remove("d-none");

  textWeather.textContent = classAndCondition.condition;
  textLocation.textContent = cityName;
  textDate.textContent = formattedDate;
  textTemperature.innerHTML = `${temperature}&deg;`;
}

async function fetchApi(city) {
  const url = `http://127.0.0.1:3000/api/weather/${city}`;

  try {
    card.style.visibility = "visible";
    const resjson = await fetch(url);
    if (!resjson.ok) throw new Error("No city found in this name");
    const res = await resjson.json();

    renderPage(res);
  } catch (error) {
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
