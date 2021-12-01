export function roll(max = 100) {
	return Math.floor(Math.random() * max);
}

export function pick(pool = []) {
	return pool[roll(pool.length)];
}

export function shuffle(b) {
	const a = b.slice();
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
