import { User, Book } from "react-feather";

const pagesSection = [
  {
    href: "/students",
    icon: User,
    title: "Students",
  },
  {
    href: "/books",
    icon: Book,
    title: "Books",
  },
];
const navItems = [
  {
    title: "Pages",
    pages: pagesSection,
  },
];

export default navItems;
