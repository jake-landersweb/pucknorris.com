'use client';

import NextLink from 'next/link'
import { useState, useEffect } from "react";
import HeaderItem from './headerItem';
import Image from '../image';
import Link from '../link';

const Header = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        }

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        () => window.removeEventListener("scroll", handleScroll);
    }, [])

    const handleClick = () => {
        setIsOpen(!isOpen);
    }


    const closeMenu = () => {
        setIsOpen(false);
    };

    const headerItem = (title: string, href: string, isExternal: boolean = false) => {
        return <Link props={{
            href: href,
            child: <>{title}</>,
            isExternal: isExternal,
            className: `${scrollY > 50 ? "hover:bg-bg-500" : "hover:bg-bg-700"} hover:bg-bg-500 transition-all px-4 py-2 rounded-md text-txt`
        }} />
    }

    const menu = (className: string) => {
        return <div className={className}>
            {headerItem("@pucknorrishockeyclub", "https://www.instagram.com/pucknorrishockeyclub")}
            {headerItem("ChuckBot", "/chat")}
            {headerItem("Schedule", "/schedule")}
            {headerItem("Merch", "/merch")}
            {headerItem("Gallery", "/gallery")}
            {headerItem("Login", "https://teams.crosschecksports.com", true)}
        </div>
    }


    return (
        <div className={`${scrollY > 50 ? "bg-bg-700 dark:bg-bg-dark-700 shadow-md" : "bg-bg dark:bg-bg-dark bg-opacity-50 backdrop-blur-sm"} h-[60px] items-center w-screen grid place-items-center transition-all duration-300`}>
            <div className="flex items-center justify-between max-w-[2000px] w-full px-2 lg:px-10">
                <div className="flex space-x-4">
                    <div className="">
                        <NextLink href="/" onClick={(e) => closeMenu()}>
                            <div className="group flex items-center transition-all">
                                {/* image can go here */}
                                <div className="flex items-center">
                                    <Image props={{
                                        src: '/images/pnsticker-small.png',
                                        alt: 'Puck Norris Sticker',
                                        divClass: "h-[50px] w-[50px]",
                                        imgClass: "h-[50px] w-[50px] pr-2"
                                    }} />
                                    <h1 className='font-bold text-5xl font-gains'>Puck Norris</h1>
                                </div>
                            </div>
                        </NextLink>
                    </div>
                </div>
                {/* The full sized menu */}
                {menu("hidden lg:flex lg:space-x-8 lg:items-center")}
                {/* Mobile menu */}
                {isOpen ? (
                    <button onClick={handleClick} className={`lg:hidden text-txt-400 w-10 h-10 focus:outline-none fixed right-2 z-50`}>
                        <span className="sr-only">Open main menu</span>
                        <div
                            className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                            <span aria-hidden="true" className={`${isOpen ? 'rotate-45' : '-translate-y-1.5'} block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out`}></span>
                            <span aria-hidden="true"
                                className={`${isOpen ? 'opacity-0' : ''}  block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out`}></span>
                            <span aria-hidden="true"
                                className={`${isOpen ? "-rotate-45" : "translate-y-1.5"}  block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out`}></span>
                        </div>
                    </button>
                ) : (
                    <button onClick={handleClick} className={`lg:hidden text-txt-400 w-10 h-10 relative focus:outline-none z-50`}>
                        <span className="sr-only">Open main menu</span>
                        <div
                            className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                            <span aria-hidden="true" className={`${isOpen ? 'rotate-45' : '-translate-y-1.5'} block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out`}></span>
                            <span aria-hidden="true"
                                className={`${isOpen ? 'opacity-0' : ''}  block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out`}></span>
                            <span aria-hidden="true"
                                className={`${isOpen ? "-rotate-45" : "translate-y-1.5"}  block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out`}></span>
                        </div>
                    </button>
                )}
                <div
                    className={`top-0 right-0 w-[75vw] py-[75px] pb-4 space-y-2 px-4 bg-bg-700 fixed h-screen z-40 ease-in-out duration-300 border-l border-bg-500 overflow-auto ${isOpen ? "translate-x-0 " : "translate-x-full"}`}>
                    <h3 className='text-2xl font-bold'>Puck Norris</h3>
                    <div>
                        <HeaderItem props={{
                            route: 'https://www.instagram.com/pucknorrishockeyclub',
                            title: '@pucknorrishockeyclub',
                            onTap: () => closeMenu(),
                            isCollapsed: false,
                            className: "dark:bg-bg-500 py-2 px-4 cursor-pointer rounded-md w-full",
                            isExternal: true,
                        }} />
                    </div>
                    
                    <div>
                        <HeaderItem props={{ 
                            route: '/chat',
                            title: 'ChuckBot',
                            onTap: () => closeMenu(),
                            isCollapsed: false,
                            className: "dark:bg-bg-500 py-2 px-4 cursor-pointer rounded-md w-full",
                            isExternal: false,
                        }} />
                    </div>
                    <div>
                        <HeaderItem props={{
                            route: '/schedule',
                            title: 'Schedule',
                            onTap: () => closeMenu(),
                            isCollapsed: false,
                            className: "dark:bg-bg-500 py-2 px-4 cursor-pointer rounded-md w-full",
                            isExternal: false,
                        }} />
                    </div>
                    <div>
                        <HeaderItem props={{
                            route: '/merch',
                            title: 'Merch',
                            onTap: () => closeMenu(),
                            isCollapsed: false,
                            className: "dark:bg-bg-500 py-2 px-4 cursor-pointer rounded-md w-full",
                            isExternal: false,
                        }} />
                    </div>
                    <div>
                        <HeaderItem props={{
                            route: '/gallery',
                            title: 'Gallery',
                            onTap: () => closeMenu(),
                            isCollapsed: false,
                            className: "dark:bg-bg-500 py-2 px-4 cursor-pointer rounded-md w-full",
                            isExternal: false,
                        }} />
                    </div>
                    <div>
                        <HeaderItem props={{
                            route: 'https://teams.crosschecksports.com',
                            title: 'Login',
                            onTap: () => closeMenu(),
                            isCollapsed: false,
                            className: "dark:bg-bg-500 py-2 px-4 cursor-pointer rounded-md w-full",
                            isExternal: true,
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header