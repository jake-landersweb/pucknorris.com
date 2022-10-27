const Label = ({ title, className }: { title: string, className?: string }) => {
    return <h2 className={`sticky inset-x-0 top-[59px] left-0 z-30 bg-bg font-gains text-5xl md:text-7xl tracking-wide text-center mb-20 w-full border-y-bg-500 border-y pt-1 ${className ?? ""}`}>{title}</h2>
}

export default Label