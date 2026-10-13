import { BACKPACKER_DESTINATIONS, STUDENT_PACKING_LIST } from "../data/travelDatabase";

/**
 * Intelligent Budget Trip Planner Engine for Indian Students
 */

export function planStudentTrip({
  originState = "Telangana",
  originCity = "Hyderabad",
  destinationQuery = "Dharamshala",
  totalBudget = 13000,
  days = 5,
  travelers = 1,
  gangType = "solo", // 'solo', 'duo', 'gang'
  travelStyle = "smart" // 'shoestring', 'smart', 'comfort'
}) {
  // 1. Find matching destination from DB or create dynamic profile
  const matchedDest = BACKPACKER_DESTINATIONS.find(
    (d) =>
      d.name.toLowerCase().includes(destinationQuery.toLowerCase()) ||
      d.state.toLowerCase().includes(destinationQuery.toLowerCase()) ||
      destinationQuery.toLowerCase().includes(d.state.toLowerCase()) ||
      destinationQuery.toLowerCase().includes(d.name.toLowerCase())
  ) || BACKPACKER_DESTINATIONS[0]; // fallback to Dharamshala as primary showcase

  const destName = destinationQuery.trim() ? destinationQuery : matchedDest.name;
  const isCustomDest = !BACKPACKER_DESTINATIONS.some(
    (d) => d.name.toLowerCase().includes(destinationQuery.toLowerCase())
  );

  // Group discount factor (gang splits local autos, dorm rooms, etc.)
  const splitFactor = gangType === "gang" ? 0.85 : gangType === "duo" ? 0.92 : 1.0;

  // 2. Synthesize Three Budget Tiers
  const baseBudget = Number(totalBudget) || 13000;
  
  // Tier 1: Shoestring (saves ~25-30%)
  const shoestringBudget = Math.max(
    Math.round((baseBudget * 0.72) / 100) * 100,
    matchedDest.minBudget || 6500
  );

  // Tier 2: Target / Smart Backpacker (exact or close to target)
  const smartBudget = baseBudget;

  // Tier 3: Comfort Plus (adds ~25%)
  const comfortBudget = Math.round((baseBudget * 1.25) / 100) * 100;

  // Generate breakdown for each tier
  const tiers = {
    shoestring: buildTierBreakdown(shoestringBudget, "shoestring", days, matchedDest, splitFactor, originState),
    smart: buildTierBreakdown(smartBudget, "smart", days, matchedDest, splitFactor, originState),
    comfort: buildTierBreakdown(comfortBudget, "comfort", days, matchedDest, splitFactor, originState)
  };

  // 3. Generate Day-by-Day Detailed Itinerary for the selected/active tier
  const itinerary = generateDayWiseItinerary({
    dest: matchedDest,
    customName: destName,
    originState,
    originCity,
    days,
    style: travelStyle,
    tierBreakdown: tiers[travelStyle] || tiers.smart,
    gangType
  });

  // 4. Transit Logistics Blueprint
  const transitBlueprint = generateTransitBlueprint(originState, originCity, destName, matchedDest);

  return {
    meta: {
      origin: `${originCity}, ${originState}`,
      destination: destName,
      state: matchedDest.state,
      durationDays: days,
      travelersCount: travelers,
      gangType,
      targetBudget: baseBudget,
      generatedAt: new Date().toISOString()
    },
    destinationInfo: {
      ...matchedDest,
      name: isCustomDest ? destName : matchedDest.name
    },
    tiers,
    activeTier: travelStyle,
    itinerary,
    transitBlueprint,
    safetyPlaybook: matchedDest.safetyAndAvoid,
    packingList: STUDENT_PACKING_LIST
  };
}

/**
 * Builds percentage and INR cost breakdown for a specific budget tier
 */
