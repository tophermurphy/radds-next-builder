import type { BlockButtons, ButtonPart } from "@/types/payload-types";
import { Stack } from "@chakra-ui/react";
import PButton from "./parts/PButton";

// TODO Default Theme Spacing for gutters
// TODO GUTTER SPACING DEFAULT

interface Buttons {
  content: BlockButtons
}

export const Buttons: React.FC<Buttons> = ({ content }: {content: BlockButtons}) => {
 const { justify, size, buttons } = content;
  return (
    <Stack
      alignItems="center"
      justifyContent={justify}
      direction={["column", "row"]}
      spacing="4"
      className="block __buttons"
    >
      { buttons &&
         buttons.map((b, i) => {
          return (
            <PButton content={b.button} size={size || "md"} key={i} />
          );
        })}
    </Stack>
  );
}

export default Buttons;