import Image from "../image"

const ImageCell = ({ filename }: { filename: string }) => {
    return <Image props={{
        src: filename,
        alt: "team image",
        divClass: "",
        imgClass: "rounded-md border border-bg-500 rounded-md"
    }} />
}

export default ImageCell