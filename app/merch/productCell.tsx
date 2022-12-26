import Image from "../../components/image"
import Link from "../../components/link"

const ProductCell = ({ product }: { product: ShopifyBuy.Product }) => {
    const getUrl = () => {
        return product.onlineStoreUrl ?? `https://shop.pucknorris.com/products/${product.title.split(" ").join("-").toLowerCase()}`
    }

    return <Link props={{
        href: getUrl(),
        child: <div className="space-y-4">
            <div className="grid place-items-center">
                <Image props={{
                    src: product.images[0].src,
                    alt: "Product Image",
                    divClass: "overflow-hidden rounded-lg grid place-items-center",
                    imgClass: "md:group-hover:scale-105 transition-all max-w-[300px]"
                }} />
            </div>
            <div className="">
                <h5 className="text-xl tracking-tight text-white md:group-hover:opacity-75 transition-opacity text-center group-hover:underline">{product.title}</h5>
                <p className="text-gray-500 font-bold text-center">${(product.variants[0].price as any)['amount']}0</p>
            </div>
        </div>,
        isExternal: true,
        className: "group"
    }} />

    // return <Link props={{
    //     href: getUrl(),
    //     child: <>
    //         <Image props={{
    //             src: product.images[0].src,
    //             alt: "Product Image",
    //             divClass: "overflow-hidden rounded-t-lg grid place-items-center",
    //             imgClass: "rounded-t-lg overflow-hidden md:group-hover:scale-105 transition-all max-h-[300px]"
    //         }} />
    //         <div className="px-5 pb-5 pt-2 mw-auto border-t border-t-bg-500 bg-bg-700 rounded-b-md">
    //             <h5 className="text-2xl font-semibold tracking-tight text-white md:group-hover:opacity-75 transition-opacity">{product.title}</h5>
    //             <p className="text-gray-400 md:group-hover:opacity-75 transition-opacity pb-2">{product.description.length > 100 ? product.description.substring(0, 100) + "..." : product.description}</p>
    //             <div className="flex justify-between items-center md:group-hover:opacity-75 transition-opacity">
    //                 <p className="text-3xl font-bold text-white">${(product.variants[0].price as any)['amount']}0</p>
    //                 <p className="text-main">
    //                     Learn More &rarr;
    //                 </p>
    //             </div>
    //         </div>
    //     </>,
    //     isExternal: true,
    //     className: "w-full max-w-sm bg-white rounded-lg border border-bg-500 group h-full flex flex-col justify-between"
    // }} />

}

export default ProductCell