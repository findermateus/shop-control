import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

interface ModalProps {
    readonly trigger: React.ReactNode;
    readonly dialogContent: React.ReactNode;
    readonly title?: string;
}

export default function Modal(props: ModalProps) {
    const { trigger, dialogContent, title } = props;
    return <Dialog>
        <DialogTrigger asChild>
            {trigger}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {title}
                </DialogTitle>
            </DialogHeader>
            <div className="space-y-2 max-h-64 overflow-y-auto">
                {dialogContent}
            </div>
        </DialogContent>
    </Dialog >
}