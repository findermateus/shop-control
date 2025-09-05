import { AppSidebar } from "@/components/side-bar/side-bar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function Layout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <SidebarTrigger />
                <div className="container px-10">{children}</div>
            </main>
        </SidebarProvider>
    );
}
