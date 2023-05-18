import {useEffect, useState} from "react";

export const useFetch = async (endpoint: any) => {
    const [result, setResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        (async () => {
            setIsLoading(true)
            try {
                const res = await endpoint();

                setResult(res);
            } catch (e) {
                console.log('fetching',e)
            } finally {
                timeout = setTimeout(() => {
                    setIsLoading(false);
                }, 500)
            }
        })()

        return () => {
            clearTimeout(timeout)
        }
    }, [])


    return {result, isLoading}
}