"use client"

import { useState, useEffect } from "react"
import { SectionTitle } from "@/components/ui/section-title"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import type { Material } from "@/lib/notion"

export function MaterialsSection() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchMaterials() {
    try {
      setLoading(true)

      // Direct API call
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/materials?t=${timestamp}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (Array.isArray(data)) {
        setMaterials(data)
      } else if (data.items && Array.isArray(data.items)) {
        setMaterials(data.items)
      } else {
        throw new Error("Unexpected data format from API")
      }

      setError(null)
    } catch (err) {
      console.error("Error fetching materials:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMaterials()
  }, [])

  return (
    <section className="py-20 bg-zinc-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="3D Printing Materials" />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-white">Loading materials...</p>
          </div>
        ) : error ? (
          <div className="text-center p-6 bg-zinc-900 rounded-sm cyber-border">
            <p className="text-white mb-2">Unable to load materials at this time.</p>
            <p className="text-zinc-400 text-sm">Please check back later.</p>
            <p className="text-zinc-400 text-xs mt-2">Error: {error}</p>
          </div>
        ) : materials.length === 0 ? (
          <div className="text-center p-6">
            <p className="text-white">No materials available at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {materials.map((material) => (
              <div key={material.id} className="bg-zinc-800 p-6 rounded-sm cyber-border">
                <h4 className="metallic-text text-lg font-bold mb-2">{material.name}</h4>
                <p className="text-white mb-2 text-sm">
                  <span className="text-emerald-500 font-medium">Type:</span> {material.materialType}
                </p>

                <div className="mb-3">
                  <h5 className="text-emerald-500 text-sm font-medium mb-1">Best Uses:</h5>
                  <ul className="text-white text-sm">
                    {material.bestUses && material.bestUses.length > 0 ? (
                      material.bestUses.map((use, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-emerald-500 mr-2">✓</span>
                          <span>{use}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-zinc-400">No best uses specified</li>
                    )}
                  </ul>
                </div>

                <div className="mb-3">
                  <h5 className="text-emerald-500 text-sm font-medium mb-1">Properties:</h5>
                  <ul className="text-white text-sm">
                    {material.properties && material.properties.length > 0 ? (
                      material.properties.map((property, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-emerald-500 mr-2">✓</span>
                          <span>{property}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-zinc-400">No properties specified</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h5 className="text-emerald-500 text-sm font-medium mb-1">Price:</h5>
                  {material.price !== null && material.price !== undefined ? (
                    <p className="text-white text-sm font-bold">${material.price}/kg</p>
                  ) : (
                    <p className="text-zinc-400 text-sm">Contact for pricing</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
