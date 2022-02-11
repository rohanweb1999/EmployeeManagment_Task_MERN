import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchFilesUsers, fileUpload, loaderToggle } from '../actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
toast.configure()


const UploadFiles = () => {

    const [files, setFiles] = useState('')
    const loginAuthenticateUser = useSelector(state => state.employeeReducer.loginAuthenticateUser)
    const loader = useSelector(state => state.employeeReducer.loader)


    // console.log("loader", loader);

    const { Files } = loginAuthenticateUser
    console.log(files, "files");
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchFilesUsers())
    }, [])


    const handleSubmit = (e) => {
        if (files === "") {
            e.preventDefault();
            toast.error("Please Choose File", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        }
        else {
            e.preventDefault();
            dispatch(loaderToggle())
            const formData = new FormData();
            for (let i = 0; i < 5; i++) {
                formData.append('multi-files', files[i]);
            }
            dispatch(fileUpload(formData))
        }
    }


    return (
        <>
            <div>
                {
                    loader ? (<> <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box></>) : null
                }
                <div className='mainWrapper'>
                    <form onSubmit={handleSubmit}>
                        <input type='file' name='files' onChange={(e) => setFiles({ ...files, ...e.target.files })} multiple></input>

                        <button type='submit' disabled={loader}>UPLOAD</button>
                    </form>
                </div>
                <div className='wrapepr'>
                    <h1>Uploaded Files</h1>
                </div>
                <div>
                    {
                        Files && Files.map((items) => {
                            return (
                                <div className='showFiles'>
                                    <img src='https://static.vecteezy.com/system/resources/previews/003/399/487/non_2x/modern-flat-design-of-txt-file-icon-for-web-free-vector.jpg' alt='txt' />
                                    {items.filename}
                                    <div><button >DELETE</button></div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>

        </>
    )
};

export default UploadFiles;
