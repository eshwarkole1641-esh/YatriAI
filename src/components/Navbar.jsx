import React from "react";
import { Compass, Key, IndianRupee, MapPin, Bookmark, HardDrive } from "lucide-react";

export default function Navbar({
  onSelectPreset,
  onOpenSettings,
  onOpenSavedTrips,
  savedTripsCount = 0,
  hasApiKey
}) {
  const presets = [
    { label: "Telangana → Dharamshala (₹13k)", originState: "Telangana", originCity: "Hyderabad", dest: "Dharamshala & McLeod Ganj", budget: 13000, days: 5 },
    { label: "Bengaluru → Gokarna (₹8.5k)", originState: "Karnataka", originCity: "Bengaluru", dest: "Gokarna Beach Trail", budget: 8500, days: 4 },
    { label: "Delhi → Kasol (₹7.5k)", originState: "Delhi NCR", originCity: "New Delhi", dest: "Kasol, Tosh & Parvati Valley", budget: 7500, days: 4 },
    { label: "Mumbai → Hampi (₹8k)", originState: "Maharashtra", originCity: "Mumbai", dest: "Hampi: Ruins & Hippie Island", budget: 8000, days: 3 }
  ];

  return (
    <header className="navbar no-print">
      <div className="container nav-container">
        {/* Logo */}
        <div className="nav-brand">
          <div className="brand-icon">
            <Compass className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="brand-title">
              Yatri<span className="gradient-text">AI</span>
            </div>
            <span className="brand-tagline">Student Backpacking Planner</span>
          </div>
          <span className="badge badge-emerald student-badge" title="Powered by browser Local Storage">
            <HardDrive className="w-3 h-3 inline mr-1" /> LocalStorage
          </span>
        </div>

        {/* Quick Presets */}
        <div className="nav-presets">
          <span className="presets-label">Popular Trips:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              className="preset-btn"
              onClick={() => onSelectPreset(p)}
              title={`Load plan for ${p.label}`}
            >
              <MapPin className="preset-icon" />
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Saved Trips Trigger */}
          <button
            className={`saved-trips-nav-btn ${savedTripsCount > 0 ? "has-saved" : ""}`}
            onClick={onOpenSavedTrips}
            title="Open Saved Trips (Local Storage)"
          >
            <Bookmark className="w-4 h-4 text-emerald-400" />
            <span>Saved Trips</span>
            <span className="saved-badge-counter">{savedTripsCount}</span>
          </button>

          {/* AI Settings Trigger */}
          <button
            className={`api-key-btn ${hasApiKey ? "api-active" : ""}`}
            onClick={onOpenSettings}
            title="Configure optional Gemini AI key"
          >
            <Key className="w-4 h-4" />
            <span>{hasApiKey ? "Gemini Linked" : "AI Settings"}</span>
          </button>
          
          <div className="currency-pill">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
            <span>INR (₹)</span>
          </div>
        </div>
      </div>
    </header>
  );
}
