provider "scaleway" {
  zone   = "fr-par-1"
  region = "fr-par"
  access_key      = var.access_key
  secret_key      = var.secret_key
  organization_id = var.organization_id
  project_id      = var.project_id
}
