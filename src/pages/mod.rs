use titan::html::{global_css, tags::head::Head};

pub mod index;

pub fn default_head(subtitle: &'static str) -> Head {
    Head::default()
        .title(&format!("Vincent Thomas | {}", subtitle))
        .description("Vincent's personal website.").global_style(global_css!("
            @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

            *, *::before, *::after {
                font-family: 'Roboto';
                margin: 0;
                padding: 0;
            }

            .nav-link:hover {
                text-decoration: underline;
            }
    ")).reset_css()
}
