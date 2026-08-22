export default function IrrigationAdvice({forecast}){


const rainTomorrow =
forecast[1]?.rain || 0;


return(

<div className="glass-card">


<h2>
💧 Irrigation Advice
</h2>


{

rainTomorrow>50

?

<p>
🌧 Rain expected soon. Delay irrigation.
</p>


:

<p>
💦 Soil moisture may reduce. Plan irrigation.
</p>


}


</div>


)


}