function buildTierBreakdown(total, tierKey, days, dest, splitFactor, originState) {
  // Category weights tailored for student backpacking
  // Transit: ~32-38% (longer distances like South to North India)
  // Stay: ~24-28%
  // Food: ~18-22%
  // Activities: ~8-12%
  // Emergency Buffer: ~8-12%

  let transitRatio = 0.35;
  let stayRatio = 0.25;
  let foodRatio = 0.20;
  let activitiesRatio = 0.10;
  let bufferRatio = 0.10;

  if (tierKey === "shoestring") {
    transitRatio = 0.38; // Sleeper trains + ordinary HRTC/KSRTC buses
    stayRatio = 0.22; // 8-12 bed dorms / budget homestays
    foodRatio = 0.19; // Dhabas, langars, street food
    activitiesRatio = 0.09;
    bufferRatio = 0.12; // Crucial buffer for students!
  } else if (tierKey === "comfort") {
    transitRatio = 0.32; // 3AC / Semi-sleeper volvo
    stayRatio = 0.30; // 4-bed dorms / private room
    foodRatio = 0.20; // cafes & specialty food
    activitiesRatio = 0.10;
    bufferRatio = 0.08;
  }

  const transit = Math.round((total * transitRatio) / 100) * 100;
  const stay = Math.round((total * stayRatio * splitFactor) / 100) * 100;
  const food = Math.round((total * foodRatio) / 100) * 100;
  const activities = Math.round((total * activitiesRatio) / 100) * 100;
  
  // Remaining exact balance assigned to emergency buffer
  const emergencyBuffer = total - (transit + stay + food + activities);

  return {
    tierKey,
    totalBudget: total,
    categories: [
      {
        id: "transit",
        name: "Transit & Transport",
        icon: "Train",
        color: "#06b6d4",
        amount: transit,
        percent: Math.round((transit / total) * 100),
        desc: tierKey === "shoestring" 
          ? "IRCTC Sleeper berths + Ordinary state RTC buses (HRTC/TSRTC) + Shared local autos" 
          : tierKey === "smart" 
            ? "Mix of 3-Tier AC / Sleeper train + Semi-Deluxe RTC bus + Metro & shared sumos" 
            : "AC 3-Tier / Volvo Himsuta sleeper bus + Rented scooters & shared cabs"
      },
      {
        id: "stay",
        name: "Hostel & Dorm Stays",
        icon: "Bed",
        color: "#10b981",
        amount: stay,
        percent: Math.round((stay / total) * 100),
        desc: tierKey === "shoestring"
          ? `Backpacker dorm bunk (~₹${Math.round(stay / (days - 1))}/night) in 8-10 bed youth dorms or guesthouses`
          : tierKey === "smart"
            ? `Top-rated hostel bunk (Zostel/The Hosteller/goSTOPS ~₹${Math.round(stay / (days - 1))}/night) with Wi-Fi & lockers`
            : `Deluxe 4-bed dorm or shared private room (~₹${Math.round(stay / (days - 1))}/night) with mountain/valley view`
      },
      {
        id: "food",
        name: "Food, Chai & Cafes",
        icon: "Utensils",
        color: "#f59e0b",
        amount: food,
        percent: Math.round((food / total) * 100),
        desc: `~₹${Math.round(food / days)}/day for authentic dhabas, local street snacks, Tibetan momos & backpacker cafes`
      },
      {
        id: "activities",
        name: "Sightseeing & Entry Passes",
        icon: "Compass",
        color: "#6366f1",
        amount: activities,
        percent: Math.round((activities / total) * 100),
        desc: "Monument tickets (with Student ID discount), trek checkpoint permits & local rentals"
      },
      {
        id: "buffer",
        name: "Student Emergency Reserve",
        icon: "ShieldAlert",
        color: "#ec4899",
        amount: emergencyBuffer,
        percent: Math.round((emergencyBuffer / total) * 100),
        desc: "Strictly untouched fund for unforeseen train delays, medical needs, or UPI network failures"
      }
    ]
  };
}

/**
 * Generates day-by-day rich itinerary with costs, timings, and insider student tips
 */
