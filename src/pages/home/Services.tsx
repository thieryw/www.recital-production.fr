import { memo } from "react";
import { tss } from "tss";
import { AnimatedBanner } from "components/AnimatedBanner";
import { SmallTitle } from "components/SmallTitle";
import { LinkButton } from "components/LinkButton";
import { ReactSVG } from "react-svg";
import Typo from "@mui/material/Typography";
import backgroundPng from "assets/png/home/trans-violine.png";
import sponsorSvg1 from "assets/svg/home/Sponsors/logo-academie-bordeaux.svg";
import sponsorSvg2 from "assets/svg/home/Sponsors/logo-candlelight.svg";
import sponsorSvg3 from "assets/svg/home/Sponsors/logo-espace-beaulieu.svg";
import sponsorSvg4 from "assets/svg/home/Sponsors/logo-fever.svg";
import sponsorSvg5 from "assets/svg/home/Sponsors/logo-maison-mariage.svg";
import sponsorSvg6 from "assets/svg/home/Sponsors/logo-martignas.svg";
import sponsorSvg7 from "assets/svg/home/Sponsors/logo-mc2.svg";
import sponsorSvg8 from "assets/svg/home/Sponsors/logo-mce.svg";
import { useTranslation } from "i18n";
import { routes } from "router";



export const Services = memo(() => {
    const { t } = useTranslation("Home");
    const { classes } = useStyles();

    return <section className={classes.root}>
        <img className={classes.backgroundPng} src={backgroundPng} alt="services background" />

        <div className={classes.contentWrapper}>
            <SmallTitle className={classes.surtitle} description={t("servicesSurtitle")} />
            <Typo className={classes.title} variant="h2">{t("servicesTitle")}</Typo>
            <Typo className={classes.paragraph}>{t("servicesParagraph")}</Typo>
            <LinkButton
                {
                ...routes.services().link
                }
                label={t("servicesButtonLabel")}
            />
        </div>
        <AnimatedBanner
            className={classes.animatedBanner}
            slides={[
                <ReactSVG src={sponsorSvg1} />,
                <ReactSVG src={sponsorSvg2} />,
                <ReactSVG src={sponsorSvg3} />,
                <ReactSVG src={sponsorSvg4} />,
                <ReactSVG src={sponsorSvg5} />,
                <ReactSVG src={sponsorSvg6} />,
                <ReactSVG src={sponsorSvg7} />,
                <ReactSVG src={sponsorSvg8} />
            ]}
        />

    </section>

});

const useStyles = tss.create(({ theme }) => {
    return ({
        "root": {
            "paddingBottom": theme.spacing(15),
            "paddingTop": theme.spacing(15),
            "position": "relative",

        },
        "contentWrapper": {
            "display": "grid",
            "gridTemplateColumns": "1fr",
            "gap": theme.spacing(4),
            "maxWidth": 360,
            [theme.breakpoints.up("sm")]: {
                "paddingLeft": theme.spacing(30)

            },
            "marginBottom": theme.spacing(15),
            [theme.breakpoints.down("sm")]: {
                ...(() => {
                    const value = theme.spacing(5);
                    return {
                        "paddingLeft": value,
                        "paddingRight": value
                    }
                })()
            }
        },
        "surtitle": {},
        "title": {
            "textTransform": "uppercase"
        },
        "paragraph": {},
        "animatedBanner": {},
        "backgroundPng": {
            "width": "100%",
            "position": "absolute",
            "bottom": 0,
            "left": 0

        }
    })

})