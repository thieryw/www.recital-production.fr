import { memo } from "react";
import { Link } from "tools/link";
import { tss } from "tss";
import Typo from "@mui/material/Typography";
import { SmallTitle } from "./SmallTitle";
import { LinkButton } from "./LinkButton";

export type TextSectionProps = {
    className?: string;
    surtitle?: string;
    title?: string;
    paragraph?: string;
    link?: Link

}

export const TextSection = memo((props: TextSectionProps) => {
    const {className, link, paragraph, surtitle, title} = props;
    const { classes, cx } = useStyles();
    return (
        <div className={cx(classes.root, className)}>
            {
                surtitle !== undefined &&
                <SmallTitle
                    description={surtitle}

                />
            }
            {
                title !== undefined && (
                    <div>
                        <Typo variant="h3">{title}</Typo>
                        <div className={classes.divider}></div>
                    </div>
                )
            }
            {
                paragraph !== undefined &&
                <Typo variant="body1">{paragraph}</Typo>
            }
            {
                link !== undefined &&
                <LinkButton 
                    {...link}
                />
            }

        </div>
    )
});

const useStyles = tss.withName("TextSection").create(({ theme }) => {
    return ({
        "root": {
            "display": "grid",
            "gridTemplateColumns": "1fr",
            "justifyItems": "start",
            "gap": theme.spacing(4),
            [theme.breakpoints.up("sm")]: {
                "width": 280
            },
        },
        "divider": {
            "width": theme.spacing(8),
            "height": 0,
            "borderTop": `solid ${theme.palette.gold1.main} 2px`,
            "marginTop": theme.spacing(8)
        }
    })
})