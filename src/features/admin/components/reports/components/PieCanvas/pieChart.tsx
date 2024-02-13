/* eslint-disable unicorn/filename-case */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import type { Loan } from "@/types/fields/loan";

interface LoanInterestPieChartProps {
	loans: Array<Loan>;
}

const LoanInterestPieChart: React.FC<LoanInterestPieChartProps> = ({
	loans,
}) => {
	const chartData = {
		labels: loans.map((loan) => `${loan.id}`),
		datasets: [
			{
				label: "Loan Interest",
				data: loans.map((loan) => loan.totalLoanAmount),
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1.5,
			},
		],
	};

	return <Doughnut data={chartData} />;
};

export default LoanInterestPieChart;
