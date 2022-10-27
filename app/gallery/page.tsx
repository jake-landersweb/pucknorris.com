import BoundsWrapper from "../../components/boundsWrapper"
import PageHeader from "../../components/pageHeader"
import getGallery from "../../lib/apiRoutes/getGallery"

const Gallery = async () => {
    const imageData = await getGallery()

    const getImages = () => {
        const imgs = []

        for (var i = 0; i < imageData['body'].length; i++) {
            imgs.push(
                // <PhotoView src={imageData['body'][i]}>
                <img src={imageData['body'][i]} alt="" className="hover:cursor-pointer border border-bg-500 rounded-md" />
                // {/* </PhotoView> */}
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