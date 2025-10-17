"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarItem } from "./side-bar-item";
import { LayoutDashboard, LogOut, Package, ShoppingCart, Users } from "lucide-react";
import { Button } from "../ui/button";
import {getStoreName} from "@/lib/client-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function AppSidebar() {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (response.ok) {
                toast.success('Logout realizado com sucesso!');
                router.push('/login');
                router.refresh();
            } else {
                toast.error('Erro ao fazer logout');
            }
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            toast.error('Erro ao fazer logout');
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <header className="border-b border-border p-4">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        {getStoreName()}
                    </h2>
                </header>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <nav className="space-y-1 px-3 py-2">
                    <SidebarItem
                        icon={<LayoutDashboard className="h-5 w-5" />}
                        text="Dashboard"
                        route="/manager/dashboard"
                    />
                    <SidebarItem
                        icon={<Package className="h-5 w-5" />}
                        text="Estoque"
                        route="/manager/stock"
                    />
                    <SidebarItem
                        icon={<ShoppingCart className="h-5 w-5" />}
                        text="Pedidos"
                        route="/manager/orders"
                    />
                    <SidebarItem
                        icon={<Users className="h-5 w-5" />}
                        text="Clientes"
                        route="/manager/customers"
                    />
                </nav>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <Button
                    variant="outline"
                    className="w-full gap-2 bg-transparent hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                >
                    <LogOut className="w-4 h-4" />
                    {isLoggingOut ? 'Saindo...' : 'Sair'}
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
