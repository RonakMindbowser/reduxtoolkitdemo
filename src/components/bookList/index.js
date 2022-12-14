
import { Box, Card, CardActions, CardContent, Grid, Paper, Typography, Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook, editBook, getAllBooks } from '../../redux/slices/bookSlice';
import EditBook from '../editBook';

function BookList() {

    const [bookList, setBookList] = useState([]);
    const dispatch = useDispatch();
    const bookState = useSelector((state) => state.book);
    console.log("Book state::", bookState);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [selectedBookData, setSelectedBookData] = useState(null)

    useEffect(() => {
        dispatch(getAllBooks())
    }, [])

    useEffect(() => {
        setBookList(bookState?.bookList)
    }, [bookState?.bookList])

    const onUpdateBook = (data) => {
        console.log("Book Data need to update :", data);
        setShowEditModal(false)
        dispatch(editBook(data)).unwrap()
            .then((originalPromiseResult) => {
                console.log("originalPromiseResult:", originalPromiseResult);
                let list = bookList;
                list = list.map((obj) => obj.id == data.id ? data : obj)
                setBookList(list)
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log("originalPromiseResult:", rejectedValueOrSerializedError);
            })
    }

    const onClickDelete = (data) => {
        dispatch(deleteBook(data)).unwrap()
            .then((originalPromiseResult) => {
                console.log("originalPromiseResult:", originalPromiseResult);
                let list = bookList;
                list = list.filter((obj) => obj.id != data.id)
                setBookList(list)
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log("originalPromiseResult:", rejectedValueOrSerializedError);
            })
    }

    return (
        <Box sx={{
            backgroundColor: 'white',
            m: 4,
            mt: 6,
            display: "flex",
            p: 4,
            // alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            flexDirection: "column",
            // color:"lightgrey",
            // boxShadow: '1px 1px 1px 9px rgba(0, 0, 0, 0.1)',
            backgroundImage: "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);",
            // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        }}>
            <Typography
                variant='h4'
                sx={{
                    alignSelf: "center",
                    fontFamily: "cursive",
                    color: "navy",
                    fontWeight: "bold"
                }}
            >{"Collection Of Books"}</Typography>
            <Grid container sx={{ mt: 5, }} spacing={2} >
                {
                    bookList.length ? bookList.map((obj) => {
                        return (
                            <Grid item xl={4} lg={4} md={6} xs={12} sm={12} >
                                <Card variant='elevation' component={Paper} elevation={12} sx={{
                                    height: "300px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    borderRadius: '10px',
                                    backgroundImage: "linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);"
                                }}>
                                    <CardContent sx={{}}>
                                        <Typography
                                            variant='h5'
                                            sx={{
                                                color: "black",
                                                color: "white",
                                                fontWeight: "bold",
                                                fontFamily: "monospace"
                                            }}
                                        >{obj.bookName}</Typography>
                                        <Typography
                                            variant='subtitle1'
                                            sx={{
                                                color: "black",
                                                color: "white",
                                                fontWeight: "600",
                                                fontFamily: "revert",
                                                mt: 2
                                            }}
                                        >{obj.authorName}</Typography>
                                        <Typography
                                            variant='body1'
                                            sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                color: "maroon",
                                                WebkitLineClamp: 2,
                                                fontFamily: "monospace",
                                                mt: 1
                                            }}
                                        >{obj.description}</Typography>
                                        <Typography
                                            variant='caption'
                                            sx={{
                                                fontFamily: "monospace",
                                                color: "blueviolet",
                                                fontSize: '15px',
                                                fontWeight: "bold"
                                            }}
                                        >{obj.price} Rs.</Typography>
                                    </CardContent>
                                    <CardActions sx={{}}>
                                        <Button sx={{ fontWeight: "bold" }}
                                            onClick={() => {
                                                setSelectedBookData(obj)
                                                setShowEditModal(true)
                                            }}
                                        >{"Edit"}</Button>
                                        <Button sx={{ fontWeight: "bold" }}
                                            onClick={() => onClickDelete(obj)}
                                        >{"Delete"}</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })
                        :
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 1,
                        }}>
                            <CircularProgress size={"60px"}
                                sx={{
                                    color: 'black',
                                }} />
                        </Box>
                }
            </Grid>
            <EditBook
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                bookData={selectedBookData}
                onUpdate={onUpdateBook}
            />
        </Box>
    )
}

export default BookList