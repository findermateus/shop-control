import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "./dialog";

interface ModalProps {
    readonly trigger: React.ReactNode;
    readonly dialogContent: React.ReactNode;
    readonly title?: string;
    readonly className?: string;
}

export default function Modal(props: ModalProps) {
    const {trigger, dialogContent, title} = props;
    return <Dialog>
        <DialogTrigger asChild>
            {trigger}
        </DialogTrigger>
        <DialogContent className={props.className ?? ""}>
            <DialogHeader>
                <DialogTitle>
                    {title}
                </DialogTitle>
            </DialogHeader>
            {dialogContent}
        </DialogContent>
    </Dialog>
}