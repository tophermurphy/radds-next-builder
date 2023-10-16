import type { BlockParagraph } from "@/types/payload-types"
import { Text, TextProps } from "@mantine/core"

interface Paragraph {
    content: BlockParagraph & TextProps
}

export const Paragraph: React.FC<Paragraph> = ({content}) => {
    return(
        <Text>{content.paragraph}</Text>
    )
}

export default Paragraph;