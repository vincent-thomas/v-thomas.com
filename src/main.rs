use std::error::Error;
use titan::{http::StatusCode, web, App, Respondable};

async fn fallback() -> impl Respondable {
    (StatusCode::NOT_FOUND, "404 Not Found")
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error + Send + Sync>> {
    let app = App::default()
        .fallback(fallback)
        .at(
            "/github",
            web::Redirect::permanent("//github.com/vincent-thomas"),
        )
        .at(
            "/linkedin",
            web::Redirect::permanent("//linkedin.com/in/vincent-thomas-08577b333/"),
        );

    titan_lambda::app_runtime(app).run().await
}
