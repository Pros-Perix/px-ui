import { XMainIntake, type Suggestion } from "./x-main-intake";
import { XMessageContainer } from "./x-message-container";
import { XWelcome } from "./x-welcome";
import { useXandi } from "../context/xandi-context";

export interface XandiProps {
  welcomeMessage?: string;
  suggestions?: Suggestion[];
}

export function Xandi({
  welcomeMessage = "How can I help you today?",
  suggestions = [],
}: XandiProps) {
  const { conversation } = useXandi();
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
