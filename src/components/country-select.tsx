import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/data";
import { useState } from "react";

const COUNTRIES = countries.map((country) => ({
  label: country,
  value: country,
}));

export function CountrySelect({
  onCountrySelect,
}: {
  onCountrySelect: (selectedCountry: string) => void;
}) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelectedCountry(value);
    onCountrySelect(value);
  };
  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Select country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Countries</SelectLabel>
          {COUNTRIES.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
