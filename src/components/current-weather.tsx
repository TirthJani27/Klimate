/* eslint-disable @typescript-eslint/no-unused-vars */
import { GeocodingResponse, WeatherData } from "@/api/types";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

const formalTemp = (temp: number) => `${Math.round(temp)}°`;

export function CurrentWeather({ data, locationName }: CurrentWeatherProps) {
  console.log("This is the main Data:");

  console.log(data);
  return (
    <div className="h-full">
      <Card className="h-full overflow-hidden">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-end gap-1">
                  <h1 className="text-2xl tracking-tighter font-bold">
                    {locationName?.name}
                  </h1>
                  {locationName?.state && (
                    <span className="text-muted-foreground">
                      ,{locationName.state}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {locationName?.country}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-7xl font-bold tracking-tighter">
                  {formalTemp(data.main.temp)}
                </p>
                <div className="space-y-1 ">
                  <p className="text-muted-foreground text-sm font-medium">
                    Feels like {formalTemp(data.main.feels_like)}
                  </p>
                  <div className="flex gap-2 text-sm font-medium">
                    <span className="flex items-center gap-1 text-blue-500">
                      <ArrowDown className="h-3 w-3" />
                      {formalTemp(data.main.temp_min)}
                    </span>
                    <span className="flex items-center gap-1 text-blue-500">
                      <ArrowUp className="h-3 w-3" />
                      {formalTemp(data.main.temp_max)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Humidity</p>
                    <p className="text-sm text-muted-foreground">
                      {data.main.humidity}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Wind</p>
                    <p className="text-sm text-muted-foreground">
                      {data.wind.speed} m/s
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col">
              <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
                <img
                  className="h-full w-full object-contain"
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                />
                <div className="absolute bottom-0 text-center">
                  <p className="text-sm font-medium capitalize">
                    {data.weather[0].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
