use titan::{
  html::{
    global_css,
    tags::{html::Html, IntoTag, H1},
  },
  http::StatusCode,
  web::Redirect,
  App, Respondable,
};
use v_thomas_com::{
  components::header,
  pages::{default_body, default_head},
};

async fn fallback() -> impl Respondable {
  (StatusCode::NOT_FOUND, "404 Not Found")
}

async fn cv() -> impl Respondable {
  let mut children = vec![header()];

  children.push(H1::text("nice").into_tag());

  Html::from((
    default_head("IDK Man").global_style(global_css!(
      ".projects-h1:hover { text-decoration: underline; }"
    )),
    default_body(children),
  ))
}

#[tokio::main]
async fn main() {
  let app = App::default()
    .fallback(fallback)
    .at("/github", Redirect::permanent("//github.com/vincent-thomas"))
    .at(
      "/linkedin",
      Redirect::permanent("//linkedin.com/in/vincent-thomas-08577b333/"),
    );

  #[cfg(not(debug_assertions))]
  {
    titan_lambda::app_runtime(app).run().await.unwrap();
  }
  #[cfg(debug_assertions)]
  {
    use titan::web;
    use tokio::net::TcpListener;
    use v_thomas_com::pages::index::index_page;
    let routes = app.at("/", web::get(index_page)).at("/cv", web::get(cv));
    let tcp = TcpListener::bind("0.0.0.0:8080").await.unwrap();
    titan::serve(tcp, routes).await.unwrap()
  }
}
