import {Link} from 'react-router-dom'
import MapIcon from '@mui/icons-material/Map';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import IconButton from '@mui/material/IconButton';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import StationsData from '../weather/StationsInfo';

export default function DataTablePage () {

    return (
        <>
            <Grid2 container spacing={2} margin='0 10%'>
                <Grid2 sm={11} display='flex' justifyContent='center'>
                    <h1>Realtime Data Values</h1>
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
                <IconButton
                aria-label='to about!'
                color='success'
                >
                    <Link to='/about'>
                        <SentimentVerySatisfiedIcon />
                    </Link>
                </IconButton>
                </Grid2>
            </Grid2>
        </>
    )
}