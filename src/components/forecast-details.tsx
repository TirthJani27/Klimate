/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForecastData, WeatherData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ArrowDown,
  ArrowUp,
  ArrowUp01,
  ArrowUpIcon,
  ArrowUpLeftFromSquare,
  Droplets,
  Wind,
} from "lucide-react";

interface ForecastDetailsProps {
  data: ForecastData;
}

interface IndividualForecast {
  dt: number;
  main: WeatherData["main"];
  weather: WeatherData["weather"];
  wind: WeatherData["wind"];
  dt_txt: string;
  day?: string;
  dateNumber?: string;
  month?: string;
}
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function dateToMonthName(date: Date): string {
  return new Date(date).toLocaleString("default", { month: "long" });
}
const firstLetterUppercase = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const ForecastDetails = ({ data }: ForecastDetailsProps) => {
  const myMap: Map<string, IndividualForecast> = new Map();
  for (let i = 0; i < data.list.length; i++) {
    const arr = data.list[i].dt_txt.split(" ");
    const currDate = arr[0];
    if (myMap.has(currDate)) {
      const getForecast = myMap.get(currDate);
      if (
        getForecast &&
        getForecast.main.temp_max < data.list[i].main.temp_max
      ) {
        getForecast.main.temp_max = data.list[i].main.temp_max;
      }
      if (
        getForecast &&
        getForecast.main.temp_min > data.list[i].main.temp_min
      ) {
        getForecast.main.temp_min = data.list[i].main.temp_min;
      }
      if (
        getForecast &&
        getForecast.main.humidity < data.list[i].main.humidity
      ) {
        getForecast.main.humidity = data.list[i].main.humidity;
      }
      if (getForecast && getForecast.wind.speed < data.list[i].wind.speed) {
        getForecast.wind.speed = data.list[i].wind.speed;
      }
    } else {
      myMap.set(currDate, {
        dt: data.list[i].dt,
        main: data.list[i].main,
        weather: data.list[i].weather,
        wind: data.list[i].wind,
        dt_txt: data.list[i].dt_txt,
      });
    }
  }
  const forecastArrayFinal = [];
  for (const [key, value] of myMap) {
    const date = new Date(key);
    const dateNumber = date.getDate();
    value.dateNumber = dateNumber.toString();
    const dayName = daysOfWeek[date.getDay()];
    value.day = dayName;
    const monthName = dateToMonthName(date);
    value.month = monthName.slice(0, 3);
    forecastArrayFinal.push(value);
  }
  console.log(forecastArrayFinal);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>5 Days Weather Forecast</CardTitle>
          <CardContent>
            <div className="grid gap-4 mt-2">
              {forecastArrayFinal.map((forecast) => (
                <div
                  key={forecast.dt_txt}
                  className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">
                      {forecast.day}, {forecast.month} {forecast.dateNumber}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {firstLetterUppercase(forecast.weather[0].description)}
                    </p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <span className="flex items-center text-blue-500">
                      <ArrowDown className="mr-1 h-4 w-4" />
                      <div>{forecast.main.temp_min}°</div>
                    </span>
                    <span className="flex items-center text-red-500">
                      <ArrowUp className="mr-1 h-4 w-4" />
                      <div>{forecast.main.temp_max}°</div>
                    </span>
                  </div>
                  <div className="flex justify-end gap-4">
                    <span className="flex items-center gap-1">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{forecast.main.humidity}%</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Wind className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{forecast.wind.speed}m/s</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ForecastDetails;
