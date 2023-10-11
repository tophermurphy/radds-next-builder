import Divider from "./_Divider";
import Text from "./_Text";
import Spacer from "./_Spacer";
import InlineImage from "../InlineImage";

// TODO ol, li text-alignment needs to be fixed, probably on the Strapi TipTap end

export const Nodes = ({ node }: { node: Strapi.EditorNode }) => {

  const parseStyles = (val: Strapi.EditorNode) => {
    if (!val.attrs) {
      return {};
    }
    //** If there are more styles from TipTap */
    //** they go here */
    const styleArray = ["textAlign"];
    const styles = Object.entries(val.attrs);
    const filtered = styles.filter(([key, val]) => {
      return styleArray.indexOf(key) != -1;
    });

    if (filtered.length > 0) {
      return Object.fromEntries(filtered);
    }
  };

  const tags: Util.ObjectMap = {
    heading: `h${node?.attrs?.level ?? 2}`,
    paragraph: "p",
    listItem: 'li',
    orderedList: 'ol',
    bulletList: 'ul',
    blockquote: "blockquote",
    horizontalRule: Divider,
    spacer: Spacer,
    text: Text,
    hardBreak: "br",
    image: InlineImage
  };

  const Component = tags[node.type] || "p";
  let nodeProps: any = {};

    nodeProps.style = parseStyles(node);
    nodeProps.className = node?.attrs?.className ?? "";

    //TODO I could probably clean up how this is added on both ends.
    if(node.attrs && node.attrs.class){
      nodeProps.className += ` ${node.attrs.class}`
    }

  return (
    <Component {...nodeProps} node={node}>
      {node.content &&
        node.content.length &&
        node.content.map((item, i) => {
          return <Nodes key={`node-${i}`} node={item} />;
        })}
    </Component>
  );
};

export default Nodes;
