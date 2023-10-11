import { useContext } from "react";
import { GlobalContext } from "@/components/GlobalProvider";
import {
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from "@chakra-ui/react";
import NextLink from "next/link";
import { parseLink } from "@/lib/utils";
import { ExpandMore } from "@material-ui/icons";

const DesktopNav = () => {
  const globalData = useContext(GlobalContext);
  const {
    header: { main_nav },
  } = globalData!;
  return (
    <Flex
      display={{ base: "none", md: "flex" }}
      alignItems="center"
      justifyContent="space-between"
      flexGrow={1}
    >
      {main_nav &&
        main_nav.map((link, i) => {
          if (!link.sub_links || !link.sub_links.length) {
            return (
              <Link key={i} as={NextLink} color="white" href={parseLink(link.link)}>
                {link.label}
              </Link>
            );
          } else {
            return (
              <Menu key={i}>
                <MenuButton as={Button} colorScheme="primary"  rightIcon={<ExpandMore />}>{link.label}</MenuButton>
                <MenuList>
                  {link.sub_links.map((sub, j) => (
                    <MenuItem key={j} as={NextLink} href={parseLink(sub.link)}>
                      {sub.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            );
          }
        })}
    </Flex>
  );
};

export default DesktopNav;
