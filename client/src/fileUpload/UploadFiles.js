import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { fileUpload } from '../actions';


const UploadFiles = () => {
    const [files, setFiles] = useState()
    const dispatch = useDispatch();

    const onChangeFileHandler = (e) => {
        setFiles(e.target.files[0])

    }
    console.log(files);
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('files', files);
        formData.append('fileName', files.name);

        dispatch(fileUpload(formData))
    }
    return (
        <>
            <div>
                <div className='mainWrapper'>
                    <form onSubmit={handleSubmit}>
                        <input type='file' name='files' onChange={(e) => onChangeFileHandler(e)}></input>
                        <button type='submit' >SUBMIT</button>
                    </form>
                </div>
                <div className='wrapepr'>
                    <h1>Uploaded Files</h1>
                </div>
            </div>

        </>
    )
};

export default UploadFiles;
