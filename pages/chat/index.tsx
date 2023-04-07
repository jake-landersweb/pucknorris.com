import { useEffect, useRef, useState } from "react";
import BoundsWrapper from "../../components/boundsWrapper";
import Field from "../../components/field";
import { AiOutlineSend } from 'react-icons/ai'
import ChatObject from "../../lib/data/chatObject";
import Image from "../../components/image";
import { FaUserCircle } from 'react-icons/fa'
import NextImage from 'next/image'
import '../../styles/globals.css'
import Header from "../../components/header/header";
import NextLink from 'next/link'
import Head from "next/head";

export default function ChuckChat() {
    const [isLoading, setIsLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const [session, setSession] = useState<ChatObject>({ messages: [], msg: "" })
    const calledOnce = useRef(false);

    const init = async () => {
        if (session.messages.length == 0 && !isLoading) {
            setIsLoading(true)
            console.log("initializing conversation")
            const response = await fetch("/api/chat/", {
                "method": "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(session),
            })
            if (response.status == 200) {
                const data = await response.json()
                setSession(data.data)
                setMsg("")
            } else {
                console.log("There was an error")
            }
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!calledOnce.current && session.messages.length === 0 && !isLoading) {
            calledOnce.current = true;
            init();
        }
    }, [session.messages.length, isLoading, init]);

    const sendMessage = async () => {
        if (!isLoading && msg.length != 0) {
            console.log("sending message")
            setIsLoading(true)
            const body = {
                msg: msg,
                messages: session.messages,
            }
            setSession((prevState) => ({
                ...prevState,
                messages: [...prevState.messages, { role: "user", content: msg }],
            }));
            setTimeout(scrollToBottom, 200);
            setMsg("")
            const response = await fetch("/api/chat/", {
                "method": "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
            if (response.status == 200) {
                const data = await response.json()
                console.log(data)
                setSession(data.data)
                setTimeout(scrollToBottom, 200);
            } else {
                console.log("There was an error")
            }
            setIsLoading(false)

        }
    }

    function scrollToBottom() {
        const div = document.getElementById('messages');
        div?.scrollTo({
            top: div.scrollHeight,
            behavior: 'smooth'
        });
    }


    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            sendMessage()
        }
    }

    const messages = () => {
        const items = []

        for (let i = 1; i < session.messages.length; i++) {
            if (session.messages[i].role == "user") {
                items.push(userCell(session.messages[i].content))
            } else {
                items.push(botCell(session.messages[i].content))
            }
        }

        if (isLoading) {
            if (session.messages.length == 0) {
                items.push(loadingCell())
            } else {
                items.push(loadingCell())
            }
        }

        return items
    }

    const userCell = (m: string) => {
        return <div className="w-screen flex items-center justify-center">
            <div className="max-w-[1200px] px-4 lg:px-20 md:px-10 w-screen">
                <div className="grid grid-cols-8 px-4 py-2 gap-2">
                    <div className="col-span-2 grid place-items-center">
                        <div className="space-y-2 grid place-items-center">
                            <FaUserCircle className="text-white" size={50} />
                            <p className="text-txt-500 text-sm">User</p>
                        </div>
                    </div>
                    <div className="col-span-6 flex flex-col justify-center">
                        {m}
                    </div>
                </div>
            </div>
        </div>
    }

    const botCell = (m: string) => {
        return <div className="bg-bg-600">
            <div className="w-screen flex items-center justify-center">
                <div className="max-w-[1200px] px-4 lg:px-20 md:px-10 w-screen">
                    <div className="grid grid-cols-8 px-4 py-2 gap-2">
                        <div className="col-span-2 grid place-items-center">
                            <div className="space-y-2 grid place-items-center">
                                <Image props={{
                                    src: "/images/pucknorris.png",
                                    alt: "",
                                    divClass: "max-h-[75px]",
                                    imgClass: "max-h-[75px]"
                                }} />
                                <p className="text-txt-500 text-sm">ChuckBot</p>
                            </div>
                        </div>
                        <div className="col-span-6 flex flex-col justify-center">
                            {m}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    const loadingCell = () => {
        return <div className="bg-bg-600">
            <div className="w-screen flex items-center justify-center">
                <div className="max-w-[1200px] px-4 lg:px-20 md:px-10 w-screen">
                    <div className="grid grid-cols-8 px-4 py-2 gap-2">
                        <div className="col-span-2 grid place-items-center">
                            <div className="space-y-2 grid place-items-center">
                                <Image props={{
                                    src: "/images/pucknorris.png",
                                    alt: "",
                                    divClass: "max-h-[75px]",
                                    imgClass: "max-h-[75px]"
                                }} />
                                <p className="text-txt-500 text-sm">ChuckBot</p>
                            </div>
                        </div>
                        <div className="col-span-6 flex flex-col justify-center">
                            <p className={``}>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    return <>
        <Head>
            <title>Puck Norris - ChuckBot</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="Talk with Chuck Norris mixed with a hockey player! Get chirped or hear some great stories." />
        </Head>
        <div className="bg-bg text-txt w-[100vw] h-[100vh] flex items-center justify-center">
            <div className="flex flex-col h-full w-full bg-bg">
                <div className="grid place-items-center py-2 border-b border-b-bg-600">
                    <NextLink href="/">
                        <div className="group flex items-center transition-all">
                            {/* image can go here */}
                            <div className="flex items-center">
                                <Image props={{
                                    src: '/images/pnsticker-small.png',
                                    alt: 'Puck Norris Sticker',
                                    divClass: "h-[50px] w-[50px]",
                                    imgClass: "h-[50px] w-[50px] pr-2"
                                }} />
                                <h1 className='font-bold text-5xl font-gains'>ChuckBot</h1>
                            </div>
                        </div>
                    </NextLink>
                </div>
                <div id="messages" className="overflow-scroll flex-grow flex flex-col">
                    <div className="space-y-2 pb-4">
                        {messages()}
                    </div>
                </div>
                <div className="w-screen flex items-center justify-center border-t border-t-bg-600">
                    <div className="max-w-[1200px] px-4 lg:px-20 md:px-10 w-screen">
                        <div className="px-8 pt-4 flex justify-center items-center">
                            <div className="flex space-x-2 items-center flex-grow">
                                <Field
                                    props={{
                                        value: msg,
                                        label: "",
                                        placeholder: "Send a message...",
                                        errorText: "",
                                        inputType: "text",
                                        onChanged: function (val: string): void {
                                            setMsg(val);
                                        },
                                        isValid: true,
                                        isTextArea: false,
                                        limit: 500,
                                        onKeyDown: handleKeyDown,
                                    }}
                                />
                                <button
                                    onClick={() => sendMessage()}
                                    className="text-white bg-main rounded-md p-2 h-min m-1 md:hover:opacity-70 transition-opacity"
                                >
                                    <AiOutlineSend size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="grid place-items-center my-4">
                            <div className="space-x-2 flex items-center">
                                <NextImage src={"/images/portlandai-sm.png"} alt={"Portland AI"} height={20} width={20} />
                                <p className="text-txt-300">Powered by <a className="underline hover:no-underline" href="https://portlandai.io" target="_blank" rel="noopener noreferrer">Portland AI</a></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}