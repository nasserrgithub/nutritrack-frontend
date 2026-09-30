import { useState } from "react"
import { deleteFoodEntry } from "../api/logs"

const FoodEntryCard = ({ entry, onDeleted }) => {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteFoodEntry(entry.id)
      onDeleted(entry.id)
    } catch (err) {
      console.log(err)
      setDeleting(false)
    }
  }

  return (
    <div style={{ padding: "10px 0", borderBottom: "0.5px solid var(--nt-border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--nt-text)" }}>{entry.food_name}</p>
          <p style={{ fontSize: 11, color: "var(--nt-text-muted)", marginTop: 2, textTransform: "capitalize" }}>
            {entry.weight_g}g · {entry.meal_slot}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--nt-green-700)" }}>
            {Number(entry.calories).toFixed(0)} kcal
          </p>
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{
              background: "none",
              border: "none",
              fontSize: 11,
              color: deleting ? "var(--nt-text-muted)" : "#e53e3e",
              cursor: deleting ? "default" : "pointer",
              padding: 0,
            }}
          >
            {deleting ? "..." : "Delete"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginTop: 8 }}>
        {[
          { label: "kcal", value: Number(entry.calories).toFixed(0) },
          { label: "protein", value: `${Number(entry.protein_g).toFixed(1)}g` },
          { label: "carbs", value: `${Number(entry.carbs_g).toFixed(1)}g` },
          { label: "fat", value: `${Number(entry.fat_g).toFixed(1)}g` },
        ].map((m) => (
          <div key={m.label} style={{ background: "var(--nt-green-50)", borderRadius: 10, padding: "6px 4px", textAlign: "center" }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: "var(--nt-green-900)" }}>{m.value}</p>
            <p style={{ fontSize: 10, color: "var(--nt-text-muted)" }}>{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FoodEntryCard