import type { BlockTabs } from "@/types/payload-types";
import { Tabs as MTabs } from "@mantine/core";
import PLexical from "./parts/PLexical.tsx";
interface Tabs {
  content: BlockTabs
}

export const Tabs: React.FC<Tabs> = ({content: {list}}) => {
  return (
    <MTabs color="primary" defaultValue={list?.[0].id || '1'}>
      <MTabs.List>
        { list && list.map( (item, i) => (
          <MTabs.Tab value={item.id || `${i}`} key={item.id}>{ item.title || `Tab ${i}`}</MTabs.Tab>
        ))}
      </MTabs.List>
      { list && list.map( (item, i) => (
        <MTabs.Panel p="md" value={item.id || `${i}`} key={item.id}>
           <PLexical textEditor={item.textEditor} /> 
        </MTabs.Panel>
      ))}
    </MTabs>
  )
}

export default Tabs;