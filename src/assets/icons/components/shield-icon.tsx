type Props = {
	color?: string;
	fill?: string;
	width?: number;
};

const ShieldIcon: React.FC<Props> = ({
	color = "#BBBBBB",
	fill = "none",
	width = 48,
}: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 56 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M29.8272 0.318605L51.067 7.44485C53.4445 8.23875 55.052 10.4228 55.0649 12.8703L55.2002 34.1204C55.2421 40.5626 52.8936 46.8102 48.5928 51.7054C46.6148 53.9522 44.0794 55.882 40.8417 57.6079L29.4245 63.7112C29.0669 63.8994 28.6739 63.9967 28.2776 63.9999C27.8814 64.003 27.4851 63.9089 27.1308 63.7237L15.6072 57.7616C12.3341 56.064 9.77621 54.1624 7.77884 51.947C3.40718 47.1021 0.978123 40.8827 0.936243 34.4311L0.800859 13.1967C0.788051 10.746 2.36662 8.54627 4.73124 7.72099L25.8905 0.340571C27.1469 -0.105016 28.5483 -0.11443 29.8272 0.318605ZM39.9841 23.0997C39.0338 22.1866 37.5035 22.1928 36.5661 23.1185L25.7867 33.7436L21.3732 29.5011C20.4228 28.5879 18.8958 28.5974 17.9551 29.5231C17.0176 30.4487 17.0273 31.9361 17.9777 32.8493L24.1083 38.7486C24.5851 39.2067 25.2036 39.4326 25.8222 39.4265C26.4407 39.4232 27.056 39.191 27.5264 38.7266L40.0035 26.4259C40.941 25.5002 40.9313 24.0128 39.9841 23.0997Z"
				fill={color}
			/>
		</svg>
	);
};

export default ShieldIcon;
