import OrdersPage from "@/components/shared/orders/orders-page";
import { mockOrders, getMockOrderStats } from "@/lib/mock-orders";

export default function Page() {
    const orders = mockOrders;
    const stats = getMockOrderStats();
    
    return <OrdersPage orders={orders} stats={stats} />;
}
