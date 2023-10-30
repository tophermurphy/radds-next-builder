import {
  Box,
  IconButton,
  useDisclosure,
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  List,
  ListItem,
  Link,
} from "@chakra-ui/react";
import { RefObject, useRef } from "react";
import NextLink from "next/link";
import { useContext } from "react";
import { GlobalContext } from "_zArchive/GlobalProvider";
import { parseLink } from "@/lib/utils";
import { Menu } from "@material-ui/icons";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: RefObject<HTMLElement>;
}

const MobileNav = () => {
  const globalData = useContext(GlobalContext);
  const {
    header: { main_nav },
  } = globalData!;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Box display={{ md: "none" }}>
        <IconButton
          ref={btnRef}
          size="lg"
          onClick={onOpen}
          aria-label="Menu"
          colorScheme="primary"
          icon={<Menu />}
        />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <List>
              {main_nav &&
                main_nav.map((link, i: number) => {
                  if (link.sub_links && link.sub_links.length) {
                    return (
                      <ListItem key={`item-${i}`}>
                        <Link as={NextLink} href={parseLink(link.link)}>
                          {link.label}
                        </Link>
                        <List pl="2" key={`sub-list-${i}`}>
                          {link.sub_links.map((sublink, j: number) => (
                            <ListItem key={`sub-item-${i}-${j}`}>
                              <Link
                                as={NextLink}
                                href={parseLink(sublink.link)}
                              >
                                {sublink.label}
                              </Link>
                            </ListItem>
                          ))}
                        </List>
                      </ListItem>
                    );
                  } else {
                    return <ListItem key={`item-${i}`}>{link.label}</ListItem>;
                  }
                })}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNav;
