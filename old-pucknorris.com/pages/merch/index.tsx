import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import BoundsWrapper from "../../components/boundsWrapper";
import Label from "../../components/label";
import Link from "../../components/link";
import MerchView from "../../components/merch/merchView";
import { client } from "../../utils/shopify-client";

export const getServerSideProps: GetServerSideProps = async (context) => {
    // wrap all calls in a promise to run concurrently, 3x speed gain
    const response = await client.product.fetchAll();

    return {
        props: {
            products: JSON.parse(JSON.stringify(response))
        }
    }
}

const Merch = ({ products }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <div className="">
        <div className="text-center">
            <Label className="" title={'Puck Norris Merch'} />
            <div className="grid place-items-center pb-20">
                <p className="text-lg text-gray-500 max-w-4xl pb-4">High quality merchandise to rep the most badass hockey team in the pacific northwest! Visit the shopify store for a more comprehensive experience.</p>
                <div className="">
                    <Link props={{
                        href: 'https://shop.pucknorris.com',
                        child: <>Shopify Store</>,
                        isExternal: true,
                        className: "px-4 py-2 bg-bg-700 border border-bg-500 rounded-md font-medium hover:bg-bg-500 transition-all"
                    }} />
                </div>
            </div>
            <BoundsWrapper><MerchView products={products} /></BoundsWrapper>
        </div>
    </div>
}

export default Merch