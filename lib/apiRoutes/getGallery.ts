import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase.sapphirenw.com');

export default async function getGallery() {
    const records = await pb.collection('xc_images').getList(1, 20, { filter: `teamId = '${process.env.TEAMID}'` })
    return records
    // const response = await fetch(`${process.env.HOST!}/images/getImagesPresigned/${process.env.TEAMID}`, { next: { revalidate: 60 }, })
    // const data = await response.json()
    // return data;
}