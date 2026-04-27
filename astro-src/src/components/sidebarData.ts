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
  // glossary
  ////////////////////////////////////////////////////////////
  {
    title: "glossary",
    href: withBase("/glossary/"),
  },
  ////////////////////////////////////////////////////////////
  // notebook
  ////////////////////////////////////////////////////////////
  {
    title: "notebook",
    href: withBase("/notebook/"),
    children: [
      //////////////// open-it
      {
        title: "Open-It",
        href: withBase("/notebook/open-it/"),
        children: [
          //////
          {
            title: "Counter",
            href: withBase("/notebook/open-it/counter/"),
          },
          //////
          {
            title: "Counter v2",
            href: withBase("/notebook/open-it/counter-v2/"),
          },
          //////
          {
            title: "Flip Flop",
            href: withBase("/notebook/open-it/flip-flop/"),
          },
          //////
          {
            title: "Flip Flop v2",
            href: withBase("/notebook/open-it/flip-flop-v2/"),
          },
          //////
          {
            title: "Shift Register",
            href: withBase("/notebook/open-it/shift-register/"),
          },
          //////
          {
            title: "State Machine",
            href: withBase("/notebook/open-it/state-machine/"),
          },
          //////
        ],
      },
      //////////////// baba-san
      {
        title: "Baba-san",
        href: withBase("/notebook/baba-san/"),
        children: [
          {
            title: "example1",
            href: withBase("/notebook/baba-san/example1/"),
          },
        ],
      },
      ////////////////
    ],
  },
  ////////////////////////////////////////////////////////////
  // samidare
  ////////////////////////////////////////////////////////////
  {
    title: "samidare",
    href: withBase("/samidare/"),
    children: [
      //////////////// board
      {
        title: "board",
        href: withBase("/samidare/board/"),
      },
      //////////////// memo
      {
        title: "memo",
        href: withBase("/samidare/memo/"),
        //  children: [
        //   //////
        //   {
        //     title: "Counter",
        //     href: withBase("/notebook/open-it/counter/"),
        //   },
        //   ////
        //   ],
      },
      ////////////////
    ],
  },
  ////////////////////////////////////////////////////////////
];