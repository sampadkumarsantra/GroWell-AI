export default function DiseaseRisk({weather}){


let risk="Low";
let message="Weather conditions are safe.";


if(weather.humidity>85){

risk="High";

message=
"High humidity may increase fungal disease risk.";

}


else if(weather.temperature>35){

risk="Medium";

message=
"Heat stress conditions detected.";

}



return(

<div className="glass-card">


<h2>
🍄 Disease Intelligence
</h2>


<h1>
Risk: {risk}
</h1>


<p>
{message}
</p>


</div>

)

}