import { Box, Container, HStack, Text, Link, Flex, SimpleGrid } from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "_zArchive/GlobalProvider";
import NextLink from 'next/link';
import { parseLink } from "@/lib/utils";

const Footer = () => {
    const globalData = useContext(GlobalContext);
    const {
      footer,
    } = globalData!;
    const cDate = footer.copyright_first || new Date().getFullYear();
    return (
        <Box as='footer' bg='black'>
            <Container color='white' maxW='container.xs'>
                <Flex py='3'>
                    { footer.footer_links && 
                    <SimpleGrid columns={4} spacing={8}>
                        {                        footer.footer_links.map( (link, i) => (
                            <Link key={i} as={NextLink} href={parseLink(link.link)}>{link.label}</Link>
                        ))}
                    </SimpleGrid>

                    }
                </Flex>
                <HStack py='2'>
                    <Text textStyle='caption'>&copy; {cDate}</Text>
                    { footer.colophon_links &&
                    footer.colophon_links.map((link, i) => (
                        <Link textStyle='caption' key={i} as={NextLink} href={parseLink(link.link)}>{ link.label }</Link>
                    ))
                    }
                </HStack>
            </Container>
        </Box>
    )
};

export default Footer;