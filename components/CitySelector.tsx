"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { POPULAR_METRO_CITIES } from "@/lib/locations";

interface CitySelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CitySelector({ isOpen, onClose }: CitySelectorProps) {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem("selectedCity", city);
    router.push(`/ads?city=${encodeURIComponent(city)}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 max-h-96 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold">
            Select Your <span className="primary-text">City</span>
          </h2>
          <button
            onClick={onClose}
            className="text-3xl text-neutral-400 hover:text-neutral-600 transition"
          >
            ✕
          </button>
        </div>

        <p className="text-neutral-600 mb-6">
          Choose your city to find services near you
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {POPULAR_METRO_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => handleSelectCity(city)}
              className="p-3 rounded-xl bg-orange-50 ring-1 ring-orange-100 hover:ring-fb8500 hover:bg-gradient-to-br hover:from-fb8500 hover:to-ffb81c hover:text-white font-semibold transition-all duration-300 text-center"
            >
              {city}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 px-6 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 font-semibold transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
