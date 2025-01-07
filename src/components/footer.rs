use titan::html::{
    css,
    tags::{
        link::{Link, LinkLoadType},
        Div, Header, IntoTag, Tag,
    },
};

pub fn footer_nav_link(link: &str, text: &'static str) -> Tag {
    Link::text(link, text)
        .preload(LinkLoadType::WhenIdle)
        .styles(css!(
            "
            text-decoration: none;

            color: black;

            font-weight: 500;
        "
        ))
        .into_tag()
}

pub fn footer() -> Tag {
    Div::from([Div::from([Div::from([
        footer_nav_link("/blog", "Blog"),
        footer_nav_link("/dashboard", "Dashboard"),
    ])
    .styles(css!(
        "
              display: flex;
              gap: 0.25rem;
            "
    ))
    .into_tag()])
    .styles(inner_footer_css())
    .into_tag()])
    .styles(outer_footer_css())
    .into_tag()
}

pub fn inner_footer_css() -> &'static str {
    css!(
        "
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.75rem;

    width: min(100%, 800px);
    margin-inline: auto;
        "
    )
}

pub fn outer_footer_css() -> &'static str {
    css!(
        "
        background-color: lightgray;
        "
    )
}
