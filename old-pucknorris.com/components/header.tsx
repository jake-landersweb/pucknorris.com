import Image from "./image"
import Link from "./link"

const Header = () => {
    return <>
        <nav className="bg-bg-700 px-2 sm:px-4 py-2.5 h-[60px] fixed w-full z-20 top-0 left-0 border-b border-bg-500">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link props={{
                    href: "/",
                    child: <div className="flex cursor-pointer">
                        <Image props={{
                            src: "/images/pnsticker-small.png",
                            alt: "",
                            divClass: "self-center",
                            imgClass: "mr-3 h-9"
                        }} />
                        <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white font-gains tracking-wide">Puck Norris</span>
                    </div>,
                    isExternal: false,
                    className: undefined
                }} />
                <Link props={{
                    href: "https://teams.crosschecksports.com",
                    child: <p className="hover:opacity-70 transition-opacity">Login</p>,
                    isExternal: true,
                    className: undefined
                }} />
            </div>
        </nav>
    </>
}

export default Header