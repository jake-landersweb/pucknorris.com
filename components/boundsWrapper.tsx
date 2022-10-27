import React from "react"

const BoundsWrapper = ({ children }: { children: React.ReactNode }) => {
    return <div className="w-screen flex items-center justify-center">
        <div className="max-w-[1400px] px-4 lg:px-20 md:px-10 w-screen">
            {children}
        </div>
    </div>
}

export default BoundsWrapper