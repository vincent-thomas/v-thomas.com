use titan::html::{
  css, global_css,
  tags::{head::Head, Body, IntoTag},
};

pub mod index;

pub fn default_head(subtitle: &'static str) -> Head {
  Head::default()
        .title(&format!("Vincent Thomas | {}", subtitle))
        .description("Vincent's personal website.").global_style(global_css!("
            @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

            *, *::before, *::after {
                font-family: 'Roboto';
                margin: 0;
                padding: 0;
            }

            .nav-link:hover {
                text-decoration: underline;
            }
    ")).reset_css()
}

pub fn default_body<T>(children: T) -> Body
where
  T: IntoIterator<Item = Tag>,
{
  let root_css = css!(
    "
  max-width: 700px;
  margin-inline: auto;
  padding-block: 2rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
    "
  );
  Body::default().children(app([Main::default()
    .styles(root_css)
    .children(children)
    .into_tag()]))
}

use titan::html::tags::{Div, Main, Tag};

use crate::components::scripts::scripts;
pub fn app<T>(children: T) -> Vec<Tag>
where
  T: IntoIterator<Item = Tag>,
{
  let mut vec = vec![];

  vec.push(Div::default().id("app").children(children).into_tag());
  vec.extend(scripts());

  vec
}
