import type { CSSObject } from "tss-react";
import { keyframes } from "tss-react";

function getAnimation(translateInitialPercentage: number, duration: number, delay: number) {

    const percentage = (1 - duration / (duration + delay)) * 100;

    return `${keyframes`
            0%, ${percentage}% {
                transform: translateY(${translateInitialPercentage}%);
            }
            to {
                transform: translateY(0%);
            }
            `} ${duration + delay}ms cubic-bezier(0.25, 0.1, 0.25, 1)`

}

function getTranslation(translatePercentage: number, duration: number, delay: number): CSSObject {

    return {
        "transform": `translateY(${translatePercentage}%)`,
        "transition": `transform ${duration}ms`,
        "transitionDelay": `${delay}ms`

    }
}

export function animate(params: {

    vector: "comingFromTop" | "comingFromBottom" | "leavingToTop" | "leavingToBottom" | "staticHidden" | "staticVisible";
    comingInDuration?: number,
    goingOutDuration?: number,
    comingInDelay?: number,
    goingOutDelay?: number
}

) {
    const { vector, comingInDelay, comingInDuration, goingOutDelay, goingOutDuration } = params;
    switch (vector) {
        case "staticHidden": return { "transform": "translateY(100%)" };
        case "staticVisible": return {};
        case "comingFromBottom": return {
            "animation": getAnimation(100, comingInDuration ?? 1000, comingInDelay ?? 0)
        };
        case "comingFromTop": return {
            "animation": getAnimation(-100, comingInDuration ?? 1000, comingInDelay ?? 0)
        };
        case "leavingToBottom": return getTranslation(100, goingOutDuration ?? 1000, goingOutDelay ?? 0);
        case "leavingToTop": return getTranslation(-100, goingOutDuration ?? 1000, goingOutDelay ?? 0);
    }
};