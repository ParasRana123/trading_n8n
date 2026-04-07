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
import type { PriceTriggerMetadata } from "@/nodes/triggers/PriceTrigger";
import type { TimerNodeMetadata } from "@/nodes/triggers/Timers";
import { Input } from "./ui/input";

const SUPPORTED_TRIGGERS = [{
    id: "timer-trigger",
    title: "Timer",
    description: "Run this trgger every x second/minutes",
} , {
    id : "price-trigger",
    title: "price-trigger",
    description: "Run this trigger when the price of an asset goes above/below a certain number for an asset",
}]

const SUPPORTED_ASSETS = [
  { id: "SOL" },
  { id: "BTC" },
  { id: "ETH" },
];

export const TriggerSheet = ({
    onSelect,
}: {
    onSelect: (args: { kind: NodeKind; metadata: NodeMetadata }) => void;
}) => {
    const [metadata, setMetadata] = useState<PriceTriggerMetadata | TimerNodeMetadata>({
        time: 3600,
    });
    const [selectTrigger, setSelectTrigger] = useState(SUPPORTED_TRIGGERS[0].id);
    return <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Choose a trigger type to add to your workflow.
          </SheetDescription>
        </SheetHeader>
        <Select value={selectTrigger} onValueChange={(value) => setSelectTrigger(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a trigger" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {SUPPORTED_TRIGGERS.map(({id , title}) => <>
          <SelectItem key={id} value={id}>{title}</SelectItem>
          {/* <SelectLabel>{description}</SelectLabel> */}
          </>)}
        </SelectGroup>
      </SelectContent>
    </Select>
    {selectTrigger == "timer-trigger" && <div>
      <div className="pt-4">
        Number of seconds after which to run the timer:
      </div>
      <Input value={metadata.time} onChange={(e) => setMetadata(metadata => ({
        ...metadata,
        time: Number(e.target.value),
      }))}></Input>
    </div> }
    {selectTrigger == "price-trigger" && <div>
      Price:
      <Input type="text" onChange={(e) => setMetadata(m => ({
        ...m,
        price: Number(e.target.value),
      }))}></Input>
      <Select value={metadata.asset} onValueChange={(value) => setMetadata(metadata => ({
        ...metadata,
        asset: value,
      }))}>
       <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an asset" />
       </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {SUPPORTED_ASSETS.map(({id}) => <>
          <SelectItem key={id} value={id}>{id}</SelectItem>
          {/* <SelectLabel>{description}</SelectLabel> */}
          </>)}
        </SelectGroup>
       </SelectContent>
      </Select>
    </div> }
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
