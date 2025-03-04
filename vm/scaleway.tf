resource "scaleway_instance_ip" "public_ip" {
  project_id = var.project_id
}

resource "scaleway_instance_security_group" "dev" {
  project_id              = var.project_id
  inbound_default_policy  = "drop"
  outbound_default_policy = "accept"

  inbound_rule {
    action   = "accept"
    port     = "22"
    ip_range = "0.0.0.0/0"
  }

}

resource "scaleway_instance_server" "dojo" {
  project_id = var.project_id
  type       = "DEV1-L"
  image      = "b4868a5f-a11e-4146-90d5-ff04a2456634"

  tags = ["dev", "dojo"]

  ip_id = scaleway_instance_ip.public_ip.id

  security_group_id = scaleway_instance_security_group.dev.id

  root_volume {
    size_in_gb = 80
  }

  connection {
    type        = "ssh"
    user        = "curry"
    private_key = file(var.private_key_file)
    host        = scaleway_instance_ip.public_ip.address
  }

  provisioner "remote-exec" {
     inline = [
       "mkdir /home/curry/.ssh",
       "chown -R curry:curry /home/curry/.ssh"
     ]

    connection {
      type        = "ssh"
      user        = "root"
      private_key = file(var.private_key_file)
      host        = scaleway_instance_ip.public_ip.address
    }

   }

  provisioner "file" {
    source      = "keys"
    destination = "/home/curry/.ssh/authorized_keys"

    connection {
      type        = "ssh"
      user        = "root"
      private_key = file(var.private_key_file)
      host        = scaleway_instance_ip.public_ip.address
    }

  }

  provisioner "file" {
    source      = "scripts/configure.sh"
    destination = "/home/curry/configure.sh"
  }

  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/curry/configure.sh",
      "/home/curry/configure.sh"
    ]
  }
}

output "scw_dojo_ip" {
  value = scaleway_instance_server.dojo.public_ips.0
}
