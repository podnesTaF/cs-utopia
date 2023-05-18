import { Api } from "@/api";
import MainLayout from "@/layouts/MainLayout";
import { IModule } from "@/models/IModule";
import HomeIcon from "@mui/icons-material/Home";
import { NextPage } from "next";
import Head from "next/head";
import React, {useState, useEffect} from "react";
import {Box, Container, Typography} from "@mui/material";
import {useRouter} from "next/router";

interface HomeProps {
}

const routes = [
  { name: "", path: "/" }
];

const Home: NextPage<HomeProps> = () => {
    const router = useRouter()

  return (
      <>
        <Head>
          <title>PS utopia</title>
          <meta
              name="description"
              content="utopia project for professional skills"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout routes={routes} isLoading={false} bgColor={'main'}>
             <Container maxWidth={'md'} className={'introContainer'} sx={{p: 5}}>
                 <Box sx={{p: 3}} className={'overlay'}>
                     <Typography variant={'h2'} sx={{textTransform: 'uppercase', textAlign: 'center', fontWeight: 'bold'}} color={'white'}>Welcome to CS Utopia!</Typography>
                     <Box className="intro-box">
                         <div className="intro-btn" onClick={() => router.push('/modules')}>
                             <Typography className={'title'} variant={'h5'}>Start journey</Typography>
                         </div>
                     </Box>
                     <Box>
                         <Typography sx={{textAlign: 'center', fontSize: '18px'}} color={'white'}>Are you considering a future in the exciting field of computer science? Look no further – CS Utopia is here to guide you on your journey! Whether you're a curious student exploring your interests or someone seeking a career change, our interactive tests and comprehensive modules are tailor-made to help you discover your passion for computer science.</Typography>
                     </Box>
                 </Box>
             </Container>
        </MainLayout>
      </>
  );
};

export default Home;
