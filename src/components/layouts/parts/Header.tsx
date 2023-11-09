import { LayoutContext } from "@/components/LayoutProvider";
import { useContext } from "react";
import {
  AppShell,
  Burger,
  Group,
  UnstyledButton,
  Image,
  Box,
  Menu,
  Button,
  Accordion,
  Stack,
} from "@mantine/core";
import classes from "./MobileNavbar.module.css";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";

type HeaderProps = {
  opened: boolean;
  toggle: () => void;
};

export const Header = ({ opened, toggle }: HeaderProps) => {
  const path = usePathname();
  const layoutData = useContext(LayoutContext);
  const { nav, logo } = layoutData?.header || {};
  const prefix = process.env.NEXT_PUBLIC_MEDIAPATH || 'media/';

  return (
    <>
      <AppShell.Header>
        <Group h="100%" px="md">
          {logo && typeof logo !== "string" && (
            <Box
              component={!path || path === "/" ? "h1" : "div"}
              m={0}
              w={150}
              h={50}
            >
              <Link href="/">
                <Image
                  height={50}
                  width="auto"
                  fit="contain"
                  src={prefix + logo.filename}
                  alt={logo.alt || ""}
                />
              </Link>
            </Box>
          )}
          <Box w="auto" style={{ flex: 1 }}></Box>
          <Group justify="space-between">
            <Group ml="xl" gap={0} visibleFrom="sm">
              {nav &&
                nav.map((item) => {
                  const { id, page, has_sublinks, sublinks, label } = item;
                  if (!has_sublinks || !sublinks || !sublinks.length) {
                    const pageTitle =
                      typeof page !== "string" ? page?.title ?? "Link" : "Link";
                    const linkLabel = label || pageTitle;
                    return (
                      <UnstyledButton
                        key={id}
                        component={Link}
                        href={`\\${
                          page && typeof page !== "string" ? page.slug : ""
                        }`}
                        className={classes.control}
                      >
                        {linkLabel}
                      </UnstyledButton>
                    );
                  } else {
                    const linkLabel = label || "Link";
                    return (
                      <Menu key={id}>
                        <Menu.Target>
                          <UnstyledButton
                            variant="subtle"
                            className={`${classes.control} ${classes["__with-icon"]}`}
                          >
                            {linkLabel}
                            <IconChevronDown size="1.2em" />
                          </UnstyledButton>
                        </Menu.Target>

                        <Menu.Dropdown>
                          {sublinks.map((item) => {
                            const {
                              page: subPage,
                              label: subLabel,
                              id: subId,
                            } = item;
                            const subPageTitle =
                              typeof subPage !== "string"
                                ? subPage?.title ?? "Link"
                                : "Link";
                            const linkLabel = subLabel || subPageTitle;
                            return (
                              <Menu.Item
                                component={Link}
                                key={subId}
                                href={`\\${
                                  subPage && typeof subPage !== "string"
                                    ? subPage.slug
                                    : ""
                                }`}
                              >
                                {linkLabel}
                              </Menu.Item>
                            );
                          })}
                        </Menu.Dropdown>
                      </Menu>
                    );
                  }
                })}
            </Group>
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Aside py="md" px={4}>
        <Accordion>
          {nav &&
            nav.map((item) => {
              const { id, page, has_sublinks, sublinks, label } = item;
              if (!has_sublinks || !sublinks || !sublinks.length) {
                const pageTitle =
                  typeof page !== "string" ? page?.title ?? "Link" : "Link";
                const linkLabel = label || pageTitle;
                return (
                  <UnstyledButton
                    key={id}
                    component={Link}
                    href={`\\${
                      page && typeof page !== "string" ? page.slug : ""
                    }`}
                    className={classes.control}
                  >
                    {linkLabel}
                  </UnstyledButton>
                );
              } else {
                const linkLabel = label || "Link";
                return (
                  <Accordion.Item key={id} value={`${id}`}>
                    <Accordion.Control>{linkLabel}</Accordion.Control>
                    <Accordion.Panel>
                      <Stack p="sm">
                        {sublinks.map((item) => {
                          const {
                            page: subPage,
                            label: subLabel,
                            id: subId,
                          } = item;
                          const subPageTitle =
                            typeof subPage !== "string"
                              ? subPage?.title ?? "Link"
                              : "Link";
                          const linkLabel = subLabel || subPageTitle;
                          return (
                            <UnstyledButton
                              key={subId}
                              component={Link}
                              className={`${classes.control} ${classes["__sublink"]}`}
                              href={`\\${
                                subPage && typeof subPage !== "string"
                                  ? subPage.slug
                                  : ""
                              }`}
                            >
                              {linkLabel}
                            </UnstyledButton>
                          );
                        })}
                      </Stack>
                    </Accordion.Panel>
                  </Accordion.Item>
                );
              }
            })}
        </Accordion>
      </AppShell.Aside>
    </>
  );
};

export default Header;
