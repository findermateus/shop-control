import OrdersPage from "@/components/shared/orders/orders-page";
import {getOrders} from "@/lib/orders";
import {fetchCustomers} from "@/lib/customers";

export default async function Page() {
    const orders = await getOrders();
    const customers = await fetchCustomers();
    return <OrdersPage orders={orders} customers={customers} />;
}
