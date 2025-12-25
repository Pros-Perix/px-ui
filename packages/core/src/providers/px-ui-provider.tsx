import { createContext } from "react";
import { AnchoredToastProvider, ToastProvider } from "../components/toast";

const PXUIContext = createContext(null);

export function PXUIProvider(props: React.PropsWithChildren) {
  return (
    <PXUIContext.Provider value={null}>
      <ToastProvider>
        <AnchoredToastProvider>{props.children}</AnchoredToastProvider>
      </ToastProvider>
    </PXUIContext.Provider>
  );
}
