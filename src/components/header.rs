use titan::html::{
    css,
    tags::{link::Link, Div, Em, Header, IntoTag as _, Tag, H1},
};

pub fn header() -> Tag {
    let header_subcontainer_css = css!(
        "
    display: flex;
    gap: 1rem;
"
    );
    let nav_link_css = css!(
        "
    color: black;
    font-weight: 600;
    text-decoration: none;
    padding-inline: 0.5rem;
    padding-block: 0.25rem;
"
    );
    let header_css = css!(
        "
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
"
    );

    let links = [
        Link::text("/github", "Github"),
        Link::text("/linkedin", "Linkedin"),
        Link::text("/cv", "CV/Resume"),
    ]
    .map(|x| x.class("nav-link").styles(nav_link_css.clone()).into_tag())
    .map(|x| Em::default().children([x]).into_tag());

    Header::default()
        .styles(header_css)
        .children([
            Div::default()
                .children([H1::text("Vincent Thomas").into_tag()])
                .into_tag(),
            Div::default()
                .children(links)
                .styles(header_subcontainer_css)
                .into_tag(),
        ])
        .into_tag()
}
