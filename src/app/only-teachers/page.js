"use client";
import { useLanguage } from "@/context/Languagecontext";

export default function OnlyTeachers() {
  const { translate } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">{translate("Only teachers can use the platform at the moment.")}</h1>
    </div>
  );
}
