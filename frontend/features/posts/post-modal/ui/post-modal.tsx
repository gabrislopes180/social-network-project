"use client"

import { ReactNode } from "react"
import { X } from "lucide-react"

interface PostModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function PostModal({ isOpen, onClose, children }: PostModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-up items-center justify-center bg-black/60 animate-duration-200 animate-once">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-background shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 rounded-full bg-black/20 p-1 text-white hover:bg-black/40"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  )
}
