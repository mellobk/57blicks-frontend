/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const isPositiveInteger = (value: any): boolean => {
	let string_ = String(value);

	string_ = string_.trim();

	if (!string_) {
		return false;
	}

	string_ = string_.replace(/^0+/, "") || "0";
	const n = Math.floor(Number(string_));

	return n !== Number.POSITIVE_INFINITY && String(n) === string_ && n >= 0;
};
