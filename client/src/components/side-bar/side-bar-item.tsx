"use client";

import {usePathname, useRouter} from "next/navigation";
import type {ReactNode} from "react";
import {cn} from "@/lib/utils";

interface SidebarItemProps {
    readonly icon: ReactNode;
    readonly text: string;
    readonly route: string;
}

export function SidebarItem({icon, text, route}: SidebarItemProps) {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = pathname === route;

    const handleClick = () => {
        router.push(route);
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "group relative flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium transition-all duration-300 ease-in-out",
                "text-muted-foreground hover:text-foreground",
                "hover:bg-accent/50 hover:shadow-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "active:scale-[0.98]",
                isActive && [
                    "bg-primary text-primary-foreground shadow-md",
                    "hover:bg-primary hover:text-primary-foreground hover:shadow-lg",
                    "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1 before:rounded-r-full before:bg-primary-foreground/30"
                ]
            )}
        >
            <span className={cn(
                "transition-transform duration-300 ease-in-out",
                "group-hover:scale-110",
                isActive && "scale-110"
            )}>
                {icon}
            </span>
            <span className="truncate">{text}</span>
        </button>
    );
}
