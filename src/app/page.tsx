"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/datepicker";
import { DesignationSelect } from "@/components/designation-select";
import { CountrySelect } from "@/components/country-select";
import { SkillsSelect, Technology } from "@/components/skills-select";
import {
  WorkExperience,
  WorkExperienceData,
} from "@/components/work-experience";
import { Button } from "@/components/ui/button";
import {
  Certifications,
  CertificationsData,
} from "@/components/certifications";
import { useState } from "react";
import { format } from "date-fns";

type FormData = {
  fullname: string;
  summary: string;
  birthday: string;
  email: string;
  telephone: string;
  designationCategory: string;
  country: string;
  technologies: string[];
  additionalTechnologies: string;
  workExperiences: WorkExperienceData[];
  certifications: CertificationsData[];
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    summary: "",
    birthday: "",
    email: "",
    telephone: "",
    designationCategory: "",
    country: "",
    technologies: [],
    additionalTechnologies: "",
    workExperiences: [
      {
        employerName: "",
        description: "",
        startYear: new Date().getFullYear(),
        startMonth: new Date().getMonth() + 1,
        endYear: new Date().getFullYear(),
        endMonth: new Date().getMonth() + 1,
      },
    ],
    certifications: [{ name: "", organisation: "", expiryDate: "" }],
  });

  const handleChange = (
    field: "workExperiences" | "certifications",
    id: number,
    newData: WorkExperienceData | CertificationsData
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: prevData[field].map((entry, index) =>
        index === id ? newData : entry
      ),
    }));
  };

  const handleBirthdaySelect = (selectedDate: Date) => {
    const date = format(selectedDate, "yyyy-MM-dd");
    setFormData({ ...formData, birthday: date });
  };

  const handleSkillSelect = (selectedSkills: Technology[]) => {
    setFormData((prevData) => ({
      ...prevData,
      technologies: selectedSkills.map((skill) => skill.value),
    }));
  };

  const handleSkillUnselect = (removedSkill: Technology) => {
    setFormData((prevData) => ({
      ...prevData,
      technologies: prevData.technologies.filter(
        (skill) => skill !== removedSkill.value
      ),
    }));
  };

  const handleDesignationSelect = (selectedDesignation: string) => {
    setFormData({ ...formData, designationCategory: selectedDesignation });
  };

  const handleCountrySelect = (selectedCountry: string) => {
    setFormData({ ...formData, country: selectedCountry });
  };

  const handleAddMore = (field: "workExperiences" | "certifications") => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [
        ...prevData[field],
        field === "workExperiences"
          ? {
              employerName: "",
              description: "",
              startYear: new Date().getFullYear(),
              startMonth: new Date().getMonth() + 1,
              endYear: new Date().getFullYear(),
              endMonth: new Date().getMonth() + 1,
            }
          : { name: "", organisation: "", expiryDate: "" },
      ],
    }));
  };

  const handleRemove = (
    field: "workExperiences" | "certifications",
    id: number
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: prevData[field].filter((entry, index) => index !== id),
    }));
  };

  const handleFormDataSubmit = () => {
    console.log(formData);
  };

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="text-4xl font-bold">User Data Form</h1>

      <div className="flex flex-col gap-5 w-full p-10">
        <div className="flex flex-col gap-5">
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            id="fullname"
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
            placeholder="Full Name"
          />
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
            placeholder="Summary"
          />
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="birthday">Birthday</Label>
          <DatePicker
            fromYear={new Date().getFullYear() - 100}
            toYear={new Date().getFullYear()}
            onSelectDate={handleBirthdaySelect}
          />
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="email">Email</Label>
          <Input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            id="email"
            placeholder="Email"
            type="email"
          />
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="telephone">Telephone</Label>
          <Input
            value={formData.telephone}
            onChange={(e) =>
              setFormData({ ...formData, telephone: e.target.value })
            }
            id="telephone"
            placeholder="Telephone"
            type="tel"
          />
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="designation-category">Designation Category</Label>
          <DesignationSelect onDesignationSelect={handleDesignationSelect} />
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="country">Country</Label>
          <CountrySelect onCountrySelect={handleCountrySelect} />
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="technologies">Technologies</Label>
          <SkillsSelect
            onSkillSelect={handleSkillSelect}
            onSkillUnselect={handleSkillUnselect}
          />
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="technologies">Additional Technologies</Label>
          <Input
            value={formData.additionalTechnologies}
            onChange={(e) =>
              setFormData({
                ...formData,
                additionalTechnologies: e.target.value,
              })
            }
            id="technologies"
            placeholder="Additional Technologies"
          />
        </div>

        <div className="flex flex-col gap-5">
          <Label htmlFor="work-experiences">Work Experiences</Label>
          {formData.workExperiences.map((entry, idx) => (
            <WorkExperience
              key={idx}
              data={entry}
              position={idx}
              onChange={(newData) =>
                handleChange("workExperiences", idx, newData)
              }
              onRemove={() => handleRemove("workExperiences", idx)}
            />
          ))}
          <Button
            className="w-24 bg-green-500 hover:bg-green-700 text-white"
            size="sm"
            onClick={() => handleAddMore("workExperiences")}
          >
            + Add More
          </Button>
        </div>

        <div className="flex flex-col gap-5">
          <Label htmlFor="certifications">Certifications</Label>
          {formData.certifications.map((entry, idx) => (
            <Certifications
              key={idx}
              data={entry}
              position={idx}
              onChange={(newData) =>
                handleChange("certifications", idx, newData)
              }
              onRemove={() => handleRemove("certifications", idx)}
            />
          ))}
          <Button
            className="w-24 bg-green-500 hover:bg-green-700 text-white"
            size="sm"
            onClick={() => handleAddMore("certifications")}
          >
            + Add More
          </Button>
        </div>

        <div className="flex justify-center mt-5">
          <Button
            onClick={handleFormDataSubmit}
            className="w-32 bg-blue-500 hover:bg-blue-700 text-white"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
