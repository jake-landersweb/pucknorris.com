import Image from "./image"

const PageHeader = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-col items-center pb-12 space-y-4">
        <Image props={{
            src: "/images/pucknorris.png",
            alt: "Puck Norris Logo",
            divClass: undefined,
            imgClass: "h-[200px] md:h-[300px]"
        }} />
        <div className="space-y-2 pb-4 text-center px-2 md:px-4">
            {children}
        </div>
    </div>
}

export default PageHeader