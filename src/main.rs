use std::error::Error;
use titan::{
    http::StatusCode,
    web::{self, Redirect},
    App, Respondable,
};
use titan_lambda::Request;
use tokio::net::TcpListener;

async fn fallback() -> impl Respondable {
    (StatusCode::NOT_FOUND, "404 Not Found")
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error + Send + Sync>> {
    let app = App::default()
        .fallback(fallback)
        .at(
            "/github",
            Redirect::permanent("//github.com/vincent-thomas"),
        )
        .at(
            "/linkedin",
            Redirect::permanent("//linkedin.com/in/vincent-thomas-08577b333/"),
        );

    titan_lambda::app_runtime(app).run().await
}
