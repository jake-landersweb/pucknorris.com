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
                    imgClass: "md:group-hover:scale-105 transition-all max-w-[200px]"
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

}

export default ProductCell