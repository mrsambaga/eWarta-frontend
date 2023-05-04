export type News = {
    postId: number,
    title: string,
    summaryDesc: string,
    imgUrl: string,
    author: string,
    slug:   string,
    categoryId: string,
    typeId: string,
    createdAt:  string,
    updatedAt:  string,
    deletedAt:  string,
}

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

export type NewsDetailResponse = {
    title: string
    summary_desc: string
    img_url: string
    author: string
    content: string
}

export type NewsDetail = {
    title: string
    summaryDesc: string
    imgUrl: string
    author: string
    content: string
}