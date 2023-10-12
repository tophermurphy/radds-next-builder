import type { BlockParagraph } from "@/types/payload-types"

interface Paragraph {
    content: BlockParagraph
}

export const Paragraph: React.FC<Paragraph> = ({content}) => {
    return(
        <p>{content.paragraph}</p>
    )
}

export default Paragraph;