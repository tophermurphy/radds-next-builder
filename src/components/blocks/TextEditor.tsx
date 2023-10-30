import PLexical from "./parts/PLexical.tsx";
import { BlockTextEditor } from "@/types/payload-types";

interface TextEditor {
  content: BlockTextEditor
}


export const TextEditor: React.FC<TextEditor> = ({ content }) => {
 return <PLexical textEditor={content.textEditor} />

};

export default TextEditor;
