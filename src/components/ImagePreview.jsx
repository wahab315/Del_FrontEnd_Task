import React from "react";

const ImagePreview = (props) => {
  return (
    <div className="preview_image">
      {props.images.map((pic, index) => (
        <img src={pic} key={index} alt="previews" />
      ))}
    </div>
  );
};

export default ImagePreview;
