terraform {
 backend "gcs" {
   bucket  = "iog-dojo"
   prefix  = "terraform/dev-vm/abailly"
 }
}
