import { useEffect, useState } from 'react';

export function useJsEnabled() {
	const [jsEnabled, setJsEnabled] = useState(false);

	// when the component has hydrated + mounted, set jsEnabled to true:
	useEffect(() => {
		setJsEnabled(true);
	}, []);

	return jsEnabled;
}
