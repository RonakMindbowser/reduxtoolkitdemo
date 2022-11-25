import { Box, Button, FormControl, styled, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewBook, getAllBooks } from '../../redux/slices/bookSlice';
import { showCustomToast, toastType } from '../../utils/helpers';

const styles = theme => ({
    textField: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    },
    input: {
        color: 'white',
        border: "1px solid white",
    }
});
const useStyles = makeStyles((theme) => ({
    multilineStyle: {
        color: "white"
    }
}))

function AddNewBook() {
    const [bookName, setBookName] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const dispatch = useDispatch();
    const bookState = useSelector((state) => state.book)
    console.log('Book State::', bookState);
    const style = useStyles();

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
    let classes = styles()
    return (
        <Box sx={{
            backgroundColor: 'white',
            m: 4,
            display: "flex",
            mt: 6,
            p: 4,
            // alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            flexDirection: "column",
            // color:"lightgrey",
            // boxShadow: '1px 1px 1px 9px rgba(0, 0, 0, 0.1)',
            // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
            backgroundImage: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%);",
        }}>
            <Typography
                variant='h4'
                sx={{
                    color: "white",
                    alignSelf: "center",
                    fontFamily: "cursive",
                    fontWeight: "bold"
                }}
            >{"Add a New Book"}</Typography>

            <FormControl>
                <TextField
                    variant='outlined'
                    // label={'Book Name'}
                    placeholder={'Enter book name'}
                    hiddenLabel
                    focused
                    sx={{
                        mt: 4, color: "white", input: { color: "white" }, label: { color: "white" },
                        "& .MuiOutlinedInput-root.Mui-focused": {
                            "& > fieldset": {
                                borderColor: "white"
                            }
                        }
                    }}
                    fullWidth
                    type={'text'}
                    id="outlined-basic"
                    value={bookName}
                    InputLabelProps={{
                        style: {
                            color: "white",
                            border: "1px solid white",
                        }
                    }}
                    onChange={(event) => setBookName(event.target.value)}
                />
                <TextField
                    variant='outlined'
                    // label={'Author Name'}
                    placeholder={'Enter author name'}
                    focused
                    sx={{
                        mt: 4, color: "white", input: { color: "white" }, label: { color: "white" },
                        "& .MuiOutlinedInput-root.Mui-focused": {
                            "& > fieldset": {
                                borderColor: "white"
                            }
                        }
                    }}
                    fullWidth
                    InputLabelProps={{
                        style: {
                            color: "white"
                        }
                    }}
                    type={'text'}
                    value={authorName}
                    onChange={(event) => setAuthorName(event.target.value)}
                />
                <TextField
                    variant='outlined'
                    focused
                    // label={'Description'}
                    placeholder={'Enter description'}
                    sx={{
                        mt: 4, color: "white", input: { color: "white" }, label: { color: "white" },
                        "& .MuiOutlinedInput-root.Mui-focused": {
                            "& > fieldset": {
                                borderColor: "white"
                            }
                        }
                    }}
                    multiline
                    rows={4}
                    textareaStyle={{
                        color: "white"
                    }}
                    classes={{
                        root: style.multilineStyle,
                    }}
                    InputLabelProps={{
                        style: {
                            color: "white"
                        }
                    }}
                    InputProps={{
                        sx: {
                            color: "white",
                        },
                        classes: {
                            root: classes.input,
                            notchedOutline: classes.input,
                            focused: classes.input,
                            multiline: classes.input,
                        }
                    }}
                    fullWidth
                    type={'text'}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <TextField
                    variant='outlined'
                    focused
                    // label={'Price'}
                    placeholder={'Enter price'}
                    sx={{
                        mt: 4, color: "white", input: { color: "white" }, label: { color: "white" },
                        "& .MuiOutlinedInput-root.Mui-focused": {
                            "& > fieldset": {
                                borderColor: "white"
                            }
                        }
                    }}
                    fullWidth
                    InputLabelProps={{
                        style: {
                            color: "white"
                        }
                    }}
                    type={'text'}
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                />
                <Button sx={{
                    backgroundColor: 'white',
                    color: "hsl(218, 81%, 75%)",
                    mt: 5,
                    fontWeight: "bold"
                }}
                    disableRipple
                    disableTouchRipple
                    disableElevation
                    focusRipple={false}
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