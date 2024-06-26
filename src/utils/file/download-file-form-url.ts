export function downloadFileFromUrl(url: string, filename: string): void {
	fetch(url)
		.then((response) => response.blob())
		.then((blob) => {
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = filename;
			document.body.append(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);
		})
		.catch(() => {});
}

export async function createFileFromUrl(url: string): Promise<Blob> {
	return fetch(url)
		.then((response) => response.blob())
		.then((blob) => {
			return blob;
		})
		.catch(() => {
			return new Blob();
		});
}

export function openUrlFile(url: string): void {
	fetch(url)
		.then((response) => response.blob())
		.then((blob) => {
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			window.open(url, "_blank");
		})
		.catch(() => {});
}
