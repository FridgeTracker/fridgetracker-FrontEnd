import { useEffect,useRef } from "react";

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
               
                updateProfile(result.info.url)
            } 
          }
          );
    }, [updateProfile])



    return (
      <p onClick={() => widgetRef.current.open()}>
        Upload
      </p>
    )

}

export default UploadWidget;