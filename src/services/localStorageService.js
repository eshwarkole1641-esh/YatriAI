/**
 * YatriAI Local Storage Persistence Service
 * Complete client-side storage management with zero external database / Supabase dependencies.
 * All trips, form parameters, checklist progress, notes, and search history are saved in the browser.
 */

const KEYS = {
  SAVED_TRIPS: "yatri_saved_trips",
  FORM_DATA: "yatri_form_data",
  ACTIVE_PLAN: "yatri_active_plan",
  ACTIVE_TIER: "yatri_active_tier",
  PACKING_CHECKLIST: "yatri_packing_checklist",
  RECENT_SEARCHES: "yatri_recent_searches",
  GEMINI_KEY: "yatri_gemini_key"
};

// Safe JSON parser helper
function safeGet(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[LocalStorage] Failed to parse key "${key}":`, err);
    return defaultValue;
  }
}

// Safe JSON setter helper
function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`[LocalStorage] Failed to set key "${key}":`, err);
    return false;
  }
}

export const localStorageService = {
  KEYS,

  /**
   * Retrieves all saved trip plans
   * @returns {Array} List of saved trips
   */
  getSavedTrips() {
    return safeGet(KEYS.SAVED_TRIPS, []);
  },

  /**
   * Saves or updates a trip in local storage
   */
  saveTrip({ plan, activeTier = "smart", formData, notes = "" }) {
    if (!plan || !plan.destinationInfo) return null;

    const trips = this.getSavedTrips();
    const destName = plan.destinationInfo.name;
    const origin = plan.meta?.origin || `${formData?.originCity}, ${formData?.originState}`;

    // Check if an entry with this destination and origin exists
    const existingIndex = trips.findIndex(
      (t) => t.destinationName === destName && t.origin === origin
    );

    const tripRecord = {
      id: existingIndex >= 0 ? trips[existingIndex].id : `trip_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      savedAt: new Date().toISOString(),
      destinationName: destName,
      state: plan.destinationInfo.state,
      origin: origin,
      durationDays: plan.meta?.durationDays || formData?.days || 5,
      budget: plan.tiers?.[activeTier]?.totalBudget || formData?.budget || 13000,
      activeTier,
      notes: notes || (existingIndex >= 0 ? trips[existingIndex].notes : ""),
      plan,
      formData: formData || {
        originState: plan.destinationInfo.state,
        originCity: origin.split(",")[0]?.trim() || "Hyderabad",
        destination: destName,
        budget: plan.tiers?.[activeTier]?.totalBudget || 13000,
        days: plan.meta?.durationDays || 5,
        gangType: plan.meta?.gangType || "solo",
        travelStyle: activeTier
      }
    };

    if (existingIndex >= 0) {
      trips[existingIndex] = tripRecord;
    } else {
      trips.unshift(tripRecord);
    }

    safeSet(KEYS.SAVED_TRIPS, trips);
    return tripRecord;
  },

  /**
   * Deletes a saved trip by ID
   */
  deleteTrip(tripId) {
    const trips = this.getSavedTrips();
    const updated = trips.filter((t) => t.id !== tripId);
    safeSet(KEYS.SAVED_TRIPS, updated);
    return updated;
  },

  /**
   * Updates notes for a specific saved trip
   */
  updateTripNotes(tripId, notes) {
    const trips = this.getSavedTrips();
    const target = trips.find((t) => t.id === tripId);
    if (target) {
      target.notes = notes;
      target.updatedAt = new Date().toISOString();
      safeSet(KEYS.SAVED_TRIPS, trips);
      return target;
    }
    return null;
  },

  /**
   * Checks if a destination + origin combo is already saved
   */
  isTripSaved(destName, origin) {
    const trips = this.getSavedTrips();
    return trips.some((t) => {
      const matchDest = t.destinationName.toLowerCase() === destName?.toLowerCase();
      const matchOrigin = !origin || t.origin.toLowerCase() === origin.toLowerCase();
      return matchDest && matchOrigin;
    });
  },

  /**
   * Finds a saved trip by ID
   */
  getTripById(tripId) {
    const trips = this.getSavedTrips();
    return trips.find((t) => t.id === tripId) || null;
  },

  /**
   * Persists form inputs so reloads maintain user's customized choices
   */
  saveFormData(formData) {
    safeSet(KEYS.FORM_DATA, formData);
  },

  /**
   * Retrieves last filled form data
   */
  getSavedFormData(defaultData) {
    return safeGet(KEYS.FORM_DATA, defaultData);
  },

  /**
   * Persists currently viewed plan & tier
   */
  saveActivePlan(plan, activeTier) {
    if (plan) safeSet(KEYS.ACTIVE_PLAN, plan);
    if (activeTier) safeSet(KEYS.ACTIVE_TIER, activeTier);
  },

  /**
   * Retrieves last generated plan
   */
  getSavedActivePlan() {
    const plan = safeGet(KEYS.ACTIVE_PLAN, null);
    const activeTier = safeGet(KEYS.ACTIVE_TIER, "smart");
    return { plan, activeTier };
  },

  /**
   * Retrieves packing checklist status for a specific destination
   */
  getPackingChecks(destName = "global") {
    const allChecks = safeGet(KEYS.PACKING_CHECKLIST, {});
    return allChecks[destName] || {};
  },

  /**
   * Saves packing checklist status for a destination
   */
  savePackingChecks(destName = "global", checksMap) {
    const allChecks = safeGet(KEYS.PACKING_CHECKLIST, {});
    allChecks[destName] = checksMap;
    safeSet(KEYS.PACKING_CHECKLIST, allChecks);
  },

  /**
   * Retrieves recent search/planned queries
   */
  getRecentSearches() {
    return safeGet(KEYS.RECENT_SEARCHES, []);
  },

  /**
   * Adds an item to recent search history (max 6 items)
   */
  addRecentSearch(item) {
    if (!item || !item.destination) return;
    const history = this.getRecentSearches();
    const filtered = history.filter(
      (h) =>
        !(h.destination === item.destination && h.originState === item.originState)
    );
    filtered.unshift({
      ...item,
      searchedAt: new Date().toISOString()
    });
    safeSet(KEYS.RECENT_SEARCHES, filtered.slice(0, 6));
  },

  /**
   * Exports all YatriAI Local Storage data as JSON string for backup/sharing
   */
  exportBackupJSON() {
    const data = {
      version: "1.0",
      storageType: "browser_local_storage",
      exportedAt: new Date().toISOString(),
      savedTrips: this.getSavedTrips(),
      formData: safeGet(KEYS.FORM_DATA, null),
      activeTier: safeGet(KEYS.ACTIVE_TIER, "smart"),
      packingChecklist: safeGet(KEYS.PACKING_CHECKLIST, {}),
      recentSearches: this.getRecentSearches()
    };
    return JSON.stringify(data, null, 2);
  },

  /**
   * Imports backup JSON data into local storage
   */
  importBackupJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data.savedTrips)) {
        safeSet(KEYS.SAVED_TRIPS, data.savedTrips);
      }
      if (data.formData) {
        safeSet(KEYS.FORM_DATA, data.formData);
      }
      if (data.packingChecklist) {
        safeSet(KEYS.PACKING_CHECKLIST, data.packingChecklist);
      }
      if (data.recentSearches) {
        safeSet(KEYS.RECENT_SEARCHES, data.recentSearches);
      }
      return { success: true, count: data.savedTrips?.length || 0 };
    } catch (err) {
      console.error("[LocalStorage] Failed to import backup JSON:", err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Clears all YatriAI data from local storage
   */
  clearAllLocalData() {
    Object.values(KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  }
};
