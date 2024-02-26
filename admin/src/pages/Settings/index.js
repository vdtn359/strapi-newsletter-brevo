import React, { memo } from "react";

import {
  Layout,
  ContentLayout,
  BaseHeaderLayout,
  Select,
  Option,
  Button,
  TextInput,
  Box,
  // @ts-ignore
} from "@strapi/design-system";

import {
  ButtonContainer,
  InputContainer,
  StyledAlert,
  StyledTypography,
} from "./styles";
import {
  checkMailchimpConnection,
  checkConvertKitConnection,
  checkBrevoConnection,
  getSettings,
  setSettings,
} from "../../utils/api";

const defaultSettings = {
  apiKey: "",
  apiSecret: "",
  dc: "",
  listID: "",
  formId: "",
};

const Settings = () => {
  const [selectedProvider, setSelectedProvider] = React.useState();
  const [fields, setFields] = React.useState(defaultSettings);
  const [keys, setKeys] = React.useState({});

  const [successfulMessage, setSuccessfulMessage] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const providers = ["mailchimp", "convertkit", "brevo"];

  //for mailchim code
  const providerFunctions = {
    mailchimp: {
      name: "Mailchimp",
      validator: () => {
        if (!fields.apiKey || !fields.dc || !fields.listID) {
          return false;
        }

        return true;
      },
      checkConnection: async () => {
        try {
          await checkMailchimpConnection();
          setIsError(false);
          // @ts-ignore
          setSuccessfulMessage("Connection Successful");
        } catch (error) {
          setIsError(true);
          setSuccessfulMessage(null);
        }
      },
      renderView: () => (
        <InputContainer>
          <div>
            <TextInput
              // @ts-ignore
              placeholder="API Key"
              label="API Key"
              required
              onChange={(e) =>
                setFields((prev) => ({
                  ...prev,
                  apiKey: e.target.value,
                }))
              }
              value={fields.apiKey}
              type="password"
            />
          </div>

          <div>
            <TextInput
              // @ts-ignore
              placeholder="DC"
              label="DC"
              required
              onChange={(e) =>
                setFields((prev) => ({
                  ...prev,
                  dc: e.target.value,
                }))
              }
              value={fields.dc}
            />
          </div>

          <div>
            <TextInput
              // @ts-ignore
              placeholder="List ID"
              label="List ID"
              required
              onChange={(e) =>
                setFields((prev) => ({
                  ...prev,
                  listID: e.target.value,
                }))
              }
              value={fields.listID}
            />
          </div>

          <StyledTypography as="h3">
            Read{" "}
            <a
              href="https://mailchimp.com/en-gb/help/find-audience-id/"
              target="_blank"
            >
              here
            </a>{" "}
            to learn how to get the list ID from mailchimp.
          </StyledTypography>
        </InputContainer>
      ),
    },

    //my code for brevo

    brevo: {
      name: "brevo",
      validator: () => {
        if (!fields.apiKey) {
          return false;
        }

        return true;
      },
      checkConnection: async () => {
        try {
          await checkBrevoConnection();
          setIsError(false);
          // @ts-ignore
          setSuccessfulMessage("Connection Successful");
        } catch (error) {
          setIsError(true);
          setSuccessfulMessage(null);
        }
      },
      renderView: () => (
        <InputContainer>
          <div>
            <TextInput
              // @ts-ignore
              placeholder="API Key"
              label="API Key"
              required
              onChange={(e) =>
                setFields((prev) => ({
                  ...prev,
                  apiKey: e.target.value,
                }))
              }
              value={fields.apiKey}
              type="password"
            />
          </div>

          {/* <div>
            <TextInput
              // @ts-ignore
              placeholder="List ID"
              label="List ID"
              required
              onChange={(e) =>
                setFields((prev) => ({
                  ...prev,
                  listID: e.target.value,
                }))
              }
              value={fields.listID}
            />
          </div> */}
        </InputContainer>
      ),
    },

    //end of brevo
    convertkit: {
      name: "Convert Kit",
      validator: () => {
        if (!fields.apiKey || !fields.apiSecret || !fields.formId) {
          return false;
        }

        return true;
      },
      checkConnection: async () => {
        try {
          await checkConvertKitConnection();
          setIsError(false);
          // @ts-ignore
          setSuccessfulMessage("Connection Successful");
        } catch (error) {
          setIsError(true);
          setSuccessfulMessage(null);
        }
      },
      renderView: () => (
        <InputContainer>
          <div>
            <TextInput
              // @ts-ignore
              placeholder="API Key"
              label="API Key"
              required
              onChange={(e) =>
                setFields((prev) => ({
                  ...prev,
                  apiKey: e.target.value,
                }))
              }
              value={fields.apiKey}
            />
          </div>

          <div>
            <TextInput
              // @ts-ignore
              placeholder="API Secret"
              label="API Secret"
              required
              onChange={(e) =>
                setFields((prev) => ({
                  ...prev,
                  apiSecret: e.target.value,
                }))
              }
              value={fields.apiSecret}
              type="password"
            />
          </div>

          <div>
            <TextInput
              // @ts-ignore
              placeholder="Form ID"
              label="Form ID"
              required
              onChange={(e) =>
                setFields((prev) => ({
                  ...prev,
                  formId: e.target.value,
                }))
              }
              value={fields.formId}
            />
          </div>
        </InputContainer>
      ),
    },
  };

  React.useEffect(() => {
    getUserSettings();
  }, []);

  const getUserSettings = async () => {
    const {
      data: { provider, ...data },
    } = await getSettings();

    setKeys(data);
    setFields(data);
    setSelectedProvider(provider);
  };

  const setUserSettings = async () => {
    const { data } = await setSettings({
      ...fields,
      provider: selectedProvider,
    });

    try {
      setKeys(data);
      // @ts-ignore
      setSuccessfulMessage("Settings saved successfully");
    } catch (error) {
      setIsError(true);
      setSuccessfulMessage(null);
    }
  };

  return (
    <Layout sideNav={undefined}>
      <BaseHeaderLayout
        title="Strapi Newsletter"
        subtitle="Setup Your Newsletter Provider"
      />

      <ContentLayout>
        {successfulMessage && (
          <StyledAlert
            closeLabel="Close alert"
            title="Success"
            variant="success"
            onClose={() => {
              setSuccessfulMessage(null);
            }}
          >
            {successfulMessage}
          </StyledAlert>
        )}

        {isError && (
          <StyledAlert
            closeLabel="Close alert"
            title="Error"
            variant="danger"
            onClose={() => {
              setIsError(false);
            }}
          >
            Error occurred, Please check your settings
          </StyledAlert>
        )}

        <Box padding={8} shadow="tableShadow" background="neutral0" hasRadius>
          <Select
            label="Email Newsletter Provider"
            value={selectedProvider}
            onChange={(e) => {
              if (e != selectedProvider) {
                setFields(defaultSettings);
              } else {
                // @ts-ignore
                setFields(keys);
              }
              setSelectedProvider(e);
            }}
          >
            {providers.map((provider) => (
              <Option key={provider} value={provider}>
                {providerFunctions[provider].name}
              </Option>
            ))}
          </Select>
          <div>
            {selectedProvider &&
              // @ts-ignore
              providerFunctions[selectedProvider].renderView()}
          </div>

          <StyledTypography as="h3">
            Configure A Newsletter Provider and Click On Check Connection Button
            After Saving Your Settings To Check If Your API Keys are Working.
          </StyledTypography>

          <ButtonContainer>
            <Button
              onClick={async () => {
                const validateResponse =
                  providerFunctions[selectedProvider].validator();

                if (!validateResponse) return;

                await setUserSettings();
              }}
            >
              Save Keys
            </Button>
            <Button
              variant="tertiary"
              disabled={
                Object.entries(keys).length == 0 ||
                // @ts-ignore
                fields.apiKey !== keys.apiKey
              }
              onClick={() => {
                providerFunctions[selectedProvider].checkConnection();
              }}
            >
              Check Connection
            </Button>
          </ButtonContainer>
        </Box>
      </ContentLayout>
    </Layout>
  );
};

export default memo(Settings);
