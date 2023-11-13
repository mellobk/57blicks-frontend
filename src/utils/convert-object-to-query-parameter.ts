/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const objectToQueryParameter = (
	parameters: Record<string, any>
): string => {
	const queryString = Object.keys(parameters)
		.map(
			(key) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`
		)
		.join("&");
	return queryString;
};
