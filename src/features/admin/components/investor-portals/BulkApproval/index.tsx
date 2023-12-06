import { Button } from "@/components/ui/Button";
import type { FC } from "react";
import ListPayables from "./ListPayables";
import { ModalBlackAndWhite } from "@/components/ui/ModalBlackAndWhite";
import { useState } from "react";

const BulkApproval: FC = () => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [showBlack, setShowBlack] = useState<boolean>(false);
	const [width] = useState<string>(showBlack ? "1200px" : "900px");
	return (
		<>
			<div className="absolute right-[210px] z-50">
				<Button
					type="button"
					variant={"gold"}
					buttonText={"Approve Payable"}
					onClick={() => {
						setOpenModal(true);
					}}
				/>
			</div>

			<ModalBlackAndWhite
				isOpen={openModal}
				title="Approve Payables"
				showBlack={showBlack}
				setShowBlack={setShowBlack}
				width={width}
				minHeight="600px"
				setIsOpen={setOpenModal}
			>
				<ListPayables setOpenModal={setOpenModal} />
			</ModalBlackAndWhite>
		</>
	);
};

export default BulkApproval;
