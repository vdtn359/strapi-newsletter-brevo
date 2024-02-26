"use strict";

module.exports = {
  async checkConnection(ctx) {
    try {
      ctx.body = await strapi
        .plugin("strapi-newsletter")
        .service("brevo")
        .checkConnection();
    } catch (error) {
      ctx.throw(500, error);
    }
  },
};
