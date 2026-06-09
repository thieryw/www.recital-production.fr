import { memo, useState, type ReactNode, useEffect, useRef } from "react";
import { tss } from "tss";
import { type Link } from "tools/link";
import Typo from "@mui/material/Typography";
import { SquareButton } from "./SquareButton";
import { useLang } from "i18n";
import { useRoute } from "router";
import { pushToAlternateLang } from "seo/localized";
import { useConstCallback } from "powerhooks/useConstCallback";
import { ReactSVG } from "react-svg";
import { getScrollableParent } from "powerhooks/getScrollableParent";
import backgroundSvg from "assets/svg/marble-mobile.svg"


export type HeaderProps = {
    className?: string;
    links: Link[];
    isDark?: boolean;
    mobile?: {
        logoOpen?: ReactNode;
        logoClosed?: ReactNode;
        socialLinks?: {
            iconUrl: string;
            href: string;
        }[];
        bottomDiv?: ReactNode;
    };
    activeLinkLabel?: string;
}


export const Header = memo((props: HeaderProps) => {
    const { links, mobile, className, isDark, activeLinkLabel } = props;
    const { lang } = useLang();
    const route = useRoute();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const ref = useRef(null);
    const { cx, classes } = useStyles({
        isMobileMenuOpen

    });

    // Switch language by navigating to the same page's other-language URL.
    // i18nifty's language then follows the route (see Body.tsx).
    const toggleLang = useConstCallback(() => {
        pushToAlternateLang(route.name);
    });

    const toggleMobileMenu = useConstCallback(() => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    })

    const handleClick = useConstCallback(()=>{
        setIsMobileMenuOpen(false);
    });

    useEffect(() => {
        if(ref.current === null){
            return;
        }

        const { style } = getScrollableParent({
            "doReturnElementIfScrollable": true,
            "element": ref.current
        })

        if(!isMobileMenuOpen){
            style.height = "unset";
            style.overflowY = "unset";
            return;
        }
        style.height = "100vh";
        style.overflowY = "hidden"

    }, [isMobileMenuOpen])

    useEffect(() => {
        if (!isMobileMenuOpen) {
            return;
        }

        function handleEscape(e: KeyboardEvent) {
            if (e.code !== "Escape") {
                return;
            }

            setIsMobileMenuOpen(false);
        }

        window.addEventListener("keydown", handleEscape);

        return () => window.removeEventListener("keydown", handleEscape);

    }, [isMobileMenuOpen])

    return (
        <header ref={ref} className={cx(classes.root, className)}>
            {
                mobile !== undefined &&
                        <div className={classes.mobileWrapper}>
                            <div className={classes.mobileTop}>
                                <div className={classes.mobileLogoWrapper}>
                                    {
                                        !isMobileMenuOpen &&
                                        mobile.logoClosed
                                    }

                                </div>
                                <ToggleMenuButton isDark={isDark ?? false} isActive={isMobileMenuOpen} onClick={toggleMobileMenu} />

                            </div>
                            <div className={classes.contentWrapper}>
                                <div className={classes.content}>
                                    {
                                        isMobileMenuOpen &&
                                        mobile.logoOpen
                                    }
                                    <img src={backgroundSvg} alt="Header background svg" className={classes.backgroundSvg} />
                                    <SquareButton
                                        variant={isDark ? "gold" : "gold"}
                                        label={lang === "fr" ? "FR" : "EN"}
                                        onClick={toggleLang}
                                        className={classes.mobileLanguageButton}
                                    />

                                    <div className={classes.mobileLinks}>
                                        {
                                            links.map(({ label, href, onClick }) => <div onClick={handleClick} key={label}><RouteLink
                                                variant="mobile"
                                                isActive={label === activeLinkLabel}
                                                isDark={isDark ?? false}
                                                href={href}
                                                onClick={onClick}
                                                label={label}
                                                className={classes.link}

                                            /></div>)
                                        }

                                    </div>
                                    <div className={classes.social}>
                                        {
                                            mobile.socialLinks !== undefined &&
                                            mobile.socialLinks.map(({ href, iconUrl }) => <a target="_blank" key={iconUrl} href={href}>
                                                <ReactSVG className={classes.socialIcon} src={iconUrl} />
                                            </a>)
                                        }

                                    </div>
                                    {
                                        mobile.bottomDiv !== undefined &&
                                        mobile.bottomDiv
                                    }

                                    <div className={classes.bottomBorder}></div>

                                </div>
                            </div>

                        </div>
            }

        </header>
    )
})

