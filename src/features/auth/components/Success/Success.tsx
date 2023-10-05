import type { FC } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LoginTitle } from "../LoginTitle";
import { useNavigate } from "@tanstack/router";
import { ICONS } from "@/components/ui/Icon";

interface SuccessProps {
	title?: string;
	subTitle?: string;
	navigateTo?: string | null;
	buttonText?: string;
	iconName?: keyof typeof ICONS;
}

export const Success: FC<SuccessProps> = ({
	title,
	subTitle,
	buttonText,
	iconName = "closesEyes",
	navigateTo,
}) => {
	const navigate = useNavigate();

	const handleClick = (): void => {
		void navigate({ to: `/${navigateTo}` });
	};
	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<LoginTitle title={title} subTitle={subTitle}>
				<div className="flex  flex-col justify-between w-full h-full gap-5">
					<div className="flex flex-col gap-5 w-full h-full">
						<div className="flex flex-col justify-between items-center gap-2w-full h-full ">
							<div className="w-full h-full flex flex-col justify-between items-center">
								<div className="flex w-[18.75rem] h-[18.75rem] items-center justify-center rounded-full bg-green-100">
									<div className="flex w-[12.5rem] h-[12.5rem] items-center justify-center rounded-full bg-green-200">
										<div className="flex w-[8rem] h-[8rem] items-center justify-center rounded-full bg-green-600">
											<Icon name={iconName} color="#00ba35" />
										</div>
									</div>
								</div>
							</div>
							<div className="w-full">
								<Button
									buttonText={buttonText}
									className="bg-primary-500 w-full"
									onClick={handleClick}
								/>
							</div>
						</div>
					</div>
				</div>
			</LoginTitle>
		</div>
	);
};
