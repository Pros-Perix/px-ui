// Demo registry - maps demo names to components and their source code
import * as React from "react";

// Button demos
import { ButtonDemo, ButtonDemoSource } from "./demos/button-demo";
import { ButtonVariantsDemo, ButtonVariantsDemoSource } from "./demos/button-variants";
import { ButtonSizesDemo, ButtonSizesDemoSource } from "./demos/button-sizes";
import { ButtonLoadingDemo, ButtonLoadingDemoSource } from "./demos/button-loading";
import { ButtonWithIconDemo, ButtonWithIconDemoSource } from "./demos/button-with-icon";

// Input demos
import { InputDemo, InputDemoSource } from "./demos/input-demo";
import { InputSizesDemo, InputSizesDemoSource } from "./demos/input-sizes";

// Checkbox demos
import { CheckboxDemo, CheckboxDemoSource } from "./demos/checkbox-demo";

// Switch demos
import { SwitchDemo, SwitchDemoSource } from "./demos/switch-demo";

// Avatar demos
import { AvatarDemo, AvatarDemoSource } from "./demos/avatar-demo";

// Spinner demos
import { SpinnerDemo, SpinnerDemoSource } from "./demos/spinner-demo";

// Textarea demos
import { TextareaDemo, TextareaDemoSource } from "./demos/textarea-demo";

// Label demos
import { LabelDemo, LabelDemoSource } from "./demos/label-demo";

// Separator demos
import { SeparatorDemo, SeparatorDemoSource } from "./demos/separator-demo";

export interface RegistryItem {
  component: React.ComponentType;
  source: string;
}

export const registry: Record<string, RegistryItem> = {
  // Button
  "button-demo": { component: ButtonDemo, source: ButtonDemoSource },
  "button-variants": { component: ButtonVariantsDemo, source: ButtonVariantsDemoSource },
  "button-sizes": { component: ButtonSizesDemo, source: ButtonSizesDemoSource },
  "button-loading": { component: ButtonLoadingDemo, source: ButtonLoadingDemoSource },
  "button-with-icon": { component: ButtonWithIconDemo, source: ButtonWithIconDemoSource },

  // Input
  "input-demo": { component: InputDemo, source: InputDemoSource },
  "input-sizes": { component: InputSizesDemo, source: InputSizesDemoSource },

  // Checkbox
  "checkbox-demo": { component: CheckboxDemo, source: CheckboxDemoSource },

  // Switch
  "switch-demo": { component: SwitchDemo, source: SwitchDemoSource },

  // Avatar
  "avatar-demo": { component: AvatarDemo, source: AvatarDemoSource },

  // Spinner
  "spinner-demo": { component: SpinnerDemo, source: SpinnerDemoSource },

  // Textarea
  "textarea-demo": { component: TextareaDemo, source: TextareaDemoSource },

  // Label
  "label-demo": { component: LabelDemo, source: LabelDemoSource },

  // Separator
  "separator-demo": { component: SeparatorDemo, source: SeparatorDemoSource },
};
