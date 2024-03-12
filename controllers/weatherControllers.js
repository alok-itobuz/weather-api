import path from "path";
import fs from "fs";

const dataPath = path.join(import.meta.dirname, "..", "data/weatherData.json");
const weatherDataJSON = fs.readFileSync(dataPath, { encoding: "utf-8" });
const weatherDataParsed = JSON.parse(weatherDataJSON);

export const getAllWeathers = (req, res) => {
  console.log("hello");
  res.status(200).json({
    status: "success",
    data: weatherDataParsed,
    message: "all the weather datas are displayed",
  });
};

export const getWeather = (req, res) => {
  const cityName = req.params.name;
  const cityWeatherData = weatherDataParsed.find(
    (data) => data.name.toLowerCase() === cityName.toLowerCase()
  );
  if (!cityWeatherData) {
    return res.status(404).json({
      status: "error",
      data: null,
      message: "No data found for this city",
    });
  }

  res.status(201).json({
    status: "success",
    data: cityWeatherData,
    message: "Data for this city is sent",
  });
};

export const addWeather = async (req, res) => {
  const newData = Object.assign(req.body);
  const updatedWeatherData = new Array(...weatherDataParsed);
  updatedWeatherData.push(newData);
  fs.writeFileSync(dataPath, JSON.stringify(updatedWeatherData));

  res.status(201).json({
    status: "success",
    data: newData,
    message: "Successfully added the data",
  });
};

export const pathNotFound = (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Invalid path",
  });
};
