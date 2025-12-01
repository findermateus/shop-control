import OrdersPage from "@/components/shared/orders/orders-page";
import {getOrders} from "@/lib/orders";
import {fetchCustomers} from "@/lib/customers";
import {fetchAvailableProducts} from "@/lib/products";

export default async function Page() {
    const orders = await getOrders();
    const customers = await fetchCustomers();
    const products = await fetchAvailableProducts();
    return <OrdersPage orders={orders} customers={customers} products={products} />;
}
