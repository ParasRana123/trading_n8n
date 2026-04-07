import type { NodeKind } from "./CreateWorkflow";
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import type { NodeMetadata } from "./CreateWorkflow";

const SUPPORTED_TRIGGERS = [{
    id: "timer",
    title: "Timer",
    description: "Run this trgger every x second/minutes",
} , {
    id : "price",
    title: "price-trigger",
    description: "Run this trigger when the price of an asset goes above/below a certain number for an asset",
}]

export const TriggerSheet = ({
    onSelect,
}: {
    onSelect: (args: { kind: NodeKind; metadata: NodeMetadata }) => void;
}) => {
    const [metadata, setMetadata] = useState({});
    const [selectTrigger, setSelectTrigger] = useState(SUPPORTED_TRIGGERS[0].id);
    return <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Choose a trigger type to add to your workflow.
          </SheetDescription>
        </SheetHeader>
        <Select value={selectTrigger}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {SUPPORTED_TRIGGERS.map(({id , title}) => <>
          <SelectItem key={id} onSelect={() => setSelectTrigger(id)} value={id}>{title}</SelectItem>
          {/* <SelectLabel>{description}</SelectLabel> */}
          </>)}
        </SelectGroup>
      </SelectContent>
    </Select>
        <SheetFooter>
          <Button onClick={() => {
            onSelect({
              kind: selectTrigger as NodeKind,
              metadata,
            })
          }} type="submit">Create Trigger</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
};
