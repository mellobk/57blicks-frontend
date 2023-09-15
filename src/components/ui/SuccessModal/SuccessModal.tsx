import { FC } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";

interface Props {
	description?: string;
	onClick?: () => void;
	openModal: boolean;
	setOpenModal: (openModal: boolean) => void;
	title: string;
}

export const SuccessModal: FC<Props> = ({
	description,
	onClick,
	openModal,
	setOpenModal,
	title,
}) => {
	const closeModal = () => setOpenModal(false);

	return (
		<Modal onHide={closeModal} title={title} visible={openModal} width="30vm">
			<div className="flex flex-col justify-center items-center">
				<Icon color="#00BA35" name="success" width="200" />
				<div className="mt-6 text-center font-inter text-base text-gray-600 leading-[19px] tracking-tighter">
					{description}
				</div>
			</div>
			<Button
				buttonText="Ok"
				className="bg-primary-500 w-full mt-6 px-8 py-[11px] font-inter font-semibold text-base text-white leading-[19px] tracking-tighter"
				onClick={onClick || closeModal}
			/>
		</Modal>
	);
};
