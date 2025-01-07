use titan::{web::Redirect, App};
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
