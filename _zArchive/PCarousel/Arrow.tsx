import { Box, Icon, IconButton } from "@chakra-ui/react";
import { ChevronRight, ChevronLeft } from "@material-ui/icons";


interface ArrowProps {
    handleClick: (a: string, b: number)=> void;
    count: number;
    direction: "previous" | "next";
    colorScheme?: string;
}


export const Arrow = ({handleClick, count, direction, colorScheme = 'primary'}: ArrowProps) => {
    const Icon = direction === "previous" ? ChevronLeft : ChevronRight;
    const buttonProps = {
        colorScheme,
        isRound: true,
        'aria-label': `${direction} slide`,
        fontSize: '1.5rem',
        icon: <Icon />
    }

    return (
        <IconButton onClick={()=>{handleClick(direction, count)}} {...buttonProps} />
    )
}

export default Arrow;