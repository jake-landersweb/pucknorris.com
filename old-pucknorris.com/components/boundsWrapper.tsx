type BoundsWrapperProps = {
    children: React.ReactNode; // 👈️ type children
};

const BoundsWrapper = (props: BoundsWrapperProps) => {
    return <div className="grid place-items-center">
        <div className="max-w-[1400px] px-4 lg:px-20 md:px-10">{props.children}</div>
    </div>
}

export default BoundsWrapper