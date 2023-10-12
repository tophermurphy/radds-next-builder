import type { SectionColumns } from "@/types/payload-types";
import BlockRouter from "../BlockRouter";

export default function Columns({section}: {section: SectionColumns}){
    console.log('Columns section', section);
    return (
        <div>
            <h3>Columns</h3>
            {
                section.content &&
                <BlockRouter blocks={section.content} />
            }
        </div>
    )
}