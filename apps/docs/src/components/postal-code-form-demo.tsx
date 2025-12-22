import { useForm, Controller } from "react-hook-form";
import { Button } from "@px-ui/core";
import {
  PostalCodeInput,
  PostalCodeLabel,
  usePostalCodeField,
} from "@px-ui/forms";

interface FormData {
  postalCode: string;
}

export default function PostalCodeFormDemo() {
  const country = "Canada";
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: { postalCode: "" },
  });

  const { regex, hint } = usePostalCodeField({ countryAbbr: country });

  const onSubmit = (data: FormData) => {
    console.log(`Country: ${country}, postal code: ${data.postalCode}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-3"
    >
      <div className="flex flex-col gap-1">
        <PostalCodeLabel patternHint={hint}>
          ZIP/Postal Code ({country})
        </PostalCodeLabel>
        <Controller
          control={control}
          name="postalCode"
          rules={{
            required: "Postal code is required",
            pattern: {
              value: regex,
              message: hint
                ? `Use a postal code like ${hint}`
                : "Enter a valid postal code",
            },
          }}
          render={({ field }) => (
            <PostalCodeInput
              {...field}
              country={country}
              placeholder="Enter ZIP/Postal Code"
              invalid={!!errors.postalCode}
            />
          )}
        />
        {errors.postalCode ? (
          <p className="text-ppx-xs text-ppx-red-5">
            {errors.postalCode.message}
          </p>
        ) : null}
      </div>

      <Button type="submit">Validate</Button>
    </form>
  );
}

