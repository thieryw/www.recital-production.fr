import { memo } from "react";
import type { Link } from "../tools/link";
import { tss } from "tss";
import { useDomRect } from "powerhooks/useDomRect";
import Typography from "@mui/material/Typography";
import smallArrowSvg from "assets/svg/small-arrow.svg";
import { ReactSVG } from "react-svg";


export type LinkButtonProps = Link & {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    variant?: "dark" | "light";
    openInNewTab?: boolean;
}





export const LinkButton = memo((props: LinkButtonProps) => {
    const { href, label, onClick, className, variant, openInNewTab = false } = props;
    const { ref, domRect: { height } } = useDomRect();
    const { classes, cx } = useStyles({
        "variant": variant ?? "light",
        "textHeight": height,
        "classesOverrides": props.classes
    });
    return <a className={cx(classes.root, className)} onClick={onClick} href={href} {...openInNewTab ? { "target": "_blank" } : {}}>
        <div className={classes.inner}>

            <div className={classes.textWrapper}>
                <div ref={ref}>
                    <Typography className={classes.linkLabel} variant="body2">{label}</Typography>
                </div>
                <Typography className={classes.linkLabel} variant="body2">{label}</Typography>
            </div>

            <ReactSVG className={classes.smallArrow} src={smallArrowSvg} />
        </div>
    </a>
});

const useStyles = tss
    .withParams<Required<Pick<LinkButtonProps, "variant">> & { textHeight: number }>()
    .withNestedSelectors<"linkLabel">()
    .create(({ theme, classes, variant, textHeight }) => {
        const gold = (() => {
            switch (variant) {
                case "dark": return theme.palette.gold2.main;
                case "light": return theme.palette.gold1.main;
            }

        })()
        return ({
            "root": {
                "textDecoration": "none",
                "position": "relative"
            },
            "textWrapper": {
                "height": textHeight,
                "overflow": "hidden"

            },
            "inner": {
                [`&:hover .${classes.linkLabel}`]: {
                    "transform": `translateY(${-textHeight}px)`,
                },
                "display": "flex",
                "alignItems": "center"

            },
            "linkLabel": {
                "color": gold,
                "marginBlock": 0,
                "transition": "transform 500ms",
                "textTransform": "uppercase",
                "fontWeight": "bold"
            },
            "smallArrow": {
                "transform": "rotate(90deg)",
                "marginLeft": theme.spacing(5),
                "& svg": {
                    "fill": gold,
                    "width": 11
                }
            }
        })
    })

