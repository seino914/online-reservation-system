import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import React from "react";
import { Button } from "./button";



export const Fixture = {
    back: (
      <Button.Back>
        <ChevronLeftIcon className="size-5" />
      </Button.Back>
    ),
    basic: () => <Button.Basic>Button.Basic</Button.Basic>,
    primary: <Button.Basic color="primary">Button.Basic</Button.Basic>,
    secondary: <Button.Basic color="secondary">Button.Basic</Button.Basic>,
  };
  export default Fixture;