export type NavItem = {
  title: string;
  href?: string;
  children?: NavItem[];
};

const base = import.meta.env.BASE_URL;

export const navItems: NavItem[] = [
  ////////////////////////////////////////////////////////////
  // Home
  ////////////////////////////////////////////////////////////
  {
    title: "Home",
    href: `${base}`,
  },
  ////////////////////////////////////////////////////////////
  // notebook
  ////////////////////////////////////////////////////////////
  {
    title: "notebook",
    href: `${base}notebook/`,
    children: [
      {
        title: "Open-It",
        href: `${base}notebook/open-it/`,
        children: [
          ////////////////////////////////////////////////////////////
          {
            title: "Counter",
            href: `${base}notebook/open-it/counter/`,
          },
          ////////////////////////////////////////////////////////////
          {
            title: "Counter v2",
            href: `${base}notebook/open-it/counter-v2/`,
          },
          ////////////////////////////////////////////////////////////
          {
            title: "Flip Flop",
            href: `${base}notebook/open-it/flip-flop/`,
          },
          ////////////////////////////////////////////////////////////
          {
            title: "Flip Flop v2",
            href: `${base}notebook/open-it/flip-flop-v2/`,
          },
          ////////////////////////////////////////////////////////////
          {
            title: "Shift Register",
            href: `${base}notebook/open-it/shift-register/`,
          },
          /////////////////////////////////////////////////////////////
          {
            title: "State Machine",
            href: `${base}notebook/open-it/state-machine/`,
          },
          /////////////////////////////////////////////////////////////
        ],
      },
    ],
  },
];