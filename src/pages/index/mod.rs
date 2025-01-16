mod projects;

use chrono::NaiveDate;
use titan::{
  html::{
    css, global_css,
    tags::{html::Html, link::Link, *},
    StyleRule,
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
      .id("whoami")
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

fn my_story() -> Tag {
  let a_padding = css!("margin-inline: 0.2rem;");
  Div::default()
      .styles(css!("display: flex; flex-direction: column; gap: 1rem;"))
      .children([
        H2::text("## Hobbies").class("projects-h1").into_tag(),
        H3::text("Programming").into_tag(),
        P::text("
            At heart i'm a problem solver, and I was intrigued of how software worked, especially websites.
            I started out with Python to create dummy scripts and liked it. So i continued...
        ").into_tag(),
        P::text("And it took me to developing more securious apps in Javascript/Typescript.
                 The first notable app i made was a End to End encryption mail service i called getstuff.cc (domain expired).
                 Here primarily i had a mostly frontend role in my app.
        ").into_tag(),

        P::text("
            Unfortunately i didn't care for frontend too much after this project.
            It didn't stick with me, because i am more interested in the logic, the lower-level functionality of web services.
            This led me to discover Rust, the new shiny language. I started developing lower-level libraries in Rust.
            First i created a cli app framework called clier which i'm still working on (v3). This was to get familiar with text parsing on a lower-level.
            This made me grasp concepts as memory management (not as in C/C++, but memory efficiency in an algorithm), runtime performance and friendly public library function APIs.

            I liked creating this framework, and i liked creating libraries. I then continued creating libraries.
        ").into_tag(),
        P::text("
            I had previously used actix-web before to create a web service backend to a web app i was working on and really loved the library API,
            specially the request extractors made possible by Rust's rich trait system.

            I decided to try to create my own framework with two goals:
        ").into_tag(),
        Ol::default().styles(css!("padding-left: 2rem;")).children([
            Li::text("Usuable API: Friendly enough that myself could use this to create web-apps (relatively high standard coming from the ts-ecosystem.").into_tag(),
            Li::text("As little libraries as possible: I wanted to create everything and for the library to be as low level as possible").into_tag()
        ]).into_tag(),
        P::default().children(["
            The result? A collection of 10 (-1 internal) libraries under the crate name".into_tag(),
            Link::text("//docs.rs/titan", "titan").styles(css!("padding-left: 0.2rem;")).into_tag(),
            ", that allowes me and other developers to build web services/web apps or just a http1.1 server using my libraries.

            This library turned out a lot better than I expected and i learned a lot along the way. This knowledge has helped me in other projects,
              for example building custom tcp protocols.

            Some of the concepts implemented was inspired (copied) by some libraries and created some of its. For example the ".into_tag(),
        Link::text("//docs.rs/titan/latest/titan/html/index.html", "titan-html").styles(a_padding).into_tag(), "renderer".into_tag(),
        " is completely original.".into_tag(),
        ]).into_tag()
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
    my_story(),
    projects::projects(),
  ]
  .to_vec()
}
use lazy_static::lazy_static;

use std::sync::RwLock;

lazy_static! {
  static ref MY_GLOBAL: RwLock<Option<Vec<u8>>> = RwLock::new(None);
}

pub async fn index_wrap(cache_body: Option<Vec<u8>>) -> titan::http::Response {
  if let Some(cache) = cache_body {
    let body = titan::http::body::Body::Full(cache.into_boxed_slice());
    return titan::http::ResponseBuilder::new().status(200).body(body).unwrap();
  };

  println!("running");
  let response = index_page().await.respond();
  match response.body() {
    titan::http::body::Body::Full(ref body) => {
      let mut refs = MY_GLOBAL.write().unwrap();
      *refs = Some(body.clone().to_vec());
    }
    titan::http::body::Body::Stream(_) => {
      panic!("Body::Stream is not available in a cached request response :(")
    }
  };

  return response;
}

#[derive(Clone)]
pub struct Random;

impl titan::Handler<()> for Random {
  type Output = titan::http::Response;
  type Future =
    std::pin::Pin<Box<dyn std::future::Future<Output = Self::Output> + Send>>;
  fn call(&self, _: ()) -> Self::Future {
    let _lock = match MY_GLOBAL.read() {
      Ok(v) => v,
      Err(_) => panic!("oh no"),
    };
    let body_ref = _lock.as_ref();
    let body_cloned = body_ref.cloned();
    Box::pin(async move { index_wrap(body_cloned).await })
  }
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
