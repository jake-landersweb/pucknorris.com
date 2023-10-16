import type { NextApiRequest, NextApiResponse } from 'next'
import ChatObject from '../../lib/data/chatObject'

type Data = {
    status: number,
    data: ChatObject | string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log("Sending chat request")
    const response = await fetch(`${process.env.CHAT_HOST!}`, {
        "method": "POST",
        headers: { "Content-Type": "application/json", "x-api-key": process.env.CHAT_API_KEY! },
        body: JSON.stringify(req.body),
    })

    const data = await response.json()

    if (response.status == 200) {
        res.status(200).json({ status: 200, data: data })
    } else {
        console.log(data)
        res.status(400).json({ status: 400, data: data.Message })
    }
}