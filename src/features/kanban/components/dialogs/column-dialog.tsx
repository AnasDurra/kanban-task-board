import ColorPicker from "components/color-picker";
import { Button } from "components/ui/button";
import { Dialog, DialogFooter } from "components/ui/dialog";
import { Input } from "components/ui/input";
import type React from "react";
import { useEffect, useState } from "react";

interface ColumnDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTitle?: string;
  currentColor?: string;
  onSubmit: (title: string, color: string) => void;
  isEdit?: boolean;
}

export default function ColumnDialog({
  open,
  onOpenChange,
  currentTitle = "",
  currentColor = "#6366f1",
  onSubmit,
  isEdit = false,
}: ColumnDialogProps) {
  const [title, setTitle] = useState(currentTitle);
  const [selectedColor, setSelectedColor] = useState(currentColor);

  useEffect(() => {
    if (open && isEdit) {
      setTitle(currentTitle);
      setSelectedColor(currentColor);
    }
  }, [open, currentTitle, currentColor, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), selectedColor);
      setTitle("");
      setSelectedColor("#6366f1");
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setSelectedColor("#6366f1");
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Edit Column" : "Create New Column"}
      description={
        isEdit
          ? "Update the column title and color to better represent this stage of your workflow."
          : "Add a new column to organize your tasks. Choose a title and color that represents this stage of your workflow."
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Input
            label="Column Title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              isEdit
                ? "Enter column title"
                : "e.g., To Do, In Progress, Review, Done"
            }
          />

          <ColorPicker
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!title.trim()}
            style={{
              backgroundColor: selectedColor,
              filter: title.trim() ? "none" : "brightness(0.8)",
            }}
            onMouseEnter={(e) => {
              if (title.trim()) {
                e.currentTarget.style.filter = "brightness(0.9)";
              }
            }}
            onMouseLeave={(e) => {
              if (title.trim()) {
                e.currentTarget.style.filter = "none";
              }
            }}
          >
            {isEdit ? "Update Column" : "Create Column"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
