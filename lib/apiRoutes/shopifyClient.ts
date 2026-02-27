import Client from "shopify-buy";

// shopify-buy accesses localStorage during initialization, which is not
// available in SSR. Use a lazy getter so buildClient() only runs in the browser.
let _client: ReturnType<typeof Client.buildClient> | null = null;

function getShopifyClient() {
    if (!_client) {
        _client = Client.buildClient({
            apiVersion: "2023-01",
            storefrontAccessToken: process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN!,
            domain: process.env.SHOPIFY_STORE_DOMAIN!,
        });
    }
    return _client;
}

export default getShopifyClient;