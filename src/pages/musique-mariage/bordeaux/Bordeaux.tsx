import { declareComponentKeys, useTranslation } from "i18n";
import { memo } from "react";
import Typo from "@mui/material/Typography";
import { tss } from "tss";
import { useRoute } from "router";
import { langOf, linkTo } from "seo/localized";
import { LinkButton } from "components/LinkButton";
import { Reveal } from "components/Reveal";
import { FAQ } from "components/FAQ";

import heroJpg from "assets/jpg/media/gallery/photos/3.jpeg";
import heroWebp from "assets/webp/media/gallery/photos/3.webp";
import introJpg from "assets/jpg/media/gallery/photos/7.jpeg";
import introWebp from "assets/webp/media/gallery/photos/7.webp";
import venuesJpg from "assets/jpg/media/gallery/photos/8.jpeg";
import venuesWebp from "assets/webp/media/gallery/photos/8.webp";
import formationsJpg from "assets/jpg/media/gallery/photos/10.jpeg";
import formationsWebp from "assets/webp/media/gallery/photos/10.webp";


type Picture = { jpg: string; webp: string; alt: string };

const Img = memo((props: { picture: Picture; className: string }) => {
    const { picture, className } = props;
    return (
        <picture>
            <source srcSet={picture.webp} type="image/webp" />
            <img className={className} src={picture.jpg} alt={picture.alt} loading="lazy" />
        </picture>
    );
});


