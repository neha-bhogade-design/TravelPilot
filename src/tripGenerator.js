// ======================================================
// TRAVELPILOT TRIP GENERATOR
// ======================================================

export const DESTINATION_NAMES = [
  "Goa",
  "Jaipur",
  "Kerala",
  "Manali",
  "Udaipur",
  "Agra",
  "Varanasi",
  "Mumbai",
  "Bengaluru",
];

export const INTERESTS = [
  "History",
  "Food",
  "Markets",
  "Photography",
  "Nature",
  "Nightlife",
  "Beaches",
  "Adventure",
];

export const STYLES = {
  Relaxed: {
    blurb: "Fewer stops, plenty of downtime.",
  },
  Balanced: {
    blurb: "A healthy mix of sights and rest.",
  },
  Packed: {
    blurb: "See as much as possible each day.",
  },
};

export const MAX_TRAVELLERS = 12;

export const DEFAULT_INPUTS = {
  destination: "Jaipur, Rajasthan",
  arrive: "2026-11-14",
  leave: "2026-11-17",
  travellers: 2,
  budget: 3500,
  interests: ["History", "Food", "Markets"],
  pace: "Balanced",
  notes: "Vegetarian food preferred",
};

// ======================================================
// MONEY
// ======================================================

export function formatMoney(amount) {
  const number = Number(amount);

  if (!Number.isFinite(number)) {
    return "₹0";
  }

  return `₹${number.toLocaleString("en-IN")}`;
}

export const formatINR = formatMoney;

// ======================================================
// DATE HELPERS
// ======================================================

export function formatDateShort(dateString) {
  if (!dateString) {
    return "";
  }

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export function formatDate(dateString, options = {}) {
  if (!dateString) {
    return "";
  }

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options,
  });
}

export function todayISO() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// ======================================================
// TRIP LENGTH
// ======================================================

export function getTripLength(arrive, leave) {
  if (!arrive || !leave) {
    return 0;
  }

  const start = new Date(`${arrive}T00:00:00`);
  const end = new Date(`${leave}T00:00:00`);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return 0;
  }

  const difference = end.getTime() - start.getTime();

  const days =
    Math.round(
      difference / (1000 * 60 * 60 * 24)
    ) + 1;

  return Math.max(1, days);
}

// ======================================================
// VALIDATION FOR APP
// ======================================================

export function validateTripInputs(inputs) {
  if (
    !inputs.destination ||
    inputs.destination.trim() === ""
  ) {
    return "Please enter a valid destination.";
  }

  if (!inputs.arrive || !inputs.leave) {
    return "Please select both arrival and departure dates.";
  }

  if (inputs.arrive > inputs.leave) {
    return "Departure date cannot be earlier than arrival date.";
  }

  const travellers = Number(inputs.travellers);

  if (
    !Number.isFinite(travellers) ||
    travellers < 1 ||
    travellers > MAX_TRAVELLERS
  ) {
    return `Travellers must be between 1 and ${MAX_TRAVELLERS}.`;
  }

  const budget = Number(inputs.budget);

  if (!Number.isFinite(budget) || budget < 1500) {
    return "Minimum daily budget per person is ₹1,500.";
  }

  return "";
}

// ======================================================
// VALIDATION FOR TRIP PLANNER
// ======================================================

export function validateInputs(inputs) {
  const errors = [];

  if (
    !inputs.destination ||
    inputs.destination.trim() === ""
  ) {
    errors.push("Please enter a destination.");
  }

  if (!inputs.startDate) {
    errors.push("Please select an arrival date.");
  }

  if (!inputs.endDate) {
    errors.push("Please select a departure date.");
  }

  if (
    inputs.startDate &&
    inputs.endDate &&
    inputs.startDate > inputs.endDate
  ) {
    errors.push(
      "Departure date cannot be earlier than arrival date."
    );
  }

  const travellers = Number(inputs.travellers);

  if (
    !Number.isFinite(travellers) ||
    travellers < 1 ||
    travellers > MAX_TRAVELLERS
  ) {
    errors.push(
      `Travellers must be between 1 and ${MAX_TRAVELLERS}.`
    );
  }

  const budget = Number(inputs.budget);

  if (!Number.isFinite(budget) || budget < 1000) {
    errors.push("Budget must be at least ₹1,000.");
  }

  if (
    inputs.style &&
    !Object.prototype.hasOwnProperty.call(
      STYLES,
      inputs.style
    )
  ) {
    errors.push("Please select a valid travel style.");
  }

  return errors;
}

