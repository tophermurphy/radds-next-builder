import { Box, Container } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation'

const PageTitle = ({ title }: { title: string }) => {

  const params = useParams();
  const element = params.slug === "/" || !params.slug ? "h2" : "h1";
  const props = {
    maxW: "1200px",
    px: {
      base: 4,
      md: 6,
    },
    py: 4
  };

  return (
    <Container {...props}>
      <Box as={element} textStyle="h1">
        {title}
      </Box>
    </Container>
  );
};

export default PageTitle;
