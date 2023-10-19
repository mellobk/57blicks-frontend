export const blobToBinaryString = (
	blob: Blob
): Promise<string | ArrayBuffer | null> => {
	const reader = new FileReader();
	reader.readAsBinaryString(blob);
	return new Promise((resolve) => {
		reader.onloadend = () => {
			resolve(reader.result);
		};
	});
};

export const stringToBase64 = (string: string): string => {
	return btoa(string);
};
