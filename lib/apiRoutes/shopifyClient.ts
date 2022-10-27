import Client from "shopify-buy";

const shopifyClient = Client.buildClient({
    storefrontAccessToken: process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN!,
    domain: process.env.SHOPIFY_STORE_DOMAIN!,
});

export default shopifyClient