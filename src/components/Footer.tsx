import { memo, type ReactNode } from "react";
import { tss } from "tss";
import type { Link } from "tools/link";
import { ReactSVG } from "react-svg";
import { RouteLink } from "./Header";
import Typo from "@mui/material/Typography";
import backgroundSvg from "assets/svg/marble-long-2.svg";
import backgroundSmallSvg from "assets/svg/marble-mobile.svg";

export type FooterProps = {
    className?: string;
    links: Link[];
    logo: string;
    socialLinks: {
        iconUrl: string;
        href: string;

    }[];
    bottomDiv?: ReactNode;
    activeLinkLabel?: string;

};

export const Footer = memo((props: FooterProps) => {
    const { links, logo, socialLinks, bottomDiv, className, activeLinkLabel } = props;
    const { classes, cx, windowInnerWidth, theme } = useStyles();
    return (
        <footer className={cx(classes.root, className)}>
            <img className={classes.backgroundSvg} src={windowInnerWidth < theme.breakpoints.values.sm ? backgroundSmallSvg : backgroundSvg} alt="Footer background svg" />
            {
                windowInnerWidth >= theme.breakpoints.values.sm &&
                <div className={classes.desktopSocial}>
                    {
                        socialLinks.map(({ href, iconUrl }) => <a href={href} target="_blank" key={iconUrl}>
                            <ReactSVG
                                src={iconUrl}
                                className={classes.socialIcon}
                            />

                        </a>)
                    }

                </div>
            }


            <ReactSVG className={classes.siteLogo} src={logo} />
            <div className={classes.content}>
                <div className={classes.links}>
                    {

                        links.map(({ label, href, onClick }, index) => <div className={classes.linkWrapper} key={label}>
                            {
                                index !== 0 &&
                                <Typo className={classes.linkDivider} variant="h4">/</Typo>
                            }
                            <RouteLink
                                variant="mobile"
                                isActive={label === activeLinkLabel}
                                isDark={true}
                                href={href}
                                onClick={onClick}
                                label={label}
                                className={classes.link}
                                typo="h4"

                            />
                        </div>)
                    }

                </div>
                {
                    windowInnerWidth < theme.breakpoints.values.sm &&
                    <div className={classes.mobileSocial}>
                        {
                            socialLinks.map(({ href, iconUrl }) => <a href={href} target="_blank" key={iconUrl}>
                                <ReactSVG
                                    src={iconUrl}
                                    className={classes.mobileSocialIcon}
                                />

                            </a>)
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
            "marginRight": theme.spacing(16)
        },
        "socialIcon": {
            "marginTop": theme.spacing(1),
            "marginBottom": theme.spacing(1),
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
            [theme.breakpoints.down("sm")]: {
                "marginRight": 0,
                "position": "relative",
                "bottom": 28
            }
        },
        "content": {
            [theme.breakpoints.down("sm")]: {
                "display": "flex",
                "flexDirection": "column",
                "justifyContent": "center",
                "alignItems": "center"
            }
        },
        "links": {
            "display": "flex",
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