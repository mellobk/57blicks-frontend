import moment from "moment";
const getDate = (date: Date | string): string => {
	const dateUtc = moment.utc(date);

	const localTime = dateUtc.local().format("YYYY-MM-DD HH:mm:ss");

	return localTime;
};

const useLocalTimeZoneFormatter = (isoDate: Date | string): string => {
	return getDate(isoDate);
};
export default useLocalTimeZoneFormatter;
