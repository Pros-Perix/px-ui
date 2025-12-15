import { FormCheckbox } from "@px-ui/forms";
import { useForm } from "react-hook-form";
import { Button } from "@px-ui/core";

interface FormData {
  acceptTerms: boolean;
  newsletter: boolean;
  notifications: boolean;
}

export default function FormCheckboxBasicDemo() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      acceptTerms: false,
      newsletter: false,
      notifications: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert(
      `Terms: ${data.acceptTerms}\nNewsletter: ${data.newsletter}\nNotifications: ${data.notifications}`,
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      <FormCheckbox
        control={control}
        name="acceptTerms"
        label="Accept terms and conditions"
        description="You must accept the terms to continue"
        required
      />
      <FormCheckbox
        control={control}
        name="newsletter"
        label="Subscribe to newsletter"
        description="Receive weekly updates and news"
      />
      <FormCheckbox
        control={control}
        name="notifications"
        label="Enable notifications"
        description="Get notified about important updates"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