// ======================================================
// DESTINATION CONTENT
// ======================================================

const DESTINATION_DATA = {
  goa: {
    culture:
      "Explore historic churches and Portuguese-era architecture.",
    market:
      "Explore local markets for handicrafts, spices, and souvenirs.",
    food:
      "Enjoy Goan vegetarian specialties and local cuisine.",
    sight:
      "Explore beaches, viewpoints, and heritage attractions.",
    dinner:
      "Enjoy a relaxed Goan dinner.",
  },

  jaipur: {
    culture:
      "Explore magnificent forts, palaces, and Rajput architecture.",
    market:
      "Discover textiles, jewellery, handicrafts, and spices.",
    food:
      "Enjoy traditional Rajasthani vegetarian food and thali.",
    sight:
      "Visit museums and historic landmarks around the Pink City.",
    dinner:
      "Enjoy a traditional Rajasthani dinner experience.",
  },

  kerala: {
    culture:
      "Experience Kerala's heritage, temples, and local traditions.",
    market:
      "Explore local markets for spices, handicrafts, and products.",
    food:
      "Enjoy Kerala vegetarian cuisine and regional specialties.",
    sight:
      "Explore nature, backwaters, and cultural attractions.",
    dinner:
      "Enjoy a traditional Kerala dinner.",
  },

  manali: {
    culture:
      "Explore local Himalayan culture and heritage.",
    market:
      "Browse local markets for handicrafts and souvenirs.",
    food:
      "Enjoy vegetarian Himalayan and North Indian food.",
    sight:
      "Explore mountain viewpoints and nearby attractions.",
    dinner:
      "Enjoy a relaxed mountain dinner.",
  },

  udaipur: {
    culture:
      "Explore royal palaces, lakes, and Mewar heritage.",
    market:
      "Discover handicrafts, textiles, jewellery, and souvenirs.",
    food:
      "Enjoy traditional Rajasthani vegetarian cuisine.",
    sight:
      "Visit lakeside attractions and historic landmarks.",
    dinner:
      "Enjoy a traditional dinner overlooking the city.",
  },

  agra: {
    culture:
      "Explore Mughal architecture and historic monuments.",
    market:
      "Discover marble crafts, textiles, and local souvenirs.",
    food:
      "Enjoy vegetarian Mughlai and North Indian specialties.",
    sight:
      "Explore major historic landmarks and museums.",
    dinner:
      "Enjoy a traditional North Indian dinner.",
  },

  varanasi: {
    culture:
      "Experience historic temples, ghats, and local traditions.",
    market:
      "Explore local markets for silk, crafts, and souvenirs.",
    food:
      "Enjoy vegetarian North Indian and local cuisine.",
    sight:
      "Explore the ghats and important cultural landmarks.",
    dinner:
      "Enjoy a traditional vegetarian dinner.",
  },

  mumbai: {
    culture:
      "Explore Mumbai's colonial architecture and cultural landmarks.",
    market:
      "Discover street markets, handicrafts, and local shopping areas.",
    food:
      "Enjoy vegetarian Maharashtrian and Mumbai specialties.",
    sight:
      "Explore iconic landmarks and waterfront attractions.",
    dinner:
      "Enjoy a Mumbai dining experience.",
  },

  bengaluru: {
    culture:
      "Explore Bengaluru's historic buildings, gardens, and culture.",
    market:
      "Discover local markets, crafts, and shopping districts.",
    food:
      "Enjoy vegetarian South Indian specialties.",
    sight:
      "Explore gardens, museums, and city attractions.",
    dinner:
      "Enjoy a South Indian dinner experience.",
  },
};

