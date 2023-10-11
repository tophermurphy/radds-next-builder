import Marks from "./_Marks";
import EditorLink from "./_EditorLink";
import InlineImage from "../InlineImage";
import { ButtonStyles } from "../PButton";

interface TextProps extends Strapi.Mark {
    attrs: {
        src: string;
        alt: string;
        title?: string;
    }
}


export const Text = ({ node }: { node: TextProps }) => {
    if( !node.marks ) return <>{node.text}</>;

    if( node.marks.some( i => i.type === 'link')){
        return <EditorLink node={node} />
    }
    if( node.marks.some( i => i.type === 'image')){
        return <InlineImage node={node} />
    }

    return <Marks node={node} />

};

export default Text;
