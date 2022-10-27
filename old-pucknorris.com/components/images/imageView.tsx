import ImageCell from "./imageCell"
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Image from "../image";

const ImageView = ({ images }: { images: string[] }) => {

    const imgs = []

    for (var i = 0; i < images.length; i++) {
        imgs.push(
            <PhotoView src={images[i]}>
                <img src={images[i]} alt="" className="hover:cursor-pointer border border-bg-500 rounded-md" />
            </PhotoView>
        )
    }

    return <PhotoProvider>
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {imgs}
        </div>
    </PhotoProvider>
}

export default ImageView