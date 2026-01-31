import { FormSelect } from "@px-ui/forms";
import { useForm } from "react-hook-form";
import { Button } from "@px-ui/core";

const themeOptions = ["light", "dark", "system"] as const;

interface FormData {
  theme?: (typeof themeOptions)[number];
}

export default function FormSelectBasicDemo() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      theme: undefined,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert(`Theme: ${data.theme ?? "(none)"}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4"
    >
      <FormSelect
        control={control as any}
        name="theme"
        label="Theme"
        description="Choose how the interface appears"
        placeholder="Select a theme"
        required
        items={themeOptions}
        renderOption={(item: (typeof themeOptions)[number]) =>
          item[0]!.toUpperCase() + item.slice(1)
        }
        renderLabel={(item: (typeof themeOptions)[number]) =>
          item[0]!.toUpperCase() + item.slice(1)
        }
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

