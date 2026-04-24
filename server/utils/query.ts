export function processQueryData<T>(data: T[], query: Record<string, string>): T[] {
	let result = [...data];

	const reservedKeys = ["sortBy", "order", "limit", "offset"];
	const filterKeys = Object.keys(query).filter((key) => !reservedKeys.includes(key));

	filterKeys.forEach((key) => {
		result = result.filter((item) => String((item as any)[key]) === query[key]);
	});

	if (query.sortBy) {
		const isDesc = query.order === "desc";
		result.sort((a, b) => {
			const valA = (a as any)[query.sortBy];
			const valB = (b as any)[query.sortBy];
			if (valA < valB) return isDesc ? 1 : -1;
			if (valA > valB) return isDesc ? -1 : 1;
			return 0;
		});
	}

	if (query.offset) result = result.slice(Number(query.offset));
	if (query.limit) result = result.slice(0, Number(query.limit));

	return result;
}
