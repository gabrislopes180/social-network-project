import { SpinnerCustom } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="flex min-h-full items-center justify-center">
      <SpinnerCustom />
    </div>
  )
}
