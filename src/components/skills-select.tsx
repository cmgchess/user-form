"use client";

import { useState, useCallback, useRef, KeyboardEvent } from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { skills } from "@/lib/data";

export type Technology = Record<"value" | "label", string>;
const SKILLS = skills.map((skill) => ({
  label: skill,
  value: skill,
})) satisfies Technology[];

export function SkillsSelect({
  onSkillSelect,
  onSkillUnselect,
}: {
  onSkillSelect: (selectedSkills: Technology[]) => void;
  onSkillUnselect: (removedSkill: Technology) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Technology[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleUnselect = useCallback(
    (technology: Technology) => {
      setSelected((prev) => prev.filter((s) => s.value !== technology.value));
      onSkillUnselect(technology);
    },
    [onSkillUnselect]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              const popped = newSelected.pop();
              if (popped) {
                onSkillUnselect(popped);
              }
              return newSelected;
            });
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [onSkillUnselect]
  );

  const selectables = SKILLS.filter(
    (technology) => !selected.includes(technology)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((technology) => {
            return (
              <Badge key={technology.value} variant="secondary">
                {technology.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(technology);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(technology)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select Skills..."
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-64 overflow-auto">
              {selectables.map((technology) => {
                return (
                  <CommandItem
                    key={technology.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      setInputValue("");
                      setSelected((prev) => [...prev, technology]);
                      onSkillSelect([...selected, technology]);
                    }}
                    className={"cursor-pointer"}
                  >
                    {technology.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
