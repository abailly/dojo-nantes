provider "google" {
  credentials = var.credentials_file
  region = "europe-west1"
  zone = "europe-west1-b"
  project = "pankzsoft-terraform-admin"
}
