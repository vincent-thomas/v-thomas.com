mod projects;

use chrono::NaiveDate;
use titan::{
    html::{
        css, global_css,
        tags::{
            html::Html,
            link::{Link, LinkLoadType},
            Body, Div, IntoTag, Main, Strong, Tag, H1, P,
        },
    },
    Respondable,
};

use super::default_head;
use crate::components::header;

fn whoami() -> Tag {
    let age = utils::calculate_age(NaiveDate::from_ymd_opt(2006, 7, 24).unwrap());
    Div::default()
        .styles(css!("display: flex; flex-direction: column; gap: 1rem;"))
        .children([
            H1::text("# Who am I").class("projects-h1").into_tag(),
            P::default()
                .children([
                    "Hello, I'm Vincent. I'm a ".into_tag(),
                    Tag::from(format!("{age} ")),
                    "year old upcoming software engineer who lives in ".into_tag(),
                    Strong::text("Sweden").into_tag(),
                    ". ".into_tag(),
                    "I'm currently in my last year in the Science program at ".into_tag(),
                    Link::text("https://ntigymnasiet.se/johanneberg.", "NTI Gymnasium")
                        .preload(LinkLoadType::WhenIdle)
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

    let main_css = css!("display: flex; flex-direction: column; gap: 2rem;");

    let mut children = vec![header()];
    children.push(Main::default().children(page()).styles(main_css).into_tag());

    Html::from((
        default_head("Home").global_style(global_css!(
            ".projects-h1:hover { text-decoration: underline; }"
        )),
        Body::default().styles(root_css).children(children),
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
