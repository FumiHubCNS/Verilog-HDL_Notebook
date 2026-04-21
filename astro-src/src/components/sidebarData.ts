export type NavItem = {
  title: string;
  href?: string;
  children?: NavItem[];
};

export const navItems: NavItem[] = [
  ////////////////////////////////////////////////////////////
  // Home
  ////////////////////////////////////////////////////////////
  {
    title: "Home",
    href: "/",
  },
  ////////////////////////////////////////////////////////////
  // notebook 
  ////////////////////////////////////////////////////////////
  {
    title: "notebook",
    href: "/notebook/",
    children: [
      {
        title: "Open-It",
        href: "/notebook/open-it/",
        children: [
          ////////////////////////////////////////////////////////////
          {
            title: "Counter",
            href: "/notebook/open-it/counter/",
          },
          ////////////////////////////////////////////////////////////
          {
            title: "Counter v2",
            href: "/notebook/open-it/counter-v2/",
          },
          ////////////////////////////////////////////////////////////
          {
            title: "Flip Flop",
            href: "/notebook/open-it/flip-flop/",
          },
          ////////////////////////////////////////////////////////////
          {
            title: "Flip Flop v2",
            href: "/notebook/open-it/flip-flop-v2/",
          },
          ////////////////////////////////////////////////////////////
          {
            title: "Shift Register",
            href: "/notebook/open-it/shift-register/",
          },
          /////////////////////////////////////////////////////////////
          {
            title: "State Machine",
            href: "/notebook/open-it/state-machine/",
          },
          /////////////////////////////////////////////////////////////
        ],
      },
      ////////////////////////////////////////////////////////////
      // Hoge
      ////////////////////////////////////////////////////////////
      // {
      //   title: "Examples",
      //   href: "/tutorials/examples/",
      //   children: [
      //     {
      //       title: "Counter",
      //       href: "/tutorials/examples/counter/",
      //     },
      //   ],
      // },
      ////////////////////////////////////////////////////////////
    ],
  },

  // {
  //   title: "Tools",
  //   href: "/tools/",
  // },
];