"use client"
import React from 'react'
import { ResultUploadForm } from './form/upload-form';
import { ResultUploadLocations } from '@/types/location';

const ResutUpload = ({ locations }: { locations: ResultUploadLocations }) => {
  return (
    <div className='w-full max-w-4xl mx-auto bg-gray-50 text-secondary flex  flex-col items-center justify-center'>
      <ResultUploadForm
        locations={locations}
        onSubmit={async (data) => {
          const formData = new FormData();

          formData.append("stateId", data.stateId);
          formData.append("lgaId", data.lgaId);
          formData.append("wardId", data.wardId);
          formData.append("pollingUnitId", data.pollingUnitId);
          formData.append("document", data.document);

          await fetch("/api/results/upload", {
            method: "POST",
            body: formData,
          });
        }}
      />
    </div>
  );
};

export default ResutUpload