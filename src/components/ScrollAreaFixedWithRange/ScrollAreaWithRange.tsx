import * as React from 'react';
import useScroll from "../hooks/scroll";
import './ScrollAreaWithRange.css';


interface IScrollAreaProps {
    children: React.ReactNode,
    onScrollToTop: Function,
    onScrollToBottom: Function,
    fixedScrollPx?: number
}

const ScrollAreaWithRange = ({children, onScrollToTop, onScrollToBottom, fixedScrollPx}: IScrollAreaProps) => {

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
        <div className="scroll-area-range">
            <input type="range" min={minScrollValue} max={maxScrollValue} step="1" value={position} onChange={() => {console.log('scroll')}} />
            <div className="scroll-area-range-container" ref={scrollContainer}>
                <div className="scroll-area-range-children" style={{top: position}} ref={scrollChildren}>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default ScrollAreaWithRange;