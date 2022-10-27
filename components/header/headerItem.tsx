import Link from "next/link"
import { useRouter } from "next/router"

type HeaderItemProps = {
    route: string
    title: string
    onTap: () => void
    isCollapsed: boolean
    className?: string
    isExternal?: boolean
}

const HeaderItem = ({ props }: { props: HeaderItemProps }) => {
    const { route, title, onTap, isCollapsed, className = "", isExternal = false } = props

    return <>
        {isExternal ? <>
            <a href={route} onClick={onTap} target="_blank" rel="noopener noreferrer">
                <p className={`${className}`}>
                    {title}
                </p>
            </a>
        </> : <>
            <Link href={route} onClick={onTap}>
                <p className={`${className}`}>
                    {title}
                </p>
            </Link>
        </>
        }
    </>

}

export default HeaderItem