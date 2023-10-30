import { GetContainerProps } from "../src/lib/utils";
import { Box, Container } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";

interface ContainerProps extends React.PropsWithChildren {
  options?: Omit<Global.BlockOptions, "anchor">;
  index: number;
}

const defaultOptions: Global.BlockOptions = {
  bg_color: null,
  padding: "top_bottom",
  variant: null,
  width: "standard",
};

const BlockContainer = ({
  options = defaultOptions,
  children,
}: ContainerProps) => {
  const cOpts = new GetContainerProps(options);

  const { maxW, px, pt, pb, bg } = cOpts;
  const cProps = { maxW, px, pt, pb };
  const theme = useTheme();

  return (
    <Box bg={`${bg}.main`}>
      <Container {...cProps} className={options?.variant?.name ?? ''}>
        {children}
      </Container>
    </Box>
  );
};

export default BlockContainer;
