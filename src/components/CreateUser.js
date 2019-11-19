 
import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {

    const [username, setUsername] = useState('');
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
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={_onFileChange}
                    />
                    {previewImg && <img src={previewImg} width="100" height="100" />}
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
      </div>
    )

    function onSubmit(e) {
        e.preventDefault();

        // imbes na plain na Object tak isend, gin gamit ko formData
        // para madali pag basa ha backend
        // basaha adi - https://javascript.info/formdata
        const formData = new FormData();
        formData.append('username', username);
        formData.append('avatar', selectedFile);
        
        axios.post('http://localhost:5000/users/add', formData, {
            // need ini para upload, headers it tawag
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => console.log(res.data));

        setUsername('');
    }

}
export default CreateUser;