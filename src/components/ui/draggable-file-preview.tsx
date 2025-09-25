import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X, GripVertical } from 'lucide-react';
import { Button } from './button';

interface DraggableItem {
  id: string;
  preview: string;
  path?: string;
}

interface DraggableFilePreviewProps {
  files: DraggableItem[];
  onRemove: (id: string) => void;
  onReorder: (items: DraggableItem[]) => void;
}

interface SortableItemProps {
  item: DraggableItem;
  onRemove: (id: string) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ item, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group bg-background border rounded-lg overflow-hidden"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 bg-background/80 backdrop-blur-sm rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Remove Button */}
      <Button
        size="sm"
        variant="destructive"
        className="absolute top-2 right-2 z-10 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onRemove(item.id)}
      >
        <X className="h-3 w-3" />
      </Button>

      {/* Image */}
      <img
        src={item.preview}
        alt="Preview"
        className="w-full h-32 object-cover"
      />
    </div>
  );
};

export const DraggableFilePreview: React.FC<DraggableFilePreviewProps> = ({
  files,
  onRemove,
  onReorder,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = files.findIndex((item) => item.id === active.id);
      const newIndex = files.findIndex((item) => item.id === over?.id);
      
      const reorderedItems = arrayMove(files, oldIndex, newIndex);
      onReorder(reorderedItems);
    }
  };

  if (files.length === 0) {
    return null;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={files.map(f => f.id)} strategy={verticalListSortingStrategy}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              onRemove={onRemove}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};