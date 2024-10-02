export const getQuery = (): Record<string, string> => {
  const query = window.location.search.slice(1).split('&');

  return query.reduce((prev, next) => {
    const [key, value] = next.split('=');

    if (key) prev[key] = value;
    return prev;
  }, {});
};
