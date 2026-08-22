function CropPreview({
    image,
    onAnalyze,
    onRemove,
    isAnalyzing = false
}) {

    if (!image) return null;


    return (

        <div className="chat-image-preview">


            <div className="crop-image-container">

                <img
                    src={image}
                    alt="Uploaded crop"
                />

            </div>



            <div className="crop-preview-actions">


                <button

                    className="analyze-image-btn"

                    onClick={onAnalyze}

                    disabled={isAnalyzing}

                >

                    {
                        isAnalyzing
                            ? "⏳ GroWell Vision is analyzing..."
                            : "🌿 Analyze Crop"
                    }


                </button>



                <button

                    className="remove-image-btn"

                    onClick={onRemove}

                    disabled={isAnalyzing}

                >

                    ✖ Remove

                </button>


            </div>


        </div>

    );

}


export default CropPreview;