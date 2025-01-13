use titan::html::tags::{script::Script, IntoTag, Tag};

pub fn scripts() -> Vec<Tag> {
  Vec::from_iter([Script::from_text(include_str!("./scripts.js"))
    .set_module()
    .into_tag()])
}
