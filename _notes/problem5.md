---
---

###### Problem

how to configure a virtual host in apache on ubuntu

###### Solution

first do

```
sudo su
cd /etc
gedit hosts
```

enter the website's ip and name as

```
127.0.0.1   example.com
```

then do

```
cd apache2/sites-available
cp 000-default.conf example.com.conf
gedit example.com.conf
```

add the following text into the file

```
<Directory /home/user/Documents/example.com/>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride All
    Require all granted
</Directory>

# The ServerName directive sets the request scheme, hostname and port that
# the server uses to identify itself. This is used when creating
# redirection URLs. In the context of virtual hosts, the ServerName
# specifies what hostname must appear in the request's Host: header to
# match this virtual host. For the default virtual host (this file) this
# value is not decisive as it is used as a last resort host regardless.
# However, you must set it for any further virtual host explicitly.
#ServerName example.com

ServerAdmin webmaster@example.com
DocumentRoot /home/user/Documents/example.com
```

```
a2ensite example.com.conf
systemctl reload apache2
```
