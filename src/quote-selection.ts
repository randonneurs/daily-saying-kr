export function pickRandomItems<T>(
  items: readonly T[],
  count: number,
  random: () => number = Math.random,
): T[] {
  if (items.length === 0 || count <= 0) {
    return [];
  }

  const pool = [...items];
  const picks: T[] = [];

  for (let index = 0; index < count; index += 1) {
    if (pool.length === 0) {
      pool.push(...items);
    }

    const pickedIndex = Math.floor(random() * pool.length);
    const [pickedItem] = pool.splice(pickedIndex, 1);
    picks.push(pickedItem);
  }

  return picks;
}
