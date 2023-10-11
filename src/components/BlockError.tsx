import { Box, BoxProps } from "@chakra-ui/react";

export const BlockError = ({error_msg}: {error_msg: string}) => {
    const props: BoxProps = {
        border: "solid 1px error",
        p: "6",
        m: "auto"
    }
    return (
        <Box as="span" {...props}>{error_msg}</Box>
    )
}

export default BlockError;