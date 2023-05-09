import { useRouter } from "next/router";
import styles from "./index.module.scss";
import NavItem from "@/components/UI/NavItem";

const Index = () => {
  const router = useRouter();

  const menu = [
    {
      title: "Home",
      link: "/",
      className: styles.nav__item,
    },
    {
      title: "About",
      link: "/about",
      className: styles.nav__item,
    },
    {
      title: "Inscription",
      link: "/auth/register",
      className: styles.nav__item,
    },
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        {menu.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </ul>
    </nav>
  );
};

export default Index;
