import { FormInput } from "@px-ui/forms";
import { useForm } from "react-hook-form";
import { Button } from "@px-ui/core";

interface FormData {
  email: string;
  age: string;
}

export default function FormInputValidationDemo() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      age: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert(`Form is valid!\nEmail: ${data.email}\nAge: ${data.age}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
      <FormInput
        control={control}
        name="email"
        label="Email"
        description="We'll never share your email"
        required
      />
      <FormInput
        control={control}
        name="age"
        label="Age"
        description="Must be 18 or older"
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