export const Bordeaux = memo(() => {
    const { t } = useTranslation("Bordeaux");
    const { classes, cx } = useStyles();
    const route = useRoute();
    const lang = langOf(route.name);
    const contactLink = linkTo("contact", lang);
    const hubLink = linkTo("musiqueMariage", lang);

    const faq = [
        { "q": t("faq1"), "a": t("response1") },
        { "q": t("faq2"), "a": t("response2") },
        { "q": t("faq3"), "a": t("response3") }
    ];

    return (
        <div className={classes.root}>

            <Reveal className={classes.revealWrap} duration={0.9}>
                <section className={classes.hero}>
                    <Typo variant="h1">{t("heroTitle")}</Typo>
                    <Typo className={classes.lead} variant="body1">{t("heroParagraph")}</Typo>
                    <LinkButton label={t("heroCta")} {...contactLink} />
                </section>
            </Reveal>

            <Reveal className={classes.revealWrap} delay={0.15}>
                <div className={classes.banner}>
                    <Img picture={{ "jpg": heroJpg, "webp": heroWebp, "alt": t("heroAlt") }} className={classes.bannerImage} />
                </div>
            </Reveal>

            <Reveal className={classes.revealWrap}>
                <section className={classes.intro}>
                    <Typo className={classes.introParagraph} variant="body1">{t("introParagraph")}</Typo>
                </section>
            </Reveal>

            <section className={classes.block}>
                <Reveal className={classes.revealWrap}>
                    <Typo className={classes.blockTitle} variant="h2">{t("venuesTitle")}</Typo>
                </Reveal>
                <Reveal className={classes.revealWrap}>
                    <Typo className={cx(classes.introParagraph, classes.sectionParagraph)} variant="body1">{t("venuesParagraph")}</Typo>
                </Reveal>
                <Reveal className={classes.revealWrap} delay={0.15}>
                    <div className={classes.banner}>
                        <Img picture={{ "jpg": introJpg, "webp": introWebp, "alt": t("introAlt") }} className={classes.bannerImage} />
                    </div>
                </Reveal>
            </section>

            <section className={classes.block}>
                <Reveal className={classes.revealWrap}>
                    <Typo className={classes.blockTitle} variant="h2">{t("formationsTitle")}</Typo>
                </Reveal>
                <Reveal className={classes.revealWrap}>
                    <Typo className={cx(classes.introParagraph, classes.sectionParagraph)} variant="body1">{t("formationsParagraph")}</Typo>
                </Reveal>
                <Reveal className={classes.revealWrap} delay={0.15}>
                    <div className={cx(classes.banner, classes.splitBanner)}>
                        <Img picture={{ "jpg": venuesJpg, "webp": venuesWebp, "alt": t("venuesAlt") }} className={classes.bannerImage} />
                        <Img picture={{ "jpg": formationsJpg, "webp": formationsWebp, "alt": t("formationsAlt") }} className={classes.bannerImage} />
                    </div>
                </Reveal>
            </section>

            <Reveal className={classes.revealWrap}>
                <section className={classes.intro}>
                    <Typo className={classes.blockTitle} variant="h2">{t("beyondTitle")}</Typo>
                    <Typo className={classes.introParagraph} variant="body1">
                        {t("beyondParagraphLead")}
                        <a className={classes.inlineLink} {...hubLink}>{t("beyondLinkLabel")}</a>
                        {t("beyondParagraphRest")}
                    </Typo>
                </section>
            </Reveal>

            <section className={classes.block}>
                <Reveal className={classes.revealWrap}>
                    <Typo className={classes.blockTitle} variant="h2">{t("faqTitle")}</Typo>
                </Reveal>
                <div className={classes.faq}>
                    {faq.map(({ q, a }, index) => (
                        <Reveal delay={index * 0.1} key={q}>
                            <FAQ
                                number={index + 1}
                                question={q}
                                response={a}
                                isOpen={index === 0}
                                className={classes.question}
                            />
                        </Reveal>
                    ))}
                </div>
            </section>

            <Reveal className={classes.revealWrap}>
                <section className={classes.cta}>
                    <Typo className={classes.blockTitle} variant="h2">{t("ctaTitle")}</Typo>
                    <Typo className={cx(classes.introParagraph, classes.sectionParagraph)} variant="body1">{t("ctaParagraph")}</Typo>
                    <LinkButton label={t("ctaButton")} {...contactLink} />
                </section>
            </Reveal>

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
    "revealWrap": {
        "width": "100%",
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center"
    },
    "hero": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "textAlign": "center",
        "paddingTop": theme.spacing(34),
        "marginBottom": theme.spacing(10),
        "maxWidth": 720
    },
    "lead": {
        "marginTop": theme.spacing(4),
        "marginBottom": theme.spacing(8),
        "maxWidth": 600
    },
    "banner": {
        "width": "100%",
        "maxWidth": 1100,
        "marginBottom": theme.spacing(14),
        "borderTop": `solid ${theme.palette.gold1.main} 4px`,
        "borderBottom": `solid ${theme.palette.gold1.main} 4px`
    },
    "splitBanner": {
        "display": "grid",
        "gridTemplateColumns": "repeat(2, 1fr)",
        "gap": theme.spacing(2),
        "border": "none",
        [theme.breakpoints.down("md")]: {
            "gridTemplateColumns": "1fr"
        }
    },
    "bannerImage": {
        "display": "block",
        "width": "100%",
        "height": "auto",
        "maxHeight": "65vh",
        "objectFit": "cover"
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
    "sectionParagraph": {
        "marginBottom": theme.spacing(8)
    },
    "inlineLink": {
        "color": theme.palette.gold1.main,
        "textDecoration": "underline",
        "cursor": "pointer"
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
    "faq": {
        "width": "100%",
        "maxWidth": 760,
        "display": "flex",
        "flexDirection": "column"
    },
    "question": {
        "marginBottom": theme.spacing(4)
    },
    "cta": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "textAlign": "center",
        "maxWidth": 720,
        "marginBottom": theme.spacing(16)
    }
}));


export const { i18n } = declareComponentKeys<
    | "heroTitle"
    | "heroParagraph"
    | "heroCta"
    | "heroAlt"
    | "introParagraph"
    | "introAlt"
    | "venuesTitle"
    | "venuesParagraph"
    | "venuesAlt"
    | "formationsTitle"
    | "formationsParagraph"
    | "formationsAlt"
    | "beyondTitle"
    | "beyondParagraphLead"
    | "beyondLinkLabel"
    | "beyondParagraphRest"
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
>()({ Bordeaux });

export type I18n = typeof i18n;
