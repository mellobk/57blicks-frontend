/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useRef } from "react";
import type { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { inputClassName } from "@/utils/class-names";
import "./styles.css";
import { IconButton } from "@/components/ui/IconButton";

interface IconFileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
	wrapperClassName?: string;
}

export const IconFileUpload: ForwardRefRenderFunction<
	HTMLInputElement,
	IconFileUploadProps
> = ({ className = inputClassName(), wrapperClassName, ...props }) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleIconClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div >
			<div
				className=""
				data-testid="icon"
				onClick={handleIconClick}
			>
				{/* <Icon name="uploadFile" width="16" color="#B0B4BA" /> */}
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
				{...props}
			/>
		</div>
	);
};
