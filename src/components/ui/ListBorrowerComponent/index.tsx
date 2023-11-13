/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC, useState } from "react";
import type { ItemCheckboxBorrowerType } from "./types";
import NotificationOptions from "./NotificationOptions";
import "./styles.css";

interface ListBorrowerComponentProps {
	items: Array<ItemCheckboxBorrowerType>;
	selectedItemsArray: Array<ItemCheckboxBorrowerType>;
	setSelectedItemsArray: (items: Array<ItemCheckboxBorrowerType>) => void;
}

interface SelectedItemProps {
	id: number | string;
	onlyAdd?: boolean;
	notes?: boolean;
	sms?: boolean;
	email?: boolean;
}
const ListBorrowerComponent: FC<ListBorrowerComponentProps> = ({
	items,
	selectedItemsArray,
	setSelectedItemsArray,
}) => {
	const [selectedItems, setSelectedItems] = useState<Set<number | string>>(
		new Set()
	);

	const handleSelectItem = (event: SelectedItemProps): void => {
		setSelectedItems((previous: Set<number | string>) => {
			const newSelectedItems = new Set(previous);
			if (newSelectedItems.has(event.id) && !event.onlyAdd) {
				newSelectedItems.delete(event.id);
			} else {
				newSelectedItems.add(event.id);
			}

			const newSelectedItemsArray: Array<ItemCheckboxBorrowerType> = [];
			console.log(
				"🚀 ~ file: index.tsx:43 ~ items.map ~ event.notes :",
				event.notes
			);
			console.log(
				"🚀 ~ file: index.tsx:54 ~ selectedItemsArray.map ~ selectedItemsArray:",
				selectedItemsArray
			);
			items.map((item) => {
				if (newSelectedItems.has(item.id)) {
					newSelectedItemsArray.push({
						...item,
						notes: event.notes || item.notes || false,
						sms: event.sms || item.sms || false,
						email: event.email || item.email || false,
					});
				}
				return item;
			});

			setSelectedItemsArray(newSelectedItemsArray);

			return newSelectedItems;
		});
	};

	const handleSelectAll = (): void => {
		setSelectedItems(new Set(items.map((item) => item.id)));
		setSelectedItemsArray(items);
	};

	const handleUnselectAll = (): void => {
		setSelectedItems(new Set());
		setSelectedItemsArray([]);
	};

	return (
		<div>
			<button onClick={handleSelectAll}>Select All</button>
			<button onClick={handleUnselectAll}>Unselect All</button>
			<div className="">
				<ul>
					{items.map((item) => (
						<li key={item.id} className="w-full border-b m-4 relative ">
							<div className="checkbox-container">
								<label className="checkbox">
									<input
										type="checkbox"
										checked={selectedItems.has(item.id)}
										onChange={(): void => {
											handleSelectItem({
												id: item.id,
											});
										}}
									/>
									{item.name}
									<span className="checkmark"></span>
								</label>
								<div className="absolute right-10 z-10 bg-white">
									<NotificationOptions
										notes={
											selectedItemsArray.find(
												(selectedItem) => selectedItem.id === item.id
											)?.notes || false
										}
										sms={item.sms}
										email={item.email}
										setEmail={(): void => {}}
										setSms={(): void => {}}
										setNotes={(notes): void => {
											handleSelectItem({
												id: item.id,
												onlyAdd: true,
												notes,
											});
										}}
									/>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ListBorrowerComponent;
