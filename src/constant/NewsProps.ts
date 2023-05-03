
export type NewsHighlightResponse = {
    post_id: number
    title: string
    summary_desc: string
    img_url : string
    author : string
}

export type NewsHighlight = {
    id: number
    title: string
    desc: string
    img : string
    alt? : string
    author: string
}