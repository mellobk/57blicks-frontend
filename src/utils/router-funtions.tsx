export const awsRouterPermission = (groupPermission: string): void => {
	const roles = ["admin", "accounting", "super-admin"];
	const currentRol = roles.includes(groupPermission);

	if (!currentRol) {
		window.location.href = "/403";
	}
};

export const investorRouterPermission = (groupPermission: string): void => {
	const roles = ["investor"];
	const currentRol = roles.includes(groupPermission);

	if (!currentRol) {
		window.location.href = "/403";
	}
};
