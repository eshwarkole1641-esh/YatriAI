// Database of Indian States, Student Hubs, and Backpacker Destinations

export const INDIAN_ORIGIN_HUBS = [
  { state: "Telangana", city: "Hyderabad / Secunderabad", code: "HYD", region: "South" },
  { state: "Karnataka", city: "Bengaluru", code: "BLR", region: "South" },
  { state: "Maharashtra", city: "Mumbai / Pune", code: "BOM", region: "West" },
  { state: "Delhi NCR", city: "New Delhi / Gurgaon", code: "DEL", region: "North" },
  { state: "Tamil Nadu", city: "Chennai", code: "MAA", region: "South" },
  { state: "West Bengal", city: "Kolkata", code: "CCU", region: "East" },
  { state: "Kerala", city: "Kochi / Trivandrum", code: "COK", region: "South" },
  { state: "Gujarat", city: "Ahmedabad", code: "AMD", region: "West" },
  { state: "Rajasthan", city: "Jaipur", code: "JAI", region: "North" },
  { state: "Uttar Pradesh", city: "Lucknow / Varanasi", code: "LKO", region: "North" },
  { state: "Punjab", city: "Chandigarh / Amritsar", code: "IXC", region: "North" },
  { state: "Madhya Pradesh", city: "Bhopal / Indore", code: "BHO", region: "Central" },
  { state: "Andhra Pradesh", city: "Visakhapatnam / Vijayawada", code: "VTZ", region: "South" },
  { state: "Odisha", city: "Bhubaneswar", code: "BBI", region: "East" },
  { state: "Assam", city: "Guwahati", code: "GAU", region: "Northeast" },
  { state: "Goa", city: "Panaji / Madgaon", code: "GOI", region: "West" },
  { state: "Bihar", city: "Patna", code: "PAT", region: "East" },
  { state: "Jharkhand", city: "Ranchi / Jamshedpur", code: "IXR", region: "East" },
  { state: "Uttarakhand", city: "Dehradun", code: "DED", region: "North" },
  { state: "Himachal Pradesh", city: "Shimla", code: "SLV", region: "North" }
];

