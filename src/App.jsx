import { useState } from "react";
import "./App.css";

const interests = [
  "History",
  "Food",
  "Markets",
  "Photography",
  "Nature",
  "Nightlife",
];

const itinerary = [
  {
    time: "08:30",
    title: "Amber Fort",
    type: "sight",
    info: "Open 08:00–17:30 · 2 h 30 · ₹1,100",
    travel: "25 min by cab",
  },
  {
    time: "11:45",
    title: "Johari Bazaar",
    type: "shopping",
    info: "Open 10:00–20:00 · 1 h 15 · free",
    travel: "2 min walk",
  },
  {
    time: "13:15",
    title: "Lunch at Laxmi Misthan Bhandar",
    type: "food",
    info: "1 h · about ₹320",
    travel: "12 min by auto",
  },
  {
    time: "14:30",
    title: "City Palace, guided tour",
    type: "sight",
    info: "Open 09:30–17:00 · 1 h 30 · ₹600",
    travel: "30 min by cab",
  },
  {
    time: "16:30",
    title: "Rest at Hotel Pearl Palace",
    type: "stay",
    info: "Rain from 16:00 · back before it starts",
    travel: "30 min by cab",
  },
  {
    time: "19:30",
    title: "Dinner at Chokhi Dhani",
    type: "food",
    info: "2 h · about ₹800",
    travel: "",
  },
];

const bookings = [
  ["🏨", "Hotel Pearl Palace", "14–17 Nov · 3 nights", "₹8,400", "Confirmed"],
  ["🚕", "Cab to Amber Fort", "Sat 08:00 · ref JP-4471", "₹650", "Confirmed"],
  ["🎟️", "Amber Fort entry × 2", "Sat 08:30 · gate 2", "₹1,100", "Booked"],
  ["🏛️", "City Palace guided tour", "Sat 14:30 · 1 h 30", "₹600", "Cancelled"],
  ["🍽️", "Chokhi Dhani dinner", "Sat 19:30 · table for 2", "₹800", "Pending"],
  ["🚆", "Train to Delhi", "Mon 17 Nov · 15:10", "₹1,240", "Booked"],
];

