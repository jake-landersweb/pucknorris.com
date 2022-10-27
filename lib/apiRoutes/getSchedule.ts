import formatDate from "../functions/formatDate";

export default async function getSchedule() {
    const d = new Date()
    const date = { "date": formatDate(d) }

    const res = await fetch(`${process.env.HOST!}/teams/${process.env.TEAMID}/teamSchedule`, {
        method: "PUT",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(date),
        next: { revalidate: 300 } // cache response for 5 minutes
    })
    const posts = await res.json();
    return posts;
}