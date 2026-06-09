import { declareComponentKeys, useTranslation } from "i18n";
import { memo } from "react";
import Typo from "@mui/material/Typography";
import { tss } from "tss";
import { useRoute } from "router";
import { langOf, linkTo } from "seo/localized";
import { LinkButton } from "components/LinkButton";
import { Reveal } from "components/Reveal";
import { FAQ } from "components/FAQ";
import { ElfSight } from "components/ElfSight";
import { ReviewWidget } from "components/ReviewWidget";

import heroJpg from "assets/jpg/services/img-1.jpg";
import heroWebp from "assets/webp/services/img-1.webp";
import areaJpg from "assets/jpg/media/gallery/photos/9.jpeg";
import areaWebp from "assets/webp/media/gallery/photos/9.webp";
import why1Jpg from "assets/jpg/services/particuliers.jpg";
import why1Webp from "assets/webp/services/particuliers.webp";
import why2Jpg from "assets/jpg/services/quatuor-video.jpg";
import why2Webp from "assets/webp/services/quatuor-video.webp";
import why3Jpg from "assets/jpg/media/gallery/photos/2.jpeg";
import why3Webp from "assets/webp/media/gallery/photos/2.webp";
import format1Jpg from "assets/jpg/media/gallery/photos/1.jpeg";
import format1Webp from "assets/webp/media/gallery/photos/1.webp";
import format2Jpg from "assets/jpg/media/gallery/photos/4.jpeg";
import format2Webp from "assets/webp/media/gallery/photos/4.webp";
import format3Jpg from "assets/jpg/media/gallery/photos/6.jpeg";
import format3Webp from "assets/webp/media/gallery/photos/6.webp";


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


export const MusiqueMariage = memo(() => {
    const { t } = useTranslation("MusiqueMariage");
    const { classes, cx } = useStyles();
    const route = useRoute();
    const lang = langOf(route.name);
    const contactLink = linkTo("contact", lang);

    const why = [
        { "title": t("why1Title"), "text": t("why1Text"), "jpg": why1Jpg, "webp": why1Webp, "alt": t("why1Alt") },
        { "title": t("why2Title"), "text": t("why2Text"), "jpg": why2Jpg, "webp": why2Webp, "alt": t("why2Alt") },
        { "title": t("why3Title"), "text": t("why3Text"), "jpg": why3Jpg, "webp": why3Webp, "alt": t("why3Alt") }
    ];

    const formats = [
        { "title": t("format1Title"), "text": t("format1Text"), "jpg": format1Jpg, "webp": format1Webp, "alt": t("format1Alt") },
        { "title": t("format2Title"), "text": t("format2Text"), "jpg": format2Jpg, "webp": format2Webp, "alt": t("format2Alt") },
        { "title": t("format3Title"), "text": t("format3Text"), "jpg": format3Jpg, "webp": format3Webp, "alt": t("format3Alt") }
    ];

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
                    <Typo className={classes.blockTitle} variant="h2">{t("whyTitle")}</Typo>
                </Reveal>
                <div className={classes.cards}>
                    {why.map(({ title, text, jpg, webp, alt }, index) => (
                        <Reveal className={classes.cardReveal} delay={index * 0.12} key={title}>
                            <div className={classes.card}>
                                <Img picture={{ jpg, webp, alt }} className={classes.cardImage} />
                                <Typo className={classes.cardTitle} variant="h3">{title}</Typo>
                                <Typo variant="body1">{text}</Typo>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className={classes.block}>
                <Reveal className={classes.revealWrap}>
                    <Typo className={classes.blockTitle} variant="h2">{t("formatsTitle")}</Typo>
                </Reveal>
                <div className={classes.cards}>
                    {formats.map(({ title, text, jpg, webp, alt }, index) => (
                        <Reveal className={classes.cardReveal} delay={index * 0.12} key={title}>
                            <div className={classes.card}>
                                <Img picture={{ jpg, webp, alt }} className={classes.cardImage} />
                                <Typo className={classes.cardTitle} variant="h3">{title}</Typo>
                                <Typo variant="body1">{text}</Typo>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className={classes.block}>
                <Reveal className={classes.revealWrap}>
                    <Typo className={classes.blockTitle} variant="h2">{t("areaTitle")}</Typo>
                </Reveal>
                <Reveal className={classes.revealWrap}>
                    <Typo className={cx(classes.introParagraph, classes.sectionParagraph)} variant="body1">{t("areaParagraph")}</Typo>
                </Reveal>
                <Reveal className={classes.revealWrap} delay={0.15}>
                    <div className={cx(classes.banner, classes.areaBanner)}>
                        <Img picture={{ "jpg": areaJpg, "webp": areaWebp, "alt": t("areaAlt") }} className={classes.bannerImage} />
                    </div>
                </Reveal>
            </section>

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
                                isOpen={index === 1}
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

            <div className={classes.reviews}>
                <ElfSight />
                <ReviewWidget />
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
    "revealWrap": {
        "width": "100%",
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center"
    },
    "cardReveal": {
        "width": "100%",
        "height": "100%"
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
    "areaBanner": {
        "marginBottom": 0
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
    "cardImage": {
        "display": "block",
        "width": "100%",
        "aspectRatio": "4 / 3",
        "objectFit": "cover",
        "marginBottom": theme.spacing(4)
    },
    "cardTitle": {
        "marginBottom": theme.spacing(3)
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
    },
    "reviews": {
        "width": "100%",
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center"
    }
}));


export const { i18n } = declareComponentKeys<
    | "heroTitle"
    | "heroParagraph"
    | "heroCta"
    | "heroAlt"
    | "introParagraph"
    | "whyTitle"
    | "why1Title"
    | "why1Text"
    | "why1Alt"
    | "why2Title"
    | "why2Text"
    | "why2Alt"
    | "why3Title"
    | "why3Text"
    | "why3Alt"
    | "formatsTitle"
    | "format1Title"
    | "format1Text"
    | "format1Alt"
    | "format2Title"
    | "format2Text"
    | "format2Alt"
    | "format3Title"
    | "format3Text"
    | "format3Alt"
    | "areaTitle"
    | "areaParagraph"
    | "areaAlt"
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
