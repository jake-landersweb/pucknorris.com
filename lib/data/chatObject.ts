type ChatObject = {
    messages: {
        role: string,
        content: string,
    }[],
    msg: string,
}

export default ChatObject