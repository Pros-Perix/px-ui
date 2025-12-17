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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-4"
    >
      <FormTextarea
        control={control}
        name="message"
        label="Message"
        description="Enter your message"
        placeholder="Type your message here..."
      />
      <FormTextarea
        control={control}
        name="feedback"
        label="Feedback"
        description="Your feedback helps us improve"
        placeholder="Share your thoughts and suggestions"
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
