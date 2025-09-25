import React, { useRef, useState, useCallback } from 'react';
import { Upload, X, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  multiple = false,
  accept = 'image/png,image/jpeg,image/jpg,image/webp,image/avif',
  maxFiles = 10,
  className,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragCounter(prev => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragCounter(prev => {
      const newCounter = prev - 1;
      if (newCounter === 0) {
        setIsDragOver(false);
      }
      return newCounter;
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const validateFiles = (files: File[]): File[] => {
    const acceptedTypes = accept.split(',').map(type => type.trim());
    
    return files.filter(file => {
      // Check file type
      const isValidType = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        return file.type.match(type.replace('*', '.*'));
      });
      
      if (!isValidType) {
        console.warn(`File ${file.name} is not a supported format`);
        return false;
      }
      
      return true;
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragOver(false);
    setDragCounter(0);
    
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(files);
    
    if (validFiles.length > 0) {
      const filesToProcess = multiple ? validFiles.slice(0, maxFiles) : [validFiles[0]];
      onFileSelect(filesToProcess);
    }
  }, [disabled, multiple, maxFiles, onFileSelect, accept]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const validFiles = validateFiles(files);
    
    if (validFiles.length > 0) {
      const filesToProcess = multiple ? validFiles.slice(0, maxFiles) : [validFiles[0]];
      onFileSelect(filesToProcess);
    }
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [multiple, maxFiles, onFileSelect, accept]);

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={cn(
        'relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer',
        isDragOver
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25 hover:border-muted-foreground/50',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />
      
      <div className="flex flex-col items-center gap-2">
        {isDragOver ? (
          <>
            <Upload className="h-8 w-8 text-primary animate-bounce" />
            <span className="text-sm font-medium text-primary">
              Déposez vos fichiers ici
            </span>
          </>
        ) : (
          <>
            <Camera className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Cliquez pour ajouter des photos ou glissez-déposez
            </span>
            <span className="text-xs text-muted-foreground">
              Formats acceptés: PNG, JPG, WebP, AVIF
            </span>
          </>
        )}
      </div>
    </div>
  );
};

interface FilePreviewProps {
  files: Array<{ file?: File; preview: string; id: string; title?: string }>;
  onRemove: (id: string) => void;
  className?: string;
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  files,
  onRemove,
  className,
}) => {
  if (files.length === 0) return null;

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4', className)}>
      {files.map((item) => (
        <div key={item.id} className="relative group">
          <img
            src={item.preview}
            alt={item.title || 'Preview'}
            className="w-full h-32 object-cover rounded-lg border"
          />
          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
};