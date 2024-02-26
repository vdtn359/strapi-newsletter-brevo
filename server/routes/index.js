module.exports = [
  {
    method: "GET",
    path: "/",
    handler: "settings.hello",
    config: {
      policies: [],
      auth: false,
    },
  },

  {
    method: "POST",
    path: "/newsletter/subscribe",
    handler: "newsletter.subscribe",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/newsletter/users",
    handler: "newsletter.getSubscribedUsers",
  },
  {
    method: "GET",
    path: "/newsletter",
    handler: "newsletter.getAllNewsletter",
  },
  {
    method: "POST",
    path: "/newsletter",
    handler: "newsletter.sendNewsletter",
  },
  {
    method: "GET",
    path: "/settings",
    handler: "settings.getSettings",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/settings",
    handler: "settings.setSettings",
  },
  {
    method: "GET",
    path: "/setup",
    handler: "settings.getSetup",
  },
  {
    method: "GET",
    path: "/mailchimp/ping",
    handler: "mailchimp.checkConnection",
  },
  {
    method: "GET",
    path: "/convertkit/ping",
    handler: "convertkit.checkConnection",
  },

  {
    method: "GET",
    path: "/brevo/ping",
    handler: "brevo.checkConnection",
  },
];
