import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import StoreProvider from "@husqvarna/hbd-ui/src/store/store-provider";
import { registerMiddleware } from "@husqvarna/hbd-ui/src/store";
import Settings from "@husqvarna/ui-core/settings";
import "@husqvarna/ui-core/style.css";
import "@husqvarna/hbd-ui/src";
import App from "./App";
import siteSettings from "./site-settings.json";

// Configure UI Core icons
Settings.componentIdentifier = true;
Settings.iconSpritePath = "/icons.svg";

// Set site settings required by hbd-ui components
(window as any).__SITE_SETTINGS__ = siteSettings;

// Suppress missing translation noise in prototype
import { IntlProvider as _IntlProvider, ReactIntlErrorCode } from "react-intl";
const originalDefaultProps = (_IntlProvider as any).defaultProps || {};
(_IntlProvider as any).defaultProps = {
  ...originalDefaultProps,
  onError: (err: any) => {
    if (
      err.code === ReactIntlErrorCode.MISSING_TRANSLATION ||
      err.code === ReactIntlErrorCode.INVALID_CONFIG
    ) {
      return;
    }
    console.error(err);
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IntlProvider locale="en-GB">
      <StoreProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreProvider>
    </IntlProvider>
  </React.StrictMode>
);
