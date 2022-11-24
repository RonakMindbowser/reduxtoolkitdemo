import { Box, Grid, Toolbar, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import AddNewBook from '../../components/addNewBook'
import AppHeader from '../../components/appHeader'
import BookList from '../../components/bookList'

function Dashboard() {

    return (
        <Box sx={{
            minHeight: "100vh",
        }}
        >
            <AppHeader />
            <Toolbar />
            <Stack sx={{
                display: "flex",
                // alignItems: "center",
                width: '100%',
            }}>
                <Grid container >
                    <Grid xl={3} lg={3} md={6} sm={12} xs={12} sx={{
                        // backgroundColor: "red"
                    }}>
                        <AddNewBook />
                    </Grid>
                    <Grid xl={9} lg={9} md={6} xs={12} sm={12} sx={{
                        // backgroundColor: "red"
                    }}>
                        <BookList />
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    )
}

export default Dashboard