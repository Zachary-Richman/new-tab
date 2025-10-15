'use client'
import {useEffect, useState} from "react";

const fetch_url = "https://api.weather.gov/stations/KGSP/observations/latest";
import { CiTempHigh } from "react-icons/ci";


export const fetch_data = async () =>{ // TODO: change the any
    const resp = await fetch(fetch_url);
    const json = await resp.json();

    if (!resp || !json){
        console.log(`Error: ${resp}   :   ${json}`) // this is really fucked up but im tired
        return false
    }

    return json;
}

export const parse_data = (data) =>{
    const cleaned = data["properties"];
    console.log(cleaned);
    return cleaned;
}

const celsius_to_farenheit = (c: number): number => (c * (9/5)) + 32;

export function WeatherDisplay(){
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const r = await fetch_data();
            const parsed = parse_data(r);
            setData(parsed);
        };
        fetchData().then(r => r);
    }, []);

    return (
        <div>

            <div style={{
                color: "#fff"
            }}>
                {console.log("New: " + data)}

                <span><CiTempHigh />{celsius_to_farenheit(data['temperature']['value'])}</span>


            </div>
        </div>
    )
}