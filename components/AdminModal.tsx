"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  onSave?: () => void;
  viewMode?: boolean;
}

export default function AdminModal({
  open,
  onOpenChange,
  title,
  children,
  onSave,
  viewMode = false,
}: AdminModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="py-2">{children}</div>

        <DialogFooter>
          {viewMode ? (
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          ) : (
            <Button onClick={onSave}>Save</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
