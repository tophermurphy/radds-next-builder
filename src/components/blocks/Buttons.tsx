import type { BlockButtons, ButtonPart } from "@/types/payload-types";
import { Group } from "@mantine/core";
// import { Stack } from "@chakra-ui/react";
import PButton from "./parts/PButton";

// TODO Default Theme Spacing for gutters
// TODO GUTTER SPACING DEFAULT

interface Buttons {
  content: BlockButtons;
}

export const Buttons: React.FC<Buttons> = ({
  content,
}: {
  content: BlockButtons;
}) => {
  const { justify, size, buttons } = content || {};
  return (
    <Group justify={justify} gap="lg">
      {buttons &&
        buttons.map((item) => (
          <PButton button={item.button} key={item.id} size={size || 'md'} />
        ))}
    </Group>
  );
};

export default Buttons;
