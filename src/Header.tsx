import { memo } from "react";
import { declareComponentKeys } from "i18n"


export const Header = memo(() => {
    return <header>

    </header>
})

export const { i18n } = declareComponentKeys<
    "title"
>()({ Header })

export type I18n = typeof i18n