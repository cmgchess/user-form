import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { designationCategories } from "@/lib/data";
import { useState } from "react";

const DESIGNATION_CATEGORIES = designationCategories.map((category) => ({
  label: category,
  value: category,
}));

export function DesignationSelect({
  onDesignationSelect,
}: {
  onDesignationSelect: (selectedDesignation: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelectedCategory(value);
    onDesignationSelect(value);
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Select designation category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Designation Categories</SelectLabel>
          {DESIGNATION_CATEGORIES.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
