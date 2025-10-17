import {Button} from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import {Customer} from "@/lib/types/customers";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useState, useMemo} from "react";
import {ApiProduct} from "@/lib/types/orders";

interface OrderCreateDialogProps {
    trigger: React.ReactNode;
    customers: Customer[];
    products: ApiProduct[];
}

export default function OrderCreateDialog(props: OrderCreateDialogProps) {
    const {trigger, customers} = props;
    return (
        <Modal
            title="Criar Novo Pedido"
            trigger={trigger}
            dialogContent={<DialogContent customers={customers}/>}
        />
    );
}

interface DialogContentProps {
    customers: Customer[];
}

const DialogContent = ({customers}: DialogContentProps) => {
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
    const [selectedAddressId, setSelectedAddressId] = useState<string>("");

    const selectedCustomer = useMemo(() => {
        return customers.find(customer => String(customer.id) === selectedCustomerId);
    }, [selectedCustomerId, customers]);

    const addresses = useMemo(() => {
        return selectedCustomer?.addresses || [];
    }, [selectedCustomer]);

    return (
        <div className="grid w-full items-center gap-3">
            <Select
                name="customer"
                value={selectedCustomerId}
                onValueChange={(value) => {
                    setSelectedCustomerId(value);
                    setSelectedAddressId("");
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um cliente"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Cliente</SelectLabel>
                        {
                            customers.map(customer => (
                                <SelectItem value={String(customer.id)}
                                            key={customer.id}>{customer.name} - {customer.email}</SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select
                name="address"
                value={selectedAddressId}
                onValueChange={setSelectedAddressId}
                disabled={!selectedCustomerId || addresses.length === 0}
            >
                <SelectTrigger className="w-[462px]">
                    <SelectValue placeholder={
                        !selectedCustomerId
                            ? "Selecione um cliente primeiro"
                            : addresses.length === 0
                                ? "Cliente sem endereços cadastrados"
                                : "Selecione um endereço"
                    }/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Endereço de Entrega</SelectLabel>
                        {
                            addresses.map(address => (
                                <SelectItem value={String(address.id)} key={address.id}>
                                    {address.street}, {address.number}
                                    {address.complement && ` - ${address.complement}`}
                                    {" - "}{address.neighborhood}
                                    {" - CEP: "}{address.postal_code}
                                </SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>

            <div className="flex gap-2 justify-end mt-2 w-full">
                <Button
                    onClick={() => {
                        console.log('Criar pedido - ação não implementada');
                        console.log('Cliente ID:', selectedCustomerId);
                        console.log('Endereço ID:', selectedAddressId);
                    }}
                    disabled={!selectedCustomerId || !selectedAddressId}
                >
                    Criar Pedido
                </Button>
            </div>
        </div>
    );
};
