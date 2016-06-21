#!/usr/bin/env bash

set -x

apt-get update -qq
apt-get install -y --no-install-recommends --no-install-suggests gnupg2 curl git ttf-kochi-gothic unzip

echo "mysql-server-5.5 mysql-server/root_password password toor" | debconf-set-selections
echo "mysql-server-5.5 mysql-server/root_password_again password toor" | debconf-set-selections
apt-get install -y --no-install-recommends --no-install-suggests mysql-server-5.5 libmysqlclient-dev

apt-get install -y --no-install-recommends --no-install-suggests libmagickwand-dev imagemagick

sudo -H -u vagrant bash <<EOD
cd ~

gpg2 --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3

\curl -sSL https://get.rvm.io | bash

echo 'source \$HOME/.rvm/scripts/rvm' >> ~/.bashrc
source ~/.rvm/scripts/rvm

echo 'export RAILS_ENV=production' >> ~/.bashrc
export RAILS_ENV=production

rvm requirements
rvm install 1.9.3
rvm use 1.9.3 --default
ruby -v
which ruby

rvm rubygems current
gem -v

# https://github.com/rails/rails/issues/24749
gem install mime-types -v 2.6.2
gem install rails --version="4.2" --no-ri
gem list local
rails -v


# http://www.redmine.org/projects/redmine/wiki/RedmineInstall

gem install mysql2
gem install ruby-openid
gem install bundler

mkdir ~/www

cat <<EOYML > database.yml.example
production:
  adapter: mysql2
  database: testDatabase
  host: localhost
  username: testUser
  password: testPass
EOYML

EOD

if ! [ -L /var/www ]; then
  sudo rm -rf /var/www
  ln -fs /home/vagrant/www /var/www
fi


cat <<EOD > rc.local.example
#!/usr/bin/env bash
sudo -H -u vagrant bash <<EOSH
source ~/.rvm/scripts/rvm
cd ~/PROJECT_DIR
IP=\`hostname -I | awk '//{print \$1}'\`
nohup bundle exec rails server webrick -e production -b \\\$IP &
EOSH
exit 0
EOD

