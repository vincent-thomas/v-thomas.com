use titan::html::{
    css,
    tags::{
        link::{Link, LinkLoadType},
        Div, Header, IntoTag, Tag,
    },
};

pub fn navbar_nav_link(link: &str, text: &'static str) -> Tag {
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

pub fn navbar() -> Tag {
    Header::from([
        Div::text("Vincent Thomas")
            .styles(css!(
                "
                font-weight: 600;
                font-size: 1.8rem;
                    "
            ))
            .into_tag(),
        Div::from([
            navbar_nav_link("/blog", "Blog"),
            navbar_nav_link("/dashboard", "Dashboard"),
        ])
        .styles(css!(
            "
              display: flex;
              gap: 0.25rem;
            "
        ))
        .into_tag(),
    ])
    .styles(navbar_css())
    .into_tag()
}

pub fn navbar_css() -> &'static str {
    css!(
        "
          display: flex;
          justify-content: space-between;
          align-items: center;

          padding: 0.75rem;

          width: min(100%, 800px);
          margin-inline: auto;
        "
    )
}
