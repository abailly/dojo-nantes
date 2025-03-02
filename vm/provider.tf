provider "google" {
  credentials = var.credentials_file
  region = "europe-west1"
  zone = "europe-west1-b"
  project = "pankzsoft-terraform-admin"
}

provider "scaleway" {
  zone   = "fr-par-1"
  region = "fr-par"
  access_key      = var.access_key
  secret_key      = var.secret_key
  organization_id = var.organization_id
  project_id      = var.project_id
}