const useStyles = tss
    .withParams<{ isMobileMenuOpen: boolean; }>()
    .withName("Header")
    .create(({ theme, isMobileMenuOpen }) => {
        return ({
            "root": {
                "width": "100vw",
                "display": "flex",
                "justifyContent": "center",
                "paddingTop": 0,
                "position": "absolute",
                "zIndex": 2


            },
            "link": {
                "marginTop": theme.spacing(1),
                "marginBottom": theme.spacing(1),
                "marginRight": 0,
                "marginLeft": 0
            },
            "mobileWrapper": {
                "width": "100%",
                "position": "relative",
            },
            "mobileTop": {
                "position": "absolute",
                "top": 0,
                "left": 0,
                "width": "100%",
                "display": "flex",
                "justifyContent": "space-between",
                "alignItems": "center",
                "paddingLeft": theme.spacing(6),
                "paddingRight": theme.spacing(6),
                "paddingTop": theme.spacing(3),
                "boxSizing": "border-box",
                "height": 106
            },
            "mobileLogoWrapper": {
                "position": "relative",
                "zIndex": isMobileMenuOpen ? 4001 : 0

            },
            "contentWrapper": {
                "height": isMobileMenuOpen ? "100vh" : 0,
                "maxHeight": "100vh",
                "width": "100%",
                "pointerEvents": isMobileMenuOpen ? undefined : "none",
                "position": "absolute",
                "top": 0,
                "left": 0,
                "overflow": "auto",
                "transition": "height 500ms",
                "zIndex": 4

            },
            "content": {
                "position": "relative",
                "width": "100%",
                "background": theme.palette.cardDark.main,
                "minHeight": "100%",
                //"paddingTop": 120,
                "boxSizing": "border-box",
                "paddingLeft": theme.spacing(8),
                "paddingRight": theme.spacing(8),
                "zIndex": 1,
                "paddingBottom": theme.spacing(8),
                "overflow": "hidden",
                "paddingTop": theme.spacing(3)

            },
            "backgroundSvg": {
                "position": "absolute",
                "top": 0,
                "left": 0,
                "width": "100%"

            },
            "mobileLanguageButton": {
                "position": "relative",
                "marginBottom": theme.spacing(6),
                "marginTop": theme.spacing(2)


            },
            "bottomBorder": {
                "position": "absolute",
                "bottom": 0,
                "left": 0,
                "width": "100%",
                "height": 8,
                "background": theme.palette.goldGradient.main
            },
            "mobileLinks": {
                "display": "flex",
                "flexDirection": "column",
                "alignItems": "flex-start"
            },
            "social": {
                "display": "flex",
                "marginTop": theme.spacing(10),
                "marginBottom": theme.spacing(10),
                "position": "relative"
            },
            "socialIcon": {
                "marginLeft": theme.spacing(2),
                "marginRight": theme.spacing(2)
            }
        })
    })

