variable "cloudflare_account_id" {
  description = "Cloudflare account ID that owns the Worker."
  type        = string

  validation {
    condition     = can(regex("^[0-9a-f]{32}$", var.cloudflare_account_id))
    error_message = "The Cloudflare account ID must be a 32-character lowercase hexadecimal string."
  }
}

variable "worker_name" {
  description = "Name of the Cloudflare Worker."
  type        = string
  default     = "v-thomas-com"
}

variable "worker_domain" {
  description = "Custom domain routed to the Cloudflare Worker."
  type        = string
}
