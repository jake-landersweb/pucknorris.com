import BoundsWrapper from "./boundsWrapper"
import Image from "./image"
import Label from "./label"
import Link from "./link"
import XCShowcase from "./xcShowcase/xcShowcase"

const Footer = () => {

    return <div className="space-y-8">
        <div id="crosscheck" className="">
            <Label title={'Crosscheck'} />
            <BoundsWrapper><XCShowcase /></BoundsWrapper>
        </div>
        <footer className="p-4 bg-bg-700 shadow md:px-6 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <Link props={{
                    href: "https://crosschecksports.com",
                    child: <Image props={{
                        src: "/svg/xcheck_blue_text_light.svg",
                        alt: "Crosscheck Sports Logo",
                        divClass: undefined,
                        imgClass: "mr-3 h-8"
                    }} />,
                    isExternal: true,
                    className: undefined
                }} />
            </div>
            <hr className="my-6 border-bg-500 sm:mx-auto  lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://sapphirenw.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Sapphire™</a>. All Rights Reserved.
            </span>
        </footer>
    </div>

}

export default Footer