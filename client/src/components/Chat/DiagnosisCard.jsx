function DiagnosisCard({ report }) {

    return (

        <div className="diagnosis-card">

            <div className="diagnosis-title">
                🌱 GroWell Vision
            </div>

            <div className="diagnosis-item">
                <strong>Crop</strong>
                <span>{report.crop}</span>
            </div>

            <div className="diagnosis-item">
                <strong>Disease</strong>
                <span>{report.disease}</span>
            </div>

            <div className="diagnosis-item">
                <strong>Confidence</strong>
                <span>{report.confidence}</span>
            </div>

            <div className="diagnosis-item">

                <strong>Symptoms</strong>

                <ul>

                    {report.symptoms?.map((item, index) => (

                        <li key={index}>
                            {item}
                        </li>

                    ))}

                </ul>

            </div>

            <div className="diagnosis-item">

                <strong>Recommendation</strong>

                <ul>

                    {report.recommendation?.map((item, index) => (

                        <li key={index}>
                            {item}
                        </li>

                    ))}

                </ul>

            </div>

        </div>

    );

}

export default DiagnosisCard;