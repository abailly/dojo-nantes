#!/bin/bash
# Configure environment for user curry

# fail if something goes wrong
set -e

# clone dotfiles from github
[[ -d ~/dotfiles ]] || git clone https://github.com/abailly/dotfiles ~/dotfiles
[[ -L ~/.emacs ]] || ln -s ~/dotfiles/.emacs ~/.emacs
[[ -L ~/.tmux.conf ]] || ln -s ~/dotfiles/.tmux.conf ~/.tmux.conf
[[ -L ~/.git-completion.sh ]] || ln -s ~/dotfiles/bash-completion.sh ~/.git-completion.sh
[[ -d ~/coding-dojo ]] || git clone https://github.com/abailly/dojo-nantes ~/dojo-nantes

cat >~/.gitconfig <<EOF
[user]
	name = Arnaud Bailly
	email = arnaud@pankzsoft.com
[alias]
	s = status
	l = log --oneline --graph --decorate
	ci = commit
	co = checkout
	sub = submodule
[push]
	default = simple
[core]
	autocrlf = input
EOF

if [[ -f ~/.bashrc ]]; then
    rm ~/.bashrc
fi
ln -s ~/dotfiles/.bashrc ~/.bashrc

if [[ -f ~/.bash_aliases ]]; then
    rm ~/.bash_aliases
fi
ln -s ~/dotfiles/.bash_aliases ~/.bash_aliases

# install SBCL
# needs to happen before configuring emacs
sudo apt update
sudo apt install -y sbcl
curl -o /tmp/ql.lisp http://beta.quicklisp.org/quicklisp.lisp
sbcl --no-sysinit --no-userinit --load /tmp/ql.lisp \
    --eval '(quicklisp-quickstart:install :path "~/.quicklisp")' \
    --quit

# run Emacs installation script, mostly for preinstalling a bunch of
# packages
emacs --batch -q -l dotfiles/install.el

# accept github.com key
ssh-keyscan github.com >>~/.ssh/known_hosts

# Ensure gpg socket is cleaned up on logout so that it can be forwarded again
cat >>~/.bash_logout <<EOF
rm -f /run/user/$(id -u)/gnupg/S.gpg-agent
EOF

# install latest GHCup
curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | BOOTSTRAP_HASKELL_NONINTERACTIVE=1 BOOTSTRAP_HASKELL_GHC_VERSION=latest BOOTSTRAP_HASKELL_CABAL_VERSION=latest BOOTSTRAP_HASKELL_INSTALL_STACK=1 BOOTSTRAP_HASKELL_INSTALL_HLS=1 BOOTSTRAP_HASKELL_ADJUST_BASHRC=P sh

# install latest Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
