import React, { useEffect, useState } from 'react'
import SMinputs from '../components/inputs'
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Tempapp() {

    const [city, setCity] = useState(null)
    const [search, setSearch] = useState("Dubai")
    const [time, setTime] = useState("")

    useEffect(() => {
        const dataHandle = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=d65d9c81a62b5a0de09d58e26bc47d43`
            const response = await fetch(url)
            const resJso = await response.json();
            setCity(resJso.main)
        }
        const daymethod = () => {

            let current = new Date()


            let weekDay = new Array(7);
            weekDay[0] = "Sunday"
            weekDay[1] = "Monday"
            weekDay[2] = "Tuesday"
            weekDay[3] = "Wednesday"
            weekDay[4] = "Thusday"
            weekDay[5] = "Friday"
            weekDay[6] = "Saturday"

            console.log(weekDay[current.getDay()]);
            var months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "June",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec"
            ]
            var now = new Date()
            var month = months[now.getMonth() + 1]
            var date = now.getDate()

            let hour = now.getHours()
            let mins = now.getMinutes()
            let perios = "AM"
            if (hour > 11) {
                perios = "PM"
                if (hour > 12) hour -= 12
            }
            if (mins < 10) {
                mins = "0" + mins
            }
            console.log(hour);


            setTime(weekDay[current.getDay()] + " " + "|" + month + " " + date + "" + "|" + " " + hour + ":" + mins + " " + perios)


        }
        daymethod()
        dataHandle();
    }, [search])

    return (
        <>
            <div id='mainDiv'>

                <div id="searchInput" >
                    <SMinputs type="search" placeholder="Country Name" id="searchinput" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                </div>
                {!city ? (
                    <p>No City Found</p>
                ) : (
                    <>
                        <div>
                            <h3 className='fontfamily'><LocationOnIcon id="logo" /> {search}</h3>
                            <h3 className='fontfamily'>{time}</h3>
                            <h3 className='fontfamily'>{city.temp} °C</h3>
                            <h4 className='fontfamily'>Min : {city.temp_min} °C | Max : {city.temp_max} °C</h4>
                        </div>
                    </>
                )
                }

            </div>
        </>
    )
}
