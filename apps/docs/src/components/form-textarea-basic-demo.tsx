import { FormTextarea } from "@px-ui/forms";
import { useForm } from "react-hook-form";
import { Button } from "@px-ui/core";

interface FormData {
  message: string;
  feedback: string;
}

export default function FormTextareaBasicDemo() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      message: "",
      feedback: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert(`Message: ${data.message}\n\nFeedback: ${data.feedback}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      <FormTextarea
        control={control}
        name="message"
        label="Message"
        description="Enter your message"
      />
      <FormTextarea
        control={control}
        name="feedback"
        label="Feedback"
        description="Your feedback helps us improve"
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
