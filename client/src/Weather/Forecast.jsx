export default function Forecast({data}){


return(

<div className="glass-card forecast-card">


<h2>
📅 7 Day Forecast
</h2>


<table>


<thead>

<tr>

<th>Day</th>

<th>Temperature</th>

<th>Rain</th>

<th>Humidity</th>

</tr>

</thead>


<tbody>


{
(data || []).map((day,index)=>(
<tr key={index}>

<td>
{day.day}
</td>


<td>
{day.temp}°C
</td>


<td>
{day.rain}%
</td>


<td>
{day.humidity}%
</td>


</tr>


))
}


</tbody>


</table>


</div>

)

}