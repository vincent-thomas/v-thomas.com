variable "cloudflare_account_id" {
  description = "Cloudflare account ID that owns the Worker."
  type        = string
  nullable    = false

  validation {
    condition     = can(regex("^[0-9a-f]{32}$", var.cloudflare_account_id))
    error_message = "The Cloudflare account ID must be a 32-character lowercase hexadecimal string."
  }
}

variable "worker_name" {
  description = "Name of the Cloudflare Worker."
  type        = string
  default     = "v-thomas-com"
  nullable    = false
}

variable "worker_domain" {
  description = "Custom domain routed to the Cloudflare Worker."
  type        = string
  nullable    = false

  validation {
    condition     = can(regex("^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z]{2,63}$", var.worker_domain))
    error_message = "The Worker domain must be a non-empty lowercase fully qualified domain name, such as new.v-thomas.com."
  }
}
