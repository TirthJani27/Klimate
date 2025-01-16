import { WeatherData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";
import { Sunrise, Compass, Gauge, Sunset } from "lucide-react";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, sys } = data;

  const formateTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const details = [
    {
      title: "Sunrise",
      value: formateTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formateTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Pressure",
      value: `${data.main.pressure} hPa`,
      icon: Gauge,
      color: "text-green-500",
    },
    {
      title: "Wind",
      value: `${wind.deg}`,
      icon: Compass,
      color: "text-purple-500",
    },
  ];
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Weather Details</CardTitle>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 mt-4">
              {details.map((detail) => (
                <div
                  key={detail.title}
                  className="flex items-center gap-3 rounded-lg border p-4"
                >
                  <detail.icon className={`h-5 w-5 ${detail.color}`} />
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {detail.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {detail.value}
                    </p>
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

export default WeatherDetails;
