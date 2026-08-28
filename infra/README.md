# Infrastructure

This directory is the root Terraform module for the site's Cloudflare infrastructure.

The Cloudflare provider reads its API token from `CLOUDFLARE_API_TOKEN`. Create a scoped API token with `Workers Scripts: Edit` permission, then export it before running Terraform:

```sh
export CLOUDFLARE_API_TOKEN="..."
```

Copy the example variables and replace the account ID with the ID shown on your Cloudflare account overview:

```sh
cp terraform.tfvars.example terraform.tfvars
```

The module creates a `v-thomas-com` Worker and attaches `new.v-thomas.com` as its custom domain. Wrangler owns Worker versions and deployments, including uploading the Astro build from `../dist`. Override `worker_name` or `worker_domain` in `terraform.tfvars` if needed.

Cloudflare creates the custom domain's DNS record and TLS certificate. The hostname must belong to an active zone in the same account and must not already have a CNAME record.

Worker preview URLs are enabled, while the production `workers.dev` route is disabled. Pull requests from branches in this repository upload an isolated version with a stable `pr-<number>` preview alias; they do not change the production deployment. Pushes to `main` first ensure the Worker exists, deploy the production Astro build with Wrangler, and then apply the remaining Terraform infrastructure. This ordering ensures the Worker has a deployment before Terraform attaches its custom domain and makes Terraform authoritative for the final routing configuration.

The GitHub repository must define:

- Secrets: `CLOUDFLARE_API_TOKEN`, `R2_ACCESS_KEY_ID`, and `R2_SECRET_ACCESS_KEY`.
- Variables: `CLOUDFLARE_ACCOUNT_ID` and `TF_CONFIG`.

`TF_CONFIG` must contain valid Terraform variable definitions:

```hcl
cloudflare_account_id = "a0cee71ecebb3bd111c29e454aa97f17"
worker_domain         = "new.v-thomas.com"
```

Terraform stores production state in the `v-thomas-com-terraform-state` R2 bucket at `production/terraform.tfstate`. The backend uses an adjacent `.tflock` object to prevent concurrent state writes.

Create the bucket before initializing Terraform:

```sh
wrangler r2 bucket create v-thomas-com-terraform-state
```

Create an R2 API token scoped to that bucket with Object Read & Write permission. Export its S3 credentials and the R2 endpoint when running Terraform locally:

```sh
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_ENDPOINT_URL_S3="https://a0cee71ecebb3bd111c29e454aa97f17.r2.cloudflarestorage.com"
```

If this module already has local state, migrate it once after creating the bucket:

```sh
terraform init -migrate-state
```

## Usage

Install the toolchain from the repository root, then run Terraform from this directory:

```sh
mise install
mise build
cd infra
terraform init
terraform fmt -check
terraform validate
terraform plan
```

Commit `.terraform.lock.hcl` when providers are added. Never commit state, plan files, or populated `.tfvars` files.
