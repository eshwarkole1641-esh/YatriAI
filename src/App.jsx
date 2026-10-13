import React, { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import PlannerForm from "./components/PlannerForm";
import TripResults from "./components/TripResults";
import SavedTripsModal from "./components/SavedTripsModal";
import GeminiSettingsModal from "./components/GeminiSettingsModal";
import { planStudentTrip } from "./services/aiPlannerService";
import { localStorageService } from "./services/localStorageService";
import confetti from "canvas-confetti";
import { Compass, Heart, Shield, Sparkles, HardDrive } from "lucide-react";
import "./App.css";

const DEFAULT_FORM_DATA = {
  originState: "Telangana",
  originCity: "Hyderabad",
  destination: "Dharamshala & McLeod Ganj",
  budget: 13000,
  days: 5,
  gangType: "solo",
  travelStyle: "smart"
};

export default function App() {
  const [formData, setFormData] = useState(() =>
    localStorageService.getSavedFormData(DEFAULT_FORM_DATA)
  );

  const [plan, setPlan] = useState(() => {
    const cached = localStorageService.getSavedActivePlan();
    if (cached?.plan) return cached.plan;
    const initialForm = localStorageService.getSavedFormData(DEFAULT_FORM_DATA);
    return planStudentTrip({
      originState: initialForm.originState,
      originCity: initialForm.originCity,
      destinationQuery: initialForm.destination,
      totalBudget: initialForm.budget,
      days: initialForm.days,
      gangType: initialForm.gangType,
      travelStyle: initialForm.travelStyle
    });
  });

  const [activeTier, setActiveTier] = useState(() => {
    const cached = localStorageService.getSavedActivePlan();
    return cached?.activeTier || "smart";
  });
  const [isLoading, setIsLoading] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(
    () => localStorage.getItem("yatri_gemini_key") || ""
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSavedTripsOpen, setIsSavedTripsOpen] = useState(false);
  const [savedTrips, setSavedTrips] = useState(() =>
    localStorageService.getSavedTrips()
  );
  const [recentSearches, setRecentSearches] = useState(() =>
    localStorageService.getRecentSearches()
  );

  const generatePlan = useCallback((dataToUse) => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        const generated = planStudentTrip({
          originState: dataToUse.originState,
          originCity: dataToUse.originCity,
          destinationQuery: dataToUse.destination,
          totalBudget: dataToUse.budget,
          days: dataToUse.days,
          gangType: dataToUse.gangType,
          travelStyle: dataToUse.travelStyle
        });
        setPlan(generated);
        const tier = dataToUse.travelStyle || "smart";
        setActiveTier(tier);

        // Persist to Local Storage
        localStorageService.saveFormData(dataToUse);
        localStorageService.saveActivePlan(generated, tier);
        localStorageService.addRecentSearch({
          destination: dataToUse.destination,
          originState: dataToUse.originState,
          originCity: dataToUse.originCity,
          budget: dataToUse.budget,
          days: dataToUse.days,
          gangType: dataToUse.gangType,
          travelStyle: tier
        });
        setRecentSearches(localStorageService.getRecentSearches());
      } catch (err) {
        console.error("Failed to generate plan:", err);
      } finally {
        setIsLoading(false);
      }
    }, 450);
  }, []);

  // Handle plan generation from form submission
  const handleGeneratePlan = () => {
    generatePlan(formData);
    setTimeout(() => {
      const resultsEl = document.querySelector(".results-section");
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: "smooth" });
      }
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 500);
  };

  // Preset selection handler
  const handleSelectPreset = (preset) => {
    const updatedData = {
      originState: preset.originState,
      originCity: preset.originCity,
      destination: preset.dest,
      budget: preset.budget,
      days: preset.days,
      gangType: "solo",
      travelStyle: "smart"
    };
    setFormData(updatedData);
    generatePlan(updatedData);
    setTimeout(() => {
      const resultsEl = document.querySelector(".results-section");
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };

  // Recent search selection handler
  const handleSelectRecentSearch = (item) => {
    const updatedData = {
      originState: item.originState || "Telangana",
      originCity: item.originCity || "Hyderabad",
      destination: item.destination,
      budget: item.budget || 13000,
      days: item.days || 5,
      gangType: item.gangType || "solo",
      travelStyle: item.travelStyle || "smart"
    };
    setFormData(updatedData);
    generatePlan(updatedData);
    setTimeout(() => {
      const resultsEl = document.querySelector(".results-section");
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };

  // Save current plan to Local Storage
  const handleSaveCurrentTrip = () => {
    if (!plan) return;
    const existingSaved = savedTrips.find(
      (t) =>
        t.destinationName.toLowerCase() === plan.destinationInfo?.name.toLowerCase() &&
        t.origin.toLowerCase() === plan.meta?.origin.toLowerCase()
    );

    localStorageService.saveTrip({
      plan,
      activeTier,
      formData,
      notes: existingSaved?.notes || ""
    });

    setSavedTrips(localStorageService.getSavedTrips());
  };

  // Delete saved trip
  const handleDeleteTrip = (tripId) => {
    const updated = localStorageService.deleteTrip(tripId);
    setSavedTrips(updated);
  };

  // Load a saved trip into view
  const handleLoadTrip = (tripRecord) => {
    if (tripRecord.plan) {
      setPlan(tripRecord.plan);
      setActiveTier(tripRecord.activeTier || "smart");
      if (tripRecord.formData) {
        setFormData(tripRecord.formData);
        localStorageService.saveFormData(tripRecord.formData);
      }
      localStorageService.saveActivePlan(tripRecord.plan, tripRecord.activeTier);

      setTimeout(() => {
        const resultsEl = document.querySelector(".results-section");
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  // Update notes on active trip
  const handleUpdateNotesOnActive = (notes) => {
    if (!plan) return;
    const destName = plan.destinationInfo?.name;
    const origin = plan.meta?.origin;
    const existing = savedTrips.find(
      (t) =>
        t.destinationName.toLowerCase() === destName.toLowerCase() &&
        t.origin.toLowerCase() === origin.toLowerCase()
    );

    if (existing) {
      localStorageService.updateTripNotes(existing.id, notes);
    } else {
      // Auto-save trip if adding notes
      localStorageService.saveTrip({
        plan,
        activeTier,
        formData,
        notes
      });
    }
    setSavedTrips(localStorageService.getSavedTrips());
  };

  const handleScrollToPlanner = () => {
    const plannerEl = document.getElementById("planner-section");
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Check if active trip is saved
  const isCurrentTripSaved = Boolean(
    plan &&
      localStorageService.isTripSaved(
        plan.destinationInfo?.name,
        plan.meta?.origin
      )
  );

  const currentTripNotes =
    savedTrips.find(
      (t) =>
        t.destinationName.toLowerCase() === plan?.destinationInfo?.name?.toLowerCase() &&
        t.origin.toLowerCase() === plan?.meta?.origin?.toLowerCase()
    )?.notes || "";

  return (
    <div className="app-wrapper">
      {/* Top Navbar with Saved Trips & Local Storage pill */}
      <Navbar
        onSelectPreset={handleSelectPreset}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenSavedTrips={() => setIsSavedTripsOpen(true)}
        savedTripsCount={savedTrips.length}
        hasApiKey={Boolean(geminiApiKey)}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroBanner onScrollToPlanner={handleScrollToPlanner} />

        {/* Planner Input Section with Recent Searches */}
        <PlannerForm
          formData={formData}
          setFormData={setFormData}
          onGeneratePlan={handleGeneratePlan}
          isLoading={isLoading}
          recentSearches={recentSearches}
          onSelectRecentSearch={handleSelectRecentSearch}
        />

        {/* Trip Plan Results with Local Storage Actions */}
        <TripResults
          plan={plan}
          activeTier={activeTier}
          setActiveTier={setActiveTier}
          isSaved={isCurrentTripSaved}
          onSaveTrip={handleSaveCurrentTrip}
          onOpenSavedTrips={() => setIsSavedTripsOpen(true)}
          savedNotes={currentTripNotes}
          onUpdateNotes={handleUpdateNotesOnActive}
        />
      </main>

      {/* Footer */}
      <footer className="footer no-print">
        <div className="container footer-content">
          <div className="footer-brand-wrap">
            <div className="footer-logo">
              <Compass className="w-5 h-5 text-emerald-400" />
              <span>YatriAI</span>
            </div>
            <p className="footer-tagline">
              Dedicated to every Indian college student who has a dream to explore the motherland, regardless of bank balance constraints.
            </p>
          </div>

          <div className="footer-badges">
            <span className="badge badge-emerald">
              <Sparkles className="w-3.5 h-3.5" />
              100% Student Oriented
            </span>
            <span className="badge badge-cyan" title="100% Client-side Local Storage">
              <HardDrive className="w-3.5 h-3.5" />
              Local Storage Driven
            </span>
            <span className="badge badge-amber">
              <Shield className="w-3.5 h-3.5" />
              Scam Shield Active
            </span>
          </div>

          <div className="footer-copy">
            <p>
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 inline mx-1 fill-rose-500" /> for budget travelers across India. All trips, notes, and checklists stored in browser LocalStorage.
            </p>
          </div>
        </div>
      </footer>

      {/* Saved Trips Local Storage Modal */}
      <SavedTripsModal
        isOpen={isSavedTripsOpen}
        onClose={() => setIsSavedTripsOpen(false)}
        savedTrips={savedTrips}
        onLoadTrip={handleLoadTrip}
        onDeleteTrip={handleDeleteTrip}
        onUpdateTrips={() => setSavedTrips(localStorageService.getSavedTrips())}
      />

      {/* Optional Gemini Settings Modal */}
      <GeminiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={geminiApiKey}
        setApiKey={setGeminiApiKey}
      />
    </div>
  );
}
