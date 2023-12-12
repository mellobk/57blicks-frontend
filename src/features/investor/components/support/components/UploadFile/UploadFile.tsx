import { Button } from "@/components/ui/Button";
import type { FC } from "react";


interface UploadFileProps {
}

export const UploadFile: FC<UploadFileProps> = ( ) => {
	const handleButtonClick = (): void => {
		console.log("ENTER HERE??? button");
	};

	return (
		<div className="flex flex-col justify-between w-full h-full gap-10 mt-9">
			<div className="flex items-center gap-2 justify-center">
				Are you sure you want to
				<div className="font-bold text-green-500">upload</div> this Attachment?
			</div>
			<Button
				buttonText="Upload"
				className="bg-primary-500"
				onClick={handleButtonClick}
			/>
		</div>
	);
};
