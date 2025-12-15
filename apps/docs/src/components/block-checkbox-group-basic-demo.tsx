import { BlockCheckboxGroup } from "@px-ui/core";

export function BlockCheckboxGroupBasicDemo() {
  return (
    <BlockCheckboxGroup.Group defaultValue={["email"]}>
      <BlockCheckboxGroup.Item value="email">
        <BlockCheckboxGroup.Header>
          <BlockCheckboxGroup.Title>Email Notifications</BlockCheckboxGroup.Title>
        </BlockCheckboxGroup.Header>
        <BlockCheckboxGroup.Description>
          Receive notifications via email when there's activity on your account
        </BlockCheckboxGroup.Description>
      </BlockCheckboxGroup.Item>

      <BlockCheckboxGroup.Item value="sms">
        <BlockCheckboxGroup.Header>
          <BlockCheckboxGroup.Title>SMS Notifications</BlockCheckboxGroup.Title>
        </BlockCheckboxGroup.Header>
        <BlockCheckboxGroup.Description>
          Get text messages for important updates and alerts
        </BlockCheckboxGroup.Description>
      </BlockCheckboxGroup.Item>
    </BlockCheckboxGroup.Group>
  );
}
