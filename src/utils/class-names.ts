export const inputClassName = (error?: string) => {
	return `placeholder-gray-400 focus:outline-none shadow-none ${
    error ? "text-red-ERROR bg-gray-100 border-2 border-gray-100" : "bg-gray-200 disabled:bg-white border-2 border-gray-200"
  } font-inter text-[13px] text-primary-500 leading-4 tracking-[-0.65px] flex w-full h-10 py-3 px-4 items-center self-stretch rounded-md`;
};