function App() {
  const [page, setPage] = useState("setup");

  const [destination, setDestination] = useState("Jaipur, Rajasthan");
  const [arrive, setArrive] = useState("Fri 14 Nov");
  const [leave, setLeave] = useState("Mon 17 Nov");
  const [travellers, setTravellers] = useState(2);
  const [budget, setBudget] = useState(3500);

  const [selectedInterests, setSelectedInterests] = useState([
    "History",
    "Food",
    "Markets",
  ]);

  const [pace, setPace] = useState("Balanced");

  const [notes, setNotes] = useState(
    "Sunrise somewhere. Mostly vegetarian food."
  );

  const money = (value) =>
    `₹${Number(value).toLocaleString("en-IN")}`;

  const toggleInterest = (item) => {
    setSelectedInterests((current) =>
      current.includes(item)
        ? current.filter((x) => x !== item)
        : [...current, item]
    );
  };

  const shortDestination =
    destination.split(",")[0].trim() || "Jaipur";

  /* ================= SETUP ================= */

  if (page === "setup") {
    return (
      <div className="app">
        <Header page={page} setPage={setPage} />

        <section className="hero">
          <div className="step-label">
            NEW TRIP · STEP 1 OF 2
          </div>

          <h1>
            Where to <span>next?</span>
          </h1>

          <p>
            Tell me the basics. I'll draft the days, keep an eye
            on your bookings, and rework the plan when something
            changes.
          </p>
        </section>

        <main className="setup-content">
          <section className="setup-form">
            <label>DESTINATION</label>

            <input
              className="large-input"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />

            <div className="trip-details">
              <div>
                <label>ARRIVE</label>
                <input
                  value={arrive}
                  onChange={(e) => setArrive(e.target.value)}
                />
              </div>

              <div>
                <label>LEAVE</label>
                <input
                  value={leave}
                  onChange={(e) => setLeave(e.target.value)}
                />
              </div>

              <div>
                <label>TRAVELLERS</label>

                <div className="travellers">
                  <button
                    onClick={() =>
                      setTravellers(Math.max(1, travellers - 1))
                    }
                  >
                    −
                  </button>

                  <strong>{travellers}</strong>

                  <button
                    onClick={() =>
                      setTravellers(Math.min(12, travellers + 1))
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="budget-section">
              <div className="budget-heading">
                <label>BUDGET PER DAY</label>
                <span>{money(budget)} a day</span>
              </div>

              <input
                className="budget-slider"
                type="range"
                min="1500"
                max="10000"
                step="250"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />

              <div className="budget-range">
                <span>₹1,500</span>
                <span>₹10,000</span>
              </div>
            </div>

            <div className="interest-section">
              <label>WHAT DO YOU LIKE?</label>

              <div className="chips">
                {interests.map((item) => (
                  <button
                    key={item}
                    className={
                      selectedInterests.includes(item)
                        ? "chip selected"
                        : "chip"
                    }
                    onClick={() => toggleInterest(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="pace-section">
              <label>PACE</label>

              <div className="pace-buttons">
                {["Relaxed", "Balanced", "Packed"].map((item) => (
                  <button
                    key={item}
                    className={pace === item ? "active" : ""}
                    onClick={() => setPace(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="notes-section">
              <label>ANYTHING I SHOULD KNOW?</label>

              <input
                className="notes-input"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button
              className="plan-button"
              onClick={() => setPage("plan")}
            >
              Plan my trip →
            </button>
          </section>

          <DraftCard
            destination={shortDestination}
            arrive={arrive}
            leave={leave}
            budget={budget}
            travellers={travellers}
            selectedInterests={selectedInterests}
            pace={pace}
          />
        </main>
      </div>
    );
  }

  /* ================= PLAN ================= */

  if (page === "plan") {
    return (
      <div className="app">
        <Header page={page} setPage={setPage} />

        <main className="screen">
          <div className="plan-heading">
            <div>
              <div className="step-label">
                {shortDestination.toUpperCase()} · DAY 2 OF 4
              </div>

              <h1>
                Saturday <span>15 Nov</span>
              </h1>
            </div>

            <div className="day-buttons">
              <button>D1</button>
              <button className="current">D2</button>
              <button>D3</button>
              <button>D4</button>
            </div>
          </div>

          <div className="planner-note">
            I ordered the stops to save 14 km of driving, and moved
            the bazaar ahead of the 4pm rain.
          </div>

          <div className="plan-grid">
            <section className="timeline">
              {itinerary.map((item, index) => (
                <div key={item.time}>
                  <div className="timeline-row">
                    <span className="drag">⋮⋮</span>

                    <span className={`time time-${item.type}`}>
                      {item.time}
                    </span>

                    <div className={`activity activity-${item.type}`}>
                      <div className="activity-title">
                        {item.title}

                        <span>
                          {item.type}
                        </span>
                      </div>

                      <div className="activity-info">
                        {item.info}
                      </div>
                    </div>
                  </div>

                  {index < itinerary.length - 1 &&
                    item.travel && (
                      <div className="travel-time">
                        ┆ {item.travel}
                      </div>
                    )}

                  {index === 2 && (
                    <div className="gap-box">
                      <span>
                        30 min free before the rain. Add a chai
                        stop?
                      </span>

                      <button>Add stop</button>
                    </div>
                  )}
                </div>
              ))}
            </section>

            <aside className="plan-sidebar">
              <div className="route-map">
                <div className="map-road road-one"></div>
                <div className="map-road road-two"></div>

                <div className="map-stop stop-1">1</div>
                <div className="map-stop stop-2">2</div>
                <div className="map-stop stop-3">3</div>
                <div className="map-stop stop-4">4</div>
                <div className="map-hotel">H</div>
                <div className="map-stop stop-6">6</div>
              </div>

              <div className="assumption-card">
                <div className="mini-label">
                  THIS PLAN ASSUMES
                </div>

                <div className="assumption-tags">
                  <span>₹3,500 a day</span>
                  <span>Balanced pace</span>
                  <span>History</span>
                  <span>Markets</span>
                </div>

                <div className="change-constraint">
                  Change a constraint
                  <span>⚙</span>
                </div>
              </div>

              <div className="daily-budget">
                ₹3,470 of ₹3,500 today.
                <strong> ₹30 left.</strong>
              </div>
            </aside>
          </div>
        </main>
      </div>
    );
  }

  /* ================= BUDGET ================= */

  if (page === "budget") {
    return (
      <div className="app">
        <Header page={page} setPage={setPage} />

        <main className="screen">
          <h1 className="screen-title">
            {shortDestination} money and <span>bookings</span>
          </h1>

          <div className="budget-layout">
            <section>
              <div className="budget-panel">
                <div className="planned-heading">
                  <span>PLANNED SO FAR</span>
                  <strong>₹3,380 left</strong>
                </div>

                <div className="planned-number">
                  ₹7,120{" "}
                  <small>of ₹10,500</small>
                </div>

                <div className="budget-bar">
                  <div className="activities"></div>
                  <div className="food"></div>
                  <div className="transport"></div>
                </div>

                <div className="legend">
                  <span>● Activities ₹2,900</span>
                  <span>● Food ₹1,720</span>
                  <span>● Transport ₹2,500</span>
                </div>
              </div>

              <div className="budget-panel">
                <div className="mini-label">
                  DAY BY DAY · CAP ₹3,500
                </div>

                <div className="days-budget">
                  <BudgetDay label="D1" text="arrival" />
                  <BudgetDay
                    label="D2"
                    value="₹3,470"
                    percent="99%"
                    warning
                  />
                  <BudgetDay
                    label="D3"
                    value="₹2,650"
                    percent="76%"
                  />
                  <BudgetDay
                    label="D4"
                    value="₹1,000"
                    percent="29%"
                  />
                </div>

                <div className="budget-warning">
                  Day 2 is almost at the cap. Tell me if you want it
                  lighter.
                </div>
              </div>

              <p className="budget-footnote">
                The daily budget covers food, transport and
                activities. Your stay (₹8,400 for 3 nights) is
                tracked separately.
              </p>
            </section>

            <section>
              <div className="mini-label bookings-title">
                BOOKINGS · 6
              </div>

              <div className="bookings">
                {bookings.map((booking) => (
                  <Booking
                    key={booking[1]}
                    icon={booking[0]}
                    title={booking[1]}
                    details={booking[2]}
                    price={booking[3]}
                    status={booking[4]}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  /* ================= ALERTS ================= */
  if (page === "alerts") {
    return <AlertsPage setPage={setPage} destination={shortDestination} />;
  }

  /* ================= CHAT ================= */
  if (page === "chat") {
    return (
      <ChatPage
        setPage={setPage}
        destination={shortDestination}
        travellers={travellers}
        budget={budget}
        selectedInterests={selectedInterests}
      />
    );
  }

  /* ================= DASHBOARD ================= */
  if (page === "dashboard") {
    return (
      <DashboardPage
        setPage={setPage}
        destination={shortDestination}
        arrive={arrive}
        leave={leave}
        travellers={travellers}
        budget={budget}
        selectedInterests={selectedInterests}
        pace={pace}
      />
    );
  }

  return null;
}

/* ================= COMPONENTS ================= */

function Header({ page, setPage }) {
  return (
    <header className="navbar">
      <div className="brand">
        <span className="compass">✧</span>
        TravelPilot
      </div>

      <nav>
        <button onClick={() => setPage("setup")}>
          Setup
        </button>

        <button
          className={page === "plan" ? "nav-active" : ""}
          onClick={() => setPage("plan")}
        >
          Plan
        </button>

        <button
          className={page === "budget" ? "nav-active" : ""}
          onClick={() => setPage("budget")}
        >
          Budget
        </button>

        <button className={page === "alerts" ? "nav-active" : ""} onClick={() => setPage("alerts")}>Alerts</button>
        <button className={page === "chat" ? "nav-active" : ""} onClick={() => setPage("chat")}>Chat</button>
        <button className={page === "dashboard" ? "nav-active" : ""} onClick={() => setPage("dashboard")}>Dashboard</button>
      </nav>
    </header>
  );
}


const alertOptions = [
  {
    title: "Swap in Hawa Mahal",
    tag: "Best fit",
    meta: "14:40 · 1 h · mostly outdoors, dry until 16:00",
    cost: "−₹400",
    travel: "−6 min",
    tone: "coral",
    changes: [
      ["14:30", "City Palace tour", "Removed"],
      ["14:40", "Hawa Mahal", "Added"],
      ["15:45", "Back to hotel, 6 min earlier", "Moved"],
    ],
  },
  {
    title: "Albert Hall Museum",
    tag: "Rainproof",
    meta: "15:00 · 1 h 30 · indoors, +12 min drive",
    cost: "−₹300",
    travel: "+12 min",
    tone: "teal",
    changes: [
      ["14:30", "City Palace tour", "Removed"],
      ["15:00", "Albert Hall Museum", "Added"],
      ["16:45", "Back to hotel, 12 min later", "Moved"],
    ],
  },
  {
    title: "Free afternoon",
    tag: "Lightest",
    meta: "Rest at the hotel and start dinner earlier",
    cost: "−₹600",
    travel: "−30 min",
    tone: "gold",
    changes: [
      ["14:30", "City Palace tour", "Removed"],
      ["15:00", "Rest at hotel", "Added"],
      ["18:30", "Dinner moved up 1 hour", "Moved"],
    ],
  },
];

function AlertsPage({ setPage, destination }) {
  const [selected, setSelected] = useState(0);
  const option = alertOptions[selected];

  return (
    <div className="app">
      <Header page="alerts" setPage={setPage} />
      <main className="screen alerts-screen">
        <div className="alert-banner">
          <div className="alert-icon">⚠</div>
          <div className="alert-copy">
            <h2>{destination}: City Palace tour at 14:30 is cancelled</h2>
            <p>The operator cancelled at 09:12. Your ₹600 will be refunded in 5–7 days. This affects 2 stops today.</p>
          </div>
          <span className="decision-badge">Needs a decision</span>
        </div>
        <div className="alerts-grid">
          <section>
            <div className="mini-label alert-section-label">PICK A FIX · SAT AFTERNOON</div>
            <div className="alert-options">
              {alertOptions.map((item, index) => (
                <button
                  key={item.title}
                  className={`alert-option ${selected === index ? `selected ${item.tone}` : ""}`}
                  onClick={() => setSelected(index)}
                >
                  <div className="alert-option-top">
                    <strong>{item.title}</strong><span>{item.tag}</span>
                  </div>
                  <p>{item.meta}</p>
                  <div className="alert-impact">{item.cost} · {item.travel}</div>
                </button>
              ))}
            </div>
          </section>
          <section>
            <div className="mini-label alert-section-label">WHAT CHANGES</div>
            <AlertDetails selected={selected} />
          </section>
        </div>
      </main>
    </div>
  );
}

function ChatPage({ setPage, destination, travellers, budget, selectedInterests }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: `Hi! I can help you plan ${destination}. Ask about places, budget, transport, or your itinerary.` },
  ]);

  const sendMessage = () => {
    const clean = message.trim();
    if (!clean) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: clean },
      { role: "assistant", text: `For ${destination}, I recommend keeping your ${travellers} traveller plan within ₹${Number(budget).toLocaleString("en-IN")} per day. Your interests include ${selectedInterests.join(", ") || "flexible activities"}.` },
    ]);
    setMessage("");
  };

  return (
    <div className="app">
      <Header page="chat" setPage={setPage} />
      <main className="screen">
        <div className="step-label">TRAVEL ASSISTANT · {destination.toUpperCase()}</div>
        <h1 className="screen-title">Plan your trip with <span>Chat</span></h1>
        <div className="chat-panel">
          <div className="chat-messages">
            {messages.map((item, index) => (
              <div key={index} className={`chat-message ${item.role}`}>
                {item.text}
              </div>
            ))}
          </div>
          <div className="chat-input-row">
            <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder={`Ask about ${destination}...`} />
            <button onClick={sendMessage}>Send →</button>
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardPage({ setPage, destination, arrive, leave, travellers, budget, selectedInterests, pace }) {
  return (
    <div className="app">
      <Header page="dashboard" setPage={setPage} />
      <main className="screen">
        <div className="step-label">TRIP OVERVIEW · LIVE SHARED DETAILS</div>
        <h1 className="screen-title">Your <span>{destination}</span> dashboard</h1>
        <div className="dashboard-grid">
          <div className="dashboard-card"><small>DESTINATION</small><strong>{destination}</strong><p>{arrive} → {leave}</p></div>
          <div className="dashboard-card"><small>TRAVELLERS</small><strong>{travellers}</strong><p>{travellers === 1 ? "traveller" : "travellers"}</p></div>
          <div className="dashboard-card"><small>DAILY BUDGET</small><strong>₹{Number(budget).toLocaleString("en-IN")}</strong><p>{pace} pace</p></div>
          <div className="dashboard-card"><small>INTERESTS</small><strong>{selectedInterests.length}</strong><p>{selectedInterests.join(", ") || "Not selected"}</p></div>
        </div>
        <div className="dashboard-actions"><button onClick={() => setPage("setup")}>Edit trip →</button><button onClick={() => setPage("plan")}>View itinerary →</button><button onClick={() => setPage("alerts")}>View alerts →</button></div>
      </main>
    </div>
  );
}

function AlertDetails({ selected = 0 }) {
  const option = alertOptions[selected];
  return (
    <div className="alert-details">
      <div className="change-list">
        {option.changes.map(([time, title, status]) => (
          <div key={`${time}-${title}`} className={`change-row ${status.toLowerCase()}`}>
            <span>{time}</span>
            <strong>{title}</strong>
            <small>{status}</small>
          </div>
        ))}
      </div>
      <div className="impact-grid">
        <div><small>Cost</small><strong>{option.cost}</strong></div>
        <div><small>Travel</small><strong>{option.travel}</strong></div>
      </div>
      <div className="alert-actions">
        <button className="primary-alert" onClick={() => alert(`Accepted: ${option.title}`)}>Accept this plan</button>
        <button onClick={() => alert("The previous itinerary is restored.")}>Undo</button>
        <button onClick={() => alert("The operator cancelled the booking at 09:12.")}>Ask why</button>
      </div>
      <div className="what-if"><span>●</span> What if mode: nothing changes until you accept</div>
    </div>
  );
}

function DraftCard({
  destination,
  arrive,
  leave,
  budget,
  travellers,
  selectedInterests,
  pace,
}) {
  return (
    <aside className="draft-column">
      <div className="draft-card">
        <div className="draft-top">
          <span>TRIP DRAFT</span>
          <span>✦</span>
        </div>

        <h2>{destination}</h2>

        <p>
          {arrive} – {leave} · 3 nights
        </p>

        <div className="divider"></div>

        <small>Total budget</small>

        <div className="total-budget">
          {`₹${Number(budget * 3).toLocaleString("en-IN")}`}
        </div>

        <small>
          for {travellers}{" "}
          {travellers === 1 ? "traveller" : "travellers"}
        </small>

        <div className="summary-chips">
          {selectedInterests.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="pace-text">
          {pace.toLowerCase()} pace
        </div>
      </div>
    </aside>
  );
}

function BudgetDay({
  label,
  text,
  value,
  percent = "0%",
  warning,
}) {
  return (
    <div className="budget-day">
      <span>{label}</span>

      <div className="day-bar">
        {value && (
          <div
            className={warning ? "bar warning" : "bar"}
            style={{ width: percent }}
          ></div>
        )}
      </div>

      <span className="day-value">
        {value || text}
      </span>
    </div>
  );
}

function Booking({
  icon,
  title,
  details,
  price,
  status,
}) {
  const statusClass = status.toLowerCase();

  return (
    <div
      className={`booking ${
        status === "Cancelled" ? "cancelled" : ""
      }`}
    >
      <div className="booking-icon">{icon}</div>

      <div className="booking-info">
        <strong>{title}</strong>
        <span>{details}</span>
      </div>

      <div className="booking-price">
        <strong>{price}</strong>
        <span className={`status ${statusClass}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

export default App;