import { getView } from "@/common/helpers";

export default [
  {
    path: "/",
    name: "Home",
    component: getView("Index"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: getView("Cart"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: getView("Orders"),
    meta: { layout: "AppLayoutLayout" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: getView("Profile"),
    meta: { layout: "AppLayoutLayout" },
  },
];
