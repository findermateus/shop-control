import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getAuthorizationToken } from '@/lib/auth.server'

export default async function NotFound() {
    const token = await getAuthorizationToken()
    const isAuthenticated = !!token

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
            <Card className="max-w-2xl w-full p-8 md:p-12 text-center shadow-lg">
                <div className="space-y-6">
                    <div className="relative">
                        <h1 className="text-[120px] md:text-[160px] font-bold text-primary/10 select-none leading-none">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-primary/5 rounded-full p-8 md:p-12">
                                <svg
                                    className="w-16 h-16 md:w-20 md:h-20 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            Página Não Encontrada
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-md mx-auto">
                            Desculpe, a página que você está procurando não existe ou foi movida.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        {isAuthenticated ? (
                            <>
                                <Button asChild size="lg" className="font-semibold">
                                    <Link href="/manager/dashboard">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                            />
                                        </svg>
                                        Ir para Dashboard
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="font-semibold">
                                    <Link href="/manager/stock">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                            />
                                        </svg>
                                        Ver Estoque
                                    </Link>
                                </Button>
                            </>
                        ) : (
                            <Button asChild size="lg" className="font-semibold">
                                <Link href="/login">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    Fazer Login
                                </Link>
                            </Button>
                        )}
                    </div>

                    {isAuthenticated && (
                        <div className="pt-6 border-t border-border/50">
                            <p className="text-sm text-muted-foreground mb-3">
                                Ou navegue para outras páginas:
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                <Button asChild variant="ghost" size="sm">
                                    <Link href="/manager/customers">Clientes</Link>
                                </Button>
                                <Button asChild variant="ghost" size="sm">
                                    <Link href="/manager/stock">Estoque</Link>
                                </Button>
                                <Button asChild variant="ghost" size="sm">
                                    <Link href="/manager/orders">Pedidos</Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}