import * as React from 'react';
import './ScrollArea.css';


interface IScrollAreaProps {
    children: React.ReactNode,
    onScrollToTop: Function,
    onScrollToBottom: Function,
}


const ScrollArea = ({children, onScrollToTop, onScrollToBottom}: IScrollAreaProps) => {
    const [isScrolledBefore, setIsScrolledBefore]: [boolean, Function] = React.useState(false);
    const scrollContainer = React.useRef<HTMLDivElement | null>(null);


    const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
        if (isScrolledBefore) {
            if (scrollContainer.current.scrollTop === 0) {
                onScrollToTop();
            } else if ((scrollContainer.current.scrollHeight - scrollContainer.current.scrollTop) <= scrollContainer.current.clientHeight) {
                onScrollToBottom();
            }
        } else {
            setIsScrolledBefore(true);
        }
    };

    return (
        <div className="scroll-area" ref={scrollContainer} onScroll={handleScroll}>
            {children}
        </div>
    )
};

export default ScrollArea;