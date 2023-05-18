import React from 'react';
import {Box, LinearProgress} from "@mui/material";

interface ProgressProps {
    progress: number;
}

const Progress: React.FC<ProgressProps> = ({progress}) => {
    return (
        <Box sx={{mb: 3}}>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    );
};

export default Progress;