"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarItem } from "./side-bar-item";
import { LayoutDashboard, LogOut, Package, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <header className="border-b border-gray-200 p-4 dark:border-gray-800">
                    <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Esquina Geek
                    </h2>
                </header>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <nav>
                    <SidebarItem
                        icon={<Package />}
                        text="Estoque"
                        route="/manager/stock"
                    />
                    <SidebarItem
                        icon={<LayoutDashboard />}
                        text="Dashboard"
                        route="/manager/dashboard"
                    />
                    <SidebarItem
                        icon={<ShoppingCart />}
                        text="Pedidos"
                        route="/manager/orders"
                    />
                </nav>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <Button
                    variant="outline"
                    className="w-full gap-2 bg-transparent"
                    onClick={() => {}}
                >
                    <LogOut className="w-4 h-4" />
                    Sair
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
