import type { FC } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

export const Faq: FC = () => {
	const customAccordionStyle = `
        .p-accordion .p-accordion-header .p-accordion-header-link {
          background-color: white !important;
          border-top: 0px !important;
          border-left: 0px !important;
          border-right: 0px !important;
          border-radius: 0px !important;
          border-bottom: 1px solid #yourBorderColorHere; 
        }
          .p-accordion {
            margin: 0 auto;
            max-width: 800px; /* Adjust the max-width to your preference */
          }
        .p-accordion .p-accordion-content{
            border: 0px solid #dee2e6 !important;
        }
      `;

	console.log(customAccordionStyle);

	return (
		<div className="flex flex-col w-full h-full">
			<style>{customAccordionStyle}</style>
			<div className="flex flex-col h-full gap-3">
				<div className="flex flex-col h-full bg-white rounded-2xl">
					<div className="top-0 flex justify-between items-center ">
						<div className="flex space-x-2">
							<div className="pr-1 pt-1 font-bold text-1xl ">
								<h3
									style={{
										color: "var(--colors-primary, #0E2130)",
										fontFamily: "Inter",
										fontSize: "28px",
										fontStyle: "normal",
										fontWeight: "400",
										lineHeight: "normal",
										letterSpacing: "-1.4px",
										padding: "20px",
									}}
								>
									Frequently Asked Questions
								</h3>
							</div>
						</div>
					</div>
					<Accordion>
						<AccordionTab header="What is an investor portal, and how can it benefit me as an investor?">
							<div
								style={{
									width: "625px",
									height: "17px",
									padding: "16px 16px 0 16px",
									gap: "10px",
								}}
							>
								<p>
									- The DKC Investor portal is an online platform where you can
									easily access your investment portfolio information, details
									on each loan funded, payment schedules, end-of-year tax
									reporting information, and seek new investment opportunities.
								</p>
							</div>
						</AccordionTab>
						<AccordionTab header="What reports can I find in my investment portfolio on the portal?">
							<div
								style={{
									width: "625px",
									height: "17px",
									padding: "16px 16px 0 16px",
									gap: "10px",
								}}
							>
								<p>- List reports for investors.</p>
							</div>
						</AccordionTab>
						<AccordionTab header="Can I view detailed loan documents and records for my investments?">
							<div
								style={{
									width: "625px",
									height: "17px",
									padding: "16px 16px 0 16px",
									gap: "10px",
								}}
							>
								<p>- Yes, through the Google Drive link.</p>
							</div>
						</AccordionTab>
						<AccordionTab header="Can I make investment decisions and manage my portfolio through the portal?">
							<div
								style={{
									width: "625px",
									height: "17px",
									padding: "16px 16px 0 16px",
									gap: "10px",
								}}
							>
								<p>- Yes, xxx. Notifications, alerts.</p>
							</div>
						</AccordionTab>
						<AccordionTab header="Can I request additional information or support regarding specific investments on the portal?">
							<div
								style={{
									width: "625px",
									height: "17px",
									padding: "16px 16px 0 16px",
									gap: "10px",
								}}
							>
								<p>- Yes, explain the support ticket system.</p>
							</div>
						</AccordionTab>
						<AccordionTab header="How do I update my contact information and preferences on the portal?">
							<div
								style={{
									width: "625px",
									height: "17px",
									padding: "16px 16px 0 16px",
									gap: "10px",
								}}
							>
								<p>- Explain the update process.</p>
							</div>
						</AccordionTab>
						<AccordionTab header="Can I access historical data and past investment records on the portal?">
							<div
								style={{
									width: "625px",
									height: "17px",
									padding: "16px 16px 0 16px",
									gap: "10px",
								}}
							>
								<p>- Yes, explain the historical system. Reporting.</p>
							</div>
						</AccordionTab>
					</Accordion>
				</div>
			</div>
		</div>
	);
};
