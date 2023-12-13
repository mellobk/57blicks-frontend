import { useRef, useCallback } from "react";
import { IconButton } from "@/components/ui/IconButton";
import useToast from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { uploadAttachment } from "@/features/admin/pages/Support/api/support";
import type { Ticket } from "@/features/admin/components/servicing/types/api";

interface IconFileUploadProps {
  selectedSupport: Ticket | undefined;
}

export const IconFileUpload: React.FC<IconFileUploadProps> = ({ selectedSupport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const notify = useToast();

  const mutation = useMutation((file: File) => {
    return uploadAttachment(file, selectedSupport?.id ?? '');
  }, {
    onSuccess: () => {
      notify("Attachment uploaded successfully", "success")
    }
  });

  const handleIconClick = () => fileInputRef.current?.click();

  const handleFileInputChange = useCallback(() => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      mutation.mutate(file);
    }
  }, [mutation]);

  return (
    <div>
      <div data-testid="icon" onClick={handleIconClick}>
        <IconButton bgColor="bg-gray-200" color="#0E2130" name="uploadFile" width="16" />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
      />
    </div>
  );
};
