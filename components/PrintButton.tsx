"use client";
import React from "react";
import { Button } from "./ui/button";
import { Printer } from "lucide-react";

const PrintButton = () => {
  return (
    <Button
      className="print:hidden"
      variant={"outline"}
      onClick={() => window.print()}
    >
      <Printer className="mr-2 h-4 w-4" />
      Print
    </Button>
  );
};

export default PrintButton;
