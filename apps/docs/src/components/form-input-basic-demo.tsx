import { FormInput } from "@px-ui/forms";
import { useForm } from "react-hook-form";
import { Button } from "@px-ui/core";

interface FormData {
  email: string;
  username: string;
}

export default function FormInputBasicDemo() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: "",
      username: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert(`Email: ${data.email}\nUsername: ${data.username}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
      <FormInput
        control={control}
        name="email"
        label="Email"
        description="Enter your email address"
      />
      <FormInput
        control={control}
        name="username"
        label="Username"
        description="Choose a unique username"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
