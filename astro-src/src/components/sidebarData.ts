export type NavItem = {
  title: string;
  href?: string;
  children?: NavItem[];
};

const base = import.meta.env.BASE_URL;

const withBase = (path: string) => {
  if (path === "/") return base;
  return `${base}${path.replace(/^\/+/, "")}`;
};

export const navItems: NavItem[] = [
  ////////////////////////////////////////////////////////////
  // Home
  ////////////////////////////////////////////////////////////
  {
    title: "Home",
    href: withBase("/"),
  },
  ////////////////////////////////////////////////////////////
  // notebook
  ////////////////////////////////////////////////////////////
  {
    title: "notebook",
    href: withBase("/notebook/"),
    children: [
      {
        title: "Open-It",
        href: withBase("/notebook/open-it/"),
        children: [
          ////////////////////////////////////////////////////////////
          {
            title: "Counter",
            href: withBase("/notebook/open-it/counter/"),
          },
          ////////////////////////////////////////////////////////////
          {
            title: "Counter v2",
            href: withBase("/notebook/open-it/counter-v2/"),
          },
          ////////////////////////////////////////////////////////////
          {
            title: "Flip Flop",
            href: withBase("/notebook/open-it/flip-flop/"),
          },
          ////////////////////////////////////////////////////////////
          {
            title: "Flip Flop v2",
            href: withBase("/notebook/open-it/flip-flop-v2/"),
          },
          ////////////////////////////////////////////////////////////
          {
            title: "Shift Register",
            href: withBase("/notebook/open-it/shift-register/"),
          },
          /////////////////////////////////////////////////////////////
          {
            title: "State Machine",
            href: withBase("/notebook/open-it/state-machine/"),
          },
          /////////////////////////////////////////////////////////////
        ],
      },
    ],
  },
];