import type { FC } from "react";
import { StyleSheet, Text } from "@react-pdf/renderer";

interface Props {
	title: string;
	value?: string;
}

const styles = StyleSheet.create({
	container: {
		marginTop: 3,
	},
	title: {
		fontSize: 12,
		fontWeight: "extrabold",
	},
	value: {
		fontSize: 12,
	},
});

export const Detail: FC<Props> = ({ title, value = "" }) => (
	<Text style={styles.container}>
		<Text style={styles.title}>{title}:</Text>
		<Text style={styles.title}>{" "}</Text>
		<Text style={styles.value}>{value}</Text>
	</Text>
);
