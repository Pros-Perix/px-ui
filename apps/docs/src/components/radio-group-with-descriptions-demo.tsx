import { RadioGroup } from "@px-ui/core";

export function RadioGroupWithDescriptionsDemo() {
  return (
    <RadioGroup.Group defaultValue="card">
      <div className="flex items-start gap-3">
        <RadioGroup.Item value="card" id="payment-card" className="mt-0.5" />
        <div className="flex flex-col gap-1">
          <label
            htmlFor="payment-card"
            className="text-ppx-sm cursor-pointer font-medium"
          >
            Credit Card
          </label>
          <p className="text-ppx-xs text-ppx-neutral-11">
            Pay with your credit or debit card
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <RadioGroup.Item
          value="paypal"
          id="payment-paypal"
          className="mt-0.5"
        />
        <div className="flex flex-col gap-1">
          <label
            htmlFor="payment-paypal"
            className="text-ppx-sm cursor-pointer font-medium"
          >
            PayPal
          </label>
          <p className="text-ppx-xs text-ppx-neutral-11">
            Pay securely with your PayPal account
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <RadioGroup.Item value="bank" id="payment-bank" className="mt-0.5" />
        <div className="flex flex-col gap-1">
          <label
            htmlFor="payment-bank"
            className="text-ppx-sm cursor-pointer font-medium"
          >
            Bank Transfer
          </label>
          <p className="text-ppx-xs text-ppx-neutral-11">
            Transfer directly from your bank account
          </p>
        </div>
      </div>
    </RadioGroup.Group>
  );
}
