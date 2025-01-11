use std::collections::{HashMap, HashSet};

use titan::html::{
    css,
    tags::{link::Link, Div, Header, IntoTag as _, Tag},
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
    .map(|x| Tag::Tag {
        children: Some([x].to_vec()),
        ids: Vec::default(),
        ident: "em",
        classes: HashSet::default(),
        attributes: HashMap::default(),
        urls_to_preconnect: HashSet::default(),
        urls_to_prefetch: HashSet::default(),
    });

    Header::default()
        .styles(header_css)
        .children([
            Div::default()
                .children([Tag::Tag {
                    children: Some(Vec::from_iter([Tag::Text("Vincent Thomas".to_string())])),
                    ids: Vec::default(),
                    ident: "h1",
                    classes: HashSet::default(),
                    attributes: HashMap::default(),
                    urls_to_preconnect: HashSet::default(),
                    urls_to_prefetch: HashSet::default(),
                }])
                .into_tag(),
            Div::default()
                .children(links)
                .styles(header_subcontainer_css)
                .into_tag(),
        ])
        .into_tag()
}
