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
