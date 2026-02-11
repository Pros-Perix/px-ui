import { useEffect } from "react";
import { XMainIntake, type Suggestion } from "./x-main-intake";
import { XMessageContainer } from "./x-message-container";
import { XWelcome } from "./x-welcome";
import { useXandi } from "../context/xandi-context";
import type { XandiUIMode } from "../context/xandi-context";

export interface XandiProps {
  welcomeMessage?: string;
  suggestions?: Suggestion[];
  uiMode?: XandiUIMode;
}

export function Xandi({
  welcomeMessage = "How can I help you today?",
  suggestions = [],
  uiMode,
}: XandiProps) {
  const { conversation, setUiModeOverride } = useXandi();

  useEffect(() => {
    setUiModeOverride(uiMode ?? null);
    return () => setUiModeOverride(null);
  }, [uiMode, setUiModeOverride]);
  const isEmpty = conversation.messages.length === 0;

  return (
    <div className="flex flex-col">
      {isEmpty ? (
        <XWelcome message={welcomeMessage} />
      ) : (
        <XMessageContainer />
      )}
      <XMainIntake suggestions={isEmpty ? suggestions : []} />
    </div>
  );
}
