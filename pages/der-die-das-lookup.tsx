import React, { ChangeEvent, useState } from "react";
import Page from "../components/Page";
import { Button, Input } from "@mui/material";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

const DerDieDas = () => {

    const [search_query, setSearchQuery] = useState("");

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
        'Access-Control-Allow-Origin': '*',
        'Upgrade-Insecure-Requests': "1",
        'Accept': "	text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8",
        'Content-Type': 'application/json; charset=utf-8',
        'Connection': 'Keep-Alive',
    } 

    const getWordArticles = async () => {
        const response = await axios.get(
            `https://api2.matetranslate.com/der-die-das/lookup_article?query=${search_query}`, {
                headers
            },
        )
        console.log(response)
    };

    return(
        <Page classes="justify-center items-center">
            <div className="h-50 w-full sm:w-[500px] p-2 flex-col">
                <div className="gap-3 flex flex-col bg-white w-full h-full rounded-md items-center py-0">
                    <p className="text-xl"> Der Die Das Lookup</p>
                    <div className="pt-20 flex flex-row gap-2 h-32">
                        <Input 
                            title="Input" placeholder="Type the german word"
                            onChange={(event:ChangeEvent<HTMLInputElement>)=>{
                                setSearchQuery(event.target.value);
                            }}
                        />
                        <Button className="bg-primary_color text-white 
                        hover:bg-secondary_color drop-shadow-lg "
                        onClick={() => {
                            getWordArticles();
                        }}
                        >
                            Search
                        </Button>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default DerDieDas;