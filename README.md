# Strapi Newsletter ✉️

## Introduction 📖

Strapi Newsletter is a plugin that makes it easy to send newsletters to your users when you publish a post.

This plugin is built on top of the original Strapi Newsletter plugin, which you can find [here](https://www.npmjs.com/package/@strapi-newsletter/strapi), created by [osadavc](https://www.npmjs.com/~osadavc). I have used this plugin as a reference and modified its code to add support for the Brevo email provider.

## Installation ⏳

Run any of the following commands inside your strapi directory to install the plugin:

```
npm i strapi-newsletter-custom

yarn add strapi-newsletter-custom
```

## Usage 💄

You have three available providers to use, namely,

1. Mailchimp
2. ConvertKit
3. Brevo

You can use any of these providers to send newsletters. First of all, you need to configure the provider that you're planning to use.

- **For Brevo:**
  - Create a Brevo account [here](https://brevo.com).
  - Obtain your API key from Brevo.
  - After you have installed your plugin, go to Strapi settings and choose the `Strapi Newsletter` settings.
  - In the settings, set up Brevo by entering your Brevo API key.

### Steps for others

1. You can use any of these providers to send newsletters. First of all you need to configure the provider that you're planning to use.

2. Go to your provider's website, create an account and get your API key and most probably also your list ID.

3. After you have installed your plugin, go to strapi settings and choose the `Strapi Newsletter` settings.

4.Then your users should register to your newsletter in-order for them to receive newsletter. To do this you can use the following package provided by strapi-newsletter on the frontend. It's a simple and easy way to register to your newsletter OR you can send a POST request to the following endpoint with the email in the body of the POST request.

POST {YOUR_STRAPI_INSTANCE}/strapi-newsletter/newsletter/subscribe

This plugin is built on top of the original Strapi Newsletter plugin, which you can find [here](https://www.npmjs.com/package/@strapi-newsletter/strapi), created by [osadavc](https://www.npmjs.com/~osadavc). I have used this plugin as a reference and modified its code to add support for the Brevo email provider.
