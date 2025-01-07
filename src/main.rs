mod pages;
use pages::{
    about::{self, about_page},
    index::index_page,
};
use personal_website::components::{footer::footer, navbar::navbar};
use titan::{
    html::{
        css,
        tags::{head::Head, html::Html, Body},
    },
    web::{self, Redirect},
    App, Respondable,
};
use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    let app = App::default()
        .at("github", Redirect::permanent("//github.com/vincent-thomas"))
        .at(
            "linkedin",
            Redirect::permanent("//linkedin.com/in/vincent-thomas-08577b333/"),
        );

    let port = match std::env::var("PORT") {
        Ok(value) => value,
        Err(_) => "4000".to_string(),
    };

    let listener = TcpListener::bind(format!("0.0.0.0:{port}")).await.unwrap();

    titan::serve(listener, app).await.unwrap();
}
