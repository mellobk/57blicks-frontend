import { Button } from "@/components/ui/Button";

interface DeleteAdminProps {
	id?: number;
}

export const DisableInvestor: React.FC<DeleteAdminProps> = ({ id = 0 }) => {
	const handleDeleteAdmin = (id: number): void => {
		console.log(id);
	};
	return (
		<div className="flex  flex-col justify-between w-full h-full gap-10 mt-9">
			<div className="flex items-center gap-2 justify-center">
				Are you sure you want to
				<div className="font-bold text-red-500">disable</div> this user?
			</div>
			<Button
				text="Disable"
				onClick={(): void => {
					handleDeleteAdmin(id);
				}}
			/>
		</div>
	);
};
