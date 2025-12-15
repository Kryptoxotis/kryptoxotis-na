"use client"

import { useEffect, useRef, useState, Suspense } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js"
import * as THREE from "three"
import { LoadingSpinner } from "./ui/loading-spinner"
import { RotateCcw, Move3D, ExternalLink, FileText } from "lucide-react"

interface STLModelViewerProps {
  stlFile?: string
  title: string
  modelColor?: string
  backgroundColor?: string
}

function STLModel({ url, color = "#228B22" }: { url: string; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometry = useLoader(STLLoader, url)

  useEffect(() => {
    if (geometry && meshRef.current) {
      // Center the geometry
      geometry.computeBoundingBox()
      const box = geometry.boundingBox!
      const center = box.getCenter(new THREE.Vector3())
      geometry.translate(-center.x, -center.y, -center.z)

      // Scale to fit in view
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2 / maxDim
      geometry.scale(scale, scale, scale)

      // Compute normals
      geometry.computeVertexNormals()
    }
  }, [geometry])

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshLambertMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  )
}

function Scene({ stlFile, modelColor }: { stlFile: string; modelColor: string }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />

      <Suspense fallback={null}>
        <STLModel url={stlFile} color={modelColor} />
      </Suspense>

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} makeDefault />
    </>
  )
}

export function STLModelViewer({
  stlFile,
  title,
  modelColor = "#228B22",
  backgroundColor = "#888888",
}: STLModelViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (stlFile) {
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [stlFile])

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center" style={{ backgroundColor }}>
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-white">Loading STL file...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center" style={{ backgroundColor }}>
        <div className="text-center p-4">
          <div className="text-red-400 mb-2">Error Loading STL</div>
          <p className="text-white text-sm">{error}</p>
          {stlFile && (
            <button
              onClick={() => window.open(stlFile, "_blank")}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              Try Opening File Directly
            </button>
          )}
        </div>
      </div>
    )
  }

  if (!stlFile) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center" style={{ backgroundColor }}>
        <div className="text-center">
          <div
            className="w-20 h-20 mx-auto mb-4 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${modelColor}20` }}
          >
            <Move3D className="w-10 h-10" style={{ color: modelColor }} />
          </div>
          <p className="text-white font-medium">3D Model</p>
          <p className="text-zinc-400 text-sm">No STL file available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={0.8}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: false,
        }}
        style={{ height: "100%", width: "100%", backgroundColor }}
      >
        <color attach="background" args={[backgroundColor]} />
        <Scene stlFile={stlFile} modelColor={modelColor} />
      </Canvas>

      {/* Control Panel */}
      <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
        <button
          onClick={() => window.location.reload()}
          className="bg-zinc-800/90 p-2 rounded-sm hover:bg-zinc-700 transition-colors"
          title="Reset View"
        >
          <RotateCcw size={16} className="text-white" />
        </button>
        {stlFile && (
          <button
            onClick={() => window.open(stlFile, "_blank")}
            className="bg-zinc-800/90 p-2 rounded-sm hover:bg-zinc-700 transition-colors"
            title="Open STL File"
          >
            <ExternalLink size={16} className="text-white" />
          </button>
        )}
      </div>

      {/* Simple Status Indicator */}
      <div className="absolute top-4 left-4 bg-black/70 p-3 rounded-sm">
        <div className="flex items-center space-x-2">
          <FileText size={16} className="text-emerald-400" />
          <p className="text-white text-sm font-medium">STL Model Loaded</p>
        </div>
      </div>

      {/* 3D Indicator */}
      <div className="absolute top-4 right-4">
        <div
          className="bg-black/70 p-2 rounded-sm flex items-center space-x-2"
          style={{ borderLeft: `3px solid ${modelColor}` }}
        >
          <Move3D size={16} style={{ color: modelColor }} />
          <span className="text-white text-sm font-medium">3D Model</span>
        </div>
      </div>
    </div>
  )
}
