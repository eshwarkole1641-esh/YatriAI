import React from "react";
import {
  MapPin,
  Calendar,
  IndianRupee,
  Users,
  Compass,
  Sparkles,
  Zap,
  Sliders,
  History
} from "lucide-react";
import { INDIAN_ORIGIN_HUBS } from "../data/travelDatabase";

export default function PlannerForm({
  formData,
  setFormData,
  onGeneratePlan,
  isLoading,
  recentSearches = [],
  onSelectRecentSearch
}) {
  const quickDestinations = [
    { label: "🏔️ Dharamshala / McLeod Ganj", value: "Dharamshala & McLeod Ganj" },
    { label: "🌲 Kasol & Parvati Valley", value: "Kasol, Tosh & Parvati Valley" },
    { label: "🧘 Rishikesh Ganga Valley", value: "Rishikesh & Ganga Valley" },
    { label: "🌊 Gokarna Beach Trail", value: "Gokarna Beach Trail" },
    { label: "🏛️ Hampi Ancient Ruins", value: "Hampi: Ruins & Hippie Island" },
    { label: "☁️ Meghalaya & Shillong", value: "Meghalaya (Shillong & Cherrapunji)" },
    { label: "🏜️ Pushkar & Udaipur", value: "Pushkar & Udaipur" }
  ];

  const quickBudgets = [6000, 9000, 13000, 18000, 25000];

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    const matchedHub = INDIAN_ORIGIN_HUBS.find((h) => h.state === selectedState);
    setFormData((prev) => ({
      ...prev,
      originState: selectedState,
      originCity: matchedHub ? matchedHub.city : prev.originCity
    }));
  };

  const handleBudgetChange = (val) => {
    setFormData((prev) => ({ ...prev, budget: Number(val) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGeneratePlan();
  };

  return (
    <section id="planner-section" className="planner-section no-print">
      <div className="container">
        <div className="planner-card glass-card">
          <div className="planner-header">
            <div className="header-badge">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Configure Your Trip Parameters</span>
            </div>
            <h2 className="planner-title">Customize Your Student Backpacking Plan</h2>
            <p className="planner-subtitle">
              Enter where you are starting from, where you want to go, and what your pocket can afford.
            </p>
          </div>

          {/* Recent Searches Strip (Stored in Local Storage) */}
          {recentSearches && recentSearches.length > 0 && (
            <div className="recent-searches-bar">
              <div className="recent-label">
                <History className="w-3.5 h-3.5 text-emerald-400" />
                <span>Recent Searches:</span>
              </div>
              <div className="recent-chips-list">
                {recentSearches.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="recent-chip-btn"
                    onClick={() => onSelectRecentSearch && onSelectRecentSearch(item)}
                    title={`Reload: ${item.destination} (₹${item.budget})`}
                  >
                    <span>{item.destination}</span>
                    <span className="recent-budget-tag">₹{Number(item.budget).toLocaleString("en-IN")}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="planner-form">
            {/* Origin & Destination Row */}
            <div className="form-grid-2">
              {/* Origin Selection */}
              <div className="input-group">
                <label className="input-label" htmlFor="origin-state">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Starting From (Home State & City)</span>
                </label>
                <div className="dual-inputs">
                  <select
                    id="origin-state"
                    className="input-field"
                    value={formData.originState}
                    onChange={handleStateChange}
                  >
                    {INDIAN_ORIGIN_HUBS.map((hub) => (
                      <option key={hub.state} value={hub.state}>
                        {hub.state}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    id="origin-city"
                    className="input-field"
                    placeholder="City name (e.g., Hyderabad)"
                    value={formData.originCity}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, originCity: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Destination Input */}
              <div className="input-group">
                <label className="input-label" htmlFor="destination-input">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>Destination Dream Place</span>
                </label>
                <input
                  type="text"
                  id="destination-input"
                  className="input-field"
                  placeholder="e.g. Himachal Pradesh (Dharamshala), Kasol, Gokarna..."
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, destination: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            {/* Quick Destination Pill Tags */}
            <div className="quick-tags-container">
              <span className="quick-tag-label">Student Favorites:</span>
              <div className="quick-tags-scroll">
                {quickDestinations.map((qd) => (
                  <button
                    type="button"
                    key={qd.value}
                    className={`tag-chip ${
                      formData.destination === qd.value ? "active-chip" : ""
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, destination: qd.value }))
                    }
                  >
                    {qd.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Range & Quick Buttons */}
            <div className="budget-control-card">
              <div className="budget-header-row">
                <div className="budget-title-wrap">
                  <label htmlFor="budget-slider" className="input-label">
                    <IndianRupee className="w-4 h-4 text-emerald-400" />
                    <span>Total Trip Budget (Per Person)</span>
                  </label>
                  <span className="budget-hint">Includes long-distance transit, stay, food & sightseeing</span>
                </div>
                
                <div className="budget-display-badge">
                  <span className="budget-currency">₹</span>
                  <span className="budget-amount">
                    {Number(formData.budget).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="budget-slider-wrap">
                <input
                  type="range"
                  id="budget-slider"
                  min="4000"
                  max="30000"
                  step="500"
                  value={formData.budget}
                  onChange={(e) => handleBudgetChange(e.target.value)}
                  className="custom-range-slider"
                />
                <div className="slider-ticks">
                  <span>₹4,000 (Min)</span>
                  <span>₹10,000</span>
                  <span>₹15,000</span>
                  <span>₹20,000</span>
                  <span>₹30,000 (Max)</span>
                </div>
              </div>

              {/* Quick Budget Chips */}
              <div className="quick-budget-chips">
                <span className="quick-tag-label">Quick Budgets:</span>
                {quickBudgets.map((b) => (
                  <button
                    type="button"
                    key={b}
                    className={`budget-chip ${formData.budget === b ? "active" : ""}`}
                    onClick={() => handleBudgetChange(b)}
                  >
                    ₹{b.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration, Gang & Style Controls */}
            <div className="form-grid-3">
              {/* Duration Days */}
              <div className="input-group">
                <label className="input-label">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Trip Duration</span>
                </label>
                <div className="pill-select-group">
                  {[3, 4, 5, 7].map((d) => (
                    <button
                      type="button"
                      key={d}
                      className={`pill-option ${formData.days === d ? "selected" : ""}`}
                      onClick={() => setFormData((prev) => ({ ...prev, days: d }))}
                    >
                      {d} Days
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Squad / Gang */}
              <div className="input-group">
                <label className="input-label">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>Travel Gang</span>
                </label>
                <div className="pill-select-group">
                  {[
                    { key: "solo", label: "Solo 🎒" },
                    { key: "duo", label: "Duo 👥" },
                    { key: "gang", label: "Squad (3-5) 🚀" }
                  ].map((g) => (
                    <button
                      type="button"
                      key={g.key}
                      className={`pill-option ${
                        formData.gangType === g.key ? "selected" : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, gangType: g.key }))
                      }
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div className="input-group">
                <label className="input-label">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>Travel Style</span>
                </label>
                <div className="pill-select-group">
                  {[
                    { key: "shoestring", label: "Shoestring ⚡" },
                    { key: "smart", label: "Smart 🌟" },
                    { key: "comfort", label: "Comfort 🛋️" }
                  ].map((s) => (
                    <button
                      type="button"
                      key={s.key}
                      className={`pill-option ${
                        formData.travelStyle === s.key ? "selected" : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, travelStyle: s.key }))
                      }
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="submit-action-row">
              <button
                type="submit"
                id="generate-plan-btn"
                className="btn-primary generate-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>AI Synthesizing Budget Routes...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Complete Student Travel Plan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
