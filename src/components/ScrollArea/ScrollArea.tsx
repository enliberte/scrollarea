import * as React from 'react';
import './ScrollArea.css';


interface IScrollAreaProps {
    children: React.ReactNode,
    onScrollToTop: Function,
    onScrollToBottom: Function
}


const ScrollArea = ({children, onScrollToTop, onScrollToBottom}: IScrollAreaProps) => {
    const [isScrolledBefore, setIsScrolledBefore]: [boolean, Function] = React.useState(false);
    const scrollContainer = React.useRef<HTMLDivElement | null>(null);
    const handleScroll = (): void => {
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

    React.useEffect(() => {
        scrollContainer.current.addEventListener('scroll', handleScroll);
        return () => {
            scrollContainer.current.removeEventListener('scroll', handleScroll);
        }
    });
    return (
        <div className="scroll-area" ref={scrollContainer}>
            {children}
        </div>
    )
};

export default ScrollArea;