import React, {useContext} from 'react';
import styles from '@/styles/Loading.module.scss'
import {Box, Typography} from "@mui/material";

interface LoadingOverlayProps {
    loadingMessage?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({loadingMessage}) => {

    return (
        <div className={styles.trainAndButtons}>
            {loadingMessage &&
                <Box className={styles.messageBox}>
                    <Typography sx={{textAlign: 'center', fontWeight: 'bold'}} color="textPrimary" variant='h2'>
                        {loadingMessage}
                    </Typography>
                </Box>
                }
            <div className={styles.toyTrain}>
                <div className={styles.engine}>
                    <div className={styles.window}>
                        <div className={styles.engineMain}>
                            <div className={styles.smokes}>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.engineBody}>
                        <div className={styles.wheels}>
                            <div className={styles.bigWheel}></div>
                            <div className={styles.normalWheel}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.locomotive}>
                    <div className={styles.trash}></div>
                    <div className={styles.wheels}>
                        <div className={styles.normalWheel}></div>
                        <div className={styles.normalWheel}></div>
                    </div>
                </div>
                <div className={styles.tracks}>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;