simpleRailsVagrantBox
=====================

Here is a Vagrantfile that creates virtual machine 
based on parallels/ubuntu-14.04.

# Requisite

 - OSX 10.11
 - Homebrew
 - Vagrant
 - Parallels Desktop 11


# Install Vagrant and parallels plugin

```
$ brew cask install vagrant

$ vagrant plugin install vagrant-parallels
$ echo 'export VAGRANT_DEFAULT_PROVIDER=parallels' >> ~/.profile
$ . ~/.profile
```


# Create virtual machine

```
$ mkdir <PROJECT_DIR>
$ cd <PROJECT_DIR>

$ vagrant up

$ vagrant ssh

$ vagrant halt
```

__END__
