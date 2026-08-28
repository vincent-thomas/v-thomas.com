resource "cloudflare_worker" "site" {
  account_id = var.cloudflare_account_id
  name       = var.worker_name

  subdomain = {
    enabled          = true
    previews_enabled = true
  }
}

resource "cloudflare_workers_custom_domain" "site" {
  account_id = var.cloudflare_account_id
  hostname   = var.worker_domain
  service    = cloudflare_worker.site.name
}
