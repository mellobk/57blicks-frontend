import { FC } from "react";
import { Button } from "@/components/ui/Button";
import { Modal, ModalProps } from "@/components/ui/Modal";

interface Props extends ModalProps {
	action: string;
	buttonText: string;
	confirmation?: boolean;
	handelConfirmation: () => void;
	loading?: boolean;
	model: string;
}

export const ConfirmationModal: FC<Props> = ({
	action,
	buttonText,
	confirmation,
	handelConfirmation,
	loading,
	model,
	...props
}) => (
	<Modal width="500px" {...props}>
		<div className="flex flex-col gap-6 font-inter text-base text-primary-500 leading-[19px] tracking-tighter">
			<div className="flex items-center gap-1 justify-center">
				Are you sure you want to
				<div className={confirmation ? "text-green-500" : "text-red-500"}>
					{action}
				</div>
				this {model}?
			</div>
			<Button
				buttonText={buttonText}
				className="font-semibold bg-primary-500"
				loading={loading}
				onClick={handelConfirmation}
			/>
		</div>
	</Modal>
);
