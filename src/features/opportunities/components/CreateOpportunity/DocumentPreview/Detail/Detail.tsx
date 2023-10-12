import type { FC } from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface Props {
	title: string;
	value?: string;
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginTop: 5,
	},
	title: {
		fontSize: 12,
		fontWeight: "extrabold",
	},
	value: {
		fontSize: 12,
		marginLeft: 5,
	},
});

export const Detail: FC<Props> = ({ title, value = "" }) => (
	<View style={styles.container}>
		<Text style={styles.title}>{title}:</Text>
		<Text style={styles.value}>{value}</Text>
	</View>
);
