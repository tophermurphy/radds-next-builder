interface MarksProps {
  node: Strapi.Mark;
}

export const Marks = ({ node }: MarksProps) => {
  const tagList: Util.ObjectMap = {
    bold: "strong",
    italic: "em",
  };
  const TextNode = () => <>{node.text}</>;
  if (!node.marks) return <TextNode />;
  const Component = node.marks.reduce((pv, cv) => {
    const InnerMark = tagList[cv.type];
    return <InnerMark>{pv}</InnerMark>;
  }, <TextNode />);
  return Component;
};

export default Marks;
