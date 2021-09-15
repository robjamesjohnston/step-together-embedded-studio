import ActiveLink from "./ActiveLink";

const NavBarList = ({ item, closeMenu }) => {
  return (
    <li className="text-white hover:text-lime transition duration-300 py-2 border-t">
      <ActiveLink href={item.link.target.slug.current}>
        <a onClick={closeMenu}>{item.link.title ? item.link.title : item.link.target.title}</a>
      </ActiveLink>
    </li>
  );
};

export default NavBarList;
