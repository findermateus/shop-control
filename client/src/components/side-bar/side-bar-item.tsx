// components/ui/sidebar-item.tsx

"use client"

import { usePathname, useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
    icon: ReactNode
    text: string
    route: string
}

export function SidebarItem({ icon, text, route }: SidebarItemProps) {
    const router = useRouter() // Hook para navegação
    const pathname = usePathname() // Hook para ler a URL atual

    // O item está ativo se a URL atual for a mesma da sua rota
    const isActive = pathname === route

    const handleClick = () => {
        router.push(route) // Navega para a rota do item
    }

    return (
        <button
            onClick={handleClick}
            className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50",
                isActive && // Usa a variável 'isActive' para o estilo
                "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
            )}
        >
            {icon}
            <span className="font-medium">{text}</span>
        </button>
    )
}