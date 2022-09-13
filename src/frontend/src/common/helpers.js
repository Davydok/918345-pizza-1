// Загрузка представления
export const getView = (view) => {
  return () => import(`../views/${view}`).then((m) => m.default || m);
};
