import Clock from "@/app/components/time/clock";
import {WeatherDisplay} from "@/app/components/weather"


export default function Home(){
  return (
      <div>
      <WeatherDisplay />

      <Clock />
      </div>
  )
}
