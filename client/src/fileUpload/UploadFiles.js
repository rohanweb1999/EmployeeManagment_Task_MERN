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
// import Checkbox from '@mui/material/Checkbox';
import Checkbox from './Checkbox'
toast.configure()


const UploadFiles = () => {

    /////////////*****UseState start********//////////////////////////// */
    const [files, setFiles] = useState('')
    const [pageNumber, setpageNumber] = useState(1)
    const [selectedAssest, setselectedAssest] = useState(0)
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [limit, setLimit] = useState(5)



    /////////////*****UseState end********//////////////////////////// */


    /////////////*****useSelector start********//////////////////////////// */
    const loader = useSelector(state => state.employeeReducer.loader)
    const usersFiles = useSelector(state => state.employeeReducer.usersFiles)
    const pageNumberForFiles = useSelector(state => state.employeeReducer.pageNumberForFiles)
    const deleteFileToggle = useSelector(state => state.employeeReducer.deleteFileToggle)
    /////////////*****useSelector end********//////////////////////////// */

    console.log("usersFiles", usersFiles);

    const dispatch = useDispatch();


    useEffect(() => {
        setIsCheckAll(false);
        setselectedAssest(0)
        dispatch(fetchFilesUsers(pageNumber, limit))
    }, [loader, pageNumber, deleteFileToggle, limit])


    const handleSubmit = (e) => {
        if (files === "") {
            e.preventDefault();
            toast.error("Please Choose File", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        }
        else {

            e.preventDefault();
            dispatch(loaderToggle())
            const formData = new FormData();
            for (let i = 0; i < 10; i++) {
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
        console.log(isCheck.length);
        if (isCheck.length === 0) {
            toast.error("Choose atleast 1 or more Files", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        } else {
            dispatch(DeleteMulti_File(isCheck))
        }
    }

    const handleChangeFile = (e) => {

        setFiles({ ...files, ...e.target.files })
    }

    const handleSelectAll = (e) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(usersFiles[0].getFiles.map((li) => li._id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClick = (e) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        setIsCheckAll(false);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id));
        }
    };
    const handleLimitChange = (e) => {
        setLimit(e.target.value)
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
                                <div className="SelectAll">
                                    <Checkbox
                                        type="checkbox"
                                        name="selectAll"
                                        id="selectAll"
                                        handleClick={handleSelectAll}
                                        isChecked={isCheckAll}
                                    />
                                    Select All
                                </div>


                            </div>
                            {
                                isCheck.length !== 0 ? <div><button onClick={() => deleteMultiFile()}>Delete Select File</button></div> : null
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
                                    <div className='showFiles' key={items._id}>
                                        <Checkbox
                                            key={items._id}
                                            type="checkbox"
                                            name={items._id}
                                            id={items._id}
                                            handleClick={handleClick}
                                            isChecked={isCheck.includes(items._id)}
                                        />
                                        {
                                            items.filename.includes('.pdf') ?
                                                <img src='https://icons.iconarchive.com/icons/graphicloads/filetype/128/pdf-icon.png' alt='pdf' id='img' />
                                                : null
                                        }
                                        {
                                            items.filename.includes('.jpeg') || items.filename.includes('.jpg') ?
                                                <img src={items.filepath} alt='txt' id='img' />
                                                : null
                                        }
                                        {
                                            items.filename.includes('.doc') ?
                                                <img src='https://freeiconshop.com/wp-content/uploads/edd/doc-flat.png' alt='doc' id='img' />
                                                : null
                                        }
                                        {
                                            items.filename.includes('.png') ?
                                                <img src={items.filepath} alt='png' id='img' />
                                                : null

                                        }
                                        {
                                            items.filename.includes('.txt') ?
                                                <img src='https://cdn-icons-png.flaticon.com/128/3022/3022305.png' alt='txt' id='img' />
                                                : null
                                        }
                                        {
                                            items.filename.includes('.xml') ?
                                                <img src='https://w7.pngwing.com/pngs/47/832/png-transparent-microsoft-excel-computer-icons-spreadsheet-txt-file-miscellaneous-angle-text.png' alt='xml' id='img' />
                                                : null
                                        }
                                        {items.filename.includes('.gif') ? <img src={items.filepath} alt='xml' id='img' /> : null}

                                        <b>{items.filename}</b>

                                        <div>
                                            <Button
                                                variant="outlined"
                                                startIcon={<DeleteIcon />} onClick={() => handleDelete(items._id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }

                </div>
                <div className="pagination" >
                    <div>Files per page
                        <select onChange={(e) => handleLimitChange(e)}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>

                        </select>
                    </div>
                    <Pagination count={pageNumberForFiles} variant="outlined" shape="rounded" onChange={(e, value) => {
                        setpageNumber(value)
                    }} />

                </div>
            </div>

        </>
    )
};

export default UploadFiles;
