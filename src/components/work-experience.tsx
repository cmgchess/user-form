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

export type WorkExperienceData = {
  employerName: string;
  description: string;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
};

export function WorkExperience(props: {
  data: WorkExperienceData;
  position: number;
  onChange: (newData: WorkExperienceData) => void;
  onRemove: () => void;
}) {
  const handleChange = (
    field: keyof WorkExperienceData,
    value: string | number
  ) => {
    props.onChange({ ...props.data, [field]: value });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>Experience {props.position + 1}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label>Employer</Label>
            <Input
              onChange={(e) => handleChange("employerName", e.target.value)}
              value={props.data.employerName}
              placeholder="Employer"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Description</Label>
            <Textarea
              value={props.data.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Description"
            />
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2 items-center w-1/2">
              <div className="flex flex-row">
                <div className="flex flex-col space-y-1.5">
                  <Label>Start Year</Label>
                  <Input
                    value={props.data.startYear}
                    onChange={(e) => handleChange("startYear", +e.target.value)}
                    type="number"
                    min={1900}
                    max={2100}
                  />
                </div>
                <div className="flex flex-col ml-2 space-y-1.5">
                  <Label>Start Month</Label>
                  <Input
                    value={props.data.startMonth}
                    onChange={(e) =>
                      handleChange("startMonth", +e.target.value)
                    }
                    type="number"
                    max={12}
                    min={1}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center w-1/2">
              <div className="flex flex-row ml-auto">
                <div className="flex flex-col space-y-1.5">
                  <Label>End Year</Label>
                  <Input
                    value={props.data.endYear}
                    onChange={(e) => handleChange("endYear", +e.target.value)}
                    type="number"
                    min={1900}
                    max={2100}
                  />
                </div>
                <div className="flex flex-col ml-2 space-y-1.5">
                  <Label>End Month</Label>
                  <Input
                    value={props.data.endMonth}
                    onChange={(e) => handleChange("endMonth", +e.target.value)}
                    type="number"
                    max={12}
                    min={1}
                  />
                </div>
              </div>
            </div>
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
