import { useState } from "react";

const Admin = () => {
  const [formData, setFormData] = useState({
    date: "",
    text: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!formData.date || !formData.text) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formData.date,
          text: formData.text,
          createdBy: user?.email || "anonymous",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({ type: "success", text: "Event added successfully!" });
        setFormData({ date: "", text: "" }); // reset form
      } else {
        const err = await response.json();
        setMessage({ type: "error", text: err.message || "Failed to add event" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error. Try again later." });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Event to Calendar</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "error" ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Event Description
          </label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter event details"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding Event..." : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default Admin;
