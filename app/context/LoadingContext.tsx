'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type LoadingContextType = {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    hasLoaded: boolean; // To track if the initial load has finished
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setHasLoaded(true);
        }
    }, [isLoading]);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, hasLoaded }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
