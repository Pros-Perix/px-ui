import { FormInput, FormTextarea, FormCheckbox } from "@px-ui/forms";
import { useForm } from "react-hook-form";
import { Button } from "@px-ui/core";

interface FormData {
  name: string;
  email: string;
  message: string;
  subscribe: boolean;
}

export default function FormMixedDemo() {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      subscribe: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert(JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      <FormInput
        control={control}
        name="name"
        label="Name"
        description="Your full name"
        required
      />
      <FormInput
        control={control}
        name="email"
        label="Email"
        description="We'll never share your email"
        required
      />
      <FormTextarea
        control={control}
        name="message"
        label="Message"
        description="Tell us what you think"
        required
      />
      <FormCheckbox
        control={control}
        name="subscribe"
        label="Subscribe to updates"
        description="Receive occasional updates from us"
      />
      <div className="flex gap-2">
        <Button type="submit">Submit</Button>
        <Button type="button" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </form>
  );
}
