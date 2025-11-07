import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Gallery from "@/components/gallery"
import { VILLAS } from "@/lib/data"

export function generateStaticParams() {
  return VILLAS.map(v => ({ slug: v.slug }))
}

export function generateMetadata(
  { params }: { params: { slug: string } }
): Metadata {
  const v = VILLAS.find(x => x.slug === params.slug)
  if (!v) return {}
  const title = `${v.name} — Minh Phát Villa Vũng Tàu Review`
  const description = v.shortdesc || `${v.beds} • ${v.guests} • ${v.distance}`
  return {
    title,
    description,
    openGraph: {
      title, description,
      images: [{ url: v.cover }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title, description,
      images: [v.cover],
    },
  }
}

export default function Page({ params }: { params: { slug: string }}) {
  const villa = VILLAS.find(v => v.slug === params.slug)
  if (!villa) notFound()

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">{villa.name}</h1>
      <p className="text-slate-600">{villa.shortdesc}</p>

      <div className="mt-4 relative aspect-[16/10]">
        <Image src={villa.cover} alt={villa.name} fill className="object-cover rounded-md" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
        <span className="rounded-full border px-2 py-1">{villa.beds}</span>
        <span className="rounded-full border px-2 py-1">{villa.guests}</span>
        <span className="rounded-full border px-2 py-1">{villa.distance}</span>
        <span className="rounded-full border px-2 py-1">{villa.amenities.join(" • ")}</span>
      </div>

      <div className="mt-6">
        <Gallery images={villa.gallery} />
      </div>
    </div>
  )
}
