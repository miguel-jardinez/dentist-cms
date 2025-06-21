import { PlusIcon } from "lucide-react";

import { Button } from "@dentist/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@dentist/components/ui/dialog";

import CollaboratorForm from "./collaborator-form";

type CollaboratorDialogProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
};

const CollaboratorDialog = ({ open, handleOpenChange }: CollaboratorDialogProps) => (
  <Dialog open={open} onOpenChange={handleOpenChange}>
    <DialogTrigger asChild>
      <Button>
        <PlusIcon />
        Add Collaborator
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Collaborator</DialogTitle>
        <DialogDescription>Add a new collaborator to your organization.</DialogDescription>
      </DialogHeader>
      <CollaboratorForm onCancel={() => handleOpenChange(false)} onSuccess={() => handleOpenChange(false)} />
    </DialogContent>
  </Dialog>
);
 
export default CollaboratorDialog;