export const { RouteLink } = (() => {
    const RouteLink = memo((props: Omit<Link, "target"> &
    {
        isActive: boolean;
        isDark: boolean;
        className?: string;
        variant: "desktop" | "mobile";
        typo?: "h2" | "h4"

    }) => {
        const { href, label, onClick, isActive, className, isDark, variant, typo } = props;

        const { classes, cx } = useStyles({
            isActive,
            isDark,
            variant
        });
        return (
            <div className={cx(classes.root, className)}>
                <a className={classes.link} onClick={onClick} href={href}><Typo className={classes.linkText} variant={variant === "desktop" ? "button" : typo ?? "h2"}>{label}</Typo></a>
                {
                    variant === "desktop" &&
                    <div className={classes.underline}>

                    </div>
                }

            </div>
        )
    })

    const useStyles = tss
        .withName("Link")
        .withNestedSelectors<"underline">()
        .withParams<{ isActive: boolean; isDark: boolean; variant: "desktop" | "mobile" }>()
        .create(({ theme, classes, isActive, isDark, variant }) => {
            return ({
                "root": {
                    "position": "relative",
                    [`&:hover .${classes.underline}`]: {
                        "width": "100%"
                    }
                },
                "underline": {
                    "position": "absolute",
                    "width": isActive ? "100%" : 0,
                    "height": 2,
                    "bottom": -10,
                    "backgroundColor": !isDark ? theme.palette.gold1.main : theme.palette.gold2.main,
                    "transition": "width 500ms"
                },
                "link": {
                    "textDecoration": "none"
                },
                "linkText": {
                    //"color": isActive ? theme.palette.gold1.main : isDark || variant === "mobile" ? "white" : undefined,
                    "color": (() => {
                        if (isActive) {
                            switch (variant) {
                                case "desktop": return isDark ? theme.palette.gold2.main : theme.palette.gold1.main
                                case "mobile": return theme.palette.gold2.main
                            }
                        }

                        if (variant !== "mobile") {
                            return isDark ? theme.palette.white.main : undefined;
                        }
                        return "white"
                    })(),
                    "transition": "color 500ms",
                    ":hover": {
                        "color": variant === "mobile" ? undefined : !isDark ? theme.palette.gold1.main : theme.palette.gold2.main

                    }
                }

            })
        })

    return { RouteLink }
})()




const { ToggleMenuButton } = (() => {

    type ToggleMenuButtonProps = {
        onClick: () => void;
        isActive: boolean;
        className?: string;
        isDark: boolean;
    };

    const ToggleMenuButton = memo((props: ToggleMenuButtonProps) => {

        const { onClick, className, isActive, isDark } = props;
        const handleClick = useConstCallback(() => {
            onClick();
        })
        const { classes, cx } = useStyles({ isActive, isDark })
        //const ref = useRef<HTMLButtonElement>(null);

        /*useEffect(() => {
            if (ref.current === null) {
                return;
            }
            const scrollableParent = getScrollableParent({
                "doReturnElementIfScrollable": true,
                "element": ref.current
            })
            function preventScroll() {
                scrollableParent.scrollTo({
                    "top": 0,
                    "behavior": "instant"
                })
            }
            (() => {
                if (!isActive) {
                    return;
                }
                scrollableParent.addEventListener("scroll", preventScroll);
            })()

            return () => scrollableParent.removeEventListener("scroll", preventScroll);


        }, [ref.current, isActive])*/

        return <button
            aria-haspopup="true"
            aria-expanded={isActive}
            aria-label="drop down menu button"
            onClick={handleClick}
            className={cx(classes.root, className)}
        >
            <div className={cx(classes.line, classes.line1)}></div>
            <div className={cx(classes.line, classes.line2)}></div>
            <div className={cx(classes.line, classes.line3)}></div>
        </button>

    });

    const useStyles = tss.withParams<{ isActive: boolean; isDark: boolean; }>().create(({ isActive, theme, isDark }) => ({
        "root": {
            "width": 40,
            "height": 30,
            "display": "flex",
            "flexDirection": "column",
            "justifyContent": "space-around",
            "cursor": "pointer",
            "position": "relative",
            "zIndex": 4001,
            "border": "none",
            "backgroundColor": "transparent",
            "outline": "none"
        },
        "line": {
            "display": "block",
            "height": 0,
            "borderTop": `solid ${!isActive ? (isDark ? theme.palette.gold1.main : theme.palette.gold2.main) : theme.palette.gold2.main} 2px`,
            "width": "100%",
            "transition": "all 0.3s ease"
        },
        "line1": {
            "transform": isActive ? "translateY(9px) rotate(45deg)" : undefined,
        },
        "line2": {
            "opacity": isActive ? 0 : undefined
        },
        "line3": {
            "transform": isActive ? "translateY(-9px) rotate(-45deg)" : undefined

        },

    }))

    return { ToggleMenuButton }
})();