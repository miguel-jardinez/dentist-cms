import { PlusIcon } from "lucide-react";

import { Button } from "@dentist/components/ui/button";

const FormListHeader = () => (
  <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
    <div className="flex items-center justify-between">
      <h5 className="font-medium text-xl">My Form</h5>
      <Button>
        <PlusIcon className="size-4" />
        New Agent
      </Button>
    </div>
    <div className="flex items-center gap-x-2 p-1">
    </div>
  </div>
);

export default FormListHeader;
