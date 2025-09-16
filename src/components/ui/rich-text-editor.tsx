import React, { useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const RichTextEditor = React.forwardRef<ReactQuill, RichTextEditorProps>(
  ({ value, onChange, placeholder, className, disabled, ...props }, ref) => {
    const handleChange = useCallback((content: string) => {
      onChange?.(content);
    }, [onChange]);

    const modules = {
      toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ],
      clipboard: {
        matchVisual: false,
      }
    };

    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike',
      'color', 'background',
      'list', 'bullet', 'indent',
      'align', 'size',
      'blockquote', 'code-block',
      'link', 'image', 'video'
    ];

    return (
      <div className={cn("rich-text-editor", className)}>
        <ReactQuill
          ref={ref}
          theme="snow"
          value={value || ''}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          readOnly={disabled}
          style={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
          }}
          {...props}
        />
        <style>{`
          .ql-toolbar {
            border-top: 1px solid hsl(var(--border)) !important;
            border-left: 1px solid hsl(var(--border)) !important;
            border-right: 1px solid hsl(var(--border)) !important;
            border-bottom: none !important;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            background: hsl(var(--muted));
          }
          
          .ql-container {
            border-bottom: 1px solid hsl(var(--border)) !important;
            border-left: 1px solid hsl(var(--border)) !important;
            border-right: 1px solid hsl(var(--border)) !important;
            border-top: none !important;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            font-family: inherit;
          }
          
          .ql-editor {
            background: hsl(var(--background));
            color: hsl(var(--foreground));
            min-height: 200px;
          }
          
          .ql-editor.ql-blank::before {
            color: hsl(var(--muted-foreground));
          }
          
          .ql-toolbar .ql-stroke {
            stroke: hsl(var(--foreground));
          }
          
          .ql-toolbar .ql-fill {
            fill: hsl(var(--foreground));
          }
          
          .ql-toolbar .ql-picker-label {
            color: hsl(var(--foreground));
          }
          
          .ql-toolbar button:hover .ql-stroke {
            stroke: hsl(var(--primary));
          }
          
          .ql-toolbar button:hover .ql-fill {
            fill: hsl(var(--primary));
          }
          
          .ql-toolbar button.ql-active .ql-stroke {
            stroke: hsl(var(--primary));
          }
          
          .ql-toolbar button.ql-active .ql-fill {
            fill: hsl(var(--primary));
          }

          .ql-editor img {
            max-width: 100%;
            height: auto;
          }

          .ql-editor img.ql-align-left {
            float: left;
            margin: 0 15px 10px 0;
          }

          .ql-editor img.ql-align-right {
            float: right;
            margin: 0 0 10px 15px;
          }

          .ql-editor img.ql-align-center {
            display: block;
            margin: 10px auto;
          }

          .ql-size-small {
            font-size: 0.75em;
          }

          .ql-size-large {
            font-size: 1.5em;
          }

          .ql-size-huge {
            font-size: 2.5em;
          }
        `}</style>
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };