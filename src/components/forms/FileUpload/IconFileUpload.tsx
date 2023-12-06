/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useRef, useState, useEffect } from "react";
import type { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { inputClassName } from "@/utils/class-names";
import "./styles.css";
import { IconButton } from "@/components/ui/IconButton";
import type { Attachment } from "src/features/admin/pages/Support/types/index.ts";

interface IconFileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  setAttachmentt: (data: Attachment) => void;
  setSelectedFile: (data: File | null) => void;
}

export const IconFileUpload: ForwardRefRenderFunction<
  HTMLInputElement,
  IconFileUploadProps
> = ({
  className = inputClassName(),
  wrapperClassName,
  setAttachmentt,
  setSelectedFile,
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Function to handle file input change
  const handleFileInputChange = () => {
    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      console.log('WHat is file -----> ', file)

      // Build the Attachment object from the file information
      const newAttachment: Attachment = {
        originalName: file.name,
        mimeType: file.type,
        size: file.size.toString(),
      };

      // Update the state with the new attachment
      setAttachmentt(newAttachment);
      setSelectedFile(file);
    }
  };

  // Effect to log the selected file when it changes
  // useEffect(() => {
  //   console.log("Selected File:", selectedFile);
  // }, [selectedFile]);

  return (
    <div>
      <div className="" data-testid="icon" onClick={handleIconClick}>
        <IconButton
          bgColor="bg-gray-200"
          color="#0E2130"
          name="uploadFile"
          width="16"
        />
      </div>

      <input
        ref={fileInputRef}
        className={`${className} pr-[30px] hidden`}
        type="file"
        placeholder="Upload Image"
        onChange={handleFileInputChange}
        {...props}
      />
    </div>
  );
};