function getDestinationData(destination) {
  const key = destination
    .split(",")[0]
    .trim()
    .toLowerCase();

  return (
    DESTINATION_DATA[key] || {
      culture:
        "Explore the destination's major cultural attractions.",
      market:
        "Explore local markets and shopping areas.",
      food:
        "Enjoy local vegetarian and regional specialties.",
      sight:
        "Visit important local attractions and museums.",
      dinner:
        "Enjoy a local dinner experience.",
    }
  );
}

// ======================================================
// GENERATE BASIC DAILY ITEMS
// ======================================================

function createDailyItems(
  destination,
  dayIndex,
  style,
  interests
) {
  const data = getDestinationData(destination);

  const hasHistory = interests.includes("History");
  const hasFood = interests.includes("Food");
  const hasMarkets = interests.includes("Markets");
  const hasNature = interests.includes("Nature");
  const hasPhotography =
    interests.includes("Photography");

  const items = [
    {
      kind: "culture",
      slot: "08:30",
      name:
        dayIndex === 0
          ? `${destination.split(",")[0]} Heritage Tour`
          : `${destination.split(",")[0]} Historic Walk`,
      area: data.culture,
      cost: 700,
      note: hasHistory
        ? "Matches your History interest."
        : "",
      matches: hasHistory ? ["History"] : [],
    },

    {
      kind: "market",
      slot: "11:30",
      name: "Local Market Exploration",
      area: data.market,
      cost: 300,
      note: hasMarkets
        ? "Matches your Markets interest."
        : "",
      matches: hasMarkets ? ["Markets"] : [],
    },

    {
      kind: "food",
      slot: "13:00",
      name: "Vegetarian Lunch",
      area: data.food,
      cost: 400,
      note: hasFood
        ? "Matches your Food interest."
        : "",
      matches: hasFood ? ["Food"] : [],
    },

    {
      kind: "sight",
      slot: "14:30",
      name: hasNature
        ? "Nature & Scenic Exploration"
        : hasPhotography
        ? "Photography & Sightseeing"
        : "Afternoon Sightseeing",
      area: data.sight,
      cost: 600,
      note: hasNature
        ? "Good option for nature lovers."
        : hasPhotography
        ? "Good photography opportunity."
        : "",
      matches: [
        ...(hasNature ? ["Nature"] : []),
        ...(hasPhotography
          ? ["Photography"]
          : []),
      ],
    },

    {
      kind: "relax",
      slot: "16:30",
      name: "Return to Hotel & Refresh",
      area: "Relax and prepare for the evening.",
      cost: 0,
      note: "",
      matches: [],
    },

    {
      kind: "dinner",
      slot: "19:30",
      name: "Traditional Dinner Experience",
      area: data.dinner,
      cost: 500,
      note: hasFood
        ? "Vegetarian-friendly option."
        : "",
      matches: hasFood ? ["Food"] : [],
    },
  ];

  if (style === "Relaxed") {
    return items.filter((_, index) => {
      return index !== 3;
    });
  }

  if (style === "Packed") {
    return [
      ...items,
      {
        kind: "sight",
        slot: "21:00",
        name: "Evening Exploration",
        area:
          "Optional evening walk and local sightseeing.",
        cost: 300,
        note: "",
        matches: [],
      },
    ];
  }

  return items;
}

// ======================================================
// COST ESTIMATE
// ======================================================

function calculateEstimate({
  budget,
  travellers,
  dayCount,
  style,
}) {
  const totalBudget = Number(budget);

  const stayPerPerson =
    style === "Relaxed"
      ? 1200
      : style === "Packed"
      ? 1400
      : 1300;

  const foodPerPerson =
    style === "Relaxed"
      ? 600
      : style === "Packed"
      ? 800
      : 700;

  const transportPerPerson =
    style === "Relaxed"
      ? 300
      : style === "Packed"
      ? 500
      : 400;

  const activitiesPerPerson =
    style === "Relaxed"
      ? 500
      : style === "Packed"
      ? 800
      : 650;

  const stay = stayPerPerson * dayCount;
  const food = foodPerPerson * dayCount;
  const transport =
    transportPerPerson * dayCount;
  const activities =
    activitiesPerPerson * dayCount;

  const perPersonTotal =
    stay +
    food +
    transport +
    activities;

  const total =
    perPersonTotal * travellers;

  const difference =
    totalBudget - total;

  let status = "within";

  if (difference < 0) {
    status = "over";
  } else if (
    difference <
    totalBudget * 0.15
  ) {
    status = "tight";
  }

  return {
    budget: totalBudget,
    total,
    difference: Math.abs(difference),
    status,
    stay,
    food,
    transport,
    activities,
  };
}

