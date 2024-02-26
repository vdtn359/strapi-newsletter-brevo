"use strict";

module.exports = {
  async hello(ctx) {
    console.log("hello in setting conttolres");
    ctx.body = await strapi
      .plugin("strapi-newsletter")
      .service("settings")
      .getHello();
  },
  async getSettings(ctx) {
    ctx.body = await strapi
      .plugin("strapi-newsletter")
      .service("settings")
      .getSettings();
  },
  async setSettings(ctx) {
    ctx.body = await strapi
      .plugin("strapi-newsletter")
      .service("settings")
      .setSettings(ctx.request.body);
  },
  async getSetup(ctx) {
    ctx.body = await strapi
      .plugin("strapi-newsletter")
      .service("settings")
      .getSetup();
  },
};
