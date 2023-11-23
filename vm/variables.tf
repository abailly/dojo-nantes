variable "credentials_file" {
  type        = string
  description = "The credentials of the GCP service account"
}

variable "private_key_file" {
  type        = string
  description = "The private key file used to log into the machine and configure it"
}

locals {
  credentials_file_decoded = jsondecode(file(var.credentials_file))
  google_service_account_private_key           = local.credentials_file_decoded.private_key
  google_project_id                            = local.credentials_file_decoded.project_id
}
