// Загрузка представления
export const getView = (view) => {
  return () => import(`../views/${view}`).then((m) => m.default || m);
};

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
