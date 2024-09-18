import { memo, type ReactNode } from "react";
import { tss } from "tss";
import Typo from "@mui/material/Typography";


export type SquareButtonProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    label: ReactNode;
    onClick?: () => void;
    variant: "grey" | "gold" | "darkGold"
};

export const SquareButton = memo((props: SquareButtonProps) => {

    const { label, className, onClick, variant } = props;
    const { classes, cx } = useStyles({
        variant,
        "classesOverrides": props.classes
    })

    return (
        <button onClick={onClick} className={cx(classes.root, className)}>
            {
                (()=>{
                    if(typeof label === "string"){
                        return <Typo className={classes.label} variant="button">{label}</Typo>
                    }
                    return <div className={classes.label}>{label}</div>
                })()
            }
        </button>
    )
});

const useStyles = tss
    .withNestedSelectors<"label">()
    .withParams<Pick<SquareButtonProps, "variant">>()
    .withName("squareButton")
    .create(({ theme, variant, classes }) => {
        const color = (() => {
            switch (variant) {
                case "darkGold": return theme.palette.gold1.main;
                case "gold": return theme.palette.gold2.main;
                case "grey": return theme.palette.icon.main;
            }

        })()

        const hoverColor = (() => {
            switch (variant) {
                case "darkGold": return theme.palette.gold2.main;
                case "gold": return theme.palette.gold1.main;
                case "grey": return theme.palette.gold1.main;
            }
        })()

        return ({
            "root": {
                "border": `solid 1px ${color}`,
                "display": "flex",
                "justifyContent": "center",
                "alignItems": "center",
                "background": "none",
                ...(() => {
                    const topBottom = 22;
                    const leftRight = 35;
                    return {
                        "paddingTop": topBottom,
                        "paddingBottom": topBottom,
                        "paddingLeft": leftRight,
                        "paddingRight": leftRight
                    }
                })(),
                "cursor": "pointer",
                "transition": "border-color 500ms, background-color 500ms",
                ":hover": {
                    "borderColor": hoverColor,
                    "background": (()=>{
                        switch(variant){
                            case "darkGold": return "#F4F1EB";
                            case "gold": return "red";
                            case "grey": "#F4F1EB"
                        }
                    })(),
                },
                [`&:hover .${classes.label}`]: {
                    "color": hoverColor,
                    "& svg": {
                        "fill": hoverColor
                    }
                }
            },
            "label": {
                color,
                "transition": "color 500ms",
                "& svg": {
                    "fill": color,
                    "width": 15,
                    "height": 15,
                    "transition": "fill 500ms"
                }
            },

        })
    })

