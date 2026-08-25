'use client';

import {
    createContext,
    useContext,
    useState,
    ReactNode,
    ReactElement,
    useEffect,
} from "react";


interface PrintContextValue {
    setPrintMode: (contents: ReactElement) => void;
    disablePrintMode: () => void;
}

const PrintContext = createContext<PrintContextValue | undefined>(undefined);

interface PrintProviderProps {
    children: ReactNode;
}

export function PrintService({ children }: PrintProviderProps) {

    const [ printContents, setPrintContents ] = useState<ReactElement | null>(null);

    useEffect( () => {
        if (!printContents){
            return;
        }
        print();
        //disablePrintMode();

    }, [ printContents ])


    const setPrintMode = (contents: ReactElement) => {
        setPrintContents(contents);
    }

    const disablePrintMode = () => {
        setPrintContents(null);
    }

    return (
        <PrintContext.Provider
            value={{
                setPrintMode,
                disablePrintMode,
            }}
        >
            <div className={`${printContents ? 'print:hidden' : ''}`}>
                { children }
            </div>
            <div className="print:block">
                { printContents }
            </div>

        </PrintContext.Provider>
    );
}

export function usePrintService() {
    const context = useContext(PrintContext);

    if (!context) {
        throw new Error("usePrintService must be used within a PrintProvider");
    }

    return context;
}