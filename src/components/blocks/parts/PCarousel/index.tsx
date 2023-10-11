import { Children, useEffect, useState } from "react";
import Slide from "./Slide";
import { Box, BoxProps } from "@chakra-ui/react";
import Indicators from "./Indicators";
import { AnimatePresence } from "framer-motion";
import { Arrow } from "./Arrow";

import styles from "@/styles/pCarousel.module.scss";

export interface PCarouselProps extends React.PropsWithChildren {
  height?: string;
  indicators?: boolean;
  arrows?: boolean;
  colorScheme?: string;
}

export const PCarousel = ({
  height = "200px",
  indicators = true,
  arrows = true,
  colorScheme = "primary",
  children,
}: PCarouselProps) => {
  const items = Children.toArray(children);
  const [count, setCount] = useState(0);
  const [isForward, setisForward] = useState(false);

  const incrementCarousel = (direction: string, maxCount: number): void => {
    const forward = direction === "next";
    setisForward(forward);
    setTimeout(() => {
      if (forward) {
        setCount(count === maxCount - 1 ? 0 : count + 1);
      } else {
        setCount(count === 0 ? maxCount - 1 : count - 1);
      }
    }, 0);
  };

  const setCarousel = (nextValue: number): void => {
    const forward = nextValue > count;
    setisForward(forward);
    setTimeout(() => {
      setCount(nextValue);
    }, 0);
  };

  const arrowProps = {
    handleClick: incrementCarousel,
    count: items.length,
    colorScheme: colorScheme,
  };

  return (
    <Box className={styles.pCarousel}>
      <Box minHeight={height}  className={styles.__inner}>
        <AnimatePresence initial={false}>
          {items &&
            items.map((child, i) => {
              return count === i ? (
                <Slide
                  key={`slide-${i}`}
                  index={i}
                  isForward={isForward}
                >
                  {child}
                </Slide>
              ) : null;
            })}
        </AnimatePresence>
      </Box>
      {(indicators || arrows) && (
        <Box className={styles.__controls}>
          {arrows && <Arrow {...arrowProps} direction="previous" />}
          {indicators && (
            <Indicators
              setCarousel={setCarousel}
              colorScheme={colorScheme}
              totalCount={items.length}
              count={count}
            />
          )}
          {arrows && <Arrow {...arrowProps} direction="next" />}
        </Box>
      )}
    </Box>
  );
};

export default PCarousel;
