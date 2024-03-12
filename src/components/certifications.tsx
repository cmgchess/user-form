import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/datepicker";
import { format } from "date-fns";

export type CertificationsData = {
  name: string;
  organisation: string;
  expiryDate: string;
};

export function Certifications(props: {
  data: CertificationsData;
  position: number;
  onChange: (newData: CertificationsData) => void;
  onRemove: () => void;
}) {
  const handleChange = (
    field: keyof CertificationsData,
    value: string | number
  ) => {
    props.onChange({ ...props.data, [field]: value });
  };

  const handleExpiryDate = (date: Date) => {
    props.onChange({ ...props.data, expiryDate: format(date, "yyyy-MM-dd") });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>Certification {props.position + 1}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label>Name</Label>
            <Input
              value={props.data.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Organisation</Label>
            <Textarea
              value={props.data.organisation}
              onChange={(e) => handleChange("organisation", e.target.value)}
              placeholder="Organisation"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Expiry Date</Label>
            <DatePicker
              fromYear={new Date().getFullYear() - 100}
              toYear={new Date().getFullYear() + 10}
              onSelectDate={handleExpiryDate}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          className="bg-red-500 hover:bg-red-700 text-white"
          variant="default"
          onClick={props.onRemove}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
