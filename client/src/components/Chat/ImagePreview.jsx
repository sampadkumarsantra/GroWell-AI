function ImagePreview({ image }) {
    if (!image) return null;

    return (
        <div className="chat-image-preview">
            <img src={image} alt="Crop Preview" />

            <button className="analyze-image-btn">
                Analyze Crop
            </button>
        </div>
    );
}

export default ImagePreview;