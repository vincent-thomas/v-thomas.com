use titan::html::{
    css,
    tags::{
        link::{Link, LinkLoadType},
        Div, IntoTag, Span, Tag, P,
    },
};

pub fn index_page() -> Tag {
    Div::from([P::from([
        Span::text("Hello!").styles(css!("color: blue;")).into_tag(),
        "This html and very".into_tag(),
        Span::text("nice css")
            .styles(css!("text-decoration: underline"))
            .into_tag(),
        "is made with the rust library".into_tag(),
        Link::text("https://github.com/vincent-thomas/route-rs", "titan")
            .preload(LinkLoadType::WhenIdle)
            .into_tag(),
    ])
    .styles(css!("display: flex; gap: 0.3rem;"))
    .into_tag()])
    .into_tag()
}
