import { FaGlobeAmericas } from "react-icons/fa"
import CustomAppButtons from "../customButtons"
import XCShowcaseItem from "./xcShowcaseCell"

const XCShowcase = () => {
    return <div className="space-y-16 md:space-y-32">
        <div className="grid place-items-center space-y-4">
            <p className="max-w-2xl text-center font-light md:text-lg lg:text-xl text-gray-400">The Puck Norris Website and Scheduling system is built to showcase the flexibility and powers of the Crosscheck Sports engine. Crosscheck is a powerful team management software system with many features that the intricacies of sports team management trivial.</p>
            <div className="text-center">
                <a href="https://crosschecksports.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-bg-700 hover:bg-bg-600 text-white rounded-md inline-flex items-center justify-center px-4 py-2.5 ">
                    <FaGlobeAmericas size={28} className="text-white mr-3" />
                    <div className="text-left">
                        <div className="mb-1 text-xs">Learn More</div>
                        <div className="-mt-1 font-sans text-sm font-semibold">crosschecksports.com</div>
                    </div>
                </a>
            </div>
        </div>

        <XCShowcaseItem props={{
            title: "Customized Events",
            src: "/images/customized_events.png",
            alt: "Crosscheck event creation app",
            reverse: false,
            description: "Create a schedule with dynamic events to organize your season and to track your attendance and team’s performance."
        }} />
        <XCShowcaseItem props={{
            title: "Rich Chat",
            src: "/images/rich-chat.png",
            alt: "Crosscheck mobile chat app",
            reverse: true,
            description: "Keep up communication with your team through a feature-rich chat app supporting images, videos, texts, links, and more."
        }} />
        <XCShowcaseItem props={{
            title: "Roster Management",
            src: "/images/roster-management.png",
            alt: "Crosscheck roster management app",
            reverse: false,
            description: "Build up a backlog of players on your team to create new seasons, add subs to current seasons, and track custom information."
        }} />
        <CustomAppButtons props={{
            title: "Download Crossheck Today"
        }} />
    </div>
}

export default XCShowcase