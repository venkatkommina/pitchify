import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://0ed6a6a19a269aa4edb4452a481d7b32@o4509144365858816.ingest.de.sentry.io/4509144368152656",
  integrations: [
    // Sentry.feedbackIntegration({
    //   // Additional SDK configuration goes in here, for example:
    //   colorScheme: "system",
    //   isNameRequired: true,
    //   isEmailRequired: true,
    // }),
  ],
});
