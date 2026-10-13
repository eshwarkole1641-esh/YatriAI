import React, { useState } from "react";
import {
  Train,
  Bed,
  Utensils,
  Compass,
  ShieldAlert,
  Calendar,
  IndianRupee,
  Printer,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Info,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Send,
  Sliders,
  Bookmark,
  BookmarkCheck,
  Edit3,
  HardDrive
} from "lucide-react";
import confetti from "canvas-confetti";
import { localStorageService } from "../services/localStorageService";

export default function TripResults({
  plan,
  activeTier,
  setActiveTier,
  isSaved,
  onSaveTrip,
  onOpenSavedTrips,
  savedNotes = "",
  onUpdateNotes
}) {
  const [activeTab, setActiveTab] = useState("itinerary"); // 'breakdown', 'itinerary', 'transit', 'safety', 'packing'
  const [selectedDay, setSelectedDay] = useState(1);
  const [copied, setCopied] = useState(false);
  const [checkedPackItems, setCheckedPackItems] = useState(() => {
    return plan?.destinationInfo?.name
      ? localStorageService.getPackingChecks(plan.destinationInfo.name)
      : {};
  });
  const [prevDest, setPrevDest] = useState(plan?.destinationInfo?.name);
  if (plan?.destinationInfo?.name !== prevDest) {
    setPrevDest(plan?.destinationInfo?.name);
    setCheckedPackItems(localStorageService.getPackingChecks(plan?.destinationInfo?.name || "global"));
  }

  const [currentNotes, setCurrentNotes] = useState(savedNotes);
  const [prevSavedNotes, setPrevSavedNotes] = useState(savedNotes);
  if (savedNotes !== prevSavedNotes) {
    setPrevSavedNotes(savedNotes);
    setCurrentNotes(savedNotes);
  }

  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  if (!plan) return null;

  const currentTierData = plan.tiers[activeTier] || plan.tiers.smart;

  // Toggle packing checklist with auto-save to Local Storage
  const togglePackItem = (id) => {
    setCheckedPackItems((prev) => {
      const updated = {
        ...prev,
        [id]: !prev[id]
      };
      if (plan.destinationInfo?.name) {
        localStorageService.savePackingChecks(plan.destinationInfo.name, updated);
      }
      return updated;
    });
  };

  // Clear all checked items for current destination
  const handleResetChecklist = () => {
    setCheckedPackItems({});
    if (plan.destinationInfo?.name) {
      localStorageService.savePackingChecks(plan.destinationInfo.name, {});
    }
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Save notes locally
  const handleSaveNotes = () => {
    if (onUpdateNotes) {
      onUpdateNotes(currentNotes);
    }
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

  // Copy itinerary to clipboard
  const handleCopyItinerary = () => {
    const text = `🎒 MY STUDENT BACKPACKING TRIP PLAN
Destination: ${plan.destinationInfo.name} (${plan.destinationInfo.state})
Origin: ${plan.meta.origin}
Duration: ${plan.meta.durationDays} Days | Budget: ₹${currentTierData.totalBudget.toLocaleString("en-IN")} (${activeTier.toUpperCase()} Plan)

💰 EXPENSE BREAKDOWN:
${currentTierData.categories.map((c) => `• ${c.name}: ₹${c.amount.toLocaleString("en-IN")} (${c.percent}%)`).join("\n")}

🚆 TRANSIT ROUTE:
${plan.transitBlueprint.recommendedRoute}

🗓️ ITINERARY SUMMARY:
${plan.itinerary.map((d) => `Day ${d.dayNumber}: ${d.title}`).join("\n")}

Planned with YatriAI (100% Local Storage)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // WhatsApp Share Link
  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      `Hey guys! 🎒 Check out this budget trip plan for ${plan.destinationInfo.name}! Total budget per person is only ₹${currentTierData.totalBudget.toLocaleString("en-IN")} for ${plan.meta.durationDays} days from ${plan.meta.origin}! Let's make this happen! 🚀`
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
  };

  // Print Page
  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="results-section">
      <div className="container">
        {/* Results Banner */}
        <div className="results-hero-card glass-card">
          <div className="results-hero-content">
            <div className="badge-row">
              <span className="badge badge-emerald">
                <Sparkles className="w-3.5 h-3.5" />
                AI Generated Itinerary
              </span>
              <span className="badge badge-cyan">
                <HardDrive className="w-3 h-3" />
                Local Storage Ready
              </span>
              <span className="badge badge-amber">
                {plan.destinationInfo.vibe}
              </span>
            </div>

            <h2 className="results-dest-title">
              {plan.destinationInfo.name}
              <span className="results-dest-state">, {plan.destinationInfo.state}</span>
            </h2>
            <p className="results-dest-tagline">{plan.destinationInfo.tagline}</p>

            <div className="results-meta-chips">
              <div className="meta-chip">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>From: {plan.meta.origin}</span>
              </div>
              <div className="meta-chip">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>{plan.meta.durationDays} Days Duration</span>
              </div>
              <div className="meta-chip">
                <IndianRupee className="w-4 h-4 text-amber-400" />
                <span>
                  Budget: ₹{currentTierData.totalBudget.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="results-actions-bar no-print">
            {/* Save Trip Button (Local Storage) */}
            <button
              className={`action-btn ${isSaved ? "action-btn-saved" : ""}`}
              onClick={() => {
                if (isSaved && onOpenSavedTrips) {
                  onOpenSavedTrips();
                } else if (onSaveTrip) {
                  onSaveTrip();
                  triggerConfetti();
                }
              }}
              title={isSaved ? "Trip is saved in Local Storage! Click to view all saved trips." : "Save this itinerary into Local Storage"}
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4 text-emerald-400" />
              ) : (
                <Bookmark className="w-4 h-4 text-emerald-400" />
              )}
              <span>{isSaved ? "Saved in LocalStorage ★" : "Save Trip"}</span>
            </button>

            <button
              className="action-btn"
              onClick={handleCopyItinerary}
              title="Copy trip itinerary summary"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy Plan"}</span>
            </button>

            <button
              className="action-btn"
              onClick={handleWhatsAppShare}
              title="Share on WhatsApp with college friends"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Share to Gang</span>
            </button>

            <button
              className="action-btn"
              onClick={handlePrint}
              title="Print or export as PDF"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* 3-Tier Budget Switcher */}
        <div className="tier-selector-container no-print">
          <div className="tier-selector-header">
            <div className="tier-title-wrap">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <h3>Choose Your Budget Tier</h3>
            </div>
            <p className="tier-subtitle">
              Select what fits your wallet. Every tier includes full transit, stay, food, and safety.
            </p>
          </div>

          <div className="tier-cards-grid">
            {/* Shoestring Tier */}
            <div
              className={`tier-card glass-card ${activeTier === "shoestring" ? "active-tier" : ""}`}
              onClick={() => {
                setActiveTier("shoestring");
                triggerConfetti();
              }}
            >
              <div className="tier-badge-line">
                <span className="badge badge-cyan">Ultra Shoestring ⚡</span>
                <span className="tier-savings-pill">Max Savings</span>
              </div>
              <div className="tier-price">
                <span className="rupee">₹</span>
                <span className="num">{plan.tiers.shoestring.totalBudget.toLocaleString("en-IN")}</span>
                <span className="per">/person</span>
              </div>
              <p className="tier-desc">
                IRCTC Sleeper berth, 8-10 bed youth dorms, local street food & dhabas. Every rupee stretched.
              </p>
              <div className="tier-features-list">
                <div className="tier-feature-item">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sleeper train + Ordinary HRTC/RTC bus</span>
                </div>
                <div className="tier-feature-item">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dorm bunk & shared homestay</span>
                </div>
              </div>
            </div>

            {/* Smart Backpacker Tier (Recommended) */}
            <div
              className={`tier-card glass-card popular-tier ${activeTier === "smart" ? "active-tier" : ""}`}
              onClick={() => {
                setActiveTier("smart");
                triggerConfetti();
              }}
            >
              <div className="tier-badge-line">
                <span className="badge badge-emerald">Sweet Spot 🌟 (Recommended)</span>
                <span className="tier-highlight-pill">Best Value</span>
              </div>
              <div className="tier-price">
                <span className="rupee">₹</span>
                <span className="num">{plan.tiers.smart.totalBudget.toLocaleString("en-IN")}</span>
                <span className="per">/person</span>
              </div>
              <p className="tier-desc">
                Comfortable AC/Sleeper, verified Zostel/The Hosteller dorm bunk, mix of cafes & dhabas.
              </p>
              <div className="tier-features-list">
                <div className="tier-feature-item">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Semi-deluxe RTC bus & 3AC/SL train</span>
                </div>
                <div className="tier-feature-item">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zostel / Top rated youth hostel bunk</span>
                </div>
              </div>
            </div>

            {/* Comfort Plus Tier */}
            <div
              className={`tier-card glass-card ${activeTier === "comfort" ? "active-tier" : ""}`}
              onClick={() => {
                setActiveTier("comfort");
                triggerConfetti();
              }}
            >
              <div className="tier-badge-line">
                <span className="badge badge-amber">Comfort Explorer 🛋️</span>
                <span className="tier-comfort-pill">Extra Ease</span>
              </div>
              <div className="tier-price">
                <span className="rupee">₹</span>
                <span className="num">{plan.tiers.comfort.totalBudget.toLocaleString("en-IN")}</span>
                <span className="per">/person</span>
              </div>
              <p className="tier-desc">
                3AC train / Volvo semi-sleeper, deluxe 4-bed dorm or shared private room, scooter rental.
              </p>
              <div className="tier-features-list">
                <div className="tier-feature-item">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>AC 3-Tier train / Volvo multi-axle bus</span>
                </div>
                <div className="tier-feature-item">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>4-bed dorm or scenic private stay</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tabs-nav-bar no-print">
          <button
            className={`tab-btn ${activeTab === "itinerary" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("itinerary")}
          >
            <Calendar className="w-4 h-4" />
            <span>Day-by-Day Itinerary</span>
          </button>

          <button
            className={`tab-btn ${activeTab === "breakdown" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("breakdown")}
          >
            <IndianRupee className="w-4 h-4" />
            <span>Budget Breakdown (₹)</span>
          </button>

          <button
            className={`tab-btn ${activeTab === "transit" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("transit")}
          >
            <Train className="w-4 h-4" />
            <span>Transit & Route Blueprint</span>
          </button>

          <button
            className={`tab-btn ${activeTab === "safety" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("safety")}
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Safety & What to Avoid</span>
          </button>

          <button
            className={`tab-btn ${activeTab === "packing" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("packing")}
          >
            <Compass className="w-4 h-4" />
            <span>Backpacker Packing List</span>
          </button>
        </div>

        {/* TAB 1: ITINERARY VIEW */}
        {activeTab === "itinerary" && (
          <div className="tab-pane animate-fade-in">
            {/* Day Selector Tabs */}
            <div className="days-nav-strip no-print">
              {plan.itinerary.map((day) => (
                <button
                  key={day.dayNumber}
                  className={`day-tab-pill ${selectedDay === day.dayNumber ? "active" : ""}`}
                  onClick={() => setSelectedDay(day.dayNumber)}
                >
                  <span className="day-number">Day {day.dayNumber}</span>
                  <span className="day-badge-mini">{day.badge}</span>
                </button>
              ))}
            </div>

            {/* Selected Day Details */}
            {(() => {
              const currentDay = plan.itinerary.find((d) => d.dayNumber === selectedDay) || plan.itinerary[0];
              return (
                <div className="day-content-card glass-card">
                  <div className="day-card-header">
                    <div>
                      <div className="day-super-badge">
                        <span>Day {currentDay.dayNumber} of {plan.meta.durationDays}</span>
                        <span className="dot">•</span>
                        <span>{currentDay.badge}</span>
                      </div>
                      <h3 className="day-title">{currentDay.title}</h3>
                      <p className="day-summary">{currentDay.summary}</p>
                    </div>

                    <div className="day-cost-badge">
                      <span className="label">Day Out-of-Pocket:</span>
                      <span className="val">~₹{currentDay.dayBudgetEstimate}</span>
                    </div>
                  </div>

                  {/* Schedule Timeline */}
                  <div className="timeline-container">
                    {currentDay.schedule.map((item, idx) => (
                      <div key={idx} className="timeline-item">
                        <div className="timeline-marker">
                          <div className="marker-dot"></div>
                          {idx !== currentDay.schedule.length - 1 && <div className="marker-line"></div>}
                        </div>

                        <div className="timeline-body glass-card">
                          <div className="timeline-header">
                            <div className="time-badge">
                              <Clock className="w-3.5 h-3.5 text-cyan-400" />
                              <span>{item.time}</span>
                            </div>
                            <div className="item-cost-tag">
                              <span>{item.estimatedCost}</span>
                            </div>
                          </div>

                          <h4 className="item-activity-title">{item.activity}</h4>
                          
                          <div className="item-location">
                            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{item.location}</span>
                          </div>

                          {item.tip && (
                            <div className="item-student-tip">
                              <Info className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                              <span><strong>Student Pro-Tip:</strong> {item.tip}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Day Navigation Buttons */}
                  <div className="day-nav-footer no-print">
                    <button
                      className="btn-secondary"
                      disabled={selectedDay <= 1}
                      onClick={() => setSelectedDay((prev) => Math.max(1, prev - 1))}
                    >
                      ← Previous Day
                    </button>
                    <button
                      className="btn-secondary"
                      disabled={selectedDay >= plan.itinerary.length}
                      onClick={() => setSelectedDay((prev) => Math.min(plan.itinerary.length, prev + 1))}
                    >
                      Next Day →
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Student Trip Notes & Local Storage Journal */}
            <div className="trip-notes-card glass-card no-print">
              <div className="notes-header">
                <div className="notes-title-wrap">
                  <Edit3 className="w-4 h-4 text-emerald-400" />
                  <h4>My Trip Notes & Custom Checklist</h4>
                  <span className="badge badge-emerald mini-badge">
                    <HardDrive className="w-2.5 h-2.5 inline mr-1" />
                    Local Storage
                  </span>
                </div>
                <span className="notes-hint">
                  Saved automatically in your browser's local memory.
                </span>
              </div>

              <textarea
                className="notes-textarea"
                rows={3}
                placeholder="Write student trip notes here (e.g. Friends coming along, Tatkal train booking alarm, specific cafe to visit, splitting hotel)..."
                value={currentNotes}
                onChange={(e) => setCurrentNotes(e.target.value)}
              />

              <div className="notes-footer">
                <span className="storage-status-text">
                  {noteSavedFeedback ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 inline" /> Saved to browser storage!
                    </span>
                  ) : (
                    "Type any reminders above and click Save Notes."
                  )}
                </span>
                <button
                  className="btn-primary btn-sm"
                  onClick={handleSaveNotes}
                >
                  <Check className="w-3.5 h-3.5 mr-1" />
                  <span>Save Notes</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BUDGET BREAKDOWN */}
        {activeTab === "breakdown" && (
          <div className="tab-pane animate-fade-in">
            <div className="breakdown-grid">
              {/* Category Cards */}
              <div className="category-cards-col">
                <div className="section-title-wrap">
                  <h3>Expense Categories ({activeTier.toUpperCase()} Plan)</h3>
                  <span className="total-badge">
                    Total: ₹{currentTierData.totalBudget.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="category-cards-list">
                  {currentTierData.categories.map((cat) => (
                    <div key={cat.id} className="category-card glass-card">
                      <div className="cat-header">
                        <div className="cat-icon-title">
                          <div
                            className="cat-icon-circle"
                            style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                          >
                            {cat.id === "transit" && <Train className="w-5 h-5" />}
                            {cat.id === "stay" && <Bed className="w-5 h-5" />}
                            {cat.id === "food" && <Utensils className="w-5 h-5" />}
                            {cat.id === "activities" && <Compass className="w-5 h-5" />}
                            {cat.id === "buffer" && <ShieldAlert className="w-5 h-5" />}
                          </div>
                          <div>
                            <div className="cat-name">{cat.name}</div>
                            <div className="cat-percentage">{cat.percent}% of total budget</div>
                          </div>
                        </div>

                        <div className="cat-amount">
                          <span className="rupee">₹</span>
                          <span className="val">{cat.amount.toLocaleString("en-IN")}</span>
                        </div>
                      </div>

                      {/* Progress Meter Bar */}
                      <div className="progress-bar-bg">
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${cat.percent}%`,
                            backgroundColor: cat.color
                          }}
                        ></div>
                      </div>

                      <div className="cat-desc">{cat.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side Advisory Card */}
              <div className="breakdown-sidebar-col">
                <div className="advisory-card glass-card">
                  <div className="advisory-header">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <h4>Student Money Hacks</h4>
                  </div>

                  <ul className="hacks-list">
                    <li>
                      <strong>Travel Sleeper Overnight:</strong> You save 2 full nights of hostel accommodation just by traveling while asleep.
                    </li>
                    <li>
                      <strong>Flash College ID Everywhere:</strong> ASI monuments like Taj Mahal, Red Fort, or Hampi temples charge ₹50 instead of regular entry fees.
                    </li>
                    <li>
                      <strong>Eat at Monasteries & Langars:</strong> Sacred places like Manikaran Sahib or Dharamshala monasteries offer clean, blessed meals.
                    </li>
                    <li>
                      <strong>The 10% Emergency Golden Rule:</strong> Never spend your ₹{currentTierData.categories.find(c => c.id === 'buffer')?.amount.toLocaleString("en-IN")} buffer on souvenirs. Keep it for medical needs or bus delays.
                    </li>
                  </ul>

                  <div className="food-hacks-box">
                    <div className="box-title">
                      <Utensils className="w-4 h-4 text-amber-400" />
                      <span>Local Budget Food Cheatsheet</span>
                    </div>
                    {plan.destinationInfo.studentFoodHacks?.map((hack, i) => (
                      <div key={i} className="food-hack-item">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{hack}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TRANSIT BLUEPRINT */}
        {activeTab === "transit" && (
          <div className="tab-pane animate-fade-in">
            <div className="transit-blueprint-card glass-card">
              <div className="blueprint-header">
                <div>
                  <div className="badge badge-cyan">Transit Logistics Masterplan</div>
                  <h3 className="blueprint-title">{plan.transitBlueprint.recommendedRoute}</h3>
                  <p className="blueprint-estimate">
                    Estimated Round-Trip Transit Cost: <strong>{plan.transitBlueprint.totalRoundTripTransitCost}</strong>
                  </p>
                </div>
              </div>

              <div className="transit-legs-container">
                {plan.transitBlueprint.legs.map((leg, idx) => (
                  <div key={idx} className="transit-leg-card glass-card">
                    <div className="leg-badge-row">
                      <span className="leg-index">Leg {leg.legNumber}</span>
                      <span className="leg-mode-pill">{leg.mode}</span>
                    </div>

                    <div className="leg-route-header">
                      <div className="route-point">
                        <span className="point-type">Departure</span>
                        <span className="point-name">{leg.from}</span>
                      </div>
                      <div className="route-arrow">
                        <ChevronRight className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="route-point">
                        <span className="point-type">Arrival</span>
                        <span className="point-name">{leg.to}</span>
                      </div>
                    </div>

                    <div className="leg-options-table">
                      <div className="table-header">
                        <span>Vehicle / Route</span>
                        <span>Class / Type</span>
                        <span>Approx Fare</span>
                        <span>Duration</span>
                        <span>Student Verdict</span>
                      </div>
                      {leg.options.map((opt, i) => (
                        <div key={i} className="table-row">
                          <span className="opt-name"><strong>{opt.name}</strong></span>
                          <span className="opt-class">{opt.class}</span>
                          <span className="opt-fare gradient-text">{opt.fare}</span>
                          <span className="opt-dur">{opt.duration}</span>
                          <span className="opt-rating badge badge-emerald">{opt.rating}</span>
                        </div>
                      ))}
                    </div>

                    {leg.studentTip && (
                      <div className="leg-pro-tip">
                        <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span><strong>Smart Booking Hack:</strong> {leg.studentTip}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SAFETY & WHAT TO AVOID */}
        {activeTab === "safety" && (
          <div className="tab-pane animate-fade-in">
            <div className="safety-grid">
              {/* Scams & Traps to Avoid */}
              <div className="safety-card glass-card danger-card">
                <div className="safety-card-header">
                  <div className="icon-wrap-rose">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h4>Tourist Scams & Overpriced Traps to Avoid</h4>
                    <span className="sub-label">Things that drain student wallets unnecessarily</span>
                  </div>
                </div>

                <div className="safety-items-list">
                  {plan.safetyPlaybook.avoidScams?.map((scam, i) => (
                    <div key={i} className="safety-item scam-item">
                      <span className="danger-cross">✕</span>
                      <p>{scam}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unsafe Zones & Physical Safety */}
              <div className="safety-card glass-card warning-card">
                <div className="safety-card-header">
                  <div className="icon-wrap-amber">
                    <ShieldAlert className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4>Non-Safe Zones & Physical Hazards</h4>
                    <span className="sub-label">Places and actions to strictly stay away from</span>
                  </div>
                </div>

                <div className="safety-items-list">
                  {plan.safetyPlaybook.unsafeZones?.map((hazard, i) => (
                    <div key={i} className="safety-item hazard-item">
                      <span className="warning-exclamation">⚠️</span>
                      <p>{hazard}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Dos and Don'ts */}
              <div className="safety-card glass-card full-width-card rules-card">
                <div className="safety-card-header">
                  <div className="icon-wrap-emerald">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4>Student Golden Rules (Dos & Don'ts)</h4>
                    <span className="sub-label">Follow these for a safe, hassle-free backpacking journey</span>
                  </div>
                </div>

                <div className="rules-grid">
                  {plan.safetyPlaybook.dosAndDonts?.map((rule, i) => (
                    <div key={i} className="rule-item">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PACKING CHECKLIST */}
        {activeTab === "packing" && (
          <div className="tab-pane animate-fade-in">
            <div className="packing-card glass-card">
              <div className="packing-header">
                <div>
                  <div className="badge badge-emerald">
                    <HardDrive className="w-3 h-3 inline mr-1" />
                    Auto-Saved in Local Storage
                  </div>
                  <h3 className="packing-title">Indian Backpacker Packing Checklist</h3>
                  <p className="packing-subtitle">
                    Tick off items as you pack into your rucksack. All checkmarks are saved in your browser!
                  </p>
                </div>
                <div className="packing-header-actions">
                  <div className="pack-progress-badge">
                    <span>
                      {Object.values(checkedPackItems).filter(Boolean).length} / {plan.packingList.length} Packed
                    </span>
                  </div>
                  {Object.values(checkedPackItems).some(Boolean) && (
                    <button
                      className="btn-secondary btn-xs"
                      onClick={handleResetChecklist}
                      title="Reset all checkboxes for this destination"
                    >
                      Reset Checks
                    </button>
                  )}
                </div>
              </div>

              <div className="packing-items-grid">
                {plan.packingList.map((item) => {
                  const isChecked = !!checkedPackItems[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`pack-item-card glass-card ${isChecked ? "packed" : ""}`}
                      onClick={() => togglePackItem(item.id)}
                    >
                      <div className="pack-checkbox">
                        {isChecked ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <div className="empty-checkbox"></div>
                        )}
                      </div>

                      <div className="pack-info">
                        <div className="pack-name-row">
                          <span className={`pack-name ${isChecked ? "line-through" : ""}`}>
                            {item.item}
                          </span>
                          {item.essential && (
                            <span className="badge badge-rose mini-badge">Essential</span>
                          )}
                        </div>
                        <p className="pack-desc">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