function generateDayWiseItinerary({ dest, customName, originState, originCity, days, style, tierBreakdown, gangType }) {
  const daysList = [];

  // Day 1: Departure & Transit
  daysList.push({
    dayNumber: 1,
    title: `The Journey Begins: ${originCity} to Delhi & Gateway`,
    badge: "Transit Leg",
    summary: "Kick off the adventure! Board the long-distance train/bus, connect with fellow travelers, and reach the transit hub.",
    schedule: [
      {
        time: "06:30 AM - Morning",
        activity: `Depart from ${originCity}`,
        location: `${originCity} Main Junction`,
        estimatedCost: "Part of transit pass",
        costNum: 0,
        tip: "Keep digital and physical copy of your train e-ticket and college ID ready on your phone."
      },
      {
        time: "01:30 PM - Afternoon",
        activity: "Train Journey & Budget Lunch",
        location: "On-board Rail transit",
        estimatedCost: "₹80 - ₹120",
        costNum: 100,
        tip: "Avoid IRCTC pantry cutlets if on a tight budget; pick up packed homemade parathas or station thali (₹80)."
      },
      {
        time: "07:30 PM - Evening",
        activity: "Transit Hub Connection (Delhi ISBT / Majnu Ka Tilla)",
        location: "ISBT Kashmere Gate, Delhi",
        estimatedCost: "₹30 Metro fare",
        costNum: 30,
        tip: "Take the Delhi Metro Yellow Line directly to Kashmere Gate. Don't take private auto drivers charging ₹300."
      },
      {
        time: "09:30 PM - Night",
        activity: `Board Overnight Bus towards ${dest.name}`,
        location: "State RTC Bus Platform",
        estimatedCost: "Covered in transit budget",
        costNum: 0,
        tip: "Keep warm fleece jacket in your daypack; mountain bus AC/breeze gets chilling at midnight."
      }
    ],
    dayBudgetEstimate: 250
  });

  // Day 2: Arrival & Settling into the Backpacker Haven
  daysList.push({
    dayNumber: 2,
    title: `Welcome to ${dest.name}: Mountain Vibes & Culture`,
    badge: "Arrival & Orientation",
    summary: `Arrive at the mountain gateway, check into your hostel bunk, savor hot chai, and explore the local streets.`,
    schedule: [
      {
        time: "07:30 AM - Early Morning",
        activity: `Arrival & Shared Transit to Hostel`,
        location: `${dest.name} Bus Stand`,
        estimatedCost: "₹25 - ₹40 (Shared Sumo/Bus)",
        costNum: 30,
        tip: "Walk past the aggressive private cab drivers right to the shared jeep counter or take the local HRTC/State bus."
      },
      {
        time: "09:30 AM - Morning",
        activity: `Hostel Check-in & Freshen Up`,
        location: `${dest.hostelNames[0] || 'Youth Backpacker Hostel'}`,
        estimatedCost: "Covered in Stay Budget",
        costNum: 0,
        tip: "Drop large bags in luggage room if room isn't ready. Charge your phone and refill your water bottle."
      },
      {
        time: "11:30 AM - Noon",
        activity: `Visit ${dest.topAttractions[0]?.name || 'Cultural Heart & Temple'}`,
        location: "Cultural Quarter",
        estimatedCost: dest.topAttractions[0]?.cost || "Free",
        costNum: 20,
        tip: dest.topAttractions[0]?.tip || "Silence phones and walk clockwise around prayer wheels."
      },
      {
        time: "02:00 PM - Afternoon",
        activity: "Student Street Food Exploration",
        location: "Main Bazaar & Cafes",
        estimatedCost: "₹80 - ₹120",
        costNum: 100,
        tip: "Try local authentic dumplings/thukpa at tiny family-run eateries on Jogiwara road."
      },
      {
        time: "05:30 PM - Sunset",
        activity: "Sunset Vista & Acoustic Evening",
        location: "Sunset Point / Dharamkot / Cliffside",
        estimatedCost: "₹40 (Ginger Lemon Honey Chai)",
        costNum: 40,
        tip: "Watch the sun dip behind the dramatic mountains while meeting other student travelers from all over India."
      }
    ],
    dayBudgetEstimate: 350
  });

  // Day 3: The Big Adventure / Nature Trek
  daysList.push({
    dayNumber: 3,
    title: `Trek Day & Hidden Waterfalls`,
    badge: "Nature & Hiking",
    summary: "A thrilling day of hiking trails, crisp mountain air, cascading waterfalls, and breathtaking vistas.",
    schedule: [
      {
        time: "07:00 AM - Morning",
        activity: `Embark on ${dest.topAttractions[1]?.name || 'Scenic Ridge Trek'}`,
        location: "Trail Checkpoint",
        estimatedCost: dest.topAttractions[1]?.cost || "Free",
        costNum: 50,
        tip: dest.topAttractions[1]?.tip || "Carry minimum 2 liters of water and energy bars. Start early to avoid the midday sun."
      },
      {
        time: "01:00 PM - Afternoon",
        activity: "Summit Picnic & Maggi Lunch",
        location: "Mountain Ridge Viewpoint",
        estimatedCost: "₹70 - ₹90 (Summit Maggi + Chai)",
        costNum: 80,
        tip: "Summit food is slightly pricier due to mules carrying supplies up; support local stall owners with exact cash."
      },
      {
        time: "04:30 PM - Late Afternoon",
        activity: `Descent & Relax at ${dest.topAttractions[2]?.name || 'Shiva Cafe & Falls'}`,
        location: "Valley Waterfall",
        estimatedCost: "Free Entry",
        costNum: 0,
        tip: "Take a restful dip of your feet in the cool mountain stream to rejuvenate your muscles."
      },
      {
        time: "08:30 PM - Night",
        activity: "Hostel Bonfire & Board Games",
        location: "Hostel Common Room",
        estimatedCost: "Free",
        costNum: 0,
        tip: "Join community travel trivia or guitar jam sessions in the hostel lounge. Great place to make lifelong friends!"
      }
    ],
    dayBudgetEstimate: 450
  });

  // Day 4: Heritage, Local Secrets & Student Souvenirs
  if (days >= 4) {
    daysList.push({
      dayNumber: 4,
      title: "Art, Heritage & Local Hidden Gems",
      badge: "Art & Culture",
      summary: "Immerse yourself into authentic arts, peaceful pine forest trails, and budget-friendly handicraft co-operatives.",
      schedule: [
        {
          time: "09:00 AM - Morning",
          activity: `Explore ${dest.topAttractions[3]?.name || 'Pine Forest Heritage'}`,
          location: "Heritage Zone",
          estimatedCost: dest.topAttractions[3]?.cost || "Free",
          costNum: 0,
          tip: "Walk through tall deodar cedar trees; peaceful spot for reading or photography."
        },
        {
          time: "12:00 PM - Afternoon",
          activity: `Visit ${dest.topAttractions[4]?.name || 'Crafts Institute & Studios'}`,
          location: "Crafts Village",
          estimatedCost: dest.topAttractions[4]?.cost || "₹50 (Show Student ID)",
          costNum: 30,
          tip: "Flash your college ID for the discounted student entrance pass!"
        },
        {
          time: "03:30 PM - Afternoon",
          activity: "Student Souvenir Hunt & Street Cafes",
          location: "Handicrafts Co-op",
          estimatedCost: "₹150 - ₹250 (Gifts for family/friends)",
          costNum: 180,
          tip: "Buy small prayer flags (₹30), handcrafted silver earrings, or Himalayan herbal tea packets."
        },
        {
          time: "07:30 PM - Night",
          activity: "Farewell Dinner at Local Dhaba",
          location: "Student Dhaba Alley",
          estimatedCost: "₹90 - ₹130",
          costNum: 110,
          tip: "Feast on unlimited thali or Tibetan Tingmo bread with spicy chili gravy."
        }
      ],
      dayBudgetEstimate: 400
    });
  }

  // Day 5: Homeward Journey with Lifetime Memories
  if (days >= 5) {
    daysList.push({
      dayNumber: 5,
      title: "Packing Up & Return Journey",
      badge: "Return Leg",
      summary: "Catch the morning sunrise one last time, pack your backpack, and begin your comfortable return home.",
      schedule: [
        {
          time: "07:30 AM - Morning",
          activity: "Farewell Sunrise Walk & Breakfast Chai",
          location: "Hostel Terrace",
          estimatedCost: "₹50",
          costNum: 50,
          tip: "Take group photos with your hostel buddies and exchange Instagram handles."
        },
        {
          time: "10:30 AM - Morning",
          activity: "Hostel Checkout & Bag Storage",
          location: "Front Desk",
          estimatedCost: "Free",
          costNum: 0,
          tip: "Hostels allow free luggage storage after 10 AM checkout until your evening departure."
        },
        {
          time: "04:30 PM - Afternoon",
          activity: `Board Return Bus/Train towards ${originCity}`,
          location: `${dest.name} Transit Stand`,
          estimatedCost: "Included in transit budget",
          costNum: 0,
          tip: "Arrive 30 minutes before bus departure time to secure window seat luggage space."
        },
        {
          time: "Next Morning - Arrival",
          activity: `Home Sweet Home (${originCity})`,
          location: `${originCity} Station`,
          estimatedCost: "₹30 Local transit",
          costNum: 30,
          tip: "Unpack, transfer photos, and tally your saved money!"
        }
      ],
      dayBudgetEstimate: 200
    });
  }

  // Add Day 6 & 7 if requested
  if (days >= 6) {
    daysList.push({
      dayNumber: 6,
      title: "Off-the-Beaten Path Hamlet Exploration",
      badge: "Deep Trail",
      summary: "Explore tranquil sister villages like Kareri, Naddi, or Kangra fort ruins with zero tourist crowds.",
      schedule: [
        {
          time: "09:00 AM - Morning",
          activity: "Village Hike & River Walk",
          location: "Nearby Hamlet",
          estimatedCost: "₹40 (Local Bus)",
          costNum: 40,
          tip: "Enjoy serene streams away from the hustle of town center."
        },
        {
          time: "01:30 PM - Afternoon",
          activity: "Home-cooked Village Thali",
          location: "Local Family Homestay",
          estimatedCost: "₹90",
          costNum: 90,
          tip: "Taste fresh organic pahadi vegetables and unpolished rice."
        }
      ],
      dayBudgetEstimate: 300
    });
  }

  if (days >= 7) {
    daysList.push({
      dayNumber: 7,
      title: "Final Mountain Retreat & Return Transit",
      badge: "Final Leg",
      summary: "Relaxation, souvenir packing, and boarding the return connection back to your home state.",
      schedule: [
        {
          time: "10:00 AM - Morning",
          activity: "Terrace Journaling & Coffee",
          location: "Viewpoint Cafe",
          estimatedCost: "₹70",
          costNum: 70,
          tip: "Write down your travel memories and calculate total expenditures."
        },
        {
          time: "05:00 PM - Evening",
          activity: `Overnight Transit towards ${originCity}`,
          location: "Transit Hub",
          estimatedCost: "Covered in transit budget",
          costNum: 0,
          tip: "Refill water bottle and buy snacks before getting onto the bus."
        }
      ],
      dayBudgetEstimate: 250
    });
  }

  return daysList;
}

