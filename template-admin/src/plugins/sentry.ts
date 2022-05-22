import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import { App } from "vue";
import { Router } from "vue-router";
import settings from "@/settings";

export function setupSentry(app: App, router: Router) {
  if (settings.enableSentry) {
    Sentry.init({
      app,
      dsn: "<your_dsn>",
      integrations: [
        new BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(router),
          tracingOrigins: ["localhost", "my-site-url.com", /^\//],
        }),
      ],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
  }
}
