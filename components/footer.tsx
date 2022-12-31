import BoundsWrapper from "./boundsWrapper"
import Image from "./image"
import Link from "./link"
import NextLink from "next/link"


const Footer = () => {

    return <footer className="bg-bg-700">
        <div className="md:px-4 py-8">
            <BoundsWrapper>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-8 grid place-items-center md:block">
                        <div className="space-y-2">
                            <h4 className="text-gray-500">Powered by</h4>
                            <Image props={{
                                src: "/svg/xcheck_blue_text_light.svg",
                                alt: "Crosscheck Sports Logo",
                                divClass: "",
                                imgClass: "h-[50px]",
                            }} />
                        </div>
                        <p className="text-gray-400 text-center md:text-left">Puck Norris is powered by the Crosscheck Sports engine, a powerful team management tool that powers scheduling, rosters, statistics, images, merchandise, and more.</p>
                    </div>
                    <div className="grid grid-cols-2 place-items-center">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-white">Features</h2>
                            <ul className="text-gray-400">
                                <li className="mb-4">
                                    <Link props={{
                                        href: "https://crosschecksports.com/schedule-management/",
                                        child: <>Scheduling System</>,
                                        isExternal: true,
                                        className: "hover:underline"
                                    }} />
                                </li>
                                <li className="mb-4">
                                    <Link props={{
                                        href: "https://crosschecksports.com/roster-management/",
                                        child: <>Roster Management</>,
                                        isExternal: true,
                                        className: "hover:underline"
                                    }} />
                                </li>
                                <li className="mb-4">
                                    <Link props={{
                                        href: "https://crosschecksports.com/merchandise/",
                                        child: <>Merchandise</>,
                                        isExternal: true,
                                        className: "hover:underline"
                                    }} />
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-white">Resources</h2>
                            <ul className="text-gray-400">
                                <li className="mb-4">
                                    <Link props={{
                                        href: "https://crosschecksports.com/support/team-create/",
                                        child: <>Getting Started</>,
                                        isExternal: true,
                                        className: "hover:underline"
                                    }} />
                                </li>
                                <li className="mb-4">
                                    <Link props={{
                                        href: "https://crosschecksports.com/support/",
                                        child: <>Support</>,
                                        isExternal: true,
                                        className: "hover:underline"
                                    }} />
                                </li>
                                <li className="mb-4">
                                    <Link props={{
                                        href: "https://crosschecksports.com/#download",
                                        child: <>Download</>,
                                        isExternal: true,
                                        className: "hover:underline"
                                    }} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </BoundsWrapper>
        </div>
        <div className="bg-bg-600 p-4">
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://sapphirenw.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Sapphire™</a>. All Rights Reserved.</span>
        </div>
    </footer>

}

export default Footer