import React from "react";
import "./ImageInput.scss";
import uploadLogo from "../../../img/uploadLogo.png";

export type ImageInputProps = {
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl: string;
};

const ImageInput: React.FC<ImageInputProps> = ({
  type,
  onChange,
  imageUrl,
}) => {
  return (
    <div className="image-input">
      <div className="image-input__input">
        <img src={uploadLogo} alt="upload logo" />
        <input type={type} onChange={onChange} />
      </div>
      <div className="image-input__image">
        {imageUrl && <img src={imageUrl} alt={"uploaded"} />}
      </div>
    </div>
  );
};

export default ImageInput;
