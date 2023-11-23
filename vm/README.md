# Development Environment

[Terraform](https://www.hashicorp.com/products/terraform) based code to setup a development environment for hacking Haskell code. The VM will be configured with:

* Vanilla [Emacs](https://emacs.org) for editing code, with [lsp-mode](https://emacs-lsp.github.io/) using [lsp-haskell](https://emacs-lsp.github.io/lsp-haskell/) and [haskell-language-server](https://github.com/haskell/haskell-language-server),
* [nix](https://nixos.org/) for dependencies management and building Haskell code, with nix-shell providing the proper environment for emacs' LSP,
* [direnv](https://direnv.net/) to provide a per-directory environment that will trigger entering nix.

## Logging in

If you want to be able to log into the remote VM during the coding dojo, add your public key in a PR to the [ssh_keys](./ssh_keys) file, as the line:

```
curry:<key-type> <key encoded in base64>
```

Then during the session, participants can log into the VM using (where `x.y.z.t` is the actual VM IP which will be communicated before the dojo starts):

```
ssh curry@x.y.z.t
tmux a
```
