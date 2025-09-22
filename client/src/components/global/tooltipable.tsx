import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

interface TooltipableProps {
    trigger: React.ReactNode;
    content: string;
}

export default function Tooltipable({trigger, content}: TooltipableProps) {
    return <Tooltip>
        <TooltipTrigger>
            {trigger}
        </TooltipTrigger>
        <TooltipContent>
            {content}
        </TooltipContent>
    </Tooltip>
}