export const BACKPACKER_DESTINATIONS = [
  {
    id: "dharamshala-mcleodganj",
    name: "Dharamshala & McLeod Ganj",
    state: "Himachal Pradesh",
    region: "North",
    tagline: "Little Lhasa, Dhauladhar mountains, peaceful monasteries & Tibetan street food",
    vibe: "Mountains, Spiritual & Trekking",
    image: "/himalayas.jpg",
    minBudget: 7500,
    recommendedBudget: 13000,
    idealDays: 5,
    hostelNames: ["Zostel Dharamshala", "The Hosteller McLeodganj", "goSTOPS McLeod Ganj", "Bhagsu Homestay Dorms"],
    dormsCostPerNight: { shoestring: 450, standard: 650, comfort: 950 },
    dailyFoodCost: { shoestring: 300, standard: 450, comfort: 700 },
    transitHighlights: {
      fromSouth: "Telangana Exp / Dakshin Exp sleeper from Secunderabad to New Delhi (₹680), then overnight HRTC Himmani bus from Kashmere Gate to Dharamshala (₹750). Total round-trip transit: ~₹2,860!",
      fromNorth: "Overnight HRTC Ordinary/Semi-Deluxe bus from ISBT Kashmere Gate Delhi to McLeod Ganj (₹700-₹1100 each way).",
      fromWest: "Paschim Express / Golden Temple Mail sleeper from Mumbai/Pune to Delhi, then HRTC bus."
    },
    topAttractions: [
      { name: "Tsuglagkhang Complex (Dalai Lama Temple)", cost: "Free", tip: "Attend morning prayer chant; strictly silence phones" },
      { name: "Triund Day Trek (2,875m)", cost: "₹0 - ₹350 (Entry/waste fee)", tip: "Start by 8 AM from Galu temple; carry 2L water & student energy snacks" },
      { name: "Bhagsunag Waterfall & Shiva Cafe", cost: "Free", tip: "Hike 15 mins past the falls to reach the iconic student chill spot" },
      { name: "St. John in the Wilderness Church", cost: "Free", tip: "Neo-Gothic church hidden inside towering deodar pine forest" },
      { name: "Norbulingka Institute", cost: "₹50 (Student ID: ₹20)", tip: "Tibetan thangka painting & woodcraft workshops" },
      { name: "Dharamkot Village (Hippie Trail)", cost: "Free", tip: "Scenic walk with yoga vibes, vegan shakes & live acoustic evenings" }
    ],
    studentFoodHacks: [
      "Tibetan Momos (Steamed Veg/Chicken) at McLeod Square: ₹70 - ₹100 per plate",
      "Authentic Thukpa noodle soup at local family joints on Jogiwara Road: ₹90",
      "Famous Bhagsu Cake at German Bakeries: ₹80 a slice",
      "Pocket-friendly Rajma-Chawal & Kadi-Chawal at Lower Dharamshala bus stand dhabas: ₹60 full meal",
      "Butter Tea & Tingmo bread for breakfast: ₹50"
    ],
    safetyAndAvoid: {
      avoidScams: [
        "Private taxi mafia outside Kangra/Dharamshala bus stand asking ₹500 to McLeod Ganj. WALK 200m to the shared sumo stand or take HRTC local bus for just ₹20-₹25!",
        "Touts claiming Triund trek requires mandatory ₹2,500 private guide. The trail is well-marked and free for day-hikers; just register at forest check-post.",
        "Overpriced souvenir shops on Main Temple Road. Head down Jogiwara road or the Tibetan Handicraft Center for fair fixed student pricing."
      ],
      unsafeZones: [
        "Never stay overnight at Triund ridge without a registered tent or guide during windy/frosty seasons.",
        "Avoid swimming or climbing wet slippery boulders near Bhagsu waterfall top, especially during monsoon showers.",
        "Unlit dark trails between Bhagsu and Upper Dharamkot past 9:30 PM — carry a headlamp or phone torch and walk in groups."
      ],
      dosAndDonts: [
        "DO carry your physical College Student ID card for concessional monument tickets and hostel discounts.",
        "DO withdraw cash in Dharamshala lower town; McLeodganj ATMs frequently go dry during long weekends.",
        "DO download offline Google Maps and Maps.me since mountain cellular networks fluctuate around Galu & Triund.",
        "DON'T consume alcohol or speak loudly in the monastery premises — it is deeply sacred to locals."
      ]
    }
  },
  {
    id: "kasol-parvati-valley",
    name: "Kasol, Tosh & Parvati Valley",
    state: "Himachal Pradesh",
    region: "North",
    tagline: "Pinewood forests, roaring Parvati river, Israeli cafes & scenic Himalayan hamlets",
    vibe: "Nature, Hiking & River Valley",
    image: "/backpacker.jpg",
    minBudget: 6500,
    recommendedBudget: 11000,
    idealDays: 4,
    hostelNames: ["The Hosteller Kasol", "Nomads Hostel Tosh", "Whoopers Hostel", "Local Wooden Homestays in Chalal"],
    dormsCostPerNight: { shoestring: 400, standard: 600, comfort: 850 },
    dailyFoodCost: { shoestring: 280, standard: 420, comfort: 650 },
    transitHighlights: {
      fromSouth: "Sleeper train from Hyderabad/Bangalore to Delhi (₹650-₹850), then overnight HRTC bus to Bhuntar (₹680), and local HRTC bus from Bhuntar to Kasol (₹55).",
      fromNorth: "Overnight HRTC / Private semi-sleeper from Delhi or Chandigarh directly to Bhuntar / Kasol.",
      fromWest: "Train to Chandigarh / Ambala, then HRTC bus up Parvati Valley."
    },
    topAttractions: [
      { name: "Chalal Village Walk", cost: "Free", tip: "Cross the suspension cable bridge across Parvati river" },
      { name: "Tosh Village Hike", cost: "₹40 (Local bus to Barshaini + short walk)", tip: "Snow peak amphitheater and traditional Himachali apple orchards" },
      { name: "Manikaran Sahib Gurudwara & Hot Springs", cost: "Free (Langar Prasad)", tip: "Eat blessed community langar and dip in natural sulphur hot springs" },
      { name: "Kheerganga Trek (Optional)", cost: "₹300 (Tent stay)", tip: "Natural hot spring pool on top of the mountain" }
    ],
    studentFoodHacks: [
      "Community Langar at Manikaran Sahib: ₹0 (Wholesome, delicious, spiritual blessing)",
      "Falafel Plate with Hummus & Pita at local Israeli cafes: ₹130",
      "Maggi with mountain ginger tea by the river: ₹50 - ₹70",
      "Fresh Siddu (Himachali stuffed steamed bread with ghee): ₹60"
    ],
    safetyAndAvoid: {
      avoidScams: [
        "Unlicensed strangers offering secret wilderness treks or illegal substances — Parvati Valley is strictly monitored by Himachal Narcotics Police with sniffer dogs.",
        "Overpriced taxi from Bhuntar airport or bus stand (₹1,400). Always board the local yellow HRTC bus running every 30 mins for ₹55.",
        "Touts charging ₹1,500 for Kheerganga tents; walk up to local huts and get dorm tents for ₹300-₹400."
      ],
      unsafeZones: [
        "Never step onto slippery wet boulders in the roaring Parvati River — currents are deceptively swift and fatal.",
        "Avoid trekking from Tosh to Kutla late in the evening without flashlights; wild Himalayan dogs and steep drop-offs."
      ],
      dosAndDonts: [
        "DO carry plenty of warm thermal layers; valley nights drop drastically.",
        "DO respect local village rules (e.g., Malana has strict no-touch penalties).",
        "DON'T litter plastic bottles in the pristine pine woods — carry your trash back."
      ]
    }
  },
  {
    id: "rishikesh-uttarakhand",
    name: "Rishikesh & Ganga Valley",
    state: "Uttarakhand",
    region: "North",
    tagline: "Yoga capital, thrilling Ganga river rafting, cliff cafes & divine evening Aarti",
    vibe: "Spiritual, Adventure & Backpacking",
    image: "/backpacker.jpg",
    minBudget: 5000,
    recommendedBudget: 9000,
    idealDays: 3,
    hostelNames: ["Zostel Rishikesh", "goSTOPS Rishikesh Tapovan", "Skyard Hostel", "Blue Jay Hostel"],
    dormsCostPerNight: { shoestring: 350, standard: 500, comfort: 750 },
    dailyFoodCost: { shoestring: 250, standard: 400, comfort: 600 },
    transitHighlights: {
      fromSouth: "Direct train to Haridwar / Yog Nagari Rishikesh (e.g. Telangana/Nizamuddin Express connection), then shared tempo/auto (₹40).",
      fromNorth: "Direct overnight UTC / UPSRTC bus from Delhi ISBT to Rishikesh (₹380 - ₹600).",
      fromWest: "Direct train to Haridwar or flight to Dehradun (Jolly Grant)."
    },
    topAttractions: [
      { name: "Triveni Ghat Evening Ganga Aarti", cost: "Free", tip: "Arrive 45 mins early for peaceful seating on stone steps" },
      { name: "Beatles Ashram (Chaurasi Kutia)", cost: "₹150 (Student ID: ₹75)", tip: "Fascinating graffiti meditation domes in Rajaji National Park" },
      { name: "Ganga White Water Rafting (16km Shivpuri)", cost: "₹600 - ₹900 (Student group rate)", tip: "Book directly at Tapovan student counters, not online middlemen" },
      { name: "Neer Garh Waterfall Hike", cost: "₹30", tip: "Walk from Tapovan; tiered natural swimming pools" },
      { name: "Ram Jhula & Laxman Jhula pedestrian suspension bridges", cost: "Free", tip: "Watch playful langurs and riverside ghats" }
    ],
    studentFoodHacks: [
      "South Indian dosas and filter coffee at Madras Cafe Tapovan: ₹90",
      "Chotiwala Restaurant traditional Thali: ₹140",
      "Fresh Ayurvedic smoothies and apple crumble at Freedom Cafe: ₹80 - ₹120",
      "Local kachori and aloo sabzi breakfast at Rishikesh market: ₹40"
    ],
    safetyAndAvoid: {
      avoidScams: [
        "Self-proclaimed 'priests' or babas forcing flowers into your hand at ghats demanding ₹500 dakshina.",
        "Uncertified rafting operators without life jackets or rescue kayakers — only book with Uttarakhand Tourism certified companies.",
        "Touts selling fake gemstones or Rudraksha beads outside temples."
      ],
      unsafeZones: [
        "Strictly avoid swimming in deep churning whirlpools of the Ganges outside demarcated safe bathing ghats with safety chains.",
        "Laxman Jhula road after midnight is frequented by wild monkeys; keep all food inside zipped backpacks."
      ],
      dosAndDonts: [
        "DO show College ID at Beatles Ashram for 50% discount.",
        "DO rent a scooter for ₹350/day between 2 friends to split local transit.",
        "DON'T carry non-vegetarian food or alcohol into sacred temple ghats."
      ]
    }
  },
  {
    id: "gokarna-karnataka",
    name: "Gokarna Beach Trail",
    state: "Karnataka",
    region: "South",
    tagline: "Pristine secluded beaches, Arabian sea cliffs, Om Beach treks & hippie shacks",
    vibe: "Beaches, Coastal Treks & Sunset Cafes",
    image: "/backpacker.jpg",
    minBudget: 4500,
    recommendedBudget: 8500,
    idealDays: 4,
    hostelNames: ["Zostel Gokarna (Cliff-top)", "Trippr Gokarna Beach", "Hostel Exp", "Kudle Beach Shacks"],
    dormsCostPerNight: { shoestring: 400, standard: 650, comfort: 900 },
    dailyFoodCost: { shoestring: 260, standard: 420, comfort: 650 },
    transitHighlights: {
      fromSouth: "Overnight KSRTC / Private sleeper bus from Bengaluru or Hyderabad to Gokarna (₹650-₹950). Train to Gokarna Road railway station via Konkan Railway.",
      fromNorthWest: "Konkan Railway Matsyagandha Express / Netravati Express from Mumbai / Goa."
    },
    topAttractions: [
      { name: "5-Beach Golden Trek (Kudle to Paradise Beach)", cost: "Free", tip: "Hike along rocky cliffs connecting Kudle, Om, Half Moon & Paradise beaches" },
      { name: "Om Beach Watersports & Rock Viewpoints", cost: "Free (Sightseeing)", tip: "Naturally shaped like the sacred Hindu 'ॐ' symbol" },
      { name: "Mahabaleshwar Temple & Temple Tank (Kotiteertha)", cost: "Free", tip: "Ancient Dravidian stone architecture" },
      { name: "Bioluminescent Plankton Watching (Paradise Beach)", cost: "Free", tip: "Visible on new moon nights away from artificial lights" }
    ],
    studentFoodHacks: [
      "Traditional Kannada thali at Pai Hotel / Dattaprasad: ₹70 unlimited",
      "Nutella banana pancakes & iced lemon tea at Kudle beach shacks: ₹110",
      "Fresh coconut water from coastal street vendors: ₹40",
      "Local seafood fish curry thali for coastal food lovers: ₹120"
    ],
    safetyAndAvoid: {
      avoidScams: [
        "Boatmen at Om Beach asking ₹800 per person to ferry to Paradise Beach. It is an easy, scenic 45-min cliff walk for ₹0!",
        "Taxis charging ₹400 from Gokarna Road station to town. Shared autos cost just ₹40 per head."
      ],
      unsafeZones: [
        "Do not trek between Half Moon and Paradise Beach in total darkness after sunset — paths are unlit and rocky with steep drops into the sea.",
        "Rip currents at Om Beach: never swim past the designated safety flags."
      ],
      dosAndDonts: [
        "DO carry plenty of sunscreen, hydration electrolytes, and sturdy shoes for cliff trails.",
        "DO stay in cliff-top hostels for spectacular sunset views.",
        "DON'T leave empty glass bottles or plastic on secluded beaches."
      ]
    }
  },
  {
    id: "hampi-karnataka",
    name: "Hampi: Ruins & Hippie Island",
    state: "Karnataka",
    region: "South",
    tagline: "UNESCO Vijayanagara empire boulder ruins, coracle boat rides & sunset music jams",
    vibe: "Ancient Heritage, Bouldering & River Vibe",
    image: "/backpacker.jpg",
    minBudget: 4200,
    recommendedBudget: 7800,
    idealDays: 3,
    hostelNames: ["Zostel Hampi", "The Goan Corner", "Gowri Guesthouse", "Rocky Guesthouse"],
    dormsCostPerNight: { shoestring: 300, standard: 500, comfort: 750 },
    dailyFoodCost: { shoestring: 240, standard: 380, comfort: 550 },
    transitHighlights: {
      fromSouth: "Overnight Hampi Express / Amaravathi Express sleeper from Hyderabad or Bengaluru to Hospet Junction (₹280-₹450). Then local KSRTC bus from Hospet to Hampi (₹20).",
      fromWestNorth: "Train via Guntakal or Hubli to Hospet."
    },
    topAttractions: [
      { name: "Virupaksha Temple & Hampi Bazaar", cost: "₹50 (Student ID: ₹25)", tip: "7th-century operational temple complex" },
      { name: "Vijaya Vitthala Temple & Stone Chariot", cost: "₹40 (Combined ASI ticket)", tip: "Musical pillars and India's famous iconic chariot" },
      { name: "Matanga Hill Sunrise Point", cost: "Free", tip: "Climb by 5:30 AM for a 360-degree panoramic golden sunrise over granite ruins" },
      { name: "Sanapur Lake & Bouldering Cliff", cost: "Free (Coracle ride: ₹100)", tip: "Chill spot with cliff jumping and round coracle boat rides" },
      { name: "Anjaneya Hill (Monkey Temple) 575 stairs", cost: "Free", tip: "Unmatched sunset vista over Tungabhadra river" }
    ],
    studentFoodHacks: [
      "South Indian breakfast at Mango Tree Restaurant: ₹80",
      "Unlimited Karnataka meals at local Hampi village messes: ₹60",
      "Israeli Shakshuka & woodfire pizza at Hippie Island cafes: ₹130",
      "Bicycle rental for whole day: ₹100 - ₹150 (super cheap & eco-friendly way to explore!)"
    ],
    safetyAndAvoid: {
      avoidScams: [
        "Hospet auto drivers claiming 'Hampi entry is closed today' to reroute you to expensive private guest lodges.",
        "Paying high rates for private guides; download official ASI audio tour app or explore with a guidebook for ₹80."
      ],
      unsafeZones: [
        "Sanapur Lake has crocodile warning signs; only swim in demarcated calm pools with locals present.",
        "Climbing giant boulders midday when granite rocks heat up to 45°C."
      ],
      dosAndDonts: [
        "DO rent a bicycle or moped to explore the vast 4,100-hectare ruins.",
        "DO carry student ID for ASI ticket counters.",
        "DON'T disfigure or step on ancient temple carvings."
      ]
    }
  },
  {
    id: "pushkar-udaipur-rajasthan",
    name: "Pushkar & Udaipur",
    state: "Rajasthan",
    region: "North",
    tagline: "Sacred holy lake, desert camel fairs, rooftop sunset drums & majestic marble palaces",
    vibe: "Royalty, Desert Culture & Sacred Lake",
    image: "/backpacker.jpg",
    minBudget: 4800,
    recommendedBudget: 9200,
    idealDays: 4,
    hostelNames: ["Zostel Pushkar", "Moustache Udaipur", "Zostel Udaipur", "Madpackers Pushkar"],
    dormsCostPerNight: { shoestring: 350, standard: 550, comfort: 800 },
    dailyFoodCost: { shoestring: 250, standard: 400, comfort: 600 },
    transitHighlights: {
      fromSouthWest: "Direct train to Ajmer Junction (for Pushkar) or Udaipur City (e.g. Hyderabad - Jaipur Express). Ajmer to Pushkar local bus is just ₹20.",
      fromNorth: "Overnight RSRTC bus / Shatabdi Express from Delhi to Ajmer (₹450)."
    },
    topAttractions: [
      { name: "Pushkar Lake Ghats & Evening Rose Aarti", cost: "Free", tip: "Sitting on Varaha Ghat during evening bells is magical" },
      { name: "Savitri Devi Temple (Ropeway / Hill Trek)", cost: "Free trek / ₹140 ropeway", tip: "Highest vantage point over the Thar desert and Pushkar town" },
      { name: "Brahma Temple", cost: "Free", tip: "One of the extremely rare temples dedicated to Lord Brahma" },
      { name: "City Palace & Lake Pichola Udaipur", cost: "₹300 (Student: ₹100 with ID)", tip: "Marvelous Rajput architecture by the serene lake" },
      { name: "Bagore Ki Haveli Folk Dance (Dharohar)", cost: "₹100 (Student ID: ₹60)", tip: "High-energy Rajasthani puppet & fire dance show" }
    ],
    studentFoodHacks: [
      "World-famous Malpua at Halwai Gali Pushkar: ₹30 - ₹40",
      "Authentic Dal Baati Churma unlimited Rajasthani meal: ₹90 - ₹130",
      "Lassi served in earthen Kulhad at Sarveshwar: ₹40",
      "Falafel rolls at street carts: ₹60"
    ],
    safetyAndAvoid: {
      avoidScams: [
        "The notorious 'Pushkar Priest Scam': Men at ghats hand you rose petals, recite mantras for family, and then forcefully demand ₹1,000+. Politely say 'Main aarti khud kar chuka hoon' and walk away.",
        "Overpriced camel safari agents in main market; walk towards the desert outskirts for 50% cheaper rates."
      ],
      unsafeZones: [
        "Avoid secluded desert trails after dark; stray packs of dogs roam outside town limits."
      ],
      dosAndDonts: [
        "DO remove shoes before stepping down onto the sacred Ghat steps.",
        "DO carry student ID for City Palace & Kumbhalgarh discounts.",
        "DON'T carry non-vegetarian food or liquor into Pushkar (holy strictly vegetarian town)."
      ]
    }
  },
  {
    id: "meghalaya-shillong-cherrapunji",
    name: "Meghalaya (Shillong & Cherrapunji)",
    state: "Meghalaya",
    region: "Northeast",
    tagline: "Abode of clouds, living root bridges, crystal clear Umngot river & towering waterfalls",
    vibe: "Waterfalls, Caving & Living Bridges",
    image: "/backpacker.jpg",
    minBudget: 8500,
    recommendedBudget: 14500,
    idealDays: 5,
    hostelNames: ["Swer Homestay Sohra", "Bygones Hostel Shillong", "Isung Guesthouse", "Nongriat Community Dorms"],
    dormsCostPerNight: { shoestring: 450, standard: 700, comfort: 1100 },
    dailyFoodCost: { shoestring: 300, standard: 450, comfort: 700 },
    transitHighlights: {
      fromAll: "Train to Guwahati railway station (well-connected from everywhere in India via Rajdhani/Express). From Guwahati Paltan Bazaar, take shared Sumo to Shillong (₹150-₹200). Then shared Sumo to Sohra/Cherrapunji (₹100)."
    },
    topAttractions: [
      { name: "Double Decker Living Root Bridge (Nongriat)", cost: "₹50 (Local eco-tax)", tip: "Hike down 3,500 stone stairs through lush rainforest; stay overnight in Nongriat village" },
      { name: "Nohkalikai Falls (India's tallest plunge waterfall)", cost: "₹20", tip: "Epic turquoise plunge pool viewpoint" },
      { name: "Dawki & Umngot River Boat Ride", cost: "₹500 (Split between 4 students = ₹125/each)", tip: "Boats look like they are floating in mid-air on crystal clear waters" },
      { name: "Mawsmai & Arwah Caves", cost: "₹30", tip: "Prehistoric fossil limestone caves" }
    ],
    studentFoodHacks: [
      "Local Khasi Rice Plate with Jadoh & veggies: ₹70 - ₹90",
      "Steamed Momos & Red Tea at Police Bazaar Shillong: ₹50",
      "Maggi & boiled egg on waterfall viewpoints: ₹40 - ₹60"
    ],
    safetyAndAvoid: {
      avoidScams: [
        "Private tourist cabs charging ₹3,500/day from Guwahati. Always use the shared government Sumo stand at Paltan Bazaar for ₹180!",
        "Middlemen at Dawki charging ₹1,500 for a boat. Walk straight to the official boatmen union ticket desk."
      ],
      unsafeZones: [
        "Do not venture into unexplored caves without local guides during heavy downpours due to flash flooding.",
        "Knee-straining Nongriat steps: don't rush; take pauses and hydrate with coconut water/electrolytes."
      ],
      dosAndDonts: [
        "DO carry waterproof rain ponchos and dry-bags for gadgets (Cherrapunji is the wettest place on earth).",
        "DO carry cash; network for UPI in Sohra and Dawki frequently drops.",
        "DON'T touch or damage the ancient ficus tree roots forming the living bridges."
      ]
    }
  }
];

