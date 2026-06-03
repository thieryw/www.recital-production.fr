import { declareComponentKeys, useTranslation } from "i18n";
import { memo } from "react";
import Typo from "@mui/material/Typography";
import { tss } from "tss";
import { useRoute } from "router";
import { langOf, linkTo } from "seo/localized";
import { LinkButton } from "components/LinkButton";
import { Reviews } from "pages/home/Reviews";


export const MusiqueMariage = memo(() => {
    const { t } = useTranslation("MusiqueMariage");
    const { classes } = useStyles();
    const route = useRoute();
    const lang = langOf(route.name);
    const contactLink = linkTo("contact", lang);

    const why = [
        { "title": t("why1Title"), "text": t("why1Text") },
        { "title": t("why2Title"), "text": t("why2Text") },
        { "title": t("why3Title"), "text": t("why3Text") }
    ];

    const formats = [
        { "title": t("format1Title"), "text": t("format1Text") },
        { "title": t("format2Title"), "text": t("format2Text") },
        { "title": t("format3Title"), "text": t("format3Text") }
    ];

    const faq = [
        { "q": t("faq1"), "a": t("response1") },
        { "q": t("faq2"), "a": t("response2") },
        { "q": t("faq3"), "a": t("response3") }
    ];

    return (
        <div className={classes.root}>

            <section className={classes.hero}>
                <Typo variant="h1">{t("heroTitle")}</Typo>
                <Typo className={classes.lead} variant="body1">{t("heroParagraph")}</Typo>
                <LinkButton label={t("heroCta")} {...contactLink} />
            </section>

            <section className={classes.intro}>
                <Typo className={classes.introParagraph} variant="body1">{t("introParagraph")}</Typo>
            </section>

            <section className={classes.block}>
                <Typo className={classes.blockTitle} variant="h2">{t("whyTitle")}</Typo>
                <div className={classes.cards}>
                    {why.map(({ title, text }) => (
                        <div className={classes.card} key={title}>
                            <Typo className={classes.cardTitle} variant="h3">{title}</Typo>
                            <Typo variant="body1">{text}</Typo>
                        </div>
                    ))}
                </div>
            </section>

            <section className={classes.block}>
                <Typo className={classes.blockTitle} variant="h2">{t("formatsTitle")}</Typo>
                <div className={classes.cards}>
                    {formats.map(({ title, text }) => (
                        <div className={classes.card} key={title}>
                            <Typo className={classes.cardTitle} variant="h3">{title}</Typo>
                            <Typo variant="body1">{text}</Typo>
                        </div>
                    ))}
                </div>
            </section>

            <section className={classes.block}>
                <Typo className={classes.blockTitle} variant="h2">{t("areaTitle")}</Typo>
                <Typo className={classes.introParagraph} variant="body1">{t("areaParagraph")}</Typo>
            </section>

            <section className={classes.block}>
                <Typo className={classes.blockTitle} variant="h2">{t("faqTitle")}</Typo>
                <div className={classes.faq}>
                    {faq.map(({ q, a }) => (
                        <div className={classes.faqItem} key={q}>
                            <Typo className={classes.cardTitle} variant="h3">{q}</Typo>
                            <Typo variant="body1">{a}</Typo>
                        </div>
                    ))}
                </div>
            </section>

            <section className={classes.cta}>
                <Typo className={classes.blockTitle} variant="h2">{t("ctaTitle")}</Typo>
                <Typo className={classes.introParagraph} variant="body1">{t("ctaParagraph")}</Typo>
                <LinkButton label={t("ctaButton")} {...contactLink} />
            </section>

            <div className={classes.reviews}>
                <Reviews />
            </div>

        </div>
    );
});

const useStyles = tss.create(({ theme }) => ({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "paddingLeft": theme.spacing(4),
        "paddingRight": theme.spacing(4)
    },
    "hero": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "textAlign": "center",
        "paddingTop": theme.spacing(34),
        "marginBottom": theme.spacing(14),
        "maxWidth": 720
    },
    "lead": {
        "marginTop": theme.spacing(4),
        "marginBottom": theme.spacing(8),
        "maxWidth": 600
    },
    "intro": {
        "maxWidth": 760,
        "textAlign": "center",
        "marginBottom": theme.spacing(14)
    },
    "introParagraph": {
        "maxWidth": 760,
        "textAlign": "center"
    },
    "block": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "width": "100%",
        "maxWidth": 1100,
        "marginBottom": theme.spacing(16)
    },
    "blockTitle": {
        "textAlign": "center",
        "marginBottom": theme.spacing(8)
    },
    "cards": {
        "display": "grid",
        "gridTemplateColumns": "repeat(3, 1fr)",
        "gap": theme.spacing(6),
        "width": "100%",
        [theme.breakpoints.down("md")]: {
            "gridTemplateColumns": "1fr"
        }
    },
    "card": {
        "borderTop": `solid ${theme.palette.gold1.main} 4px`,
        "paddingTop": theme.spacing(5)
    },
    "cardTitle": {
        "marginBottom": theme.spacing(3)
    },
    "faq": {
        "width": "100%",
        "maxWidth": 760,
        "display": "flex",
        "flexDirection": "column",
        "gap": theme.spacing(7)
    },
    "faqItem": {},
    "cta": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "textAlign": "center",
        "maxWidth": 720,
        "marginBottom": theme.spacing(16)
    },
    "reviews": {
        "marginTop": theme.spacing(6),
        "marginBottom": theme.spacing(22),
        "width": "100%"
    }
}));


export const { i18n } = declareComponentKeys<
    | "heroTitle"
    | "heroParagraph"
    | "heroCta"
    | "introParagraph"
    | "whyTitle"
    | "why1Title"
    | "why1Text"
    | "why2Title"
    | "why2Text"
    | "why3Title"
    | "why3Text"
    | "formatsTitle"
    | "format1Title"
    | "format1Text"
    | "format2Title"
    | "format2Text"
    | "format3Title"
    | "format3Text"
    | "areaTitle"
    | "areaParagraph"
    | "faqTitle"
    | "faq1"
    | "response1"
    | "faq2"
    | "response2"
    | "faq3"
    | "response3"
    | "ctaTitle"
    | "ctaParagraph"
    | "ctaButton"
>()({ MusiqueMariage });

export type I18n = typeof i18n;
