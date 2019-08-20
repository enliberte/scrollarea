import * as React from "react";


interface IUseScrollParameters {
    minScrollValue: number;
    maxScrollValue: number;
    onScrollToTop: Function;
    onScrollToBottom: Function;
}

const useScroll = ({minScrollValue, maxScrollValue, onScrollToTop, onScrollToBottom}: IUseScrollParameters): [number, Function] => {
    const [isScrolledBefore, setIsScrolledBefore]: [boolean, Function] = React.useState(false);
    const [position, setPosition]: [number, Function] = React.useState(minScrollValue);
    console.log(position);

    const calculatePosition = (offset: number): number => {
        const grossNextPosition = position + offset;
        return (grossNextPosition < minScrollValue) ? minScrollValue : (grossNextPosition > maxScrollValue) ? maxScrollValue : grossNextPosition;
    };

    const useSetPosition = (offset: number): void => {
        setIsScrolledBefore(true);
        const position = calculatePosition(offset);
        setPosition(position);
    };

    React.useEffect(() => {
        if (isScrolledBefore) {
            if (position === maxScrollValue) {
                onScrollToTop();
            } else if (position === minScrollValue) {
                onScrollToBottom();
            }
        }
    }, [position]);

    return [position, useSetPosition];
};

export default useScroll;