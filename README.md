# 🎒 YatriAI — Backpacking Trip Budget Planner for Indian Students

YatriAI is a student-first travel budget planner and itinerary generator tailored for Indian college backpackers. It is **100% client-side and offline-ready**, using browser **Local Storage** with **zero external database / Supabase dependencies**.

---

## ⚡ Architecture & Storage: 100% Local Storage

- **Zero Supabase / Cloud Database**: All itineraries, custom budgets, gang choices, and personal notes are saved locally on the user's machine in `localStorage`.
- **100% Private & Offline-First**: No signup, no login tokens, and no tracking. Data stays in the user's browser.
- **JSON Backup Export & Import**: Students can back up their saved trips as JSON files to share with college friends or restore anytime.

---

## 🚀 Key Features

1. **Tri-Tier Budget Breakdown**:
   - **Ultra-Shoestring ⚡**: Sleeper berths, 8–10 bed dorms, dhabas & langars (maximum student savings).
   - **Sweet Spot / Smart Backpacker 🌟**: Semi-deluxe RTC bus/train + verified backpacker hostels (Zostel/The Hosteller).
   - **Comfort Explorer 🛋️**: 3-Tier AC train or Volvo multi-axle bus + 4-bed dorms / private rooms.

2. **Saved Trips ("My Trips")**:
   - Save any generated itinerary with 1-click.
   - Access saved trips from the Navbar button with live counter badge.
   - Add/edit personal notes per trip (e.g. ticket booking alarms, friend checklists).
   - Quick "Load This Plan" to reload full itineraries into view.

3. **Persistent Packing Checklist**:
   - Comprehensive checklist covering student ID, IRCTC tickets, power banks, and medical kits.
   - Checkbox states persist across page refreshes via Local Storage.

4. **Recent Search History**:
   - Stores recent planned trips for quick 1-click switching.

---

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173/` in your browser.
