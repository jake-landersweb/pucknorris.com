export default async function getGallery() {
    const response = await fetch(`${process.env.HOST!}/images/getImagesPresigned/${process.env.TEAMID}`, { next: { revalidate: 60 }, })
    const data = await response.json()
    return data;
}