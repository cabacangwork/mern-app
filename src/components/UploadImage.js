import React, { useState } from 'react';

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState(); // file info
    const [previewImg, setPreviewImg] = useState(); // base64 img

    const _onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);

        // use FileReader api constructor from HTML5
        let reader = new FileReader();

        // listen
        reader.onloadend = () => {
            setPreviewImg(reader.result);
        };

        // start reading as URL
        reader.readAsDataURL(event.target.files[0]);
    };

    return (
        <React.Fragment>
            <input
                type="file"
                accept="image/*"
                onChange={_onFileChange}
            />
            {previewImg && <img src={previewImg} width="100" height="100" />}
        </React.Fragment>
    );
};

export default UploadImage;
