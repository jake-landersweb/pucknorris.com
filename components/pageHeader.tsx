import Image from "./image"

const PageHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return <div className={`flex flex-col items-center pb-12 space-y-4 ${className}`}>
        <Image props={{
            src: "/images/pucknorris.png",
            alt: "Puck Norris Logo",
            divClass: "md:pr-[50px] pr-[20px]",
            imgClass: "h-[200px] md:h-[300px]"
        }} />
        <div className="space-y-2 pb-4 text-center px-2 md:px-4">
            {children}
        </div>
    </div>
}

export default PageHeader