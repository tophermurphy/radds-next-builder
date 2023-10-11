import { useContext } from "react";
import { GlobalContext } from "@/components/GlobalProvider";
import Nav from "./Nav";
import { Box, Container, Flex, Image, Spacer } from "@chakra-ui/react";

const Header = () => {
  const IMAGEPATH = process.env.IMAGE_URL || "http://localhost:1337";
  const globalData = useContext(GlobalContext);
  const { header, brand } = globalData!;

  return (
    <Box as="header" bg="primary.main" py="2">
      <Container maxW="container.xl">
        <Flex alignItems="center">
          <Image
            w="120px"
            height="80px"
            objectFit="contain"
            alt={brand.name}
            src={IMAGEPATH + brand.logo?.url}
          />
          <Spacer />
          <Nav />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
