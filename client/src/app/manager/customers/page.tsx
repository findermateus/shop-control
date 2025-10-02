import CustomersPage from "@/components/shared/customers/customers-page";
import { mockCustomers, getMockCustomerStats } from "@/lib/mock-customers";

export default function Page() {
    const customers = mockCustomers;
    const stats = getMockCustomerStats();
    
    return <CustomersPage customers={customers} stats={stats} />;
}