output "worker_id" {
  description = "Cloudflare Worker ID."
  value       = cloudflare_worker.site.id
}

output "worker_name" {
  description = "Cloudflare Worker name."
  value       = cloudflare_worker.site.name
}

output "site_url" {
  description = "Public URL of the Worker's custom domain."
  value       = "https://${cloudflare_workers_custom_domain.site.hostname}"
}
