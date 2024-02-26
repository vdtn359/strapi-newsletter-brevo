"use strict";

// @ts-ignore
const SibApiV3Sdk = require("sib-api-v3-sdk");

const getPluginStore = () => {
  return strapi.store({
    environment: "",
    type: "plugin",
    name: "strapi-newsletter",
  });
};

module.exports = () => ({
  async checkConnection() {
    console.log("check connection");
    try {
      const pluginStore = getPluginStore();
      const config = await pluginStore.get({ key: "settings" });

      // @ts-ignore
      if (config.provider !== "brevo") {
        throw new Error("Provider is not Brevo");
      }

      // @ts-ignore
      const brevoConfig = {
        // @ts-ignore
        apiKey: config.apiKey,
        // server: config.dc,
      };

      // @ts-ignore
      const SibApiV3Sdk = require("sib-api-v3-sdk");
      let defaultClient = SibApiV3Sdk.ApiClient.instance;

      let apiKey = defaultClient.authentications["api-key"];
      // @ts-ignore
      apiKey.apiKey = config.apiKey;

      let apiInstance = new SibApiV3Sdk.AccountApi();
      console.log("apiInstance", apiInstance);

      const data = await apiInstance.getAccount();
      return data;
    } catch (error) {
      throw new Error(error.toString());
    }
  },

  // user subscribeNewUser
  async subscribeNewUser(email) {
    try {
      const pluginStore = getPluginStore();
      const config = await pluginStore.get({ key: "settings" });

      console.log(config, "config");

      // @ts-ignore
      if (config.provider !== "brevo") {
        throw new Error("Provider is not Brevo");
      }

      // @ts-ignore
      const brevoConfig = {
        // @ts-ignore
        apiKey: config.apiKey,
        // server: config.dc,
      };

      // @ts-ignore
      const SibApiV3Sdk = require("sib-api-v3-sdk");
      const defaultClient = SibApiV3Sdk.ApiClient.instance;

      // Configure API key authorization: api-key
      const apiKey = defaultClient.authentications["api-key"];
      // @ts-ignore
      apiKey.apiKey = config.apiKey;

      const apiInstance = new SibApiV3Sdk.ContactsApi();

      //create contact
      let createContact = new SibApiV3Sdk.CreateContact(); // CreateContact | Values to create a contact
      createContact = { email: email };

      const data = await apiInstance.createContact(createContact);
      return data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  // send newsletter

  async sendNewsletter(body, user) {
    try {
      const pluginStore = getPluginStore();
      const config = await pluginStore.get({ key: "settings" });

      // @ts-ignore
      if (config.provider !== "brevo") {
        throw new Error("Provider is not Brevo");
      }

      // @ts-ignore
      const brevoConfig = {
        // @ts-ignore
        apiKey: config.apiKey,
        // server: config.dc,
      };

      // @ts-ignore
      const SibApiV3Sdk = require("sib-api-v3-sdk");
      const defaultClient = SibApiV3Sdk.ApiClient.instance;

      // Configure API key authorization: api-key
      const apiKey = defaultClient.authentications["api-key"];
      // @ts-ignore
      apiKey.apiKey = config.apiKey;

      const resposeData = await fetch("https://api.brevo.com/v3/contacts", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // @ts-ignore
          "api-key": config.apiKey,
        },
      });

      const data = await resposeData.json();

      const apiUrl = "https://api.brevo.com/v3/smtp/email";

      const emailData = {
        sender: {
          name: user.email,
          email: user.email,
        },
        // to: data.contacts,
        bcc: data.contacts,
        subject: body.subject,
        htmlContent: body.body,
      };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // @ts-ignore
          "api-key": config.apiKey,
        },
        body: JSON.stringify(emailData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Email sent successfully:", data);
          return data;
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    } catch (error) {
      throw new Error(error.toString());
    }
  },
});
