import type { FC } from "react";
import { StyleSheet, Text } from "@react-pdf/renderer";

interface Props {
	subtitle: string;
}

const styles = StyleSheet.create({
	subtitle: {
		fontSize: 14,
		fontWeight: "extrabold",
	},
});

export const Subtitle: FC<Props> = ({ subtitle }) => (
	<Text style={styles.subtitle}>{subtitle}</Text>
);
