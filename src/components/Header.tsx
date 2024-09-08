import { memo, useState, type ReactNode } from "react";
import { tss } from "tss";
import { type Link } from "tools/link";
import Typo from "@mui/material/Typography";
import { SquareButton } from "./SquareButton";
import { useLang } from "i18n";
import { useConstCallback } from "powerhooks/useConstCallback";


export type HeaderProps = {
    className?: string;
    logo: ReactNode;
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
    const { links, logo, mobile, className, isDark, activeLinkLabel } = props;
    const {lang, setLang} = useLang();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { windowInnerWidth, theme, cx, classes } = useStyles({
        isMobileMenuOpen

    });

    const toggleLang = useConstCallback(()=>{
        if(lang === "en"){
            setLang("fr");
            return;
        }
        setLang("en");

    });

    const toggleMobileMenu = useConstCallback(()=>{
        setIsMobileMenuOpen(!isMobileMenuOpen)
    })

    return (
        <header className={cx(classes.root, className)}>
            {
                (() => {
                    if (windowInnerWidth >= theme.breakpoints.values.sm) {
                        return <div className={classes.desktopWrapper}>
                            {logo}
                            <div className={classes.linkWrapper}>
                                {
                                    links.map(({ label, href, onClick }) => <Link
                                        key={label}
                                        isActive={label === activeLinkLabel}
                                        isDark={isDark ?? false}
                                        href={href}
                                        onClick={onClick}
                                        label={label}
                                        className={classes.link}

                                    />)
                                }

                            </div>
                            <SquareButton
                                variant={isDark ? "gold" : "darkGold"}
                                label={ lang === "fr" ? "FR" : "EN" }
                                onClick={toggleLang}
                            />

                        </div>
                    }

                    return (
                        mobile !== undefined &&
                        <div className={classes.mobileWrapper}>
                            <div className={classes.mobileTop}>
                                {
                                    (()=>{
                                        if(isMobileMenuOpen){
                                            return mobile.logoOpen;
                                        }
                                        return mobile.logoClosed;
                                    })()
                                }
                                <ToggleMenuButton isDark={isDark ?? false} isActive={isMobileMenuOpen} onClick={toggleMobileMenu} />

                            </div>
                            <div className={classes.contentWrapper}>
                                <div className={classes.content}>

                                </div>
                            </div>

                        </div>)
                })()
            }

        </header>
    )
})

const useStyles = tss.withParams<{isMobileMenuOpen: boolean;}>().withName("Header").create(({ theme, isMobileMenuOpen }) => {
    return ({
        "root": {
            "width": "100vw",
            "display": "flex",
            "justifyContent": "center",
            "paddingTop": theme.spacing(5),
            [theme.breakpoints.down("sm")]: {
                "paddingTop": 0
            }

        },
        "desktopWrapper": {
            "maxWidth": theme.breakpoints.values.xl,
            "display": "flex",
            "alignItems": "center"
        },
        "linkWrapper": {
            "display": "flex",
            ...(() => {
                const value = theme.spacing(25);
                const mdValue = theme.spacing(5);
                return {
                    "marginRight": value,
                    "marginLeft": value,
                    [theme.breakpoints.down("md")]: {
                        "marginRight": mdValue,
                        "marginLeft": mdValue,

                    }
                }
            })()
        },
        "link": {
            ...(() => {
                const value = theme.spacing(3);
                return {
                    "marginRight": value,
                    "marginLeft": value
                }
            })()
        },
        "mobileWrapper": {
            "width": "100%",
            "position": "relative"
        },
        "mobileTop": {
            "position": "relative",
            "display": "flex",
            "justifyContent": "space-between",
            "alignItems": "center",
            "paddingLeft": theme.spacing(6),
            "paddingRight": theme.spacing(6),
            "paddingTop": theme.spacing(3),
            "zIndex": 1
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

        },
        "content": {
            "width": "100%",
            "backgroundColor": "black",
            "minHeight": "100%"

        }
    })
})

const { Link } = (() => {
    const Link = memo((props: Omit<Link, "target"> & { isActive: boolean; isDark: boolean; className?: string; }) => {
        const { href, label, onClick, isActive, className, isDark } = props;
        const { classes, cx } = useStyles({
            isActive,
            isDark
        });
        return (
            <div className={cx(classes.root, className)}>
                <a className={classes.link} onClick={onClick} href={href}><Typo className={classes.linkText} variant="button">{label}</Typo></a>
                <div className={classes.underline}>

                </div>

            </div>
        )
    })

    const useStyles = tss
        .withName("Link")
        .withNestedSelectors<"underline">()
        .withParams<{ isActive: boolean; isDark: boolean; }>()
        .create(({ theme, classes, isActive, isDark }) => {
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
                    "color": isActive ? theme.palette.gold1.main : isDark ? "white" : undefined,
                    "transition": "color 500ms",
                    ":hover": {
                        "color": !isDark ? theme.palette.gold1.main : theme.palette.gold2.main

                    }
                }

            })
        })

    return { Link }
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