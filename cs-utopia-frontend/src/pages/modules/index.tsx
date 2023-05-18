import { Api } from "@/api";
import MainLayout from "@/layouts/MainLayout";
import { IModule } from "@/models/IModule";
import HomeIcon from "@mui/icons-material/Home";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Heading from "@/components/module-page/Heading";
import ModulesRailway from "@/components/module-page/ModulesRailway";
import {useState, useEffect} from "react";

interface HomeProps {
}

const routes = [
    { name: "Modules", path: "/", icon: <HomeIcon sx={{ mr: 1 }} /> },
];

const Home: NextPage<HomeProps> = ({ }) => {
    const [modules, setModules] = useState<IModule[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        (async () => {
            setIsLoading(true);
            try {
                const modules = await Api().module.getModules();
                setModules(modules);
            } catch (e) {

            } finally {
                timeout = setTimeout(() => {
                    setIsLoading(false);
                }, 500)
            }
        })()

        return () => {
            clearTimeout(timeout)
        }
    }, []);

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
            <MainLayout routes={routes} isLoading={isLoading}>
                <main>
                    <Heading />
                    <ModulesRailway modules={modules} />
                </main>
            </MainLayout>
        </>
    );
};

export default Home;