import { Button } from "@/components/ui/Button";
import { LoginTitle } from "../LoginTitle";
import { IconTemplate } from "@/assets/icons";

interface SuccessProps {
	title?: string;
	subTitle?: string;
	navigateTo?: string | null;
	buttonText?: string;
	iconName?: string;
}

export const Success: React.FC<SuccessProps> = ({
	title,
	subTitle,
	buttonText,
	iconName = "closesEyes",
}) => {
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
											<IconTemplate name={iconName} color="#00ba35" />
										</div>
									</div>
								</div>
							</div>
							<div className="w-full">
								<Button text={buttonText} className="bg-primary-500" />
							</div>
						</div>
					</div>
				</div>
			</LoginTitle>
		</div>
	);
};
