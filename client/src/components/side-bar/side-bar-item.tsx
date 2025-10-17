// components/ui/sidebar-item.tsx

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
                "flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all duration-200",
                "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-300",
                "dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-700",
                isActive &&
                "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50 shadow-sm"
            )}
        >
            {icon}
            <span className="truncate">{text}</span>
        </button>
    );
}
