import React, { useState } from 'react';

const UploadFiles = () => {
    const [files, setFiles] = useState([])
    console.log(files);
    const uploadFiles = () => {
        localStorage.setItem('files', files)
    }

    return (
        <>
            <div>
                <div className='mainWrapper'>
                    <input type='file' name='files' onChange={(e) => setFiles(e.target.files)}></input>
                    <button type='submit' onClick={uploadFiles}>SUBMIT</button>
                </div>
                <div className='wrapepr'>
                    <h1>Uploaded Files</h1>
                </div>
            </div>

        </>
    )
};

export default UploadFiles;
