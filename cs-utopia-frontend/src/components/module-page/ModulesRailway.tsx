import React, {Fragment, useContext} from 'react';
import {IModule} from "@/models/IModule";
import {Box, Container} from "@mui/material";
import ModuleLevel from "@/components/module-page/ModuleLevel";

interface ModulesRailwayProps {
    modules: IModule[];
}

const ModulesRailway: React.FC<ModulesRailwayProps> = ({modules}) => {

    return (
        <Container maxWidth={'lg'}>
            <Box sx={{py: 3}}>
                {modules.map((module, i) => {
                    return (
                        <Fragment key={module.id}>
                            <ModuleLevel isLast={i === modules.length - 1} module={module} />
                        </Fragment>
                    );
                })}
            </Box>
        </Container>
    );
};

export default ModulesRailway;