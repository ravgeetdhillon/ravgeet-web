---
title: 5 Netlify plugins to ensure a great Web Experience

description: Test and optimize your website for a great web experience before a new deployment using Netlify plugins.

date: 2020-11-17 08:05:00 +00:00

tags: [netlify,jamstack,web-development,testing]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/5-netlify-plugins-to-ensure-a-great-web-experience/
---

A great web experience is a must for retaining viewers and turn them into potential leads. The key to achieving a great web experience is making sure that your website is optimized and tested thoroughly. Testing a small website manually can be easy but a large website that is controlled by a team through a CMS requires automated tools. These days most website owners are shifting towards JAMstack. Netlify is one of the best platforms to host JAMstack websites. In this blog, we will list some of the best Netlify plugins that you can use to offer a great web experience to your viewers.

[1\. Checklinks](https://github.com/munter/netlify-plugin-checklinks)
---------------------------------------------------------------------

Broken links on your website can result in embarrassment and a huge dropout rate. You can manually check broken links on your website but it is better if we can automate the process. **Checklinks** helps to keep all the assets references correct and avoid 404 links to the internal pages, as well as the external pages your website links to. It can also report on inefficient redirect chains and potential mixed content warnings.

[2\. Deployment Hours](https://github.com/neverendingqs/netlify-deployment-hours-plugin)
----------------------------------------------------------------------------------------

Sometimes, in the middle of the night, one of your team members can trigger a new deployment which can by chance break the website. What next? Your team members are called and you have to fix the bug at the time you were about to sleep. So to blocks deployments that happen outside of the specified deployment hours range, you can use the **Deployment Hours** Netlify plugin.

[3\. HTML Validate](https://github.com/oliverroick/netlify-plugin-html-validate)
--------------------------------------------------------------------------------

**HTML Validate** Netlify plugin allows you to validate your HTML website build. It is extremely important to test the validity of the HTML because not only it can break your website’s design structure but also affect the SEO as the GoogleBot won’t be able to parse your website correctly. For example,

```
<p>
  <button>Click me!</button>
  <div id="show-me">
    Lorem ipsum
  </div>
</p>
```

The validation of the above HTML will produce the following error in the terminal:

```txt
1:1  error  Element <p> is implicitly closed by adjacent <div>  no-implicit-close
2:2  error  Button is missing type attribute                    button-type
6:4  error  Unexpected close-tag, expected opening tag          close-order
```

[4\. Lighthouse](https://github.com/netlify-labs/netlify-plugin-lighthouse)
---------------------------------------------------------------------------

**Lighthouse** is a Netlify plugin using which you can run an automated audit of your website after every build. You can set threshold values for each of the categories tested by Lighthouse that include performance, accessibility, best practices, SEO, and PWA if required. A new website build is only deployed if all the threshold values are met.

![RavSam website performance measured by Lighthouse](https://www.ravsam.in/assets/images/blog-assets/ravsam-website-performance.png)

Our website performance measured by Lighthouse

[5\. Minify HTML](https://github.com/philhawksworth/netlify-plugin-minify-html)
-------------------------------------------------------------------------------

When the website is built using a Static Site Generator like [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), a lot of whitespaces can creep into the HTML generated after the build. This whitespace means that the user has to download more bytes and you also waste your bandwidth. By minifying the HTML generated by your build, you can remove the redundant bytes from your website. This plugin minifies all HTML files in your publish directory, which is to be deployed by Netlify to its global CDN.

Cheers!
    