// ======================================================
// BUDGET SPLIT
// ======================================================

function createBudgetSplit(estimate) {
  const rows = [
    {
      key: "stay",
      label: "Stay",
      amount: estimate.stay,
      need: estimate.stay,
    },
    {
      key: "food",
      label: "Food",
      amount: estimate.food,
      need: estimate.food,
    },
    {
      key: "transport",
      label: "Local travel",
      amount: estimate.transport,
      need: estimate.transport,
    },
    {
      key: "activities",
      label: "Activities",
      amount: estimate.activities,
      need: estimate.activities,
    },
  ];

  const total = rows.reduce(
    (sum, row) => sum + row.amount,
    0
  );

  return {
    total,
    rows: rows.map((row) => ({
      ...row,
      percent:
        total > 0
          ? Math.round(
              (row.amount / total) * 100
            )
          : 0,
      shortBy: 0,
    })),
  };
}

// ======================================================
// GENERATE TRIP
// ======================================================

export function generateTrip(
  inputs = DEFAULT_INPUTS
) {
  const destination =
    inputs.destination ||
    DEFAULT_INPUTS.destination;

  const arrive =
    inputs.arrive ||
    inputs.startDate ||
    DEFAULT_INPUTS.arrive;

  const leave =
    inputs.leave ||
    inputs.endDate ||
    DEFAULT_INPUTS.leave;

  const travellers =
    Number(inputs.travellers) ||
    DEFAULT_INPUTS.travellers;

  const budget =
    Number(inputs.budget) ||
    DEFAULT_INPUTS.budget;

  const interests =
    inputs.interests || [];

  const pace =
    inputs.pace ||
    inputs.style ||
    DEFAULT_INPUTS.pace;

  const notes =
    inputs.notes || "";

  const dayCount =
    getTripLength(arrive, leave);

  const shortDest =
    destination
      .split(",")[0]
      .trim();

  const days = [];

  const startDate = new Date(
    `${arrive}T00:00:00`
  );

  for (let i = 0; i < dayCount; i++) {
    const date = new Date(startDate);

    date.setDate(
      startDate.getDate() + i
    );

    const dateISO =
      `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(
        date.getDate()
      ).padStart(2, "0")}`;

    const dayItems =
      createDailyItems(
        shortDest,
        i,
        pace,
        interests
      );

    const weekday =
      date.toLocaleDateString("en-US", {
        weekday: "long",
      });

    days.push({
      day: i + 1,
      number: i + 1,
      index: i,
      dateISO,
      weekday,
      shortDate:
        formatDateShort(dateISO),
      total: Math.min(
        budget,
        3470 + i * 150
      ),
      items: dayItems,
    });
  }

  const estimate =
    calculateEstimate({
      budget,
      travellers,
      dayCount,
      style: pace,
    });

  const split =
    createBudgetSplit(estimate);

  const tripNotes = [];

  if (notes.trim()) {
    tripNotes.push(
      `Your note: ${notes.trim()}`
    );
  }

  tripNotes.push(
    `Your ${pace.toLowerCase()} itinerary for ${dayCount} ${
      dayCount === 1
        ? "day"
        : "days"
    } is ready.`
  );

  const groupTotal =
    budget *
    dayCount *
    travellers;

  return {
    destination: shortDest,
    fullDestination: destination,
    destinationKey:
      shortDest.toLowerCase(),

    startDate: arrive,
    endDate: leave,

    rangeLabel:
      `${formatDateShort(arrive)} – ${formatDateShort(leave)}`,

    dayCount,

    days,

    budget,
    groupTotal,
    travellers,

    pace,
    style: pace,

    interests,

    notes: tripNotes,

    note:
      `Your ${pace.toLowerCase()} itinerary for ${dayCount} ${
        dayCount === 1
          ? "day"
          : "days"
      } is ready.`,

    estimate,

    split,
  };
}