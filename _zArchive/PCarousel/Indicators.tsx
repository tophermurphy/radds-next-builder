import { Radio, RadioGroup, RadioGroupProps, Stack } from "@chakra-ui/react";
import { ST } from "next/dist/shared/lib/utils";
import { ChangeEvent } from "react";

export interface IndicatorsProps {
    totalCount: number;
    count: number;
    setCarousel: (a: number) => void;
    colorScheme?: string;
}

export const Indicators = ({count, totalCount, setCarousel, colorScheme = 'primary'}: IndicatorsProps) => {
    const handleRadioChange: RadioGroupProps['onChange'] = (e: any) => {
        setCarousel(parseInt(e));
    } 
    return (
        <RadioGroup colorScheme={colorScheme} onChange={handleRadioChange} value={`${count}`}>
            <Stack direction='row'>
                {
                    [...Array(totalCount)].map((item, i) => 
                        <Radio key={`indicator=${i}`} value={`${i}`} />
                    )
                }
            </Stack>
        </RadioGroup>
    )
}

export default Indicators