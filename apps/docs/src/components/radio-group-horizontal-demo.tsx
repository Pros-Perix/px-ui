import { RadioGroup } from "@px-ui/core";

export function RadioGroupHorizontalDemo() {
  return (
    <RadioGroup.Group defaultValue="email" className="flex-row flex-wrap">
      <div className="flex items-center gap-2">
        <RadioGroup.Item value="email" id="contact-email" />
        <label htmlFor="contact-email" className="text-ppx-sm cursor-pointer">
          Email
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroup.Item value="phone" id="contact-phone" />
        <label htmlFor="contact-phone" className="text-ppx-sm cursor-pointer">
          Phone
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroup.Item value="sms" id="contact-sms" />
        <label htmlFor="contact-sms" className="text-ppx-sm cursor-pointer">
          SMS
        </label>
      </div>
    </RadioGroup.Group>
  );
}
