import { Stack } from "@chakra-ui/react";
import PButton, { BtnProps } from "./parts/PButton";

// TODO Default Theme Spacing for gutters
// TODO GUTTER SPACING DEFAULT

export interface BtnComponentProps {
  content: {
    align: string;
    button: BtnProps[];
  };
}

const alignMap: Util.ObjectMap = {
  left: "start",
  center: "center",
  right: "end",
};

export function Buttons({ content }: BtnComponentProps) {
  const justify = alignMap[content.align] || "center";

  return (
    <Stack
      alignItems="center"
      justifyContent={justify}
      direction={["column", "row"]}
      spacing="4"
      className="block __buttons"
    >
      {content.button &&
        content.button.map((b, i) => {
          return (
            <PButton content={b} key={i} />
          );
        })}
    </Stack>
  );
}
