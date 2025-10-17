import OrdersPage from "@/components/shared/orders/orders-page";
import {getOrders} from "@/lib/orders";

export default async function Page() {
    const orders = await getOrders();
    return <OrdersPage orders={orders} />;
}
