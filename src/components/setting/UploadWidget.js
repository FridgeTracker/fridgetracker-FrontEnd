import { useEffect,useRef } from "react";
import "./setting.css";

const apiCLOUD = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const apiPRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const UploadWidget = ({updateProfile}) => {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();


    useEffect(() => {

        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: apiCLOUD, 
            uploadPreset: apiPRESET
          }, function (error, result) { 
              if (!error && result && result.event === "success") {
               
                updateProfile(result.info)
            } 
          }
          );
    }, [updateProfile])



    return (
      <p id="uploadImageButton" onClick={() => widgetRef.current.open()}>
        Upload
      </p>
    )

}

export default UploadWidget;