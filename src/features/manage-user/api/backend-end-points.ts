export const filterData = (showDisable: boolean, data: string): string => {
	return `/investors/filter-data/?canShowDisable=${showDisable}${
		data && `&searchData=${data}`
	}`;
};

export const userFilterAdminData = (role: string, data: string): string => {
	return `/users/filter-data/admin?role=${role}${
		data && `&searchData=${data}`
	}`;
};

export const userFilterAccountingData = (
	role: string,
	data: string
): string => {
	return `/users/filter-data/accounting?role=${role}${
		data && `&searchData=${data}`
	}`;
};

export const investors = (id: string): string => {
	return `/investors/${id}`;
};

export const investorsBank = (id: string): string => {
	return `/investors/investor-data/${id}`;
};

export const createAdmin = (): string => {
	return `/users/admin`;
};

export const updateAdminUrl = (id: string): string => {
	return `/users/admin/${id}`;
};

export const updateAccountingUrl = (id: string): string => {
	return `/users/accounting/${id}`;
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

export const restoreUserData = (id: string): string => {
	return `/users/restore/${id}`;
};

export const getUserData = (sub: string): string => {
	return `/users/user-sub/${sub}`;
};

export const createLog = (): string => {
	return `/logs`;
};

export const getRolesByUser = (id: string): string => {
	return `users/user-rol/${id}`;
};

export const getPermissionRoleById = (id: string): string => {
	return `permissions/role/${id}`;
};
