terraform {
  backend "gcs" {
    bucket = "pankzsoft-terraform-admin"
    prefix = "terraform/dojo-vm"
  }

  required_providers {
    scaleway = {
      source = "scaleway/scaleway"
    }
  }

  required_version = ">= 0.13"
}
