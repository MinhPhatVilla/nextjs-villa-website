import FilterBar from "@/components/filter-bar"

export default function VillaListPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-extrabold">Danh mục Villa</h1>
      <p className="text-slate-600">
        Lọc theo khoảng giá hoặc gõ từ khóa, sau đó xem ảnh & chat Zalo để chốt.
      </p>
      <div className="mt-4" />
      <FilterBar />
    </section>
  )
}
