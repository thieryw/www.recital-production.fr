import { memo, type ReactNode } from "react";
import { tss } from "tss";
import type { Link } from "tools/link";
import { ReactSVG } from "react-svg";
import { RouteLink } from "./Header";
import { LangToggle } from "./LangToggle";
import Typo from "@mui/material/Typography";
import backgroundSvg from "assets/svg/marble-long-2.svg";
import backgroundSmallSvg from "assets/svg/marble-mobile.svg";

export type FooterProps = {
    className?: string;
    links: (Link & { isSpecial?: boolean })[];
    logo: string;
    socialLinks: {
        iconUrl: string;
        href: string;

    }[];
    bottomDiv?: ReactNode;
    activeLinkLabel?: string;
    langSwitchLabel: string;
    brandLine?: ReactNode;

};

export const Footer = memo((props: FooterProps) => {
    const { links, logo, socialLinks, bottomDiv, className, activeLinkLabel, langSwitchLabel, brandLine } = props;
    const { classes, cx, windowInnerWidth, theme } = useStyles();
    return (
        <footer className={cx(classes.root, className)}>
            <img className={classes.backgroundSvg} src={windowInnerWidth < theme.breakpoints.values.sm ? backgroundSmallSvg : backgroundSvg} alt="Footer background svg" />
            {
                windowInnerWidth >= theme.breakpoints.values.sm &&
                <div className={classes.desktopSocial}>
                    {
                        socialLinks.map(({ href, iconUrl }) => <div key={iconUrl} className={classes.socialLinkWrapper}><a className={classes.socialLink} href={href} target="_blank">
                            <ReactSVG
                                src={iconUrl}
                                className={classes.socialIcon}
                            />

                        </a></div>)
                    }

                </div>
            }


            <ReactSVG className={classes.siteLogo} src={logo} />
            <div className={classes.content}>
                {
                    brandLine !== undefined &&
                    <Typo className={classes.brandLine} variant="body2">{brandLine}</Typo>
                }
                <div className={classes.links}>
                    {

                        links.map(({ label, href, onClick, isSpecial }, index) => <div className={classes.linkWrapper} key={label}>
                            <RouteLink
                                variant="mobile"
                                isActive={label === activeLinkLabel}
                                isDark={true}
                                href={href}
                                onClick={onClick}
                                label={label}
                                isSpecial={isSpecial}
                                className={classes.link}
                                typo="h4"

                            />
                            {
                                index !== links.length - 1 &&
                                <Typo className={classes.linkDivider} variant="h4">/</Typo>
                            }
                        </div>)
                    }

                </div>
                <LangToggle
                    className={classes.langToggle}
                    isDark={true}
                    ariaLabel={langSwitchLabel}
                />
                {
                    windowInnerWidth < theme.breakpoints.values.sm &&
                    <div className={classes.mobileSocial}>
                        {
                            socialLinks.map(({ href, iconUrl }) => <div key={iconUrl} className={classes.socialLinkWrapper}> <a className={classes.socialLink} href={href} target="_blank">
                                <ReactSVG
                                    src={iconUrl}
                                    className={classes.mobileSocialIcon}
                                />

                            </a></div>)
                        }

                    </div>
                }
                {
                    bottomDiv !== undefined &&
                    <div className={classes.bottomDiv}>
                        {
                            bottomDiv
                        }

                    </div>
                }


            </div>


            <div className={classes.bottomBorder}></div>

        </footer>
    )
})

const useStyles = tss.withName("Footer").create(({ theme }) => {
    return ({
        "root": {
            "background": theme.palette.footerDark.main,
            "position": "relative",
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            "width": "100%",
            "boxSizing": "border-box",
            ...(() => {
                const topBottom = theme.spacing(10);
                const leftRight = theme.spacing(4);
                return {
                    "paddingTop": topBottom,
                    "paddingBottom": topBottom,
                    "paddingLeft": leftRight,
                    "paddingRight": leftRight
                }
            })(),
            [theme.breakpoints.down("sm")]: {
                "flexDirection": "column",
                "paddingTop": 0,
                "paddingBottom": theme.spacing(15)
            }
        },
        "backgroundSvg": {
            "position": "absolute",
            "top": 0,
            "left": 0,
            "width": "100%"

        },
        "desktopSocial": {
            "marginRight": theme.spacing(16),
            [theme.breakpoints.down("md")]: {
                "marginRight": theme.spacing(6)
            }
        },
        "socialLinkWrapper": {
            "position": "relative",
            "marginTop": theme.spacing(1),
            "marginBottom": theme.spacing(1),

        },
        "socialLink": {
            "position": "relative",

        },
        "socialIcon": {
            "& svg": {
                "width": 50,
                "height": 50
            }
        },
        "siteLogo": {
            "paddingLeft": 40,
            "paddingTop": 30,
            "paddingBottom": 30,
            "paddingRight": 18,
            "border": `solid ${theme.palette.gold2.main} 1px`,
            "backgroundColor": "black",
            "& svg": {
                "width": 121,
                "height": 121
            },
            "marginRight": theme.spacing(18),
            [theme.breakpoints.down("md")]: {
                "marginRight": theme.spacing(8)
            },
            [theme.breakpoints.down("sm")]: {
                "marginRight": 0,
                "position": "relative",
                "bottom": 28
            }
        },
        "content": {
            "minWidth": 0,
            "maxWidth": "100%",
            [theme.breakpoints.down("sm")]: {
                "display": "flex",
                "flexDirection": "column",
                "justifyContent": "center",
                "alignItems": "center"
            }
        },
        "links": {
            "display": "flex",
            [theme.breakpoints.up("mdPlus")]: {
                "flexWrap": "wrap",
                "justifyContent": "center",
                "alignItems": "center",
                "rowGap": theme.spacing(2)
            },
            [theme.breakpoints.down("mdPlus")]: {
                "flexDirection": "column"
            },
            [theme.breakpoints.down("sm")]: {
                "flexDirection": "column",
                "marginTop": theme.spacing(5),
                "alignItems": "center",
                "marginBottom": theme.spacing(10)
            }
        },
        "linkWrapper": {
            "display": "flex",
            [theme.breakpoints.down("mdPlus")]: {
                "marginTop": theme.spacing(1),
                "marginBottom": theme.spacing(1),
            },
            [theme.breakpoints.down("sm")]: {
                "marginTop": theme.spacing(2),
                "marginBottom": theme.spacing(2),
            }
        },
        "linkDivider": {
            "marginLeft": theme.spacing(3),
            "marginRight": theme.spacing(3),
            [theme.breakpoints.down("mdPlus")]: {
                "display": "none"
            }

        },
        "link": {},
        "brandLine": {
            "color": theme.palette.white.main,
            "opacity": 0.7,
            "maxWidth": "100%",
            "marginBottom": theme.spacing(4),
            [theme.breakpoints.down("sm")]: {
                "textAlign": "center"
            }
        },
        "langToggle": {
            "marginTop": theme.spacing(5),
            [theme.breakpoints.down("sm")]: {
                "justifyContent": "center"
            }
        },
        "mobileSocial": {
            "display": "flex",
            "marginBottom": theme.spacing(10)
        },
        "mobileSocialIcon": {
            "marginLeft": theme.spacing(1),
            "marginRight": theme.spacing(1)
        },
        "bottomDiv": {
            "marginTop": theme.spacing(5)

        },
        "bottomBorder": {
            "position": "absolute",
            "bottom": 0,
            "left": 0,
            "width": "100%",
            "height": 8,
            "background": theme.palette.goldGradient.main
        },
    })
})