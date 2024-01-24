export interface Collateral {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	address: string;
	taxUrl: string;
	insuranceExpirationDate: Date;
	link: string;
	assetType: string;
	isActive: boolean;
}

export interface CollateralInsurance {
	insuranceExpirationDate: Date;
}
