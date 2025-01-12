use titan::{
    http::StatusCode,
    web::{self, Redirect},
    App, Respondable,
};
use tokio::net::TcpListener;
use v_thomas_com::pages::index::index_page;

async fn fallback() -> impl Respondable {
    (StatusCode::NOT_FOUND, "404 Not Found")
}

#[tokio::main]
async fn main() {
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

    if cfg!(debug_assertions) {
        let routes = app.at("/", web::get(index_page));
        let tcp = TcpListener::bind("0.0.0.0:8080").await.unwrap();
        titan::serve(tcp, routes).await.unwrap()
    } else {
        titan_lambda::app_runtime(app).run().await.unwrap();
    }
}