/**
 * Generates clear, step-by-step route transit options with fares
 */
function generateTransitBlueprint(originState, originCity, destName, dest) {
  const isSouthOrigin = ["Telangana", "Andhra Pradesh", "Karnataka", "Tamil Nadu", "Kerala"].includes(originState);
  const isWestOrigin = ["Maharashtra", "Gujarat", "Goa"].includes(originState);
  const isNorthOrigin = ["Delhi NCR", "Punjab", "Haryana", "Rajasthan", "Uttar Pradesh"].includes(originState);

  if (isSouthOrigin && (dest.state === "Himachal Pradesh" || dest.state === "Uttarakhand")) {
    return {
      recommendedRoute: `${originCity} → New Delhi (Train) → ${destName} (Overnight HRTC Bus)`,
      totalRoundTripTransitCost: "₹2,600 - ₹3,400",
      legs: [
        {
          legNumber: 1,
          from: originCity,
          to: "New Delhi (NDLS / NZM)",
          mode: "Indian Railways (Train)",
          options: [
            { name: "Telangana Express (12723) / Dakshin Express (12721)", class: "Sleeper (SL)", fare: "₹675", duration: "24-26 hrs", rating: "Budget King 👑" },
            { name: "AP Express / Rajdhani Express", class: "3-Tier AC (3A)", fare: "₹1,850", duration: "21 hrs", rating: "Comfort Pick" }
          ],
          studentTip: "Book Sleeper berths 40-60 days in advance or use IRCTC Tatkal quota at 11:00 AM (for Sleeper) on IRCTC app."
        },
        {
          legNumber: 2,
          from: "New Delhi (ISBT Kashmere Gate)",
          to: `${destName} Bus Stand`,
          mode: "Himachal Road Transport Corp (HRTC) Bus",
          options: [
            { name: "HRTC Ordinary / Semi-Deluxe", class: "Non-AC 2x2", fare: "₹680 - ₹750", duration: "10-11 hrs", rating: "Safest Mountain Drivers" },
            { name: "HRTC Himsuta Volvo", class: "AC Volvo Multi-Axle", fare: "₹1,250", duration: "9.5 hrs", rating: "Plush Recliner" }
          ],
          studentTip: "Book tickets online via hrtchp.com to skip queues. HRTC mountain drivers are government certified and far safer than reckless private tourist operators on winding ghats!"
        },
        {
          legNumber: 3,
          from: "Lower Dharamshala Bus Stand",
          to: "McLeod Ganj / Bhagsu / Dharamkot",
          mode: "Local Shared Sumo / Local HRTC Bus",
          options: [
            { name: "Shared Tata Sumo / Force Cruiser", class: "Shared Passenger", fare: "₹25 per person", duration: "20 mins", rating: "Best Value" },
            { name: "Local Green HRTC Shuttle Bus", class: "Public Bus", fare: "₹18", duration: "25 mins", rating: "Cheapest" }
          ],
          studentTip: "Never hire private tourist taxis at the bus stand charging ₹400-₹500 for a 6 km uphill ride. Walk 100m to the shared sumo stand."
        }
      ]
    };
  }

  // Default / Generic Route Generator
  return {
    recommendedRoute: `${originCity} → Major Rail Transit Hub → ${destName}`,
    totalRoundTripTransitCost: "₹1,800 - ₹3,200",
    legs: [
      {
        legNumber: 1,
        from: originCity,
        to: "Nearest Gateway Railhead",
        mode: "Indian Railways Express Train",
        options: [
          { name: "Superfast / Express Sleeper", class: "Sleeper Class (SL)", fare: "₹450 - ₹700", duration: "12-18 hrs", rating: "Student Favorite" },
          { name: "3-Tier AC Express", class: "3A", fare: "₹1,200 - ₹1,650", duration: "12-18 hrs", rating: "Comfort AC" }
        ],
        studentTip: "Travel overnight to save on an entire night's hostel/hotel room cost!"
      },
      {
        legNumber: 2,
        from: "Gateway Railhead",
        to: destName,
        mode: "State RTC Bus / Shared Tempo",
        options: [
          { name: "State RTC Regular Bus", class: "Standard 2x2", fare: "₹180 - ₹450", duration: "4-7 hrs", rating: "Reliable & Punctual" }
        ],
        studentTip: "Always board government state transport buses (KSRTC, HRTC, TSRTC, MSRTC) for punctuality and fair rates."
      }
    ]
  };
}

/**
 * Optional Gemini API caller if user specifies an API key
 */
export async function queryGeminiForCustomTrip({ apiKey, promptData }) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error("No Gemini API key provided");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;

  const prompt = `You are an expert Indian budget backpacker travel advisor specializing in helping college students travel across India on tight budgets.
Student Profile:
- Origin: ${promptData.originCity}, ${promptData.originState}
- Destination: ${promptData.destinationQuery}
- Total Budget: ₹${promptData.totalBudget} INR
- Trip Duration: ${promptData.days} Days
- Travel Style: ${promptData.travelStyle} (${promptData.gangType})

Generate:
1. Specific budget allocation (Transit, Stay, Food, Sightseeing, Buffer)
2. Day-by-day student itinerary with realistic pricing in INR
3. Scams to avoid, non-safe zones, and money-saving hacks.
Respond with a concise, helpful summary.`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1200 }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gemini API error (${response.status})`);
  }

  const data = await response.json();
  const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return textOutput;
}
