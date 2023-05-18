import React from 'react';
import {Box, Button, Icon, Typography} from "@mui/material";
import {IModule} from "@/models/IModule";
import {useRouter} from "next/router";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Road from "@/components/module-page/Road";

interface ModuleLevelProps {
    module: IModule;
    isLast: boolean;
}

const ModuleLevel: React.FC<ModuleLevelProps> = ({module, isLast}) => {
    const router = useRouter()
    const isFinished = localStorage.getItem('results-' + module.id)

    return (
        <Box sx={{display: 'flex', mt: 3, width: '100%'}}>
            <Box maxWidth={'md'} sx={{ display: "flex", flexDirection: 'column', alignItems: 'center'}}>
                <Box
                    sx={{
                        borderRadius: "50%",
                        width: "70px",
                        height: "70px",
                        bgcolor: "white",
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: `4px solid ${module.theme?.primary.main || 'lightblue'}`,
                        '&:hover': {
                            cursor: 'pointer',
                            opacity: '0.8'
                        }, "&:active": {
                            transform: "scale(0.95)",
                        }
                    }}
                    onClick={() => router.push(`/question/${module.id}`)}
                >
                    <PlayArrowIcon fontSize={'large'}/>
                </Box>
                {!isLast &&  <Road color={module.theme?.primary.main || 'lightblue'}/>}
            </Box>
            <Box sx={{display: 'flex', ml: 4, flexDirection: 'column', maxWidth: '500px'}}>
                <Typography variant={"h3"} color="textPrimary">{module.name}</Typography>
                <Typography  variant={'h6'} color="textPrimary" >{module.intro || 'minus necessitatibus officia porro quia repudiandae ut veniam voluptas. Fuga maiores molestiae quasi.'}</Typography>
            </Box>
            <Box sx={{marginLeft:'auto', display: 'flex', alignItems: 'center', flexDirection:'column'}}>
                <Button onClick={() => router.push('/modules/' + module.id)} variant={'contained'} sx={{minWidth: '140px', mb: 4}} color={'secondary'}>
                    Introduction
                </Button>
                {isFinished &&
                    <Button onClick={() => router.push('/results/' + module.id)} variant={'outlined'} sx={{minWidth: '140px'}} color={'info'}>
                        Last result
                    </Button>
                }
            </Box>
        </Box >
    );
};

export default ModuleLevel;