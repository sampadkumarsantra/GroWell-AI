export default function CurrentWeather({data,location}){


return(

<div className="glass-card current-card">


<h2>
📍 {location}
</h2>


<h1>
{data.temperature}°C
</h1>


<p>
💧 Humidity: {data.humidity}%
</p>


<p>
💨 Wind: {data.wind} km/h
</p>


</div>

)


}