// Student Travel Packing Essentials
export const STUDENT_PACKING_LIST = [
  { id: "college-id", item: "Physical College Student ID Card", category: "Documents", desc: "Saves 50-70% on ASI monuments, palace entries, museum tickets & hostel discounts", essential: true },
  { id: "powerbank", item: "20,000 mAh Fast Powerbank", category: "Gadgets", desc: "Train charging sockets frequently fail; crucial for navigation and ticket display", essential: true },
  { id: "lock-cable", item: "Number Lock & Cycle Cable", category: "Security", desc: "Mandatory for hostel dorm lockers and locking bag to train lower berths", essential: true },
  { id: "medkit", item: "Student Travel Medkit (ORS, Paracetamol, Avomine)", category: "Health", desc: "Motion sickness pills for winding hill roads, hydration salts, basic pain relief", essential: true },
  { id: "offline-maps", item: "Downloaded Offline Google Maps & Maps.me", category: "Tech", desc: "Mountains and remote trails have zero cellular data", essential: true },
  { id: "quickdry-towel", item: "Microfiber Quick-Dry Towel", category: "Gear", desc: "Dries in 30 minutes, packs down into the size of an apple", essential: true },
  { id: "cash-reserve", item: "Emergency Cash Reserve (₹1,500 - ₹2,000 in ₹100 notes)", category: "Finance", desc: "Stashed in an inner pocket when local UPI servers or ATMs fail", essential: true },
  { id: "water-bottle", item: "Reusable Water Bottle with Carabiner", category: "Eco", desc: "Refill at filtered RO stations at railway stations and hostels; save ₹100/day", essential: false },
  { id: "earplugs-mask", item: "Earplugs & Eye Sleep Mask", category: "Comfort", desc: "Life-saver in sleeper trains and 8-bed hostel dorms with snoring roommates", essential: false },
  { id: "multi-plug", item: "Multi-plug Extension Socket", category: "Gadgets", desc: "Hostel dorms often only have 1 socket near your bunk", essential: false }
];
