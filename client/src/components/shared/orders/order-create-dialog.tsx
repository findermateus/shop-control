import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import {Customer} from "@/lib/types/customers";

interface OrderCreateDialogProps {
    trigger: React.ReactNode;
    customers: Customer[];
}

export default function OrderCreateDialog(props: OrderCreateDialogProps) {
    const { trigger } = props;
    return (
        <Modal
            title="Criar Novo Pedido"
            trigger={trigger}
            dialogContent={<DialogContent />}
        />
    );
}

const DialogContent = () => {
 return (
        <div className="grid w-full items-center gap-3">
            <div className="flex gap-2 justify-end mt-2 w-full">
                <Button
                    onClick={() => {
                        console.log('Criar pedido - ação não implementada');
                    }}
                >
                    Criar Pedido
                </Button>
            </div>
        </div>
    );
};

