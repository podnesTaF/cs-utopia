import React from 'react';
import {Box} from "@mui/material";

interface RoadProps {
    color: string
}

const Road: React.FC<RoadProps> = ({color}) => {


    return (
        <Box sx={{ display: 'flex', height: '20vh', mt:3, width: '70px', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{borderRadius: '50%', border: `4px solid ${color}`, bgcolor: 'white',  width: '40px', height: '40px'}}>

            </Box>
            <Box sx={{borderRadius: '50%', border: `4px solid ${color}`, bgcolor: 'white',  width: '40px', height: '40px'}}>

            </Box>
            <Box sx={{borderRadius: '50%', border: `4px solid ${color}`, bgcolor: 'white', width: '40px', height: '40px'}}>

            </Box>
        </Box>
    );
};

export default Road;