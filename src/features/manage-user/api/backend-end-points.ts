export const filterData = (showDisable: boolean, data: string): string => {
	return `/investors/filter-data/?canShowDisable=${showDisable}${
		data && `&searchData=${data}`
	}`;
};

export const userFilterData = (role: string, data: string): string => {
	return `/users/filter-data?role=${role}${data && `&searchData=${data}`}`;
};

export const investors = (id: string): string => {
	return `/investors/${id}`;
};

export const createAdmin = (): string => {
	return `/users/admin`;
};

export const createAccounting = (): string => {
	return `/users/accounting`;
};

export const createInvestor = (): string => {
	return `users/investor`;
};

export const deleteUserData = (id: string): string => {
	return `/users/${id}`;
};

export const getUserData = (sub: string): string => {
	return `/users/user-sub/${sub}`;
};

export const createLog = (): string => {
	return `/logs`;
};
