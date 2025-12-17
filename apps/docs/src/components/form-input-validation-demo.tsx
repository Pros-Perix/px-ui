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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4"
    >
      <FormInput
        control={control}
        name="email"
        label="Email"
        description="We'll never share your email"
        placeholder="Enter your email address"
        required
      />
      <FormInput
        control={control}
        name="age"
        label="Age"
        description="Must be 18 or older"
        placeholder="Enter your age"
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
