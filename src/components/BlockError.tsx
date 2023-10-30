import { Box, BoxProps } from "@mantine/core";

//TODO: Different Mantine component

export const BlockError = ({error_msg}: {error_msg: string}) => {
    const props: BoxProps = {
        p: "6",
        m: "auto",
        style: {
            border: "solid 1px red"
        }
    }
    return (
        <Box component="span" {...props}>{error_msg}</Box>
    )
}

export default BlockError;