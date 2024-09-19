import { CardSlider } from "components/CardSlider";
import { TextSection } from "components/TextSection";
import { useTranslation } from "i18n";
import { memo } from "react";
import { routes } from "router";
import { tss } from "tss";
import { reviews } from "user/reviews";



export const Reviews = memo(() => {
    const { classes } = useStyles();
    const { t } = useTranslation("Home");
    return (
        <section className={classes.root}>
            <TextSection
                className={classes.textSection}
                surtitle={t("reviewsSurtitle")}
                title={t("reviewsTitle")}
                paragraph={t("reviewsParagraph")}
                link={{
                    "label": t("reviewsLinkLabel"),
                    ...routes.contact().link
                }}
            />
            <CardSlider
                className={classes.cardSlider}
                cards={[
                    ...reviews,
                ]}
            />
        </section>
    )
});

const useStyles = tss.create(({ theme }) => {
    return ({
        "root": {
            "paddingLeft": theme.spacing(5),
            "paddingRight": theme.spacing(5),
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            [theme.breakpoints.down("md")]: {
                "flexDirection": "column",
                "alignItems": "flex-start"
            }
        },
        "textSection": {
            "marginRight": theme.spacing(11),
            [theme.breakpoints.down("mdPlus")]: {
                "marginRight": theme.spacing(6)
            },
            [theme.breakpoints.down("md")]: {
                "marginRight": 0,
                "marginBottom": theme.spacing(20)
            },

        },
        "cardSlider": {
            "marginLeft": theme.spacing(11),
            [theme.breakpoints.down("mdPlus")]: {
                "marginLeft": theme.spacing(6)
            },
            [theme.breakpoints.down("md")]: {
                "marginLeft": 0
            },
        }
    })
})