import { memo, useState } from "react";
import { tss } from "tss";
import Typo from "@mui/material/Typography";
import smallArrowSvg from "assets/svg/small-arrow.svg";
import { ReactSVG } from "react-svg";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useDomRect } from "powerhooks/useDomRect";


export type FAQProps = {
    className?: string;
    question: string;
    number: number;
    response: string;
    isOpen?: boolean;
};

export const FAQ = memo((props: FAQProps) => {
    const { number, question, response, className, isOpen: isOpenInitial = false } = props
    const [isOpen, setIsOpen] = useState(isOpenInitial);
    const { domRect: { height }, ref } = useDomRect();
    const { cx, classes } = useStyles({
        isOpen,
        height
    });

    const toggle = useConstCallback(() => {
        setIsOpen(!isOpen);
    })

    return (
        <div className={cx(classes.root, className)}>
            <div onClick={toggle} className={classes.questionWrapper}>
                <Typo variant="h4"><span className={classes.number}>{number}.</span> {question}</Typo>
                <ReactSVG className={classes.arrow} src={smallArrowSvg} />
            </div>
            <div className={classes.responseWrapper}>
                <div ref={ref} className={classes.response}>
                    <Typo className={classes.responseParagraph} variant="body1">{response}</Typo>
                    <div className={classes.bottomBorder}></div>

                </div>
            </div>

        </div>
    )
});


const useStyles = tss.withName("FAQ").withParams<{ isOpen: boolean; height: number; }>().create(({ theme, isOpen, height }) => {
    return ({
        "root": {
            "backgroundColor": isOpen ? theme.palette.white.main : theme.palette.elementBackground.main,
            "transition": "background 500ms",
            "boxShadow": isOpen ? theme.shadows[1] : "none"

        },
        "questionWrapper": {
            ...(()=>{
                const topBottom = theme.spacing(4);
                const leftRight = theme.spacing(7);
                return {
                    "paddingLeft": leftRight,
                    "paddingRight": leftRight,
                    "paddingTop": topBottom,
                    "paddingBottom": topBottom
                }
            })(),
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "space-between",
            "border": "solid 1px",
            "borderColor": isOpen ? "transparent" : theme.palette.icon.main,
            "transition": "border-color 500ms",
            "cursor": "pointer"

        },
        "arrow": {
            "cursor": "pointer",
            "transform": `rotate(${isOpen ? 0 : 180}deg)`,
            "transformOrigin": "center",
            "transition": "transform 500ms",
            "& svg": {
                "fill": isOpen ? theme.palette.gold1.main : theme.palette.body.main,
                "transition": "fill 500ms",

            },
            "marginLeft": theme.spacing(8)

        },
        "number": {
            "color": theme.palette.gold1.main
        },
        "responseWrapper": {
            "height": isOpen ? height : 0,
            "overflow": "hidden",
            "transition": "height 500ms",
            "position": "relative"
        },

        "response": {
            "position": "absolute",
            "width": "100%",
            "top": 0,
            "left": 0,
            ...(() => {
                const value = theme.spacing(7);
                return {
                    "paddingLeft": value,
                    "paddingRight": value
                }
            })(),
            "paddingBottom": theme.spacing(8),
            "boxSizing": "border-box"

        },
        "responseParagraph": {
            [theme.breakpoints.up("md")]: {
                "width": "90%"
            }


        },
        "bottomBorder": {
            "position": "absolute",
            "bottom": 0,
            "left": 0,
            "width": "100%",
            "height": 8,
            "background": theme.palette.goldGradient.main
        }
    })

})