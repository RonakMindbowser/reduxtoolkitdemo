import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewBook, getAllBooks } from '../../redux/slices/bookSlice';
import { showCustomToast, toastType } from '../../utils/helpers';

function AddNewBook() {
    const [bookName, setBookName] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const dispatch = useDispatch();
    const bookState = useSelector((state) => state.book)
    console.log('Book State::', bookState);

    const onClickAddBook = () => {
        if (bookName.trim() == "") {
            showCustomToast("Book name is required", toastType.e)
            return
        }
        else if (authorName.trim() == "") {
            showCustomToast("AuthorName name is required", toastType.e)
            return
        }
        else if (description.trim() == "") {
            showCustomToast("Description is required", toastType.e)
            return
        }
        else if (price.trim() == "") {
            showCustomToast("Price is required", toastType.e)
            return
        }
        else {
            const params = {
                bookName, authorName, description, price
            }
            dispatch(addNewBook(params)).unwrap()
                .then((originalPromiseResult) => {
                    console.log("originalPromiseResult:", originalPromiseResult);
                    clearState()
                    dispatch(getAllBooks())
                })
                .catch((rejectedValueOrSerializedError) => {
                    console.log("originalPromiseResult:", rejectedValueOrSerializedError);
                })
        }
    }

    const clearState = () => {
        setAuthorName("")
        setDescription("")
        setBookName("")
        setPrice("")
    }

    return (
        <Box sx={{
            backgroundColor: 'white',
            m: 4,
            display: "flex",
            p: 4,
            // alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            flexDirection: "column",
            // color:"lightgrey",
            boxShadow: '1px 1px 1px 9px rgba(0, 0, 0, 0.1)',
            // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        }}>
            <Typography
                variant='h5'
                sx={{
                    // color: "white"
                    alignSelf: "center",
                }}
            >{"Add a New Book"}</Typography>

            <FormControl>
                <TextField
                    variant='outlined'
                    label={'Book Name'}
                    placeholder={'Enter book name'}
                    sx={{ mt: 4 }}
                    fullWidth
                    type={'text'}
                    value={bookName}
                    onChange={(event) => setBookName(event.target.value)}
                />
                <TextField
                    variant='outlined'
                    label={'Author Name'}
                    placeholder={'Enter author name'}
                    sx={{ mt: 4 }}
                    fullWidth
                    type={'text'}
                    value={authorName}
                    onChange={(event) => setAuthorName(event.target.value)}
                />
                <TextField
                    variant='outlined'
                    label={'Description'}
                    placeholder={'Enter description'}
                    sx={{ mt: 4 }}
                    multiline
                    rows={4}
                    fullWidth
                    type={'text'}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <TextField
                    variant='outlined'
                    label={'Price'}
                    placeholder={'Enter price'}
                    sx={{ mt: 4 }}
                    fullWidth
                    type={'text'}
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                />
                <Button sx={{
                    backgroundColor: 'hsl(218, 81%, 75%)',
                    color: "white",
                    mt: 5
                }}
                    disableRipple
                    disableTouchRipple
                    disableElevation
                    variant='contained'
                    onClick={onClickAddBook}
                >
                    {"Add"}
                </Button>
            </FormControl>
        </Box>
    )
}

export default AddNewBook