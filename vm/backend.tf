terraform {
 backend "gcs" {
   bucket  = "pankzsoft-terraform-admin"
   prefix  = "terraform/dev-vm"
 }
}
