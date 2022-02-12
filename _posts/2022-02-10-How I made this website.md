---
layout: post
title: How to add HTTPS to your a website
author:
 name: Roland Van Duine
 link: https://github.com/colmak
date: 2022-02-10
description:
- Quick and easy guide to adding HTTPS
image:
category: [Guide, Technology]
tags: [website, jekyll]
published: true
sitemap: true
---


## Setup

First you will need a website that doesn't have HTTPS and acess to admin tools for the domain host.

In my case I had gotten a free domain with [Github Education]("https://education.github.com/") for namecheap, but even if you have a different domain host it should be similar.

## Cloudflare

Cloudlfare provides free SSL certificates which are what is needed for HTTPS. First create your account. Then find your way to the Websites tab and add your site.

![Screenshot](https://i.imgur.com/OCMkU5i.png)

Next you have to change the name servers (DNS) to the name servers from Cloudflare. This is done through the domain name host for me it was namecheap, but you use the DNS that you get from Cloudflare

![Screenshot](https://i.imgur.com/RrFBMKy.png)

![Screenshot](https://i.imgur.com/fsHvEnf.png)

Using the nameservers from Cloudflare you put them where it says nameservers as shown in the screenshots.

Next step is to create a rule on Cloudflare and select Always Use HTTPS.

![Screenshot](https://i.imgur.com/5m3AGJO.png)

Now your done and you just have to wait this may take a couple hours, or it could be a couple minutes.
