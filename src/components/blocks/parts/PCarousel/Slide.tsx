import { motion } from "framer-motion";
import styles from "@/styles/pCarousel.module.scss";
// import styles from "@/../styles/pCarousel.module.scss";

export interface SlideProps extends React.PropsWithChildren {
 index: number;
 isForward: boolean;

}
export interface otherProps {
    position?: string;
}

export const Slide = ({children, index, isForward}: SlideProps) => {

    let variants = {
        initial: (isForward: boolean) => isForward ? {x: '200%', position: 'absolute'} : {x: '-200%', position: 'absolute'},
        exit: (isForward: boolean) => isForward ? {x: '-200%', position: 'absolute'} : {x: '200%', position: 'absolute'} 
      } as any

    let motionProps = {
        custom: isForward,
        key: index,
        initial: "initial",
        animate: { x: 0, position: 'relative' } as any,
        exit: "exit",
        variants,
        transition: {duration: .5},
        className: styles['__p-slide'],
    } 
    return (
        <motion.div {...motionProps}>{children}</motion.div>
    );
}

export default Slide;