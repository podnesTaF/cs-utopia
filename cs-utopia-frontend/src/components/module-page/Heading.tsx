import React, {useContext} from 'react';
import {Box, Container, Typography} from "@mui/material";
import {useTheme} from "@mui/system";
import {CustomThemeContext} from "@/context/theme-context";

const Heading = () => {
    const {theme} = useContext(CustomThemeContext)
    return (
        <Box sx={{w: '100%', bgcolor: theme?.palette.primary.main}}>
           <Container maxWidth={'lg'} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, boxShadow: '0 0 7px rgba(0,0,0,0.4)'}}>
               <Typography variant={'h2'} color={'textPrimary'} sx={{mb: 4, textTransform: 'uppercase'}}>
                   Welcome to CS
               </Typography>
               <Typography variant={'h5'} color={'textPrimary'} sx={{textAlign: 'center'}}>
                   You can start from what you want, but to get the most form the test start with first module and so on. There will be an explanation while and after the test
               </Typography>
           </Container>
        </Box>
    );
};

export default Heading;