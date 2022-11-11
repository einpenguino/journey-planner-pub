import * as React from 'react';
import {Link} from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MapIcon from '@mui/icons-material/Map';
import IconButton from '@mui/material/IconButton';
import TableRowsIcon from '@mui/icons-material/TableRows';

import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10),
  }));

export default function AboutPage () {
    return (
        <>
            <Grid2 container spacing={2} margin='0 10%'>
                <Grid2 sm={11} display='flex' justifyContent='center'>
                </Grid2>
                <Grid2 sm={1} display='flex' justifyContent='right'>
                <IconButton
                aria-label='back-to-maps!'
                color='success'
                >
                    <Link to='/'>
                        <MapIcon />
                    </Link>
                </IconButton>
                {/* <IconButton
                aria-label='to data table!'
                color='success'
                >
                    <Link to='/datatable'>
                        <TableRowsIcon />
                    </Link>
                </IconButton> */}
                </Grid2>
            </Grid2>
            <Box 
            sx={
                { 
                    width: '100%', 
                    maxWidth: 500,
                    padding: '0 30%',
                    margin:'auto'
                }
                }>
                <Typography variant='h3' gutterBottom>
                    Hello!
                </Typography>
                <Typography variant='button' gutterBottom>
                    Welcome to this passion project to bring together convenient routing and weather analysis!
                    This is a work in progress that gets data from data@gov.sg, and routing services from google maps!
                </Typography>
            </Box>
        </>
    )
}