import Image from "../image"

type XCShowcaseItemProps = {
    title: string
    src: string
    alt: string
    reverse: boolean
    description: string
}

const XCShowcaseItem = ({ props }: { props: XCShowcaseItemProps }) => {
    const { title, src, alt, reverse = false, description } = props
    return <>
        <div className={`${reverse ? "md:flex-row-reverse" : ""} md:flex md:items-center md:space-y-0 space-y-8`}>
            <div className="space-y-2 max-w-screen-sm">
                <h3 className="text-4xl font-bold grid place-items-center md:block">{title}</h3>
                <p className="font-light md:text-lg lg:text-xl text-gray-400 text-center md:text-left">{description}</p>
            </div>
            <div className={`${reverse ? "md:pr-16" : "md:pl-16"} grid place-items-center`}>
                <Image props={{
                    src: src,
                    alt: alt,
                    divClass: "md:max-w-[600px] max-w-[400px]",
                    imgClass: "md:max-w-[500px] max-w-[300px]"
                }} />
            </div>
        </div>
    </>
}

export default XCShowcaseItem