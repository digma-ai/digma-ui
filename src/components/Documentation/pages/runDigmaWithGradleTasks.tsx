import { PageContent } from "./types";

export const runDigmaWithGradleTasks: PageContent = {
  title: "How to use Digma if you're using custom native Gradle tasks",
  sections: [
    {
      content: (
        <>
          <span>
            Digma will automatically collect application data from common Gradle
            tasks such as <code>bootRun</code>. If you&apos;re using your own
            custom task and want Digma to collect data from it, you can add an
            environment variable to your run configuration so that Digma will
            know to observe this task.
          </span>
          <span>
            To do so, simply add the environment variable{" "}
            <code>DIGMA_OBSERVABILITY=true</code>
          </span>
          <img src="/images/observabilityEnvVariable.png" />
          <span>
            That&apos;s it! Digma will now collect information about your task.
          </span>
        </>
      )
    }
  ]
};
