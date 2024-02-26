"use strict";

const getPluginStore = () => {
  return strapi.store({
    environment: "",
    type: "plugin",
    name: "strapi-newsletter",
  });
};

module.exports = ({ strapi }) => ({
  async subscribe(initialBody) {
    let body = initialBody;

    if (typeof body === "string") {
      body = JSON.parse(initialBody);
    }

    if (!body.email) {
      throw new Error("Email is required");
    }

    const { provider } = await getPluginStore().get({ key: "settings" });

    switch (provider) {
      case "mailchimp": {
        await strapi
          .plugin("strapi-newsletter")
          .service("mailchimp")
          .subscribeNewUser(body.email);
      }
    }

    //my codee  for brevo
    switch (provider) {
      case "brevo": {
        await strapi
          .plugin("strapi-newsletter")
          .service("brevo")
          .subscribeNewUser(body.email);
      }
    }

    //end

    return await strapi.entityService.create(
      "plugin::strapi-newsletter.subscribed-user",
      {
        data: {
          email: body.email,
          provider: provider,
        },
      }
    );
  },
  async getSubscribedUsers() {
    return await strapi.entityService.findMany(
      "plugin::strapi-newsletter.subscribed-user"
    );
  },
  async getAllNewsletter() {
    return await strapi.entityService.findMany(
      "plugin::strapi-newsletter.newsletter"
    );
  },
  async sendNewsletter(body, user) {
    if (!body.body || !body.subject) {
      throw new Error("Body and/or Subject are required");
    }

    const { provider } = await getPluginStore().get({ key: "settings" });

    switch (provider) {
      case "mailchimp": {
        await strapi
          .plugin("strapi-newsletter")
          .service("mailchimp")
          .sendNewsletter(body, user);
      }
    }

    //my code for brevo
    switch (provider) {
      case "brevo": {
        await strapi
          .plugin("strapi-newsletter")
          .service("brevo")
          .sendNewsletter(body, user);
      }
    }

    //end

    return await strapi.entityService.create(
      "plugin::strapi-newsletter.newsletter",
      {
        data: {
          subject: body.subject,
        },
      }
    );
  },
});
