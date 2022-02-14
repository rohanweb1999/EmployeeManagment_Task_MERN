import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteFiles, fetchFilesUsers, fileUpload, loaderToggle } from '../actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

toast.configure()


const UploadFiles = () => {

    const [files, setFiles] = useState('')
    const [pageNumber, setpageNumber] = useState(1)




    // const loginAuthenticateUser = useSelector(state => state.employeeReducer.loginAuthenticateUser)
    const loader = useSelector(state => state.employeeReducer.loader)
    const usersFiles = useSelector(state => state.employeeReducer.usersFiles)
    const pageNumberForFiles = useSelector(state => state.employeeReducer.pageNumberForFiles)
    console.log(usersFiles);

    useEffect(() => {

    }, [])


    // const { Files } = loginAuthenticateUser
    const dispatch = useDispatch();
    // const history = useHistory()


    useEffect(() => {
        dispatch(fetchFilesUsers(pageNumber))
    }, [loader, pageNumber])


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
            e.target.reset()
            setFiles('')
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
                {
                    loader ? (
                        <>
                            <div>
                                <Segment>
                                    <Dimmer active inverted>
                                        <Loader size='medium'>Loading</Loader>
                                    </Dimmer>

                                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                                </Segment>
                            </div>
                        </>) : (


                        <div className='mainWrapper'>
                            <form onSubmit={handleSubmit}>
                                <input type='file' disabled={loader} name='files' onChange={(e) => setFiles({ ...files, ...e.target.files })} multiple></input>

                                <button type='submit' disabled={loader}>UPLOAD</button>
                            </form>
                        </div>

                    )
                }

                <div className='wrapepr'>
                    <h1>Uploaded Files</h1>
                </div>
                <div className='mainContainor'>
                    {
                        usersFiles[0] && usersFiles[0].getFiles.length > 0 && usersFiles[0].getFiles.map((items) => {
                            return (
                                <>
                                    {
                                        items.filename.includes('.pdf') ?
                                            (<div className='showFiles'>
                                                <img src='https://icons.iconarchive.com/icons/graphicloads/filetype/128/pdf-icon.png' alt='pdf' id='img' />
                                                <b>{items.filename}</b>

                                                <div> <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => dispatch(deleteFiles(items._id))}>
                                                    Delete
                                                </Button></div></div>)
                                            : null

                                    }
                                    {
                                        items.filename.includes('.jpeg') || items.filename.includes('.jpg') ?
                                            (<div className='showFiles'>
                                                <img src={items.filepath} alt='txt' id='img' />
                                                <b>{items.filename}</b>
                                                <div><Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => dispatch(deleteFiles(items._id))}>
                                                    Delete
                                                </Button></div></div>)
                                            : null

                                    }
                                    {
                                        items.filename.includes('.doc') ?
                                            (<div className='showFiles'>
                                                <img src='https://freeiconshop.com/wp-content/uploads/edd/doc-flat.png' alt='txt' id='img' />
                                                <b>{items.filename}</b>

                                                <div><Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => dispatch(deleteFiles(items._id))}>
                                                    Delete
                                                </Button></div></div>)
                                            : null

                                    }
                                </>
                            )
                        })
                    }

                </div>
                <div className="pagination" >
                    <Pagination count={pageNumberForFiles} variant="outlined" shape="rounded" onChange={(e, value) => {
                        setpageNumber(value)
                    }} />

                </div>
            </div>

        </>
    )
};

export default UploadFiles;
