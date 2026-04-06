import type { NodeKind } from "./CreateWorkflow";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

type NodeMetadata = any;

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
    return <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Choose a trigger type to add to your workflow.
          </SheetDescription>
        </SheetHeader>
        <Select>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {SUPPORTED_TRIGGERS.map(({id , title}) => <>
          <SelectLabel>{title}</SelectLabel>
          <SelectItem onSelect={() => onSelect({
            id,
            metadata,
          })} value={id}>{title}</SelectItem>
          </>)}
        </SelectGroup>
      </SelectContent>
    </Select>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
};
