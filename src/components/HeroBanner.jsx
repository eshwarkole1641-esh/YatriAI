import React from "react";
import { Sparkles, ShieldCheck, Train, Wallet, ArrowDown } from "lucide-react";

export default function HeroBanner({ onScrollToPlanner }) {
  return (
    <section className="hero-section">
      <div className="hero-backdrop">
        <img
          src="/himalayas.jpg"
          alt="Himalayan Backpacking Vista"
          className="hero-image"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-pill-badge">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>India's #1 Student Backpacking Intelligence</span>
        </div>

        <h1 className="hero-title">
          Don't Let Low Cash Stop Your{" "}
          <span className="gradient-text">Wanderlust.</span>
        </h1>

        <p className="hero-description">
          Built for Indian college students and young backpackers. Enter your state, dream destination, and budget (even ₹5,000 to ₹13,000!) — our AI generates smart sleeper train routes, verified youth hostels, local street food trails, and crucial scam-avoidance safety playbooks.
        </p>

        {/* Highlight Perks Grid */}
        <div className="hero-perks">
          <div className="perk-card">
            <div className="perk-icon-wrap emerald">
              <Wallet className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="perk-heading">3-Tier Budgets</div>
              <div className="perk-sub">Shoestring, Sweet Spot & Comfort</div>
            </div>
          </div>

          <div className="perk-card">
            <div className="perk-icon-wrap amber">
              <Train className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="perk-heading">Smart Transit Logistics</div>
              <div className="perk-sub">IRCTC Sleeper + HRTC/RTC buses</div>
            </div>
          </div>

          <div className="perk-card">
            <div className="perk-icon-wrap cyan">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="perk-heading">Anti-Scam & Safety</div>
              <div className="perk-sub">Avoid tourist traps & overpriced cabs</div>
            </div>
          </div>
        </div>

        <div className="hero-cta-wrap">
          <button className="btn-primary hero-cta-btn" onClick={onScrollToPlanner}>
            <span>Start Planning Your Trip Now</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
