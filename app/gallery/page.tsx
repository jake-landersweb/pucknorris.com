import BoundsWrapper from "../../components/boundsWrapper"
import PageHeader from "../../components/pageHeader"
import getGallery from "../../lib/apiRoutes/getGallery"

const Gallery = async () => {
    const imageData = await getGallery()

    const getImages = () => {
        const imgs = []

        for (var i = 0; i < imageData.items.length; i++) {
            imgs.push(
                <div className="">
                    <img src={`http://pocketbase.sapphirenw.com/api/files/xc_images/${imageData.items[i].id}/${imageData.items[i].image}`} alt="" className="hover:cursor-pointer border border-bg-500 rounded-md" />
                    <p className="text-gray-500 text-center">{imageData.items[i].description}</p>
                </div>
            )
        }
        return imgs
    }

    return <div className="">
        <PageHeader>
            <p className="max-w-2xl text-gray-500 text-center">A photo dump for the team, look back at all the great memories and championships the Puck Norris hockey club has won!</p>
        </PageHeader>
        <BoundsWrapper>
            {/* <PhotoProvider> */}
            <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {getImages()}
            </div>
            {/* </PhotoProvider> */}
        </BoundsWrapper>
    </div>
}

export default Gallery