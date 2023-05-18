import React, {useContext, useEffect, useState} from 'react';
import {GetServerSideProps, NextPage} from "next";
import {Box, Container, List, ListItem, Typography} from "@mui/material";
import {IModule} from "@/models/IModule";
import {Api} from "@/api";
import MainLayout from "@/layouts/MainLayout";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from '@mui/icons-material/Info';
import {useRouter} from "next/router";
import {useTheme} from "@mui/system";
import IntroListItem from "@/components/module-page/IntroListItem";
import {CustomThemeContext} from "@/context/theme-context";

interface ModuleIntroProps {
    module: IModule;
    moduleId: number;
    theme: any;
}

const ModuleIntro:NextPage<ModuleIntroProps> = ({module, moduleId, theme}) => {
    const [paragraph, setParagraph] = useState<string>()
    const [text, setText] = useState<string>();
    const [items, setItems] = useState<string[]>()
    const [orderedItems, setOrderedItems] = useState<string[]>([])
    const themeCtx = useContext(CustomThemeContext)

    const router = useRouter()

    const homeRoute = {
        name: "Modules",
        path: "/modules",
        icon: <HomeIcon sx={{ mr: 1 }} />,
    };
    const moduleRoute = {
        name: module?.name,
        path: router.pathname,
        icon: <InfoIcon sx={{ mr: 1 }} />,
    };
    const routes = [homeRoute, moduleRoute];


    useEffect(() => {
        setParagraph(module?.content?.split("p!")[1])
        setItems(module?.content?.split("li!").slice(1))
        setText(module?.content?.split('div!')[1])
    },[module])

    useEffect(() => {
        if(text) {
            const items = text.split('ol!')
            setOrderedItems(items)
        }
    }, [text]);


    return (
        <MainLayout routes={routes} theme={theme}>
            <Container maxWidth={'lg'} sx={{position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: themeCtx.theme.palette?.primary?.light, minHeight: '300px', height: '100%'}}>
                <Typography sx={{position: 'absolute', top: 20, left: 20}} color={'textPrimary'} variant={'h4'}>
                    Module Intro
                </Typography>
                <Typography variant={'h2'} sx={{textAlign: 'center', p: 5, w: '100%', textTransform: 'uppercase'}} color={'textPrimary'}>{module.name}</Typography>
            </Container>
            <Container maxWidth={'lg'} sx={{bgcolor: themeCtx.theme?.palette.primary.main, p: 3}}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4, mb: 4, bgcolor: themeCtx.theme?.palette.secondary.main, borderRadius: 3, }}>
                    <Typography color={'textPrimary'} variant={'h5'}>
                        {paragraph}
                    </Typography>
                </Box>
                <Box>
                    {items && items.length > 0 && items.map((item, idx) => (
                        <IntroListItem key={idx} text={item.split('icon!')[0]} icon={item.split('icon!')[1]} idx={idx} />
                    ))}
                </Box>
                {text && orderedItems && (
                <Box>
                    <Typography color={'textPrimary'} variant={'h6'} sx={{my: 4}}>
                        {orderedItems[0]}
                    </Typography>
                    <List>
                        {orderedItems.slice(1).map((item, i) => (
                            <ListItem key={i} sx={{pb: 0}}>
                              <Typography color={'textPrimary'} sx={{mb: 2}}>
                                  {i + 1}) {item}
                              </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                )}
            </Container>
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const id = ctx?.params?.id;

        if (!id) {
            return {
                notFound: true,
            };
        }
        const module = await Api().module.getModule(+id);

        return {
            props: {
                module: module,
                theme: module.theme,
                moduleId: +id,
            },
        };
    } catch (error) {
        console.log("question page:", error);
        return {
            props: {},
        };
    }
};

export default ModuleIntro;