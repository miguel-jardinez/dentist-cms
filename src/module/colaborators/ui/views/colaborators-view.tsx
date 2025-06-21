"use client";

import CollaboratorList from "../components/collaborator-list";
import CollaboratorHeaderList from "../components/collaborators-header-list";

const ColaboratorsView = () => (
  <div>
    <CollaboratorHeaderList />
    <CollaboratorList />
  </div>
);
 
export default ColaboratorsView;
