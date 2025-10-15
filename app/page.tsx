import Clock from "@/app/components/time/clock";
import {fetch_data, parse_data, WeatherDisplay} from "@/app/components/weather"


export default function Home(){
  return (
      <div>
      <WeatherDisplay />

      <Clock />
      </div>
  )
}
