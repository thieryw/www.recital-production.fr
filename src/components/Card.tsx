import { memo } from "react";
import { ReactSVG } from "react-svg";
import { tss } from "tss";
import Typo from "@mui/material/Typography";



export type CardProps = {
    className?: string;
    logoSrc?: string;
    title?: string;
    paragraph?: string;
    variant?: "horizontal" | "vertical";
    width: number;
    height: number;
    isSelected?: boolean;
}

export const Card = memo((props: CardProps) => {
    const {className, logoSrc, paragraph, title, variant = "vertical", width, height, isSelected = false} = props;
    const {classes, cx} = useStyles({
        variant,
        width,
        height,
        isSelected
    });
    return (
        <div className={cx(classes.root, className)}>

            <div className={classes.border}></div>
            {
                logoSrc !== undefined &&
                <ReactSVG
                    src={logoSrc}
                    className={classes.logo}
                    style={{
                        "fill": "url(#MyGradient)"
                    }}
                />
            }
            <div className={classes.textWrapper}>
                {
                    title !== undefined &&
                    <Typo className={classes.title} variant="h4">{title}</Typo>
                }
                {
                    paragraph !== undefined &&
                    <Typo className={classes.paragraph} variant="body1">{paragraph}</Typo>
                }

            </div>

        </div>
    )
});


const useStyles = tss
    .withName("card")
    .withParams<{ 
        variant: "horizontal" | "vertical"; 
        width: number; 
        height: number; 
        isSelected: boolean;
    }>()
    .create(({ theme, variant, height, width, isSelected }) => {
    return ({
        "root": {
                "position": "relative",
                "backgroundColor": isSelected ? theme.palette.white.main : theme.palette.elementBackground.main,
                "boxShadow": !isSelected ? "none" : theme.shadows[1],
                "border": isSelected ? "none" : "solid 1px",
                "borderColor": theme.palette.icon.main,
                "display": "grid",
                "boxSizing": "border-box",
                ...(() => {
                    switch (variant) {
                        case "horizontal": return {};
                        case "vertical": return {
                            "gridTemplateColumns": "1fr",
                            "justifyItems": "center",
                            "alignContent": "center",
                            "gap": 25,
                            "paddingLeft": theme.spacing(5),
                            "paddingRight": theme.spacing(5)
                        }
                    }
                })(),
                "width": width,
                "minHeight": height,
                "transform": isSelected ? "scale(1.2)" : "scale(1)",
                "transition": "transform 500ms, background-color 500ms, box-shadow 500ms",
                "maxWidth": "80vw",
            },
            "border": {
                "position": "absolute",
                "background": theme.palette.goldGradient.main,
                ...(() => {
                    switch (variant) {
                        case "horizontal": return {
                            "top": 0,
                            "right": 0,
                            "width": 8,
                            "height": "100%"


                        };
                        case "vertical": return {
                            "bottom": 0,
                            "left": 0,
                            "width": "100%",
                            "height": 8

                        }
                    }
                })(),
            },
            "logo": {
                "& svg": {
                    "transition": "fill 500ms",
                    "fill": isSelected ? theme.palette.gold1.main : theme.palette.body.main,
                }
            },
            "textWrapper": {},
            "title": {
                "textAlign": variant === "vertical" ? "center" : undefined
            },
            "paragraph": {
                "textAlign": variant === "vertical" ? "center" : undefined
            }
        })
    })