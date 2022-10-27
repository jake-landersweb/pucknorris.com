import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import BoundsWrapper from "../../components/boundsWrapper";
import ImageView from "../../components/images/imageView";
import Label from "../../components/label";

export const getServerSideProps: GetServerSideProps = async (context) => {
    // wrap all calls in a promise to run concurrently, 3x speed gain
    const response = await fetch(`${process.env.HOST!}/images/getImagesPresigned/${process.env.TEAMID}`)

    const j = await response.json()

    return {
        props: {
            imageData: j
        }
    }
}


const Gallery = ({ imageData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <div className="">
        <Label title={'Gallery'} />
        <BoundsWrapper><ImageView images={imageData.body} /></BoundsWrapper>
    </div>
}

export default Gallery