import { useEffect, useRef, useState } from "react";
import Field from "../../components/field";
import { AiOutlineSend } from 'react-icons/ai'
import Image from "../../components/image";
import { FaUserCircle } from 'react-icons/fa'
import NextImage from 'next/image'
import '../../styles/globals.css'
import Header from "../../components/header/header";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
    let m = context.query.model ?? "gpt-4"

    return {
        props: {
            m: m
        }
    }
}

export default function ChuckChat({m}: {m: string}) {
    const [isLoading, setIsLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([])
    const [model, setModel] = useState(m)
    const [hasError, setHasError] = useState(false)
    const divRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        // if (!initialized) {
        //     setInitialized(true);
        //     return;
        // }
        if (model && messages.length === 0 && msg === "") {
            sendMessage();
        }
    }, [model, messages, msg, isLoading]);

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const sendMessage = async () => {
        if (!isLoading) {
            setHasError(false)
            console.log("sending message with model: '" + model + "'")
            setIsLoading(true)
            const body = {
                model: model,
                new_message: msg,
                messages: messages,
                health_check: false,
            }
            if (msg != "") {
                setMessages((prevState) => [
                    ...prevState,
                    { role: "user", content: msg }
                ]);
            }
            setTimeout(scrollToBottom, 200);
            setMsg("")
            const response = await fetch("/api/chat/", {
                "method": "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
            if (response.status == 200) {
                const data = await response.json()
                setMessages(data.data.messages)
                console.log(data.data.messages)
                setTimeout(scrollToBottom, 200);
            } else {
                console.log("There was an error")
                setHasError(true)
            }
            setIsLoading(false)
        }
    }

    const changeModel = (name: string) => {
        setModel(name)
        setMessages([])
        setMsg("")
        closeMenu()
    }

    function scrollToBottom() {
        // const div = document.getElementById('messages');

        // div?.scrollTo({
        //     top: div.scrollHeight,
        //     behavior: 'smooth'
        // });
        divRef.current?.scrollTo(0, divRef.current.scrollHeight);
    }


    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            sendMessage()
        }
    }

    const messageList = () => {
        const items = []

        for (let i = 0; i < messages.length; i++) {
            if (messages[i].role == "user") {
                items.push(userCell(messages[i].content))
            } else {
                items.push(botCell(messages[i].content))
            }
        }

        if (isLoading) {
            items.push(loadingCell())
        }

        return items
    }

    const modelName = () => {
        switch (model) {
            case "gpt-4": return "ChuckBot 4.0";
            case "gpt-3.5": return "ChuckBut 3.0";
            case "claude-2": return "Claude-2 Giroux Bot";
            case "claude-instant": return "Claude-2 Giroux Slow";
            default: return "Unknown";
        }
    }

    const imageName = () => {
        switch (model) {
            case "gpt-4": return "/images/pucknorris.png";
            case "gpt-3.5": return "/images/pucknorris.png";
            case "claude-2": return "/images/claude2.png";
            case "claude-instant": return "/images/claude2.png";
            default: return "Unknown";
        }
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
                                    src: imageName(),
                                    alt: "",
                                    divClass: "max-h-[75px]",
                                    imgClass: "max-h-[75px]"
                                }} />
                                <p className="text-txt-500 text-sm">{modelName()}</p>
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
                                    src: imageName(),
                                    alt: "",
                                    divClass: "max-h-[75px]",
                                    imgClass: "max-h-[75px]"
                                }} />
                                <p className="text-txt-500 text-sm">{modelName()}</p>
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

    const body = () => {
        if (hasError) {
            return <div className="grid place-items-center">
                <h3>There was an error!</h3>
                <button onClick={() => sendMessage()} className="bg-main text-black rounded-md px-8 py-2 md:hover:bg-opacity-50 transition-all">Try Again</button>
            </div>
        } else if (messages.length == 0 && !isLoading) {
            return <div className="grid place-items-center space-y-2 p-4">
                <h2 className="text-xl md:text-2xl font-bold">Select Personality</h2>
                <div className="max-w-2xl gap-2 grid place-items-center">
                    {modelButtons()}
                </div>
            </div>
        } else {
            return <div id="messages" className="space-y-2 pb-4">
                {messageList()}
            </div>
        }
    }

    const modelButtons = () => {
        return [
            //modelButton("ChuckBot 3.0", "gpt-3.5", "The classic chuckbot. Mean, green, chirping machine. Not for the fair hearted."),
            modelButton("ChuckBot 4.0", "gpt-4", "The original personality, supercharged with OpenAI's GPT-4. He's kind of an asshole and may outsmart you."),
            modelButton("Claude-2 Giroux Bot", "claude-2", "The ever friendly Claude-2 Giroux bot powered by Anthropics Claude 2 AI model! It is impossible for him to be mean."),
            //modelButton("Jean Claude Instant", "claude-instant", "Like Jean Claude bot, but just a little less smart. But he is quite fast."),
        ]
    }

    const modelButton = (title: string, name: string, desc: string) => {
        return <button onClick={() => changeModel(name)} className={`${model == name ? 'border-main' : 'border-bg-500'} bg-bg-500 border rounded-md p-2 md:hover:opacity-50 transition-all`}>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-300">{desc}</p>
        </button>
    }

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* Site header */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header />
            </div>

            {/* Slide-out bot selector panel */}
            <div
                className={`top-0 right-0 w-[75vw] max-w-[400px] py-[75px] pb-4 space-y-2 px-4 bg-bg-700 fixed h-screen z-40 ease-in-out duration-300 border-l border-bg-500 overflow-auto ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <h3 className='text-2xl font-bold'>Change Bot</h3>
                <div className="space-y-2">
                    {modelButtons()}
                </div>
            </div>

            {/* Main content area below header */}
            <div className="flex flex-col flex-1 overflow-hidden mt-[60px]">
                <div ref={divRef} className="flex-1 overflow-y-scroll" style={{ scrollBehavior: 'smooth' }}>
                    {body()}
                </div>

                {/* Bottom input bar */}
                <div className="w-full border-t border-t-bg-600">
                    <div className="max-w-[1200px] mx-auto px-4 lg:px-20 md:px-10">
                        <div className="pt-3 pb-1 flex items-center gap-2">
                            <button
                                onClick={handleClick}
                                className="bg-bg-500 rounded-md md:hover:opacity-50 py-[11px] px-3 transition-all text-sm whitespace-nowrap flex-shrink-0"
                            >
                                {isOpen ? "Close" : "Change Bot"}
                            </button>
                            <div className="flex space-x-2 items-center flex-grow h-[50px]">
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
                                    className="text-white bg-main rounded-md p-[11px] h-min md:hover:opacity-70 transition-opacity"
                                >
                                    <AiOutlineSend size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="grid place-items-center my-3">
                            <div className="space-x-2 flex items-center">
                                <NextImage src={"/images/sapphire.png"} alt={"Sapphire NW"} height={20} width={20} />
                                <p className="text-txt-300 text-sm">Powered by <a className="underline hover:no-underline" href="https://sapphirenw.com" target="_blank" rel="noopener noreferrer">Sapphire NW</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}