import * as React from "react";

interface SendInviteProps {
  invitationId: string;
}

export const SendInvite: React.FC<Readonly<SendInviteProps>> = ({
  invitationId
}) => (
  <div>
    <h1>Welcome, {invitationId}</h1>
  </div>
);
