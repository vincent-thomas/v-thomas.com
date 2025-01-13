mod projects;

use chrono::NaiveDate;
use titan::{
  html::{
    css, global_css,
    tags::{html::Html, link::Link, Div, IntoTag, Strong, Tag, H1, P},
  },
  Respondable,
};

use super::{default_body, default_head};
use crate::components::header;

fn whoami() -> Tag {
  let age = utils::calculate_age(NaiveDate::from_ymd_opt(2006, 7, 24).unwrap());
  Div::default()
    .styles(css!("display: flex; flex-direction: column; gap: 1rem;"))
    .children([
      Link::new(
        "#whoami".to_string(),
        [H1::text("# Who am I").class("projects-h1").into_tag()],
      )
      .styles(css!("text-decoration: none; color: black;"))
      .into_tag(),
      P::default()
        .children([
          "Hello, I'm Vincent. I'm a ".into_tag(),
          format!("{age} ").into_tag(),
          "year old upcoming software engineer who lives in ".into_tag(),
          Strong::text("Sweden").into_tag(),
          ". ".into_tag(),
          "I'm currently in my last year in the Science program at ".into_tag(),
          Link::text("https://ntigymnasiet.se/johanneberg", "NTI Gymnasium")
            .into_tag(),
          ".".into_tag(),
        ])
        .into_tag(),
    ])
    .into_tag()
}

pub fn page() -> Vec<Tag> {
  [
    P::default()
      .children([
        "Hello World... This is ".into_tag(),
        Strong::text("Vincent's").into_tag(),
        " website".into_tag(),
      ])
      .into_tag(),
    whoami(),
    projects::projects(),
  ]
  .to_vec()
}

pub async fn index_page() -> impl Respondable {
  let mut children = vec![header()];

  children.extend(page());

  Html::from((
    default_head("Home").global_style(global_css!(
      ".projects-h1:hover { text-decoration: underline; }"
    )),
    default_body(children),
  ))
}

mod utils {
  use chrono::{Datelike, Local, NaiveDate};

  pub fn calculate_age(birthday: NaiveDate) -> i32 {
    let today = Local::now().date_naive();
    let mut age = today.year() - birthday.year();

    if today.ordinal() < birthday.ordinal() {
      age -= 1;
    }

    age
  }
}
