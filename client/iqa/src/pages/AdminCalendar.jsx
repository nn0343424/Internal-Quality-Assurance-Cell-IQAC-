import { useState } from "react";
import { createCalendar } from "../services/api";

export default function AdminCalendar() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    await createCalendar({
      title,
      startDate,
      endDate,
      description,
    });

    alert("Calendar event added");

    setTitle("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Academic Calendar</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Add Event</button>
    </div>
  );
}