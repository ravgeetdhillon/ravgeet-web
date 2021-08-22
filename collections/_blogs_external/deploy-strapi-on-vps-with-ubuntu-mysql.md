---
title: Deploy Strapi on VPS with Ubuntu, MySQL

description: Learn how to set up a Strapi app on VPS, DigitalOcean, Linode with Ubuntu, MySQL.

date: 2021-04-08 08:00:00 +00:00

tags: [strapi,vps,automation]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/deploy-strapi-on-vps-with-ubuntu-mysql/
---

So you have built your Strapi project and the next thing you need to do is to deploy it on a production server. In this blog, we will learn about how to set up a Virtual Private Server(VPS) and then deploy our Strapi application. We can apply this guide to any kind of servers like Linode, DigitalOcean and many more.

### Contents

*   [Steps](#steps)
    *   [1\. Create a non-root user](#1-create-a-non-root-user)
    *   [2\. Create a Public-Private key pair](#2-create-a-public-private-key-pair)
    *   [3\. SSH as a new user](#3-ssh-as-a-new-user)
    *   [4\. Add SSH key to authorized keys](#4-add-ssh-key-to-authorized-keys)
    *   [5\. Configure Firewall](#5-configure-firewall)
    *   [6\. Remove Apache and Install Nginx](#6-remove-apache-and-install-nginx)
    *   [7\. Install Node using NVM](#7-install-node-using-nvm)
    *   [8\. Install PM2](#8-install-pm2)
    *   [9\. Install Database (MariaDB/MySQL)](#9-install-database-mariadbmysql)
    *   [10\. Create Nginx Server Blocks](#10-create-nginx-server-blocks)
    *   [11\. Setup DNS](#11-setup-dns)
    *   [12\. Install SSL](#12-install-ssl)
    *   [13\. Run the app](#13-run-the-app)

Steps
-----

We will be using **Hostinger VPS Plan 1** with **Ubuntu 20.04**. Make sure to follow step by step.

> Replace all the values in <> with your own values.

### 1\. Create a non-root user

It is a good idea to create a non-root user with sudo privileges. All the commands will be run through this user. The first step is to log in as the root user.

```
ssh root@<VPSIPADDRESS>
```

The first thing to do on a new machine is to update the packages and remove all the older ones.

```
sudo apt update -y && sudo apt upgrade -y && sudo apt autoremove -y
```

Now our machine is up to date and we need to create a new user and log out of the session.

```
adduser <NEWUSER>
usermod -aG sudo <NEWUSER>
exit
```

### 2\. Create a Public-Private key pair

It is great to use Public-Private key pair to SSH into a remote server. We can create a new one using

```
ssh-keygen
```

or

copy the existing one’s public key onto our clipboard

```
xclip -selection clipboard -in ~/.ssh/hostinger_rsa.pub
```

### 3\. SSH as a new user

Let us now SSH as a new user using password authentication.

```
ssh <NEWUSER>@<VPSIPADDRESS>
```

Once we are logged in, we need to create a directory for the new user identified by its name.

```
mkdir -p <NEWUSER>
cd <NEWUSER>
```

### 4\. Add SSH key to authorized keys

Let us register our public key by adding it to our authorized keys so that we can log in using a private key.

```
mkdir -p  ~/.ssh/
sudo echo "<COPIED_PUBLIC_KEY>" >> ~/.ssh/authorized_keys
```

### 5\. Configure Firewall

Now is the time to set up a firewall. A firewall is essential while setting up VPS to restrict unwanted traffic going out or into your VPS. Let us install ufw and configure a firewall to allow SSH operations.

```
sudo apt install ufw -y
sudo ufw allow OpenSSH
sudo ufw enable -y
sudo ufw status
```

### 6\. Remove Apache and Install Nginx

Nginx is a much better server than Apache. It is lightweight, easy to set up and allow us to set up proxies. Before installing Nginx, we need to remove Apache which is available by default in Ubuntu 20.04.

```
sudo systemctl stop apache2 && sudo systemctl disable apache2
sudo apt remove apache2 -y && sudo rm /var/www/html/index.html
sudo apt autoremove -y
```

Let us now install Nginx.

```
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl status nginx
```

Let us configure the firewall to allow HTTP and HTTPS traffic to pass through it.

```
sudo ufw allow 'Nginx Full'
sudo ufw enable -y
sudo ufw status
```

We can also allow either HTTPS or HTTP by using

```
sudo ufw allow 'Nginx HTTP'
# or 
sudo ufw allow 'Nginx HTTPS'
```

> To verify Nginx installation, visit the IP address of the VPS.  
> You can find IP address by `curl -4 icanhazip.com`.

### 7\. Install Node using NVM

Let us install NodeJs using NVM. The following code helps us find the current nvmversion

```
nvmversion=$(curl --silent "https://api.github.com/repos/nvm-sh/nvm/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/$nvmversion/install.sh" | bash
```

Some NPM packages require to refer to numerous packages needed for building software in general. So we will install `build-essential` for the same.

```
sudo apt install build-essential -y
```

### 8\. Install PM2

PM2 is a Process Manager built for production-level applications. It can help us run our Strapi application when the server restarts. It can watch for file changes and restart the server automatically for us.

```
npm i -g pm2@latest
cd ~
pm2 startup systemd
```

> Follow the rest of the instructions as specified on the terminal and then do `pm2 save`.

### 9\. Install Database (MariaDB/MySQL)

MariaDB is a fork of MySQL with lots of performance gains. Let us install our database sever by doing

```
sudo apt install mariadb-server -y
sudo mysql_secure_installation
```

> Follow all the instructions and complete the setup.

Once our database server is installed, we need to create a non-root user with root privileges for database operations.

```
sudo mariadb
```

```
GRANT ALL ON *.* TO '<NEWUSER>'@'localhost' IDENTIFIED BY '<PASSWORD>`' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
```

Once this is done, we need to restart our database server.

```
sudo systemctl restart mariadb
```

### 10\. Create Nginx Server Blocks

It is always a good idea to server blocks rather than to change the default Nginx configuration. This helps us when we decide to host multiple websites on the same server. To create a server block, we need to do

```
sudo nano /etc/nginx/sites-available/<YOUR_DOMAIN>
```

Add the following config

```
upstream <YOUR_DOMAIN> {
  server 127.0.0.1:1337;
  keepalive 64;
}

server {
  server_name <YOUR_DOMAIN>;
  access_log /var/log/nginx/<YOUR_DOMAIN>-access.log;
  error_log /var/log/nginx/<YOUR_DOMAIN>-error.log;
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_pass http://<YOUR_DOMAIN>;
    proxy_redirect off;
    proxy_http_version 1.1;
    proxy_cache_bypass $http_upgrade;
  }
}

server {
  listen 80;
  server_name <YOUR_DOMAIN>;
}
```

> This configuration assumes that our Strapi application will be run `127.0.0.1:1337`.

Once our configuration is set up, we need to enable our website by creating a symbolic link for our configuration file.

```
sudo ln -s /etc/nginx/sites-available/<YOUR_DOMAIN> /etc/nginx/sites-enabled/
```

This is optional but if we are serving multiple domains or subdomains from our server, we need to edit our `nginx.conf` by uncommenting this line `server_names_hash_bucket_size 64;` using

```
sudo nano /etc/nginx/nginx.conf
```

Lets us quickly check that our configurations are error-free by doing

```
sudo nginx -t
```

The output will tell us whether an error exists. If any error comes up, we need to resolve it and then finally restart the server.

```
sudo systemctl restart nginx
```

### 11\. Setup DNS

In our domain provider, we need to add an **A record** to point our subdomain to the VPS as follows:

| Type | Name | Content | TTL |
| --- | --- | --- | --- |
| A | subdomain | «VPSIPADDRESS» | 3600 |

> The DNS propagation can take upto 24 hours.

### 12\. Install SSL

The final step is to issue an SSL certificate for our Strapi application. We can automate the process of issuing certificates to our domain using **certbot**. Running the following commands will help us issue a Let’s Encrypt SSL certificate for our domain.

```
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d <YOUR_DOMAIN>
```

> Follow all the instructions. Use the Redirect option to redirect HTTP traffic to HTTPS.

The advantage of the above commands is that the certbot process runs twice a day to check if any certificates will expire within a month. It automatically renews the certificates so we don’t have to worry about certificate expiration. We can verify this by running:

```
sudo systemctl status certbot.timer
```

### 13\. Run the app

Now our setup is complete and it is the time that we all have been waiting for. Let us run our Strapi application using PM2.

```
cd ~
cd api
pm2 start ecosystem.config.js
```

We can visit our domain and check our Strapi application is running.
    