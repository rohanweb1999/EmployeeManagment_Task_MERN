import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteFiles, DeleteMulti_File, fetchFilesUsers, fileUpload, loaderToggle } from '../actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { DELETE_TOGGLE_FILES } from '../actions/Type';

toast.configure()


const UploadFiles = () => {

    /////////////*****UseState start********//////////////////////////// */
    const [files, setFiles] = useState('')
    const [pageNumber, setpageNumber] = useState(1)
    const [multipleChecked, setmultipleChecked] = useState([])
    const [selectedAssest, setselectedAssest] = useState(0)
    const [unSupportedFiles, setunSupportedFiles] = useState([])
    /////////////*****UseState end********//////////////////////////// */


    /////////////*****useSelector start********//////////////////////////// */
    const loader = useSelector(state => state.employeeReducer.loader)
    const usersFiles = useSelector(state => state.employeeReducer.usersFiles)
    const pageNumberForFiles = useSelector(state => state.employeeReducer.pageNumberForFiles)
    const deleteFileToggle = useSelector(state => state.employeeReducer.deleteFileToggle)
    /////////////*****useSelector end********//////////////////////////// */

    console.log("multipleChecked", multipleChecked);

    const dispatch = useDispatch();


    useEffect(() => {
        setmultipleChecked([])
        setselectedAssest(0)
        dispatch(fetchFilesUsers(pageNumber))
    }, [loader, pageNumber, deleteFileToggle])


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
    const handleDelete = (id) => {
        dispatch(deleteFiles(id))
    }
    const deleteMultiFile = (e) => {
        console.log(multipleChecked.length);
        if (multipleChecked.length === 0) {
            toast.error("Choose atleast 1 or more Files", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        } else {
            dispatch(DeleteMulti_File(multipleChecked))
        }
    }
    const checkbocTickButton = (id) => {
        // setmultipleChecked([...multipleChecked, e.target.value])
        console.log(multipleChecked.includes(id));
        if (multipleChecked.includes(id)) {
            const checkedmyArray = multipleChecked.filter((i) => {
                return i !== id;
            });
            setmultipleChecked(checkedmyArray);
            setselectedAssest(selectedAssest - 1)

        }
        else {
            setmultipleChecked([...multipleChecked, id]);
            setselectedAssest(selectedAssest + 1)
        }
    }
    const handleChangeFile = (e) => {

        setFiles({ ...files, ...e.target.files })
    }
    return (
        <>
            <div>
                {
                    loader ?
                        (
                            <>
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgress />
                                </Box>
                            </>
                        ) : null
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

                        <>
                            {

                                selectedAssest === 0 ? null : <h1>{`${selectedAssest} File selected.`}</h1>
                            }
                            <div className='mainWrapper'>


                                <form onSubmit={handleSubmit}>
                                    <input type='file' disabled={loader} name='files' onChange={(e) => handleChangeFile(e)} multiple></input>

                                    <button type='submit' disabled={loader}>UPLOAD</button>
                                </form>
                            </div>
                            {
                                selectedAssest === 0 ? null : (<div>
                                    <button onClick={() => deleteMultiFile()}>Delete Select File</button>

                                </div>)
                            }

                        </>




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
                                                <input type="checkbox" className="checkbox" onChange={() => checkbocTickButton(items._id)}></input>
                                                <img src='https://icons.iconarchive.com/icons/graphicloads/filetype/128/pdf-icon.png' alt='pdf' id='img' />
                                                <b>{items.filename}</b>

                                                <div> <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(items._id)}>
                                                    Delete
                                                </Button></div></div>)
                                            : null

                                    }
                                    {
                                        items.filename.includes('.jpeg') || items.filename.includes('.jpg') ?
                                            (<div className='showFiles'>
                                                <input type="checkbox" className="checkbox" onChange={() => checkbocTickButton(items._id)}></input>

                                                <img src={items.filepath} alt='txt' id='img' />
                                                <b>{items.filename}</b>
                                                <div><Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(items._id)}>
                                                    Delete
                                                </Button></div></div>)
                                            : null

                                    }
                                    {
                                        items.filename.includes('.doc') ?
                                            (<div className='showFiles'>
                                                <input type="checkbox" className="checkbox" onChange={() => checkbocTickButton(items._id)}></input>

                                                <img src='https://freeiconshop.com/wp-content/uploads/edd/doc-flat.png' alt='doc' id='img' />
                                                <b>{items.filename}</b>

                                                <div><Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(items._id)}>
                                                    Delete
                                                </Button></div></div>)
                                            : null
                                    }
                                    {
                                        items.filename.includes('.png') ?
                                            (<div className='showFiles'>
                                                <input type="checkbox" className="checkbox" onChange={() => checkbocTickButton(items._id)} ></input>

                                                <img src={items.filepath} alt='png' id='img' />
                                                <b>{items.filename}</b>

                                                <div><Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(items._id)}>
                                                    Delete
                                                </Button></div></div>)
                                            : null

                                    }
                                    {
                                        items.filename.includes('.txt') ?
                                            (<div className='showFiles'>
                                                <input type="checkbox" className="checkbox" onChange={() => checkbocTickButton(items._id)} ></input>

                                                <img src='https://cdn-icons-png.flaticon.com/128/3022/3022305.png' alt='txt' id='img' />
                                                <b>{items.filename}</b>

                                                <div><Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(items._id)}>
                                                    Delete
                                                </Button></div></div>)
                                            : null
                                    }
                                    {
                                        items.filename.includes('.xml') ?
                                            (<div className='showFiles'>
                                                <input type="checkbox" className="checkbox" onChange={() => checkbocTickButton(items._id)}></input>

                                                <img src='https://w7.pngwing.com/pngs/47/832/png-transparent-microsoft-excel-computer-icons-spreadsheet-txt-file-miscellaneous-angle-text.png' alt='xml' id='img' />
                                                <b>{items.filename}</b>

                                                <div><Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(items._id)}>
                                                    Delete
                                                </Button></div></div>)
                                            : null
                                    }
                                    {
                                        items.filename.includes('.gif') ?
                                            (<div className='showFiles'>
                                                <input type="checkbox" className="checkbox" onChange={() => checkbocTickButton(items._id)}></input>

                                                <img src={items.filepath} alt='xml' id='img' />
                                                <b>{items.filename}</b>

                                                <div><Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(items._id)}>
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
