import { Dialog, Button, Input, Label } from "@px-ui/core";

export function DialogFormDemo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={(props) => <Button {...props}>Create Project</Button>} />
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.HeaderContent>
            <Dialog.Title>Create New Project</Dialog.Title>
            <Dialog.Description>
              Enter the details for your new project.
            </Dialog.Description>
          </Dialog.HeaderContent>
        </Dialog.Header>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input id="project-name" placeholder="My Awesome Project" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="project-description">Description</Label>
            <Input
              id="project-description"
              placeholder="A brief description of your project"
            />
          </div>
        </div>
        <Dialog.Footer>
          <Dialog.Close render={(props) => <Button {...props} variant="outline">Cancel</Button>} />
          <Button>Create Project</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
