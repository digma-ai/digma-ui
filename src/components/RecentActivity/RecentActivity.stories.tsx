import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RecentActivity } from ".";
import { RecentActivityProps } from "./types";

export default {
  title: "Recent Activity/RecentActivity",
  component: RecentActivity,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
} as ComponentMeta<typeof RecentActivity>;

const Template: ComponentStory<typeof RecentActivity> = (
  args: RecentActivityProps
) => <RecentActivity {...args} />;

export const Empty = Template.bind({});
Empty.args = {};

export const WithData = Template.bind({});
WithData.args = {
  data: {
    environments: ["ENV_RENDER", "UNSET_ENV"],
    entries: [
      {
        environment: "ENV_RENDER",
        traceFlowDisplayName: "PetClinicWithAgent:HTTP GET /webjars/**",
        firstEntrySpan: {
          displayText: "PetClinicWithAgent:HTTP GET /webjars/**",
          serviceName: "PetClinicWithAgent",
          scopeId: "HTTP GET /webjars/**",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /webjars/**",
          methodCodeObjectId: ""
        },
        lastEntrySpan: null,
        latestTraceId: "DB80F24773E2BBE574E97960F9CB0D64",
        latestTraceTimestamp: "2023-02-07T12:59:21.794Z",
        latestTraceDuration: {
          value: 3.9,
          unit: "ms",
          raw: 3902134
        },
        slimAggregatedInsights: []
      },
      {
        environment: "ENV_RENDER",
        traceFlowDisplayName: "PetClinicWithAgent:HTTP GET /webjars/**",
        firstEntrySpan: {
          displayText: "PetClinicWithAgent:HTTP GET /webjars/**",
          serviceName: "PetClinicWithAgent",
          scopeId: "HTTP GET /webjars/**",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /webjars/**",
          methodCodeObjectId: ""
        },
        lastEntrySpan: null,
        latestTraceId: "DB80F24773E2BBE574E97960F9CB0D64",
        latestTraceTimestamp: "2023-02-07T12:59:21.794Z",
        latestTraceDuration: {
          value: 3.9,
          unit: "ms",
          raw: 3902134
        },
        slimAggregatedInsights: []
      },
      {
        environment: "ENV_RENDER",
        traceFlowDisplayName: "PetClinicWithAgent:HTTP GET /owners/{ownerId}",
        firstEntrySpan: {
          displayText: "PetClinicWithAgent:HTTP GET /owners/{ownerId}",
          serviceName: "PetClinicWithAgent",
          scopeId: "HTTP GET /owners/{ownerId}",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/{ownerId}",
          methodCodeObjectId:
            "org.springframework.samples.petclinic.owner.OwnerController$_$showOwner"
        },
        lastEntrySpan: null,
        latestTraceId: "64CFA03CF78919C46ECBC96B9EC07E35",
        latestTraceTimestamp: "2023-01-30T09:39:43.03647Z",
        latestTraceDuration: {
          value: 9.96,
          unit: "ms",
          raw: 9964194
        },
        slimAggregatedInsights: [
          {
            type: "HotSpot",
            codeObjectIds: [
              "org.springframework.samples.petclinic.owner.OwnerController$_$showOwner"
            ]
          }
        ]
      },
      {
        environment: "ENV_RENDER",
        traceFlowDisplayName: "PetClinicWithAgent:HTTP GET /owners",
        firstEntrySpan: {
          displayText: "PetClinicWithAgent:HTTP GET /owners",
          serviceName: "PetClinicWithAgent",
          scopeId: "HTTP GET /owners",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners",
          methodCodeObjectId:
            "org.springframework.samples.petclinic.owner.OwnerController$_$processFindForm"
        },
        lastEntrySpan: null,
        latestTraceId: "BD9F4E2166D527AD168672E4A7DEB4FA",
        latestTraceTimestamp: "2023-01-30T09:39:42.140086Z",
        latestTraceDuration: {
          value: 13,
          unit: "ms",
          raw: 12998642
        },
        slimAggregatedInsights: [
          {
            type: "SlowestSpans",
            codeObjectIds: [
              "org.springframework.samples.petclinic.owner.OwnerController$_$processFindForm"
            ]
          },
          {
            type: "SpanEndpointBottleneck",
            codeObjectIds: [
              "org.springframework.samples.petclinic.owner.OwnerRepository$_$findByLastName"
            ]
          }
        ]
      },
      {
        environment: "ENV_RENDER",
        traceFlowDisplayName: "PetClinicWithAgent:HTTP GET /owners/find",
        firstEntrySpan: {
          displayText: "PetClinicWithAgent:HTTP GET /owners/find",
          serviceName: "PetClinicWithAgent",
          scopeId: "HTTP GET /owners/find",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/find",
          methodCodeObjectId:
            "org.springframework.samples.petclinic.owner.OwnerController$_$initFindForm"
        },
        lastEntrySpan: null,
        latestTraceId: "8A2E125F7165A13B08D62E0EDC0A62FF",
        latestTraceTimestamp: "2023-01-30T09:39:40.214951Z",
        latestTraceDuration: {
          value: 4.45,
          unit: "ms",
          raw: 4446862
        },
        slimAggregatedInsights: []
      },
      {
        environment: "ENV_RENDER",
        traceFlowDisplayName: "PetClinicWithAgent:HTTP GET /",
        firstEntrySpan: {
          displayText: "PetClinicWithAgent:HTTP GET /",
          serviceName: "PetClinicWithAgent",
          scopeId: "HTTP GET /",
          spanCodeObjectId: "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /",
          methodCodeObjectId:
            "org.springframework.samples.petclinic.system.WelcomeController$_$welcome"
        },
        lastEntrySpan: null,
        latestTraceId: "4A819C438C6A18E669180D08729DC48F",
        latestTraceTimestamp: "2023-01-30T09:39:39.669249Z",
        latestTraceDuration: {
          value: 4.55,
          unit: "ms",
          raw: 4549011
        },
        slimAggregatedInsights: []
      },
      {
        environment: "ENV_RENDER",
        traceFlowDisplayName: "PetClinicWithAgent:HTTP GET /vets.html",
        firstEntrySpan: {
          displayText: "PetClinicWithAgent:HTTP GET /vets.html",
          serviceName: "PetClinicWithAgent",
          scopeId: "HTTP GET /vets.html",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /vets.html",
          methodCodeObjectId:
            "org.springframework.samples.petclinic.vet.VetController$_$showVetList"
        },
        lastEntrySpan: null,
        latestTraceId: "66CE458E5FF9F54E930DE5DB48B07E65",
        latestTraceTimestamp: "2023-01-30T09:39:37.650562Z",
        latestTraceDuration: {
          value: 58.49,
          unit: "ms",
          raw: 58492826
        },
        slimAggregatedInsights: [
          {
            type: "SlowestSpans",
            codeObjectIds: [
              "org.springframework.samples.petclinic.vet.VetController$_$showVetList"
            ]
          },
          {
            type: "SpanEndpointBottleneck",
            codeObjectIds: [
              "io.opentelemetry.spring-webmvc-6.0$_$Render vets/vetList"
            ]
          }
        ]
      },
      {
        environment: "ENV_RENDER",
        traceFlowDisplayName:
          "PetClinicWithAgent:HTTP POST /owners/{ownerId}/pets/new",
        firstEntrySpan: {
          displayText:
            "PetClinicWithAgent:HTTP POST /owners/{ownerId}/pets/new",
          serviceName: "PetClinicWithAgent",
          scopeId: "HTTP POST /owners/{ownerId}/pets/new",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP POST /owners/{ownerId}/pets/new",
          methodCodeObjectId:
            "org.springframework.samples.petclinic.owner.PetController$_$processCreationForm"
        },
        lastEntrySpan: null,
        latestTraceId: "3E72B5F5AF009AE6141C616DAB4999DB",
        latestTraceTimestamp: "2023-01-30T09:29:23.259494Z",
        latestTraceDuration: {
          value: 39.86,
          unit: "ms",
          raw: 39863411
        },
        slimAggregatedInsights: [
          {
            type: "SpanEndpointBottleneck",
            codeObjectIds: [
              "org.springframework.samples.petclinic.owner.OwnerRepository$_$save"
            ]
          }
        ]
      },
      {
        environment: "ENV_RENDER",
        traceFlowDisplayName:
          "PetClinicWithAgent:HTTP GET /owners/{ownerId}/pets/new",
        firstEntrySpan: {
          displayText: "PetClinicWithAgent:HTTP GET /owners/{ownerId}/pets/new",
          serviceName: "PetClinicWithAgent",
          scopeId: "HTTP GET /owners/{ownerId}/pets/new",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/{ownerId}/pets/new",
          methodCodeObjectId:
            "org.springframework.samples.petclinic.owner.PetController$_$initCreationForm"
        },
        lastEntrySpan: null,
        latestTraceId: "5D2B5A3CE1E127A5BFBFD953573DE985",
        latestTraceTimestamp: "2023-01-30T09:29:16.681077Z",
        latestTraceDuration: {
          value: 37.3,
          unit: "ms",
          raw: 37296736
        },
        slimAggregatedInsights: []
      },
      {
        environment: "ENV_RENDER",
        traceFlowDisplayName:
          "PetClinicWithAgent:HTTP POST /owners/{ownerId}/edit",
        firstEntrySpan: {
          displayText: "PetClinicWithAgent:HTTP POST /owners/{ownerId}/edit",
          serviceName: "PetClinicWithAgent",
          scopeId: "HTTP POST /owners/{ownerId}/edit",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP POST /owners/{ownerId}/edit",
          methodCodeObjectId:
            "org.springframework.samples.petclinic.owner.OwnerController$_$processUpdateOwnerForm"
        },
        lastEntrySpan: null,
        latestTraceId: "C6C9545A395BAFB37D2FF42EB96183EB",
        latestTraceTimestamp: "2023-01-30T09:25:57.35119Z",
        latestTraceDuration: {
          value: 124.8,
          unit: "ms",
          raw: 124800876
        },
        slimAggregatedInsights: [
          {
            type: "SlowestSpans",
            codeObjectIds: [
              "org.springframework.samples.petclinic.owner.OwnerController$_$processUpdateOwnerForm"
            ]
          },
          {
            type: "SpanEndpointBottleneck",
            codeObjectIds: [
              "org.springframework.samples.petclinic.owner.OwnerRepository$_$save"
            ]
          }
        ]
      },
      {
        environment: "ENV_RENDER",
        traceFlowDisplayName:
          "PetClinicWithAgent:HTTP GET /owners/{ownerId}/edit",
        firstEntrySpan: {
          displayText: "PetClinicWithAgent:HTTP GET /owners/{ownerId}/edit",
          serviceName: "PetClinicWithAgent",
          scopeId: "HTTP GET /owners/{ownerId}/edit",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/{ownerId}/edit",
          methodCodeObjectId:
            "org.springframework.samples.petclinic.owner.OwnerController$_$initUpdateOwnerForm"
        },
        lastEntrySpan: null,
        latestTraceId: "B6CFB46AE4F090D43B38CF3A51291A14",
        latestTraceTimestamp: "2023-01-30T09:25:49.164936Z",
        latestTraceDuration: {
          value: 32.85,
          unit: "ms",
          raw: 32848772
        },
        slimAggregatedInsights: []
      },
      {
        environment: "UNSET_ENV",
        traceFlowDisplayName: "my-first-mn-app:HTTP GET /whiskey/get/{name}",
        firstEntrySpan: {
          displayText: "na:na",
          serviceName: "na",
          scopeId: "na",
          spanCodeObjectId: "na",
          methodCodeObjectId: null
        },
        lastEntrySpan: null,
        latestTraceId: "ED0C93D748A2035AD021377A6F3C2F86",
        latestTraceTimestamp: "2023-01-29T13:09:13.341318Z",
        latestTraceDuration: {
          value: 1.09,
          unit: "ms",
          raw: 1087700
        },
        slimAggregatedInsights: []
      },
      {
        environment: "UNSET_ENV",
        traceFlowDisplayName: "my-first-mn-app:HTTP GET /book/get/{id}",
        firstEntrySpan: {
          displayText: "na:na",
          serviceName: "na",
          scopeId: "na",
          spanCodeObjectId: "na",
          methodCodeObjectId: null
        },
        lastEntrySpan: null,
        latestTraceId: "7A2EF4162A16FE7836841DD60C1C610A",
        latestTraceTimestamp: "2023-01-29T12:53:17.361202Z",
        latestTraceDuration: {
          value: 38.24,
          unit: "ms",
          raw: 38239200
        },
        slimAggregatedInsights: []
      },
      {
        environment: "UNSET_ENV",
        traceFlowDisplayName: "my-first-mn-app:HTTP GET /book/id/{id}",
        firstEntrySpan: {
          displayText: "na:na",
          serviceName: "na",
          scopeId: "na",
          spanCodeObjectId: "na",
          methodCodeObjectId: null
        },
        lastEntrySpan: null,
        latestTraceId: "C0AAEAE7D9B8929CEA1F3D1464A80C99",
        latestTraceTimestamp: "2023-01-29T12:53:02.290752Z",
        latestTraceDuration: {
          value: 7.62,
          unit: "ms",
          raw: 7619500
        },
        slimAggregatedInsights: []
      },
      {
        environment: "UNSET_ENV",
        traceFlowDisplayName: "my-first-mn-app:HTTP GET GET - /",
        firstEntrySpan: {
          displayText: "na:na",
          serviceName: "na",
          scopeId: "na",
          spanCodeObjectId: "na",
          methodCodeObjectId: null
        },
        lastEntrySpan: null,
        latestTraceId: "D7EFB24B92C2EFEB6EB4E9F9181BD737",
        latestTraceTimestamp: "2023-01-29T12:52:53.9949Z",
        latestTraceDuration: {
          value: 238.79,
          unit: "ms",
          raw: 238791600
        },
        slimAggregatedInsights: []
      },
      {
        environment: "UNSET_ENV",
        traceFlowDisplayName: "my-first-mn-app:HTTP GET /users/get/{username}",
        firstEntrySpan: {
          displayText: "na:na",
          serviceName: "na",
          scopeId: "na",
          spanCodeObjectId: "na",
          methodCodeObjectId: null
        },
        lastEntrySpan: null,
        latestTraceId: "FB593F5978A19F9FD09B71ECD49C22B4",
        latestTraceTimestamp: "2023-01-29T12:33:05.89872Z",
        latestTraceDuration: {
          value: 1.32,
          unit: "ms",
          raw: 1321000
        },
        slimAggregatedInsights: []
      },
      {
        environment: "UNSET_ENV",
        traceFlowDisplayName: "my-first-mn-app:HTTP GET /book",
        firstEntrySpan: {
          displayText: "na:na",
          serviceName: "na",
          scopeId: "na",
          spanCodeObjectId: "na",
          methodCodeObjectId: null
        },
        lastEntrySpan: null,
        latestTraceId: "77284D368A3122C01B4ACCC18C83AEFF",
        latestTraceTimestamp: "2023-01-29T12:32:35.333618Z",
        latestTraceDuration: {
          value: 1.11,
          unit: "ms",
          raw: 1113600
        },
        slimAggregatedInsights: []
      },
      {
        environment: "UNSET_ENV",
        traceFlowDisplayName:
          "PetClinicWithAgent:HTTP GET /SampleInsights/HighUsage",
        firstEntrySpan: {
          displayText: "na:na",
          serviceName: "na",
          scopeId: "na",
          spanCodeObjectId: "na",
          methodCodeObjectId: null
        },
        lastEntrySpan: null,
        latestTraceId: "5AA14D37EFC218878A45E341DF4ACE2E",
        latestTraceTimestamp: "2023-01-26T15:27:03.009074Z",
        latestTraceDuration: {
          value: 6,
          unit: "ms",
          raw: 6004792
        },
        slimAggregatedInsights: []
      },
      {
        environment: "UNSET_ENV",
        traceFlowDisplayName:
          "PetClinicWithAgent:HTTP GET /SampleInsights/ErrorHotspot",
        firstEntrySpan: {
          displayText: "na:na",
          serviceName: "na",
          scopeId: "na",
          spanCodeObjectId: "na",
          methodCodeObjectId: null
        },
        lastEntrySpan: null,
        latestTraceId: "3B692DFE97379C119BB4960DDFA51268",
        latestTraceTimestamp: "2023-01-26T15:27:01.035306Z",
        latestTraceDuration: {
          value: 1.98,
          unit: "ms",
          raw: 1979067
        },
        slimAggregatedInsights: []
      },
      {
        environment: "UNSET_ENV",
        traceFlowDisplayName:
          "PetClinicWithAgent:HTTP GET /SampleInsights/SpanBottleneck",
        firstEntrySpan: {
          displayText: "na:na",
          serviceName: "na",
          scopeId: "na",
          spanCodeObjectId: "na",
          methodCodeObjectId: null
        },
        lastEntrySpan: null,
        latestTraceId: "CEB1C28473439717AA7F212B0991B312",
        latestTraceTimestamp: "2023-01-26T15:27:00.776231Z",
        latestTraceDuration: {
          value: 250.87,
          unit: "ms",
          raw: 250869118
        },
        slimAggregatedInsights: []
      },
      {
        environment: "UNSET_ENV",
        traceFlowDisplayName:
          "PetClinicWithAgent:HTTP GET /SampleInsights/SlowEndpoint",
        firstEntrySpan: {
          displayText: "na:na",
          serviceName: "na",
          scopeId: "na",
          spanCodeObjectId: "na",
          methodCodeObjectId: null
        },
        lastEntrySpan: null,
        latestTraceId: "ABA784C0D7BA52F4FBF529FB17B91DBC",
        latestTraceTimestamp: "2023-01-26T15:26:58.01489Z",
        latestTraceDuration: {
          value: 2.51,
          unit: "sec",
          raw: 2505131829
        },
        slimAggregatedInsights: []
      }
    ]
  }
};
