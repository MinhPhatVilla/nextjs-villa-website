"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { VILLAS, PRICE_BADGE, type Villa } from "@/lib/data"
import VillaCard from "@/components/villa-card"
import { cn } from "@/lib/utils"

type Tier = Villa["priceTier"] | ""
const TIERS: Tier[] = ["", "<3", "3-5", "5-8", "8-12", "12-15"]

export default function FilterBar() {
  const [q, setQ] = useState("")
  const [tier, setTier] = useState<Tier>("")

  const filtered = useMemo(() => {
    const norm = (s: string) =>
      s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
    const kw = norm(q)
    return VILLAS.filter(v => {
      const hay = norm([v.name, v.beds, v.guests, v.distance, v.amenities.join(" ")].join(" "))
      const okQ = !kw || hay.includes(kw)
      const okT = !tier || v.priceTier === tier
      return okQ && okT
    })
  }, [q, tier])

  return (
    <>
      <div className="rounded-xl border bg-white p-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            placeholder="Tìm: gần biển, karaoke, 6 phòng ngủ…"
            className="max-w-md"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {TIERS.map(t => (
              <button
                key={t || "all"}
                onClick={() => setTier(t)}
                className={cn(
                  "rounded-full border px-3 py-1 text-sm",
                  t === tier
                    ? "bg-brand text-white border-brand shadow"
                    : "bg-white text-slate-700 border-slate-200 hover:border-brand/40"
                )}
              >
                {t ? PRICE_BADGE[t as Exclude<Tier, "">] : "Tất cả giá"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-600">
        Tìm thấy <b>{filtered.length}</b> căn phù hợp
        {tier ? ` • Khoảng giá: ${PRICE_BADGE[tier as Exclude<Tier, "">]}` : ""}
        {q ? ` • Từ khóa: "${q}"` : ""}
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {filtered.map(v => <VillaCard key={v.slug} v={v} />)}
      </div>
    </>
  )
}
