'use client'

import React, { createContext, useContext, useState } from 'react'

type LoadingContextType = {
    isLoading: boolean
    setLoading: (value: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
            {children}
            {isLoading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pointer-events-auto">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
            )}

        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const context = useContext(LoadingContext)
    if (!context) throw new Error('useLoading must be used within LoadingProvider')
    return context
}
