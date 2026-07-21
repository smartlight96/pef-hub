'use client';

import { useState, useRef } from 'react';
import { 
  UploadCloud, 
  CheckCircle2, 
  X, 
  Image, 
  FileImage,
  Trash2,
  AlertCircle
} from 'lucide-react';

interface ReceiptUploadProps {
  onFileUpload?: (file: File | null) => void;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
}

export default function ReceiptUpload({ 
  onFileUpload,
  maxSize = 5,
  acceptedFormats = ['image/*']
}: ReceiptUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setError(null);
    
    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      onFileUpload?.(null);
      return;
    }

    // Validate file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a valid image file (JPG, PNG, WebP)');
      return;
    }

    setFile(selectedFile);
    onFileUpload?.(selectedFile);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    onFileUpload?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="mt-8">
      {/* Label */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-orange-500/10">
          <UploadCloud className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <label className="text-lg font-bold text-white">
            Upload Payment Receipt
          </label>
          <p className="text-sm text-zinc-400">Upload a screenshot of your bank transfer</p>
        </div>
      </div>

      {/* Upload Area */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative cursor-pointer rounded-2xl border-2 border-dashed 
          transition-all duration-300 overflow-hidden
          ${isDragging 
            ? 'border-orange-500 bg-orange-500/5' 
            : file 
              ? 'border-green-500/40 bg-green-500/[0.02] hover:border-green-500/60'
              : 'border-zinc-700 hover:border-orange-500/40 hover:bg-zinc-900/30'
          }
          ${error ? 'border-red-500 bg-red-500/5' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          id="receipt"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="hidden"
        />

        {preview ? (
          // Preview Mode
          <div className="relative">
            <div className="relative aspect-video w-full max-h-[200px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Receipt preview"
                className="w-full h-full object-contain bg-zinc-950/50"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            
            {/* File info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white truncate max-w-[150px] sm:max-w-[250px]">
                      {file?.name}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {file ? formatFileSize(file.size) : ''}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200 group"
                >
                  <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Upload Prompt
          <div className="flex flex-col items-center justify-center p-12">
            <div className={`
              p-4 rounded-full transition-all duration-300
              ${isDragging 
                ? 'bg-orange-500/20 text-orange-400' 
                : 'bg-zinc-900/50 text-zinc-400'
              }
            `}>
              {isDragging ? (
                <UploadCloud className="w-10 h-10 text-orange-400 animate-bounce" />
              ) : (
                <UploadCloud className="w-10 h-10" />
              )}
            </div>

            <p className="mt-4 text-base font-semibold text-white">
              {isDragging ? 'Drop your receipt here' : 'Drop your receipt here'}
            </p>
            
            <p className="mt-2 text-sm text-zinc-400">
              or click to browse files
            </p>

            <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5" />
                JPG, PNG, WebP
              </span>
              <span className="w-px h-3 bg-zinc-700" />
              <span>Max {maxSize}MB</span>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* File Uploaded Success Message */}
      {file && !error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>Receipt uploaded successfully!</span>
        </div>
      )}
    </div>
  );
}