use titan::{http::StatusCode, web::Redirect, App, Respondable};

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

    #[cfg(not(debug_assertions))]
    {
        titan_lambda::app_runtime(app).run().await.unwrap();
    }
    #[cfg(debug_assertions)]
    {
        use titan::web;
        use tokio::net::TcpListener;
        use v_thomas_com::pages::index::index_page;
        let routes = app.at("/", web::get(index_page));
        let tcp = TcpListener::bind("0.0.0.0:8080").await.unwrap();
        titan::serve(tcp, routes).await.unwrap()
    }
}
