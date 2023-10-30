export const createPermissionsGroups = (): string => {
	return `/permission-groups`;
};

export const deletePermissionData = (id: string): string => {
	return `/permission-groups/${id}`;
};

export const addPermissionGroupPermissionData = (): string => {
	return `/permission-groups/add-permissions`;
};
