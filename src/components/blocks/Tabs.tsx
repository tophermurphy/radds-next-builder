import {
  Tabs as CTabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SlideFade, Fade
} from "@chakra-ui/react";
import PEditorParse from "./parts/PEditorParse";
import { useState } from "react";

//TODO: More styling options??
//TODO: Check mobile and overflow

export interface TabsProps {
  tab: Tab[];
}

export type Tab = {
  title: string;
  body: string;
};

export const Tabs = ({ content: { tab } }: { content: TabsProps }) => {
    const [tabIndex, setTabIndex] = useState(0)
  
    const handleTabsChange = (index: number) => {
      setTabIndex(index)
    }
  return (
    <CTabs isFitted index={tabIndex} onChange={handleTabsChange} variant="enclosed-colored" colorScheme="primary">
      <TabList>
        {tab && tab.map(({ title }, i) => <Tab key={`tab-${i}`}>{title}</Tab>)}
      </TabList>
      <TabPanels p={2}>
        {tab &&
          tab.map(({ body }, i) => (
            <SlideFade initial={false} transition={{exit:{duration: .3}, enter: {duration: .3}}} offsetY={0} offsetX='80%' key={i} in={i === tabIndex}>
            <TabPanel >
                <PEditorParse body={body} />
            </TabPanel>
            </SlideFade>
          ))}
      </TabPanels>
    </CTabs>
  );
};
