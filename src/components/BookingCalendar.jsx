import { useState } from "react";

const WEEKDAY_SLOTS = [
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
];

const WEEKEND_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM",
  "10:00 PM", "11:00 PM"
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function BookingCalendar({ dark, onBook }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const border = dark ? "rgba(124,58,237,.15)" : "rgba(109,40,217,.12)";
  const surface = dark ? "rgba(16,13,34,.8)" : "rgba(255,255,255,.9)";
  const muted = dark ? "#6b6894" : "#8884aa";
  const textColor = dark ? "#ede9fe" : "#1e1b4b";

  const totalDays = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
    setSelectedDate(null); setSelectedSlot(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
    setSelectedDate(null); setSelectedSlot(null);
  };

  const isPast = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const getDayOfWeek = (day) => new Date(viewYear, viewMonth, day).getDay();
  const isWeekend = (day) => { const d = getDayOfWeek(day); return d === 0 || d === 6; }; // Sun=0, Sat=6
  const isSaturday = (day) => getDayOfWeek(day) === 6;
  const isSunday = (day) => getDayOfWeek(day) === 0;

  const handleDayClick = (day) => {
    if (isPast(day)) return;
    setSelectedDate(day);
    setSelectedSlot(null);
  };

  const getSlots = (day) => isWeekend(day) ? WEEKEND_SLOTS : WEEKDAY_SLOTS;

  const getAvailabilityLabel = (day) => {
    if (isWeekend(day)) return "10:00 AM – 11:00 PM";
    return "6:00 PM – 11:00 PM";
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot) return;
    const dateStr = `${MONTHS[viewMonth]} ${selectedDate}, ${viewYear}`;
    onBook(dateStr, selectedSlot);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="gcard" style={{
      padding: 24, marginBottom: 32
    }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div className="pill" style={{ display: "inline-flex", gap: 6 }}>
          <span>📅</span> Book a Free Consultation
        </div>
        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 20, color: textColor }}>
          Choose Your Preferred Slot
        </div>
        {/* Availability legend */}
        <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: muted }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: "rgba(124,58,237,.45)", display: "inline-block" }} />
            Mon–Fri: 6:00 PM – 11:00 PM
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: muted }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: "rgba(249,115,22,.45)", display: "inline-block" }} />
            Sat–Sun: 10:00 AM – 11:00 PM
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: "0 24px" }} className="calGrid">

        {/* Left: Calendar */}
        <div>
          {/* Month Navigation */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <button onClick={prevMonth} style={{
              width: 32, height: 32, borderRadius: 6, background: "transparent",
              border: `1px solid var(--cgb)`, color: textColor, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
              transition: "all .2s"
            }}>‹</button>
            <span style={{ fontWeight: 700, fontSize: 15, color: textColor }}>
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button onClick={nextMonth} style={{
              width: 32, height: 32, borderRadius: 6, background: "transparent",
              border: `1px solid var(--cgb)`, color: textColor, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
              transition: "all .2s"
            }}>›</button>
          </div>

          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 6 }}>
            {DAYS.map(d => (
              <div key={d} style={{
                textAlign: "center", fontSize: 11, fontWeight: 600,
                color: d === "Sun" || d === "Sat" ? "#f97316" : muted,
                padding: "4px 0"
              }}>{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 }}>
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const disabled = isPast(day);
              const selected = selectedDate === day;
              const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
              const weekend = isWeekend(day);

              return (
                <button key={i} onClick={() => handleDayClick(day)} disabled={disabled} style={{
                  aspectRatio: "1", borderRadius: 6,
                  border: selected
                    ? "1.5px solid var(--cp-brand)"
                    : isToday ? `1.5px solid rgba(129,140,248,.4)` : "1px solid transparent",
                  background: selected
                    ? (weekend ? "linear-gradient(135deg,#f97316,#ea580c)" : "var(--cp-brand)")
                    : weekend && !disabled ? "rgba(249,115,22,.08)" : isToday ? "rgba(129,140,248,.1)" : "transparent",
                  color: selected ? "#fff" : disabled ? muted : weekend ? (dark ? "#fdba74" : "#c2410c") : textColor,
                  cursor: disabled ? "not-allowed" : "pointer",
                  fontSize: 13, fontWeight: selected ? 700 : weekend ? 500 : 400,
                  opacity: disabled ? 0.3 : 1,
                  transition: "all .15s",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div style={{ background: "var(--cgb)", width: 1, minHeight: 180 }} />

        {/* Right: Time Slots */}
        <div>
          {selectedDate ? (
            <>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: textColor }}>
                  📍 {MONTHS[viewMonth]} {selectedDate}, {viewYear}
                  {isWeekend(selectedDate) && (
                    <span style={{
                      marginLeft: 8, fontSize: 11, padding: "2px 8px", borderRadius: 100,
                      background: "rgba(249,115,22,.12)", color: "#f97316",
                      border: "1px solid rgba(249,115,22,.25)", fontWeight: 600
                    }}>
                      {isSaturday(selectedDate) ? "Saturday" : "Sunday"}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: muted, marginTop: 4 }}>
                  ⏰ Available: {getAvailabilityLabel(selectedDate)}
                </div>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: isWeekend(selectedDate) ? "1fr 1fr 1fr" : "1fr 1fr",
                gap: 7,
                maxHeight: 240,
                overflowY: "auto",
                paddingRight: 2
              }}>
                {getSlots(selectedDate).map(slot => (
                  <button key={slot} onClick={() => setSelectedSlot(slot)} style={{
                    padding: "9px 6px", borderRadius: 6, fontSize: 12.5, fontWeight: 500,
                    border: selectedSlot === slot ? "1.5px solid var(--cp-brand)" : `1px solid var(--cgb)`,
                    background: selectedSlot === slot ? "rgba(129,140,248,.12)" : "transparent",
                    color: selectedSlot === slot ? "var(--cp-brand)" : textColor,
                    cursor: "pointer", transition: "all .15s",
                    fontFamily: "'Inter',sans-serif"
                  }}>{slot}</button>
                ))}
              </div>

              {selectedSlot && (
                <button className="btnP" onClick={handleConfirm} style={{
                  width: "100%", marginTop: 14, padding: "13px", fontSize: 14, fontWeight: 600
                }}>
                  Confirm Slot — {selectedSlot}
                </button>
              )}
            </>
          ) : (
            <div style={{
              height: "100%", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", color: muted,
              fontSize: 13.5, textAlign: "center", gap: 12, minHeight: 180
            }}>
              <div style={{ fontSize: 36 }}>👈</div>
              <div>Pick a date to see<br />available time slots</div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media(max-width:600px){
          .calGrid{grid-template-columns:1fr !important;}
          .calGrid > div:nth-child(2){display:none}
        }
      `}</style>
    </div>
  );
}
