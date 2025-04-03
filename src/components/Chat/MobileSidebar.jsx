// src/components/Chat/MobileSidebar.jsx
import { Dialog, DialogContent } from '../ui/dialog';
import { Sidebar } from './Sidebar';

export function MobileSidebar({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-[16rem] h-full sm:max-w-[20rem]">
        <Sidebar />
      </DialogContent>
    </Dialog>
  );
}