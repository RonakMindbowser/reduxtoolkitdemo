import React from 'react'
import { Box, Grid, Toolbar, } from '@mui/material'
import { Stack } from '@mui/system'
import AddNewBook from '../../components/addNewBook'
import AppHeader from '../../components/appHeader'
import BookList from '../../components/bookList'

function Dashboard() {
    return (
        <Box sx={{
            minHeight: "100vh",
            backgroundImage: "linear-gradient(-225deg, #D4FFEC 0%, #57F2CC 48%, #4596FB 100%);"
        }}
        >
            <AppHeader />
            <Toolbar />
            <Stack sx={{
                display: "flex",
                width: '100%',
            }}>
                <Grid container >
                    <Grid xl={3} lg={3} md={6} sm={12} xs={12} sx={{}}>
                        <AddNewBook />
                    </Grid>
                    <Grid xl={9} lg={9} md={6} xs={12} sm={12} sx={{}}>
                        <BookList />
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    )
}

export default Dashboard