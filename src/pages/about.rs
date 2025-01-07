use titan::html::{
    css,
    tags::{
        link::{Link, LinkLoadType},
        Div, IntoTag, Span, Tag, P,
    },
};

pub fn about_page() -> Tag {
    Div::from([
        P::from([Span::text("about!").styles(css!("color: blue;")).into_tag()])
            .styles(css!("display: flex; gap: 0.3rem;"))
            .into_tag(),
    ])
    .into_tag()
}
