"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resultUploadSchema, type ResultUploadInput } from "@/lib/schema";

import type { ResultUploadLocations } from "@/types/location";

import { Button } from "@/components/ui/button";

interface ResultUploadFormProps {
  locations: ResultUploadLocations;
  onSubmit: (data: ResultUploadInput) => Promise<void>;
}

export function ResultUploadForm({
  locations,
  onSubmit,
}: ResultUploadFormProps) {
  const [step, setStep] = useState<1 | 2>(1);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ResultUploadInput>({
    resolver: zodResolver(resultUploadSchema),
    defaultValues: {
      stateId: "",
      lgaId: "",
      wardId: "",
      pollingUnitId: "",
    },
  });

  const stateId = watch("stateId");
  const lgaId = watch("lgaId");
  const wardId = watch("wardId");
  const document = watch("document");

  // Filter location options based on parent selection.
  const lgas = useMemo(
    () => locations.lgas.filter((item) => item.stateId === stateId),
    [locations.lgas, stateId],
  );

  const wards = useMemo(
    () => locations.wards.filter((item) => item.lgaId === lgaId),
    [locations.wards, lgaId],
  );

  const pollingUnits = useMemo(
    () => locations.pollingUnits.filter((item) => item.wardId === wardId),
    [locations.pollingUnits, wardId],
  );

  async function nextStep() {
    const valid = await trigger([
      "stateId",
      "lgaId",
      "wardId",
      "pollingUnitId",
    ]);

    if (valid) setStep(2);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      setValue("document", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }

  const submit = handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <form
      onSubmit={submit}
      className="space-y-6 shadow bg-gray-200 text-secondary p-2 md:p-4 w-full max-w-xl mt-4 rounded-lg"
    >
      {/* Progress */}
      <div className="flex items-center gap-2">
        <div
          className={`h-1.5 flex-1 rounded-full ${
            step >= 1 ? "bg-green-600" : "bg-muted"
          }`}
        />
        <div
          className={`h-1.5 flex-1 rounded-full ${
            step >= 2 ? "bg-green-600" : "bg-muted"
          }`}
        />
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-semibold">Select polling unit</h2>
            <p className="text-sm text-secondary">
              Identify the location where these results were recorded.
            </p>
          </div>

          {/* State */}
          <Field label="State" error={errors.stateId?.message}>
            <select
              {...register("stateId", {
                onChange: () => {
                  setValue("lgaId", "");
                  setValue("wardId", "");
                  setValue("pollingUnitId", "");
                },
              })}
              className="border border-gray-400 rounded-lg mr-2 mt-1 w-full p-2"
              //   className="form-select"
            >
              <option value="">Select state</option>
              {locations.states.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </Field>

          {/* LGA */}
          <Field label="Local Government" error={errors.lgaId?.message}>
            <select
              {...register("lgaId", {
                onChange: () => {
                  setValue("wardId", "");
                  setValue("pollingUnitId", "");
                },
              })}
              disabled={!stateId}
              className="border border-gray-400 rounded-lg mr-2 mt-1 w-full p-2"
            >
              <option value="">Select LGA</option>
              {lgas.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </Field>

          {/* Ward */}
          <Field label="Ward" error={errors.wardId?.message}>
            <select
              {...register("wardId", {
                onChange: () => {
                  setValue("pollingUnitId", "");
                },
              })}
              disabled={!lgaId}
              className="border border-gray-400 rounded-lg mr-2 mt-1 w-full p-2"
            >
              <option value="">Select ward</option>
              {wards.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </Field>

          {/* Polling unit */}
          <Field label="Polling Unit" error={errors.pollingUnitId?.message}>
            <select
              {...register("pollingUnitId")}
              disabled={!wardId}
              className="border border-gray-400 rounded-lg mr-2 mt-1 w-full p-2"
            >
              <option value="">Select polling unit</option>
              {pollingUnits.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.code} - {item.name}
                </option>
              ))}
            </select>
          </Field>

          <Button
            type="button"
            variant={"secondary"}
            className="w-full"
            onClick={nextStep}
          >
            Continue
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-semibold">Upload result sheet</h2>
            <p className="text-sm text-muted-foreground">
              Upload a clear photograph of the official polling unit result
              sheet.
            </p>
          </div>

          <label
            htmlFor="result-document"
            className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center hover:bg-muted/50"
          >
            <span className="text-3xl">📄</span>

            <span className="mt-3 font-medium">
              {document?.name || "Click to upload result sheet"}
            </span>

            <span className="mt-1 text-sm text-muted-foreground">
              JPG, PNG or WebP · Maximum 10MB
            </span>

            <input
              id="result-document"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>

          {errors.document && (
            <p className="text-sm text-destructive">
              {errors.document.message}
            </p>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setStep(1)}
              disabled={isSubmitting}
            >
              Back
            </Button>

            <Button
              type="submit"
              variant={"secondary"}
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Uploading..." : "Submit result"}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
