import ProductCell from "./productCell"

const MerchView = ({ products }: { products: ShopifyBuy.Product[] }) => {

    var items = []

    for (var i = 0; i < products.length; i++) {
        items.push(<ProductCell product={products[i]} />)
    }

    const gridLayout = () => {
        switch (products.length) {
            case 1: return "grid-cols-1"
            case 2: return "grid-cols-1 md:grid-cols-2"
            default: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }
    }

    return <div className={`grid place-items-center gap-4 ${gridLayout()}`}>
        {items}
    </div>
}

export default MerchView