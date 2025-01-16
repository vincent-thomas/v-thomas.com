use std::collections::{HashMap, HashSet};

use titan::html::{
  css,
  tags::{link::Link, Div, IntoTag, Tag, H1, P},
};

pub fn projects() -> Tag {
  Div::default()
        .styles(css!("display: flex; flex-direction: column; gap: 1rem;"))
        .children(
            [Link::new("#projects".to_string(), [
               H1::text("# Notable Projects")
                  .class("projects-h1").into_tag()]).id("projects").styles(css!("text-decoration: none; color: black;")).into_tag(),
                Project {
                    title: "Titan",
                    description: "Titan is a web suite of tools that can be applicable to almost everything web.
                                  The library is composable so you can choose exactly what you want to use. (This website is built in Titan)",
                    repo: "vincent-thomas/route-rs",
                }.into_tag(),
                Project {
                    title: "Teddy",
                    description: "Teddy is a multithreaded terminal editor much like neovim.",
                    repo: "vincent-thomas/teddy",
                }.into_tag(),
                Project {
                    title: "Clier",
                    description: "Clier is a cli framework",
                    repo: "vincent-thomas/clier",
                }.into_tag(),
                Project {
                    title: "getstuff.cc",
                    description: "End to End-Encrypted mail service much like Proton Mail",
                    repo: "vincent-thomas/getstuff.cc",
                }.into_tag(),
            ]
            .to_vec(),
        )
        .into_tag()
}

struct Project {
  title: &'static str,
  description: &'static str,
  repo: &'static str,
}

impl IntoTag for Project {
  fn into_tag(self) -> Tag {
    let Project { title, description, repo } = self;
    Div::default()
      .styles(css!(
        "
            border: 1px solid gray;
            border-radius: 0.5rem;

            padding-inline: 1rem;
            padding-block: 0.6rem;

            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            "
      ))
      .children([
        Tag::Tag {
          children: Some([title.into_tag()].to_vec()),
          ids: Vec::default(),
          ident: "h2",
          classes: HashSet::default(),
          attributes: HashMap::default(),
          urls_to_preconnect: HashSet::default(),
          urls_to_prefetch: HashSet::default(),
        },
        P::text(description).into_tag(),
        Link::text(format!("//github.com/{repo}"), "Source Link (Github)")
          .into_tag(),
      ])
      .into_tag()
  }
}
