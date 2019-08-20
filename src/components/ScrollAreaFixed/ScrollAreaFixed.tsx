import * as React from 'react';
import './ScrollAreaFixed.css';
import useScroll from "../hooks/scroll";


interface IScrollAreaProps {
    children: React.ReactNode,
    onScrollToTop: Function,
    onScrollToBottom: Function,
    fixedScrollPx?: number
}


const ScrollAreaFixed = ({children, onScrollToTop, onScrollToBottom, fixedScrollPx}: IScrollAreaProps) => {

    const useCalculateMinScrollValue = (container, children): number => {
        const [minScrollValue, setMinScrollValue]: [number, Function] = React.useState(0);
        React.useEffect(() => {
            setMinScrollValue(container.current.clientHeight - children.current.clientHeight)
        }, []);
        return minScrollValue
    };

    const scrollContainer = React.useRef<HTMLDivElement | null>(null);
    const scrollChildren = React.useRef<HTMLDivElement | null>(null);
    const maxScrollValue = 0;
    const minScrollValue = useCalculateMinScrollValue(scrollContainer, scrollChildren);
    const [position, useSetPosition] = useScroll({minScrollValue, maxScrollValue, onScrollToTop, onScrollToBottom});


    const onScrollDown = (): void => {
        useSetPosition(-fixedScrollPx);
    };

    const onScrollUp = (): void => {
        useSetPosition(fixedScrollPx);
    };

    return (
        <div className="scroll-area-fixed">
            <button onClick={onScrollUp}>{'<'}</button>
            <button onClick={onScrollDown}>{'>'}</button>
            <div className="scroll-area-fixed-container" ref={scrollContainer}>
                <div className="scroll-area-fixed-children" style={{top: position}} ref={scrollChildren}>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default ScrollAreaFixed;