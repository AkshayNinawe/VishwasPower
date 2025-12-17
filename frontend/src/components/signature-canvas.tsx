"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"

interface SignatureCanvasProps {
  onSave: (dataUrl: string) => void
  initialDataUrl?: string
  width?: number
  height?: number
  className?: string
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  onSave,
  initialDataUrl,
  width = 300,
  height = 100,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)

  const getCanvas = useCallback(() => canvasRef.current, [])
  const getContext = useCallback(() => getCanvas()?.getContext("2d"), [getCanvas])

  const clearCanvas = useCallback(() => {
    const canvas = getCanvas()
    const ctx = getContext()
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      setIsEmpty(true)
      onSave("") // Clear saved signature data
    }
  }, [getCanvas, getContext, onSave])

  const saveSignature = useCallback(() => {
    const canvas = getCanvas()
    if (canvas) {
      onSave(canvas.toDataURL())
    }
  }, [getCanvas, onSave])

  useEffect(() => {
    const canvas = getCanvas()
    const ctx = getContext()

    if (canvas && ctx) {
      // Set canvas dimensions
      canvas.width = width
      canvas.height = height

      // Set drawing properties
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.strokeStyle = "#000"

      // Load initial signature if provided
      if (initialDataUrl) {
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          setIsEmpty(false)
        }
        img.src = initialDataUrl
      } else {
        clearCanvas() // Ensure canvas is clear if no initial data
      }
    }
  }, [width, height, initialDataUrl, getCanvas, getContext, clearCanvas])

  // Additional touch event handling to prevent page scrolling
  useEffect(() => {
    const canvas = getCanvas()
    if (!canvas) return

    const preventTouch = (e: TouchEvent) => {
      e.preventDefault()
    }

    // Add passive: false to ensure preventDefault works
    canvas.addEventListener('touchstart', preventTouch, { passive: false })
    canvas.addEventListener('touchmove', preventTouch, { passive: false })
    canvas.addEventListener('touchend', preventTouch, { passive: false })

    return () => {
      canvas.removeEventListener('touchstart', preventTouch)
      canvas.removeEventListener('touchmove', preventTouch)
      canvas.removeEventListener('touchend', preventTouch)
    }
  }, [getCanvas])

  const startDrawing = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      // Prevent default touch behavior to stop page scrolling
      e.preventDefault()
      
      const canvas = getCanvas()
      const ctx = getContext()
      if (!canvas || !ctx) return

      setIsDrawing(true)
      setIsEmpty(false)
      ctx.beginPath()
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
      const rect = canvas.getBoundingClientRect()
      ctx.moveTo(clientX - rect.left, clientY - rect.top)
    },
    [getCanvas, getContext],
  )

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      // Prevent default touch behavior to stop page scrolling
      e.preventDefault()
      
      if (!isDrawing) return
      const canvas = getCanvas()
      const ctx = getContext()
      if (!canvas || !ctx) return

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
      const rect = canvas.getBoundingClientRect()
      ctx.lineTo(clientX - rect.left, clientY - rect.top)
      ctx.stroke()
    },
    [isDrawing, getCanvas, getContext],
  )

  const endDrawing = useCallback((e?: React.TouchEvent | React.MouseEvent) => {
    // Prevent default touch behavior to stop page scrolling
    if (e) {
      e.preventDefault()
    }
    
    setIsDrawing(false)
    saveSignature()
  }, [saveSignature])

  return (
    <div className={`signature-canvas-container ${className}`}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
        onTouchCancel={endDrawing}
        style={{ 
          border: "1px solid #ccc", 
          touchAction: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none"
        }}
      />
      <div className="signature-actions" style={{ marginTop: "5px" }}>
        <button
          type="button"
          onClick={clearCanvas}
          disabled={isEmpty}
          style={{
            padding: "5px 10px",
            fontSize: "0.8rem",
            cursor: "pointer",
            border: "1px solid #ddd",
            borderRadius: "4px",
            backgroundColor: "#f0f0f0",
          }}
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default SignatureCanvas
