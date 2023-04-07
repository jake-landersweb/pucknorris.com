import Client from "shopify-buy";

const shopifyClient = Client.buildClient({
    apiVersion: "2023-01",
    storefrontAccessToken: process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN!,
    domain: process.env.SHOPIFY_STORE_DOMAIN!,
});

export default shopifyClient