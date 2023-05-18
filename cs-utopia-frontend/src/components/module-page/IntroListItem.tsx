import React, {useContext, useEffect, useState} from 'react';
import ModuleIntro from "@/pages/modules/[id]";
import {Box, Card, CardContent, List, ListItem, ListItemText, Typography} from "@mui/material";
import Image from "next/image";
import {CustomThemeContext} from "@/context/theme-context";

interface IntroListItemProps {
    text: string;
    icon?: any;
    idx: number;
}

const IntroListItem: React.FC<IntroListItemProps> = ({text, icon, idx}) => {
    const [listItems, setListItems] = useState<string[]>([])
    const {theme, mode} = useContext(CustomThemeContext)

    useEffect(() => {
        const list = text.split('- ');
        if(list.length > 1) {
            setListItems(list)
        }
    }, []);

    return (
        <Card sx={{width: 'fit-content', maxWidth: '800px', p: 4, my: 5, ml: (idx+1) % 2 === 0 ? 'auto' : 5, display: 'flex', flexDirection: (idx+1) % 2 === 0 ? 'row-reverse' : 'row', bgcolor: theme.palette.primary.light, alignItems: 'center' }}>
           <Box sx={{mr: (idx+1) % 2 === 0 ? 0 : 5}}>
               <CardContent>
                   {listItems.length ? (
                       <List >
                           <ListItem>
                               <ListItemText color={'textPrimary'}>
                                   <Typography sx={{fontSize: '26px'}}>{listItems[0]}</Typography>
                               </ListItemText>
                           </ListItem>
                           {listItems.slice(1).map((item, i) => (
                               <ListItem sx={{paddingBottom: 0, pt: 0}} key={i}>
                                   <ListItemText color={'textPrimary'} >
                                       <Typography sx={{fontSize: '20px'}}>&gt; {item} </Typography>
                                   </ListItemText>
                               </ListItem>
                           ))}
                       </List>
                   ) : (
                       <Typography sx={{fontSize: 20}}>
                           {text}
                       </Typography>
                   )}
               </CardContent>
           </Box>
            <Box sx={{mr: (idx+1) % 2 === 0 ? 5 : 0}}>
                {icon ? (
                    <img src={icon} style={{backgroundColor: mode === 'dark' ? 'initial' : 'black'}} alt={'icon'} width={150} height={150} />
                ):
                    <Image src={'/icons/html.svg'} alt={'icon'} style={{backgroundColor: mode === 'dark' ? 'initial' : 'black'}} width={150} height={150} />}
            </Box>
        </Card>
    );
};

export default IntroListItem;