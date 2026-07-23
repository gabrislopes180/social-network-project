"use client"

import { Input } from "@/components/ui/input"

interface CoverColorPickerProps {
  color1: string
  handleColor1: (color1: string) => void
  color2: string
  handleColor2: (color2: string) => void
}

export default function CoverColorPicker({
  color1,
  color2,
  handleColor1,
  handleColor2,
}: CoverColorPickerProps) {
  return (
    <section className="mt-8 flex w-full flex-col gap-4 border-t p-2 pt-6">
      <div>
        <h3 className="text-lg font-semibold">Personalizar Capa do Perfil</h3>
        <p className="text-sm text-muted-foreground">
          Escolha duas cores para formar o gradiente da sua capa.
        </p>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="color1" className="text-sm font-semibold">
            Cor 1
          </label>
          <Input
            id="color1"
            type="color"
            value={color1}
            onChange={(e) => handleColor1(e.target.value)}
            className="h-10 w-16 cursor-pointer p-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="color2" className="text-sm font-semibold">
            Cor 2
          </label>
          <Input
            id="color2"
            type="color"
            value={color2}
            onChange={(e) => handleColor2(e.target.value)}
            className="h-10 w-16 cursor-pointer p-1"
          />
        </div>
      </div>
      <div
        className="mt-2 h-24 w-full rounded-md shadow-inner"
        style={{
          background: `linear-gradient(to right, ${color1}, ${color2})`,
        }}
      />
    </section>
  )
}
