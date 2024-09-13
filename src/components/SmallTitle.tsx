import { tss } from "tss";
import { ReactSVG } from "react-svg";
import smallArrowSvg from "assets/svg/small-arrow.svg";
import Typo from "@mui/material/Typography";
import { memo } from "react";


export type SmallTitleProps = {
    className?: string;
    description: string;
}


export const SmallTitle = memo((props: SmallTitleProps) => {
    const { description, className } = props;
    const {classes, cx} = useStyles();
    return (
        <div className={cx(classes.root, className)}>
            <ReactSVG className={classes.smallArrow} src={smallArrowSvg} />
            <Typo className={classes.desc} variant="body2">{description}</Typo>

        </div>
    )
});

const useStyles = tss.withName("SmallTitle").create(({theme}) => {
    return ({
        "root": {
            "display": "flex",
            "alignItems": "center"
        },
        "desc": {
            "textTransform": "uppercase",
            "fontWeight": "bold"
        },
        "smallArrow": {
            "transform": "rotate(90deg)",
            "marginRight": theme.spacing(5),
            "& svg": {
                "fill": theme.palette.body.main,
                "width": 11
            }
        }
    })
})