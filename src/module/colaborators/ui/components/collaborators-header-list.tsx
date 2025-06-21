"use client"; 

import { useState } from "react";

import CollaboratorDialog from "./collaborator-dialog";

const CollaboratorHeaderList = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <p className="text-xl font-medium">Collaborators</p>
      <CollaboratorDialog open={dialogOpen} handleOpenChange={setDialogOpen} />
    </div>
  );
};
 
export default CollaboratorHeaderList;
