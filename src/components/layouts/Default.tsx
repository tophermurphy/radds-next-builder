import Header from "./parts/Header";
import { AppShell, Space } from "@mantine/core";
import SectionRouter from "../SectionRouter";
import { useDisclosure, useHeadroom } from '@mantine/hooks';

import type { Page } from "@/types/payload-types";


export default function Layout({ page }: { page: Page }) {
    const [opened, {toggle}] = useDisclosure();
    const pinned = useHeadroom({ fixedAt: 120 });

//TODO: Aside width tweaking
  return (
    <AppShell
  header={{ height: 60, collapsed: !pinned, offset: false }}
    aside={{ width: { base: 300, sm: 300}, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
    padding="sm"
    >
        <Header opened={opened} toggle={toggle} />
        <AppShell.Main>
            <Space h="xl"/>
            <SectionRouter sections={page.sections} /></AppShell.Main>
    </AppShell>

  );
};

