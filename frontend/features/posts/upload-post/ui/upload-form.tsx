import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { ImageUp, X } from "lucide-react"
import { useUploadPost } from "../model/use-upload-post"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useEffect } from "react"
import { SpinnerCustom } from "@/components/loading-spinner"

export default function UploadForm({ click }: { click: () => void }) {
  const {
    selectedFile,
    setSelectedFile,
    handleSubmit,
    register,
    setValue,
    isSubmitting,
    isSubmitSuccessful,
    errors,
    upload,
  } = useUploadPost()

  useEffect(() => {
    if (isSubmitSuccessful) {
      click()
    }
  }, [isSubmitSuccessful, click])
  return (
    <form onSubmit={handleSubmit(upload)}>
      <Card className="animate-fade-right animate-duration-200 relative z-70 flex w-90 flex-col items-center justify-center">
        <X className="absolute top-2 right-2" size={16} onClick={click} />
        <CardHeader className="w-full">
          <CardDescription>Importe aqui a sua imagem</CardDescription>
          <Label
            htmlFor="image"
            className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed p-4 transition hover:bg-muted"
          >
            <ImageUp size={20} />

            <span>
              {selectedFile ? selectedFile.file?.name : "Escolher arquivo"}
            </span>
          </Label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]

              if (!file) return

              setValue("image", file, {
                shouldValidate: true,
              })

              setSelectedFile({
                file,
                preview: URL.createObjectURL(file),
              })
            }}
          />

          {selectedFile.preview && (
            <div className="mt-4 overflow-hidden rounded-lg border">
              <Image
                src={selectedFile.preview}
                alt="Preview"
                width={300}
                height={300}
                className="h-75 w-75 object-cover"
              />
            </div>
          )}

          {errors.image?.message && (
            <span className="text-xs text-destructive">
              {errors.image.message}
            </span>
          )}
        </CardHeader>
        <CardContent>
          <Field>
            <FieldLabel htmlFor="textarea-message">
              Que tal um recado?
            </FieldLabel>
            <FieldDescription>
              Expresse com palavras o que está sentindo hoje
            </FieldDescription>
            <Textarea
              id="textarea-message"
              placeholder="Digite aqui o que irá aparecer com sua foto"
              {...register("content")}
              className={errors.content && "border border-destructive"}
            />
            {errors.content?.message && (
              <span className="text-xs text-destructive">
                {errors.content.message}
              </span>
            )}
          </Field>
        </CardContent>
        <CardFooter className="w-full">
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <SpinnerCustom variant="background" />
            ) : (
              "Compartilhar"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
