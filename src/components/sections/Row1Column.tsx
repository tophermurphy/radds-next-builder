import type { SectionRow } from "@/types/payload-types";
import BlockRouter from "../BlockRouter";

export interface SectionRow1Column extends SectionRow {
    columns: "1"
}

export default function Row1Column ({section}: {section: SectionRow1Column}) {

    return(
        <div>
            <h3>Row 1 Col</h3>
            { section.column_1 && 
                <BlockRouter blocks={section.column_1} />
            }
        </div>
    );
}