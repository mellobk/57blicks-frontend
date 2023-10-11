import * as z from "zod";

import { type UseFormProps, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

export function useZodForm<TSchema extends z.ZodType>(
	props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
		schema: TSchema;
	}
) {
	const form = useForm<TSchema["_input"]>({
		...props,
		resolver: zodResolver(props.schema, undefined, {
			// @ts-ignore
			rawValues: true,
		}),
	});

	return form;
}
