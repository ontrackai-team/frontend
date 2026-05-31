"use client";

import { useState } from "react";
import { createAssessment } from "@/services/api";

export default function AddAssessmentForm({ onSuccess }: any) {
  const [form, setForm] = useState({
    title: "",
    course: "",
    due_date: "",
    weight: 0,
    description: "",
    status: "pending",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createAssessment(form);

      setForm({
        title: "",
        course: "",
        due_date: "",
        weight: 0,
        description: "",
        status: "pending",
      });

      if (onSuccess) onSuccess(); // refresh list
    } catch (err) {
      console.log("Create error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Add Assessment</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="course"
        placeholder="Course"
        value={form.course}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="due_date"
        type="datetime-local"
        value={form.due_date}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="weight"
        type="number"
        placeholder="Weight"
        value={form.weight}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add Assessment"}
      </button>
    </form>
  );
}