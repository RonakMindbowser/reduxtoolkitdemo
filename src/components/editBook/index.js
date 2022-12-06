import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import theme from '../../constants/theme';
import CloseIcon from "@mui/icons-material/Close";
import { showCustomToast, toastType } from '../../utils/helpers';

function EditBook({
    isOpen,
    bookData,
    onClose,
    onUpdate,
}) {
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [bookName, setBookName] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if (bookData) {
            let { bookName, authorName, description, price } = bookData;
            setBookName(bookName)
            setAuthorName(authorName)
            setDescription(description)
            setPrice(price)
        }

    }, [JSON.stringify(bookData)])

    const onClickUpdate = () => {
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
                bookName, authorName, description, price,
                id: bookData?.id
            }
            onUpdate(params)
        }
    }

    return (
        <Dialog
            fullScreen={fullScreen}
            open={isOpen}
            onClose={onClose}
            aria-labelledby="logout-dialog"
            fullWidth
            maxWidth="sm"
            onBackdropClick="false"
        >
            <Box sx={{ mt: 2, mb: 2 }}>
                <DialogTitle >
                    <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography
                            variant='h5'
                            sx={{
                                color: "black",
                                fontFamily: "monospace"
                            }}
                        >{'Edit Book'}</Typography>
                        <IconButton onClick={onClose}>
                            <CloseIcon
                                sx={{
                                    color: 'black',
                                    fontSize: 35,
                                }}
                            />
                        </IconButton>
                    </Grid>
                </DialogTitle>
                <DialogContent sx={{
                    display: "flex",
                    flexDirection: "column"
                }}>
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
                            onClick={onClickUpdate}
                        >
                            {"Update"}
                        </Button>
                    </FormControl>
                </DialogContent>
            </Box>
        </Dialog>
    )
}

export default EditBook