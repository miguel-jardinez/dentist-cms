"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@dentist/trpc/client";

const FormView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.forms.getMany.queryOptions());
  
  return (
    <div>Form View</div>
  );
};
 
export default FormView;
