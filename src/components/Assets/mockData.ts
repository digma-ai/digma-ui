import { AssetsData } from "./types";

export const data: AssetsData = {
  accountId: "00000000-0000-0000-0000-000000000000",
  environment: "BOB-LAPTOP[LOCAL]",
  serviceAssetsEntries: [
    {
      itemType: "SpanAssets",
      assetEntries: [
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "SELECT org.springframework.samples.petclinic.owner.PetType",
            displayName:
              "SELECT org.springframework.samples.petclinic.owner.PetType",
            instrumentationLibrary: "io.opentelemetry.hibernate-6.0",
            spanCodeObjectId:
              "span:io.opentelemetry.hibernate-6.0$_$SELECT org.springframework.samples.petclinic.owner.PetType",
            methodCodeObjectId: "",
            kind: "Internal",
            codeObjectId: ""
          },
          assetType: "Other",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 442.04,
                unit: "μs",
                raw: 442042
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["9316AB9977582858CF8486458925BB4A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 2.06,
                unit: "ms",
                raw: 2063332.9999999993
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["0B9E578557989324EEA1509B22EA2D6E"]
            }
          ],
          impactScores: {
            ScoreExp25: -1,
            ScoreExp1000: -1
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9316AB9977582858CF8486458925BB4A",
            spanId: "04F731D0409E792A",
            startTime: "2023-08-03T15:03:10.033838Z",
            duration: {
              value: 118.79,
              unit: "μs",
              raw: 118791
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:17.92583Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "SELECT org.springframework.samples.petclinic.vet.Vet",
            displayName: "SELECT org.springframework.samples.petclinic.vet.Vet",
            instrumentationLibrary: "io.opentelemetry.hibernate-6.0",
            spanCodeObjectId:
              "span:io.opentelemetry.hibernate-6.0$_$SELECT org.springframework.samples.petclinic.vet.Vet",
            methodCodeObjectId: "",
            kind: "Internal",
            codeObjectId: ""
          },
          assetType: "Other",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 163.88,
                unit: "ms",
                raw: 163878333
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["4D38B1BF14B7D13C45CF7C58B76E2E17"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 163.88,
                unit: "ms",
                raw: 163878333
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["4D38B1BF14B7D13C45CF7C58B76E2E17"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanEndpointBottleneck",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "4D38B1BF14B7D13C45CF7C58B76E2E17",
            spanId: "F17FE0AFEE441259",
            startTime: "2023-08-03T15:02:51.294666Z",
            duration: {
              value: 5.03,
              unit: "ms",
              raw: 5034583
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.942604Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "Transaction.commit",
            displayName: "Transaction.commit",
            instrumentationLibrary: "io.opentelemetry.hibernate-6.0",
            spanCodeObjectId:
              "span:io.opentelemetry.hibernate-6.0$_$Transaction.commit",
            methodCodeObjectId: "",
            kind: "Internal",
            codeObjectId: ""
          },
          assetType: "Other",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 46.79,
                unit: "μs",
                raw: 46792
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["D076C5BBD0FA8838F2063C7120A72260"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 108.84,
                unit: "μs",
                raw: 108843.79999999999
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["916006BE36E867C3FAD77626C1B73BEF"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingWell",
              importance: 5,
              shortDisplayInfo: {
                title: "No Scaling Issue Detected",
                targetDisplayName: "",
                subtitle: "",
                description:
                  "This code is scaling well at concurrent executions"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9316AB9977582858CF8486458925BB4A",
            spanId: "AA6A59110CCDEC7D",
            startTime: "2023-08-03T15:03:10.033996Z",
            duration: {
              value: 20.04,
              unit: "μs",
              raw: 20042
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:17.92863Z"
        },
        {
          span: {
            classification: "Rendering",
            role: "Internal",
            name: "Render owners/createOrUpdateOwnerForm",
            displayName: "Render owners/createOrUpdateOwnerForm",
            instrumentationLibrary: "io.opentelemetry.spring-webmvc-6.0",
            spanCodeObjectId:
              "span:io.opentelemetry.spring-webmvc-6.0$_$Render owners/createOrUpdateOwnerForm",
            methodCodeObjectId: "",
            kind: "Internal",
            codeObjectId: ""
          },
          assetType: "Other",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 3.57,
                unit: "ms",
                raw: 3569646
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3CDF279F7208336BC76A80B0E1FBF611"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 34.51,
                unit: "ms",
                raw: 34514016.79999999
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["6A524B7D6F2170A7E933F8645D9FB9E0"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "A5B2C18C7F88BF17381ED1FD7B57A3C3",
            spanId: "CE24F4630310BE97",
            startTime: "2023-08-03T15:03:10.022954Z",
            duration: {
              value: 1.61,
              unit: "ms",
              raw: 1609333
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:17.900691Z"
        },
        {
          span: {
            classification: "Rendering",
            role: "Internal",
            name: "Render owners/findOwners",
            displayName: "Render owners/findOwners",
            instrumentationLibrary: "io.opentelemetry.spring-webmvc-6.0",
            spanCodeObjectId:
              "span:io.opentelemetry.spring-webmvc-6.0$_$Render owners/findOwners",
            methodCodeObjectId: "",
            kind: "Internal",
            codeObjectId: ""
          },
          assetType: "Other",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 627.17,
                unit: "μs",
                raw: 627167
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["244DAD19FF36A648BFDCF18CEC58EB97"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 8.25,
                unit: "ms",
                raw: 8252414.349999995
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["CE966416543013950B27E0295939D336"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9D767B5368F97B6C6349C45D5EE82AE8",
            spanId: "51B38C21E4F11C69",
            startTime: "2023-08-03T15:02:51.72937Z",
            duration: {
              value: 641.33,
              unit: "μs",
              raw: 641333
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.973588Z"
        },
        {
          span: {
            classification: "Rendering",
            role: "Internal",
            name: "Render owners/ownerDetails",
            displayName: "Render owners/ownerDetails",
            instrumentationLibrary: "io.opentelemetry.spring-webmvc-6.0",
            spanCodeObjectId:
              "span:io.opentelemetry.spring-webmvc-6.0$_$Render owners/ownerDetails",
            methodCodeObjectId: "",
            kind: "Internal",
            codeObjectId: ""
          },
          assetType: "Other",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.28,
                unit: "ms",
                raw: 1275917
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["39D9C1A27AF2BFFA5D51DDB14447755E"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 10.42,
                unit: "ms",
                raw: 10419499.999999996
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["916006BE36E867C3FAD77626C1B73BEF"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "974ADBA5DCC1E662F4832D54D4D5C6C9",
            spanId: "5840D7194838F6FD",
            startTime: "2023-08-03T15:02:51.580973Z",
            duration: {
              value: 2.85,
              unit: "ms",
              raw: 2850750
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.97477Z"
        },
        {
          span: {
            classification: "Rendering",
            role: "Internal",
            name: "Render owners/ownersList",
            displayName: "Render owners/ownersList",
            instrumentationLibrary: "io.opentelemetry.spring-webmvc-6.0",
            spanCodeObjectId:
              "span:io.opentelemetry.spring-webmvc-6.0$_$Render owners/ownersList",
            methodCodeObjectId: "",
            kind: "Internal",
            codeObjectId: ""
          },
          assetType: "Other",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.03,
                unit: "ms",
                raw: 1026604
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3D386C057A67DB84EFF002176AD6B34F"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 8.84,
                unit: "ms",
                raw: 8836250
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["E459E0CCBCE2A1B4400C67E9593FC9BD"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "327F1AF74124C7044B7DB1022B5E77FD",
            spanId: "BEC12D7D553A900E",
            startTime: "2023-08-03T15:02:51.708697Z",
            duration: {
              value: 781.29,
              unit: "μs",
              raw: 781291
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.99183Z"
        },
        {
          span: {
            classification: "Rendering",
            role: "Internal",
            name: "Render pets/createOrUpdatePetForm",
            displayName: "Render pets/createOrUpdatePetForm",
            instrumentationLibrary: "io.opentelemetry.spring-webmvc-6.0",
            spanCodeObjectId:
              "span:io.opentelemetry.spring-webmvc-6.0$_$Render pets/createOrUpdatePetForm",
            methodCodeObjectId: "",
            kind: "Internal",
            codeObjectId: ""
          },
          assetType: "Other",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 4.06,
                unit: "ms",
                raw: 4059917
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["9316AB9977582858CF8486458925BB4A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 18.48,
                unit: "ms",
                raw: 18478625
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["0B9E578557989324EEA1509B22EA2D6E"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9316AB9977582858CF8486458925BB4A",
            spanId: "7A4212ADDBC89608",
            startTime: "2023-08-03T15:03:10.030119Z",
            duration: {
              value: 4.06,
              unit: "ms",
              raw: 4059917
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:17.907205Z"
        },
        {
          span: {
            classification: "Rendering",
            role: "Internal",
            name: "Render vets/vetList",
            displayName: "Render vets/vetList",
            instrumentationLibrary: "io.opentelemetry.spring-webmvc-6.0",
            spanCodeObjectId:
              "span:io.opentelemetry.spring-webmvc-6.0$_$Render vets/vetList",
            methodCodeObjectId: "",
            kind: "Internal",
            codeObjectId: ""
          },
          assetType: "Other",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.45,
                unit: "ms",
                raw: 1445792
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["0BF4464EFEED7AAE66435AE762109D29"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 23.13,
                unit: "ms",
                raw: 23128875
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["4D38B1BF14B7D13C45CF7C58B76E2E17"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "E4A02B938FEB0DB76132BDF0F452F48A",
            spanId: "DCD0B23F13AE577C",
            startTime: "2023-08-03T15:02:51.347746Z",
            duration: {
              value: 936.38,
              unit: "μs",
              raw: 936375
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.98249Z"
        },
        {
          span: {
            classification: "Rendering",
            role: "Internal",
            name: "Render welcome",
            displayName: "Render welcome",
            instrumentationLibrary: "io.opentelemetry.spring-webmvc-6.0",
            spanCodeObjectId:
              "span:io.opentelemetry.spring-webmvc-6.0$_$Render welcome",
            methodCodeObjectId: "",
            kind: "Internal",
            codeObjectId: ""
          },
          assetType: "Other",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.04,
                unit: "ms",
                raw: 1043333
              },
              previousDuration: {
                value: 1.9,
                unit: "ms",
                raw: 1900187.5
              },
              changeTime: "2023-08-03T15:01:55Z",
              changeVerified: true,
              traceIds: ["037FA570EC20318753AA187EA9D3CD5A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 7.32,
                unit: "ms",
                raw: 7317791.999999999
              },
              previousDuration: {
                value: 3.91,
                unit: "ms",
                raw: 3910703.799999999
              },
              changeTime: "2023-08-03T15:01:55Z",
              changeVerified: true,
              traceIds: ["037FA570EC20318753AA187EA9D3CD5A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "5E374DCAC4131F844AF870B6EF58F11D",
            spanId: "A6AAF26C32FB1A40",
            startTime: "2023-08-03T15:05:55.953559Z",
            duration: {
              value: 1.04,
              unit: "ms",
              raw: 1043333
            }
          },
          firstDataSeenTime: "2023-08-03T14:18:06.952074Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "db_access_01",
            displayName: "db_access_01",
            instrumentationLibrary: "SampleInsightsController",
            spanCodeObjectId: "span:SampleInsightsController$_$db_access_01",
            methodCodeObjectId: "",
            kind: "Internal",
            codeObjectId: ""
          },
          assetType: "Other",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.45,
                unit: "ms",
                raw: 1449167
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 1.45,
                unit: "ms",
                raw: 1449167
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "C33B2D4E684D00C5",
            startTime: "2023-08-03T15:03:15.617662Z",
            duration: {
              value: 244.46,
              unit: "μs",
              raw: 244458
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.966613Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "going-to-record-error",
            displayName: "going-to-record-error",
            instrumentationLibrary: "SampleInsightsController",
            spanCodeObjectId:
              "span:SampleInsightsController$_$going-to-record-error",
            methodCodeObjectId: "",
            kind: "Internal",
            codeObjectId: ""
          },
          assetType: "Other",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 867.42,
                unit: "μs",
                raw: 867417
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 867.42,
                unit: "μs",
                raw: 867417
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "47C7C36FD7F32792",
            startTime: "2023-08-03T15:03:18.311232Z",
            duration: {
              value: 21.12,
              unit: "μs",
              raw: 21125
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.991072Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "0423CF71E944C630050ECAEACB2F0C",
            displayName:
              "select s1_0.vet_id,s1_1.id,s1_1.name from vet_specialties s1_0 join specialties s1_1 on s1_1.id=s1_0.specialty_id where s1_0.vet_id=?",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$0423CF71E944C630050ECAEACB2F0C",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 222.71,
                unit: "μs",
                raw: 222709
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["4D38B1BF14B7D13C45CF7C58B76E2E17"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 222.71,
                unit: "μs",
                raw: 222709
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["4D38B1BF14B7D13C45CF7C58B76E2E17"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "4D38B1BF14B7D13C45CF7C58B76E2E17",
            spanId: "E1FC6231ED5D0B1A",
            startTime: "2023-08-03T15:02:51.292223Z",
            duration: {
              value: 69.12,
              unit: "μs",
              raw: 69125
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.940226Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "0432A12BBE1BB6839A0A1E4F1CAFC7",
            displayName: "CREATE INDEX specialties_name ON specialties (name)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$0432A12BBE1BB6839A0A1E4F1CAFC7",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 207.79,
                unit: "μs",
                raw: 207792
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["1D54BCB0F538EE13C259F5529B9A45CE"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 207.79,
                unit: "μs",
                raw: 207792
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["1D54BCB0F538EE13C259F5529B9A45CE"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "1D54BCB0F538EE13C259F5529B9A45CE",
            spanId: "523D2451AD4E7CC4",
            startTime: "2023-08-03T14:17:27.624452Z",
            duration: {
              value: 207.79,
              unit: "μs",
              raw: 207792
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:38.041911Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "062DB0F76E94C36D73CB5A6B280BE6",
            displayName:
              "select distinct o1_0.id,o1_0.address,o1_0.city,o1_0.first_name,o1_0.last_name,o1_0.telephone from owners o1_0 left join pets p1_0 on o1_0.id=p1_0.owner_id where o1_0.last_name like ? escape ? offset ? rows fetch first ? rows only",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$062DB0F76E94C36D73CB5A6B280BE6",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 304.02,
                unit: "μs",
                raw: 304021
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["F44698EA151C3CAA9C6D07B970308552"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 782.08,
                unit: "μs",
                raw: 782083.3999999998
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["E459E0CCBCE2A1B4400C67E9593FC9BD"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9D767B5368F97B6C6349C45D5EE82AE8",
            spanId: "1E12EF1A6392E7AD",
            startTime: "2023-08-03T15:02:51.728956Z",
            duration: {
              value: 220,
              unit: "μs",
              raw: 220000
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:08.01632Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "0C74510D2F23C8FDB53BFE886B9283",
            displayName: "select count(v1_0.id) from vets v1_0",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$0C74510D2F23C8FDB53BFE886B9283",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 90.75,
                unit: "μs",
                raw: 90750
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["4D38B1BF14B7D13C45CF7C58B76E2E17"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 90.75,
                unit: "μs",
                raw: 90750
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["4D38B1BF14B7D13C45CF7C58B76E2E17"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "4D38B1BF14B7D13C45CF7C58B76E2E17",
            spanId: "A48191E4344D6071",
            startTime: "2023-08-03T15:02:51.299524Z",
            duration: {
              value: 90.75,
              unit: "μs",
              raw: 90750
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.929329Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "1CDB3F92CD86C7C9383F926B863880",
            displayName: "CREATE INDEX visits_pet_id ON visits (pet_id)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$1CDB3F92CD86C7C9383F926B863880",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 161.38,
                unit: "μs",
                raw: 161375
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["383CFDFB7B8F65E805AB2B45FEB2411C"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 161.38,
                unit: "μs",
                raw: 161375
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["383CFDFB7B8F65E805AB2B45FEB2411C"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "383CFDFB7B8F65E805AB2B45FEB2411C",
            spanId: "D77D5BB346E4EA1D",
            startTime: "2023-08-03T14:17:27.635069Z",
            duration: {
              value: 161.38,
              unit: "μs",
              raw: 161375
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:38.133815Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "2326FF593BC7C6464A016ED4131F0A",
            displayName: "INSERT INTO pets VALUES (default, ?, ?, ?, ?)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$2326FF593BC7C6464A016ED4131F0A",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 156.96,
                unit: "μs",
                raw: 156958
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 394.16,
                unit: "μs",
                raw: 394159.7499999999
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "FD4E5DA878CC59F552DE3A3BC0DB59D6",
            spanId: "903EF594E1849B37",
            startTime: "2023-08-03T14:17:27.645178Z",
            duration: {
              value: 154.08,
              unit: "μs",
              raw: 154083
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.981216Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "2E769F001C399E53055039F0088C0D",
            displayName:
              "select p1_0.id,p1_0.name from types p1_0 order by p1_0.name",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$2E769F001C399E53055039F0088C0D",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 55.62,
                unit: "μs",
                raw: 55625
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["2CD05493B3F64BB401730A4D77076FB2"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 146.46,
                unit: "μs",
                raw: 146457.99999999997
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["0B9E578557989324EEA1509B22EA2D6E"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9316AB9977582858CF8486458925BB4A",
            spanId: "0C8450B4C29649E7",
            startTime: "2023-08-03T15:03:10.033896Z",
            duration: {
              value: 15.75,
              unit: "μs",
              raw: 15750
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:17.92238Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "39EEDC331DB240E757E8F6C63A516D",
            displayName: "DROP TABLE types IF EXISTS",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$39EEDC331DB240E757E8F6C63A516D",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 68.79,
                unit: "μs",
                raw: 68792
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 68.79,
                unit: "μs",
                raw: 68792
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "78C9AB4436CF9B86EEFD0A8C75DF641D",
            spanId: "A2671193E8CE75A5",
            startTime: "2023-08-03T14:17:27.619715Z",
            duration: {
              value: 68.79,
              unit: "μs",
              raw: 68792
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:38.074041Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "405F6BDE23A3D82CAFB7A47BC0B4BC",
            displayName:
              "CREATE TABLE types ( id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, name VARCHAR(?) )",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$405F6BDE23A3D82CAFB7A47BC0B4BC",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 340.92,
                unit: "μs",
                raw: 340917
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 340.92,
                unit: "μs",
                raw: 340917
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "C9468D9B8085EB7D4FBC81C496A4B1C8",
            spanId: "0CB14677A7CE7BF4",
            startTime: "2023-08-03T14:17:27.630597Z",
            duration: {
              value: 340.92,
              unit: "μs",
              raw: 340917
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.995539Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "46DDF2BB2D097FFB7E1F8035D0FAE1",
            displayName:
              "CREATE TABLE vet_specialties ( vet_id INTEGER NOT NULL, specialty_id INTEGER NOT NULL )",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$46DDF2BB2D097FFB7E1F8035D0FAE1",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 197.12,
                unit: "μs",
                raw: 197125
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["CDEE0D19C14CBD8B61F1CDEC066230FD"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 197.12,
                unit: "μs",
                raw: 197125
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["CDEE0D19C14CBD8B61F1CDEC066230FD"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "CDEE0D19C14CBD8B61F1CDEC066230FD",
            spanId: "1D2151B8C6FB40CF",
            startTime: "2023-08-03T14:17:27.624708Z",
            duration: {
              value: 197.12,
              unit: "μs",
              raw: 197125
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.935399Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "534C0FDAF3DB4EB83CBD1D5DDF0B5F",
            displayName:
              "CREATE TABLE specialties ( id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, name VARCHAR(?) )",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$534C0FDAF3DB4EB83CBD1D5DDF0B5F",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 419.29,
                unit: "μs",
                raw: 419292
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["5EEF271B121A3184D4B3D95303398247"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 419.29,
                unit: "μs",
                raw: 419292
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["5EEF271B121A3184D4B3D95303398247"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "5EEF271B121A3184D4B3D95303398247",
            spanId: "91B7C4849A85AA9A",
            startTime: "2023-08-03T14:17:27.623981Z",
            duration: {
              value: 419.29,
              unit: "μs",
              raw: 419292
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.820406Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "5C4D22A699D3A551E2AFFA4FA0B3BF",
            displayName:
              "select p1_0.owner_id,p1_0.id,p1_0.birth_date,p1_0.name,t1_0.id,t1_0.name,v1_0.pet_id,v1_0.id,v1_0.visit_date,v1_0.description from pets p1_0 left join types t1_0 on t1_0.id=p1_0.type_id left join visits v1_0 on p1_0.id=v1_0.pet_id where p1_0.owner_id=? order by v1_0.visit_date asc,p1_0.name",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$5C4D22A699D3A551E2AFFA4FA0B3BF",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 76.15,
                unit: "μs",
                raw: 76145.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3D386C057A67DB84EFF002176AD6B34F"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 115.17,
                unit: "μs",
                raw: 115166
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["E459E0CCBCE2A1B4400C67E9593FC9BD"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "327F1AF74124C7044B7DB1022B5E77FD",
            spanId: "F5A70B0D6F8DBD54",
            startTime: "2023-08-03T15:02:51.708232Z",
            duration: {
              value: 72.79,
              unit: "μs",
              raw: 72792
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.991984Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "5EC8CCD0FC2253EF7C5A3CCB0FA544",
            displayName: "DROP TABLE pets IF EXISTS",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$5EC8CCD0FC2253EF7C5A3CCB0FA544",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 48.54,
                unit: "μs",
                raw: 48542
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 48.54,
                unit: "μs",
                raw: 48542
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "972193204A5C7B134D7A023321EBA2F0",
            spanId: "13784E040C19DE6A",
            startTime: "2023-08-03T14:17:27.619626Z",
            duration: {
              value: 48.54,
              unit: "μs",
              raw: 48542
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.826511Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "63FCDB29701D42FA5ED4CE0ACCBA7C",
            displayName:
              "CREATE TABLE pets ( id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, name VARCHAR(?), birth_date DATE, type_id INTEGER NOT NULL, owner_id INTEGER )",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$63FCDB29701D42FA5ED4CE0ACCBA7C",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 340.46,
                unit: "μs",
                raw: 340458
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 340.46,
                unit: "μs",
                raw: 340458
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "6F750907BF7EC0B7BB46117D7FC6EFEF",
            spanId: "2194EAC4B1DD8938",
            startTime: "2023-08-03T14:17:27.631933Z",
            duration: {
              value: 340.46,
              unit: "μs",
              raw: 340458
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.882855Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "6664475742328A7BB3EA941976CD4F",
            displayName: "CREATE INDEX types_name ON types (name)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$6664475742328A7BB3EA941976CD4F",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 190.71,
                unit: "μs",
                raw: 190709
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 190.71,
                unit: "μs",
                raw: 190709
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "671AAFCFD34FB15DB3C35B1704B4560A",
            spanId: "0523147E2A4F259C",
            startTime: "2023-08-03T14:17:27.63098Z",
            duration: {
              value: 190.71,
              unit: "μs",
              raw: 190709
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:38.169938Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "6BBFBC487B6029B9331BD223881F34",
            displayName: "INSERT INTO types VALUES (default, ?)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$6BBFBC487B6029B9331BD223881F34",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 110.94,
                unit: "μs",
                raw: 110937.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 170,
                unit: "μs",
                raw: 170000
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["8B22E3DA2A01147481EC8AEAC5DD0B21"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "6912D6AA41D92B88CDED509D1B87482D",
            spanId: "29929DBE0657587B",
            startTime: "2023-08-03T14:17:27.640519Z",
            duration: {
              value: 112.12,
              unit: "μs",
              raw: 112125
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.997529Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "6DB2586E1A35458782A00DEF682492",
            displayName:
              "select v1_0.id,v1_0.first_name,v1_0.last_name from vets v1_0 offset ? rows fetch first ? rows only",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$6DB2586E1A35458782A00DEF682492",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 4.62,
                unit: "ms",
                raw: 4618041
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["4D38B1BF14B7D13C45CF7C58B76E2E17"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 4.62,
                unit: "ms",
                raw: 4618041
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["4D38B1BF14B7D13C45CF7C58B76E2E17"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "4D38B1BF14B7D13C45CF7C58B76E2E17",
            spanId: "B4A84364A5FB65D8",
            startTime: "2023-08-03T15:02:51.253293Z",
            duration: {
              value: 4.62,
              unit: "ms",
              raw: 4618041
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.9406Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "7A599FA10F9EC97FD50716618CFBE7",
            displayName: "INSERT INTO vet_specialties VALUES (?, ?)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$7A599FA10F9EC97FD50716618CFBE7",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 138.17,
                unit: "μs",
                raw: 138167
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 175.38,
                unit: "μs",
                raw: 175375
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "593C490C243751ECB9C69EA33440F68D",
            spanId: "B709DE84149B3DBB",
            startTime: "2023-08-03T14:17:27.639681Z",
            duration: {
              value: 138.17,
              unit: "μs",
              raw: 138167
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.885077Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "7B0B154FB4B1FAEAC04DBE3D6DEFAF",
            displayName: "INSERT INTO owners VALUES (default, ?, ?, ?, ?, ?)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$7B0B154FB4B1FAEAC04DBE3D6DEFAF",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 148.08,
                unit: "μs",
                raw: 148083.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 217.79,
                unit: "μs",
                raw: 217791
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "FEAF905C81650A2484125F29E0B3A49E",
            spanId: "613DED7D14981617",
            startTime: "2023-08-03T14:17:27.641544Z",
            duration: {
              value: 159.71,
              unit: "μs",
              raw: 159708
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.971044Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "7E34FB5601C39128B59EC54140D4C7",
            displayName:
              "CREATE TABLE visits ( id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, pet_id INTEGER, visit_date DATE, description VARCHAR(?) )",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$7E34FB5601C39128B59EC54140D4C7",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 567.54,
                unit: "μs",
                raw: 567541
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["CCF2DB1909BA03BA419999D9CB1607AE"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 567.54,
                unit: "μs",
                raw: 567541
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["CCF2DB1909BA03BA419999D9CB1607AE"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "CCF2DB1909BA03BA419999D9CB1607AE",
            spanId: "25A740251B76B1A4",
            startTime: "2023-08-03T14:17:27.633899Z",
            duration: {
              value: 567.54,
              unit: "μs",
              raw: 567541
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:38.080574Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "8012B6C9D3C8DC4768F13DBE99A978",
            displayName: "CREATE INDEX vets_last_name ON vets (last_name)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$8012B6C9D3C8DC4768F13DBE99A978",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 494.08,
                unit: "μs",
                raw: 494084
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["45EA1AA311940A3CC828C3882635DEE1"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 494.08,
                unit: "μs",
                raw: 494084
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["45EA1AA311940A3CC828C3882635DEE1"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "45EA1AA311940A3CC828C3882635DEE1",
            spanId: "4E22C497EBDE038F",
            startTime: "2023-08-03T14:17:27.623428Z",
            duration: {
              value: 494.08,
              unit: "μs",
              raw: 494084
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:38.139932Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "82FADA337BB4E30E37DD044119D180",
            displayName:
              "select p1_0.id,p1_0.name from types p1_0 where p1_0.id=?",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$82FADA337BB4E30E37DD044119D180",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 46.88,
                unit: "μs",
                raw: 46875
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["A8E16D65BA136391D56FEA5FFB5D30FA"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 91.35,
                unit: "μs",
                raw: 91354.25
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["916006BE36E867C3FAD77626C1B73BEF"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "A5B2C18C7F88BF17381ED1FD7B57A3C3",
            spanId: "DD9F8D79CE45AC10",
            startTime: "2023-08-03T15:03:10.020894Z",
            duration: {
              value: 46.88,
              unit: "μs",
              raw: 46875
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:17.890981Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "87EA9B43C2BD4BA688918C267FDD19",
            displayName:
              "select v1_0.pet_id,v1_0.id,v1_0.visit_date,v1_0.description from visits v1_0 where v1_0.pet_id=? order by v1_0.visit_date asc",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$87EA9B43C2BD4BA688918C267FDD19",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 56.21,
                unit: "μs",
                raw: 56208.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["8940349945ECC7254D4D6FD4156AF80C"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 105.23,
                unit: "μs",
                raw: 105228.99999999997
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["974ADBA5DCC1E662F4832D54D4D5C6C9"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9316AB9977582858CF8486458925BB4A",
            spanId: "C164200EDD5483B4",
            startTime: "2023-08-03T15:03:10.029498Z",
            duration: {
              value: 68.04,
              unit: "μs",
              raw: 68042
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:17.921681Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "9008891AB1E0E7DF60DE9889D42015",
            displayName: "INSERT INTO vets VALUES (default, ?, ?)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$9008891AB1E0E7DF60DE9889D42015",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 134.83,
                unit: "μs",
                raw: 134833.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["B47F2B981A0340296369CF8E052CC609"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 1.03,
                unit: "ms",
                raw: 1026291
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["410B3D9F149FA007DF54A5319CCC10F1"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "73B4FDF439EB772ABA164D02A0DEE2E9",
            spanId: "F0AC28FC53003E82",
            startTime: "2023-08-03T14:17:27.638102Z",
            duration: {
              value: 125.12,
              unit: "μs",
              raw: 125125
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.826711Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "942E5E90812B5BE36D3B51A3887A33",
            displayName:
              "select o1_0.id,o1_0.address,o1_0.city,o1_0.first_name,o1_0.last_name,p1_0.owner_id,p1_0.id,p1_0.birth_date,p1_0.name,p1_0.type_id,o1_0.telephone from owners o1_0 left join pets p1_0 on o1_0.id=p1_0.owner_id where o1_0.id=? order by p1_0.name",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$942E5E90812B5BE36D3B51A3887A33",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 100.17,
                unit: "μs",
                raw: 100166.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["8940349945ECC7254D4D6FD4156AF80C"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 304.96,
                unit: "μs",
                raw: 304957.99999999994
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["916006BE36E867C3FAD77626C1B73BEF"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9316AB9977582858CF8486458925BB4A",
            spanId: "C8A8F26FCB84CB6C",
            startTime: "2023-08-03T15:03:10.028836Z",
            duration: {
              value: 33,
              unit: "μs",
              raw: 33000
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:17.912946Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "9C57490BD751486F81056AE517F536",
            displayName:
              "ALTER TABLE pets ADD CONSTRAINT fk_pets_types FOREIGN KEY (type_id) REFERENCES types (id)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$9C57490BD751486F81056AE517F536",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 542.58,
                unit: "μs",
                raw: 542584
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 542.58,
                unit: "μs",
                raw: 542584
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "4F8A6264CFA0804BE71A65AE9D327D35",
            spanId: "1AAF9C2078703CC6",
            startTime: "2023-08-03T14:17:27.6331Z",
            duration: {
              value: 542.58,
              unit: "μs",
              raw: 542584
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:38.093788Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "9EBF772F0F1D7D00AF9F718C67B317",
            displayName:
              "CREATE TABLE owners ( id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, first_name VARCHAR(?), last_name VARCHAR_IGNORECASE(?), address VARCHAR(?), city VARCHAR(?), telephone VARCHAR(?) )",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$9EBF772F0F1D7D00AF9F718C67B317",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 397.83,
                unit: "μs",
                raw: 397833
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 397.83,
                unit: "μs",
                raw: 397833
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "0B96DDC7979A36B18CA3B33A7ACD2EBF",
            spanId: "CEB6110C6C116F40",
            startTime: "2023-08-03T14:17:27.631233Z",
            duration: {
              value: 397.83,
              unit: "μs",
              raw: 397833
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.981161Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "9F4267312FADBA7A49F52B199EEB87",
            displayName:
              "ALTER TABLE visits ADD CONSTRAINT fk_visits_pets FOREIGN KEY (pet_id) REFERENCES pets (id)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$9F4267312FADBA7A49F52B199EEB87",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 495.04,
                unit: "μs",
                raw: 495042
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["717AFE3701BEA2149B28C963B56C1374"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 495.04,
                unit: "μs",
                raw: 495042
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["717AFE3701BEA2149B28C963B56C1374"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "717AFE3701BEA2149B28C963B56C1374",
            spanId: "58A3C3BC6E5E4707",
            startTime: "2023-08-03T14:17:27.634518Z",
            duration: {
              value: 495.04,
              unit: "μs",
              raw: 495042
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:38.16309Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "A566DCDDB5DCBCE5BACF031A8E4F61",
            displayName: "INSERT INTO visits VALUES (default, ?, ?, ?)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$A566DCDDB5DCBCE5BACF031A8E4F61",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 139.08,
                unit: "μs",
                raw: 139083.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["328BE1802602B6AB70180F04CF95DB61"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 176.04,
                unit: "μs",
                raw: 176042
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["A247687874291BFECC50D83579F14EB7"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "0084F37650072074A3F8390137D42B27",
            spanId: "05D1F3C9A4AEF95F",
            startTime: "2023-08-03T14:17:27.646363Z",
            duration: {
              value: 121.88,
              unit: "μs",
              raw: 121875
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:38.173262Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "AFF8D4B5E9785551A0C4D47C3D17C3",
            displayName:
              "ALTER TABLE vet_specialties ADD CONSTRAINT fk_vet_specialties_vets FOREIGN KEY (vet_id) REFERENCES vets (id)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$AFF8D4B5E9785551A0C4D47C3D17C3",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 4.84,
                unit: "ms",
                raw: 4837916
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["FEA0145AAD602B3E9A0BECE8337B420C"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 4.84,
                unit: "ms",
                raw: 4837916
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["FEA0145AAD602B3E9A0BECE8337B420C"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "FEA0145AAD602B3E9A0BECE8337B420C",
            spanId: "9BF21E63E15BCBA0",
            startTime: "2023-08-03T14:17:27.624955Z",
            duration: {
              value: 4.84,
              unit: "ms",
              raw: 4837916
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:38.114511Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "B619F03CA9BAC9A52A1C65DCB3ABD0",
            displayName: "INSERT INTO specialties VALUES (default, ?)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$B619F03CA9BAC9A52A1C65DCB3ABD0",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 133.96,
                unit: "μs",
                raw: 133958
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["C422AA88D11C487DDC7FA14CAA62504E"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 237.29,
                unit: "μs",
                raw: 237291
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["6FB58A1A9B64BE5F4E1D68C19B0A4BF1"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "23F298CD6B2D7AA59DB6A38EC0429DB8",
            spanId: "B991F49604344C4E",
            startTime: "2023-08-03T14:17:27.638757Z",
            duration: {
              value: 121,
              unit: "μs",
              raw: 121000
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.947691Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "BE994B2106E5E5F829CDFA69374C6D",
            displayName: "DROP TABLE visits IF EXISTS",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$BE994B2106E5E5F829CDFA69374C6D",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 47.38,
                unit: "μs",
                raw: 47375
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["44A3F5D45E84F23DF4C6ED2F008CFF5E"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 47.38,
                unit: "μs",
                raw: 47375
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["44A3F5D45E84F23DF4C6ED2F008CFF5E"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "44A3F5D45E84F23DF4C6ED2F008CFF5E",
            spanId: "BD5A7FB77FC990C0",
            startTime: "2023-08-03T14:17:27.619537Z",
            duration: {
              value: 47.38,
              unit: "μs",
              raw: 47375
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.916407Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "D1A12EF36AAB8E9700D9451D78C517",
            displayName: "DROP TABLE owners IF EXISTS",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$D1A12EF36AAB8E9700D9451D78C517",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 58.54,
                unit: "μs",
                raw: 58541
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 58.54,
                unit: "μs",
                raw: 58541
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9D5D2BE9098EA27DF44BCF79F2E0BEE9",
            spanId: "423CC0F62D75BF69",
            startTime: "2023-08-03T14:17:27.619836Z",
            duration: {
              value: 58.54,
              unit: "μs",
              raw: 58541
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:38.080324Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "D35C1B1F41BE8E627E3E9887259324",
            displayName: "DROP TABLE vets IF EXISTS",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$D35C1B1F41BE8E627E3E9887259324",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 60.79,
                unit: "μs",
                raw: 60791
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["42FD3EC797C4783F205756A0E595337C"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 60.79,
                unit: "μs",
                raw: 60791
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["42FD3EC797C4783F205756A0E595337C"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "42FD3EC797C4783F205756A0E595337C",
            spanId: "F6459AF51497F5B9",
            startTime: "2023-08-03T14:17:27.619334Z",
            duration: {
              value: 60.79,
              unit: "μs",
              raw: 60791
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:38.135248Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "E3F7F8128144D40720E422FE3AB1AB",
            displayName:
              "ALTER TABLE pets ADD CONSTRAINT fk_pets_owners FOREIGN KEY (owner_id) REFERENCES owners (id)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$E3F7F8128144D40720E422FE3AB1AB",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 714.67,
                unit: "μs",
                raw: 714667
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 714.67,
                unit: "μs",
                raw: 714667
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "B3AA50AC8F88D1F45FE2E8BC0A2546BB",
            spanId: "4924762CA30BA9BC",
            startTime: "2023-08-03T14:17:27.632323Z",
            duration: {
              value: 714.67,
              unit: "μs",
              raw: 714667
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:38.017748Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "E7282CAD9F8070ED0A44B5DBEB75CC",
            displayName: "DROP TABLE vet_specialties IF EXISTS",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$E7282CAD9F8070ED0A44B5DBEB75CC",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 956.96,
                unit: "μs",
                raw: 956958
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["FFD7F21A177B9539711921A9012660CE"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 956.96,
                unit: "μs",
                raw: 956958
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["FFD7F21A177B9539711921A9012660CE"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "FFD7F21A177B9539711921A9012660CE",
            spanId: "97AF3FEB176DFBE1",
            startTime: "2023-08-03T14:17:27.618245Z",
            duration: {
              value: 956.96,
              unit: "μs",
              raw: 956958
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.936082Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "EB8BFCC7CCBFFEB53DE556C5BD7076",
            displayName:
              "CREATE TABLE vets ( id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, first_name VARCHAR(?), last_name VARCHAR(?) )",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$EB8BFCC7CCBFFEB53DE556C5BD7076",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 3.38,
                unit: "ms",
                raw: 3378791
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 3.38,
                unit: "ms",
                raw: 3378791
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "2057C4C0A0B3BFC857C263A389005708",
            spanId: "EF49E7CE30E4CC7F",
            startTime: "2023-08-03T14:17:27.619978Z",
            duration: {
              value: 3.38,
              unit: "ms",
              raw: 3378791
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:38.046151Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "EBF619A98C2449717BC3386FB93A94",
            displayName: "CREATE INDEX owners_last_name ON owners (last_name)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$EBF619A98C2449717BC3386FB93A94",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 174.96,
                unit: "μs",
                raw: 174959
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 174.96,
                unit: "μs",
                raw: 174959
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: []
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "7BF1C4AB05EF85A30C7D2EC4936D5274",
            spanId: "301BE4772E61CA47",
            startTime: "2023-08-03T14:17:27.631674Z",
            duration: {
              value: 174.96,
              unit: "μs",
              raw: 174959
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.930442Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "ECC3AE695CC19155977D358A24E31A",
            displayName: "DROP TABLE specialties IF EXISTS",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$ECC3AE695CC19155977D358A24E31A",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 51.96,
                unit: "μs",
                raw: 51959
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["E726A325ED3BA9B3C3CBB8FEA0EEC5B3"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 51.96,
                unit: "μs",
                raw: 51959
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["E726A325ED3BA9B3C3CBB8FEA0EEC5B3"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "E726A325ED3BA9B3C3CBB8FEA0EEC5B3",
            spanId: "954FDE1FB211E4E4",
            startTime: "2023-08-03T14:17:27.619443Z",
            duration: {
              value: 51.96,
              unit: "μs",
              raw: 51959
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.883655Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "EDA669B44BCCB522F76062FEED2462",
            displayName:
              "ALTER TABLE vet_specialties ADD CONSTRAINT fk_vet_specialties_specialties FOREIGN KEY (specialty_id) REFERENCES specialties (id)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$EDA669B44BCCB522F76062FEED2462",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 675.38,
                unit: "μs",
                raw: 675375
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["55B7808FEE2AFA0CBC6026026C12B524"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 675.38,
                unit: "μs",
                raw: 675375
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["55B7808FEE2AFA0CBC6026026C12B524"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "55B7808FEE2AFA0CBC6026026C12B524",
            spanId: "13D4FFBECD9C106A",
            startTime: "2023-08-03T14:17:27.629862Z",
            duration: {
              value: 675.38,
              unit: "μs",
              raw: 675375
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.827419Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "F81A2EC938494A2134C7C7C5FDF421",
            displayName: "CREATE INDEX pets_name ON pets (name)",
            instrumentationLibrary: "io.opentelemetry.jdbc",
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$F81A2EC938494A2134C7C7C5FDF421",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 156.67,
                unit: "μs",
                raw: 156666
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["2753FA8A3E7E6C600AFEF874F6273234"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 156.67,
                unit: "μs",
                raw: 156666
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["2753FA8A3E7E6C600AFEF874F6273234"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "2753FA8A3E7E6C600AFEF874F6273234",
            spanId: "4E5A5EB9A27B0CB0",
            startTime: "2023-08-03T14:17:27.633683Z",
            duration: {
              value: 156.67,
              unit: "μs",
              raw: 156666
            }
          },
          firstDataSeenTime: "2023-08-03T14:17:37.897115Z"
        },
        {
          span: {
            classification: "DatabaseClient",
            role: "Internal",
            name: "1D138649EB4FFA92C0E3C8103404F2",
            displayName: "select * from users where id = :id",
            instrumentationLibrary: "SampleInsightsController",
            spanCodeObjectId:
              "span:SampleInsightsController$_$1D138649EB4FFA92C0E3C8103404F2",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "DatabaseQueries",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 4.79,
                unit: "μs",
                raw: 4791.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 8.38,
                unit: "μs",
                raw: 8375
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "B98E9DC02FD25EFD",
            startTime: "2023-08-03T15:03:15.619948Z",
            duration: {
              value: 208,
              unit: "ns",
              raw: 208
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.973516Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.52,
                unit: "ms",
                raw: 1524583.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["1EEA224BD921C247F416519D5ED50563"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 1.66,
                unit: "ms",
                raw: 1655125
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["DE0FFBC0598B5328C676FF694F4D39D8"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "DE0FFBC0598B5328C676FF694F4D39D8",
            spanId: "CCAB5DC8ADD7A48F",
            startTime: "2023-08-03T15:02:51.469005Z",
            duration: {
              value: 1.66,
              unit: "ms",
              raw: 1655125
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.954681Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /**",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /**",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 2.17,
                unit: "ms",
                raw: 2165833
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["D4E6C460133C68CE7B718A587A335F0B"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 41.08,
                unit: "ms",
                raw: 41084250
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["A1C2070890935DC54CB5ACB579A00CED"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "D4E6C460133C68CE7B718A587A335F0B",
            spanId: "7550F4686CCA9E5B",
            startTime: "2023-08-03T15:02:51.464518Z",
            duration: {
              value: 2.17,
              unit: "ms",
              raw: 2165833
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.962432Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /oups",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /oups",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 31.35,
                unit: "ms",
                raw: 31351833.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["100DE1ECF252299A366B1FDD1567974F"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 58.44,
                unit: "ms",
                raw: 58441750
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["904D24ED9E6C1A1FDDEDEECE41B615E8"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "100DE1ECF252299A366B1FDD1567974F",
            spanId: "861C30FCB79D65DF",
            startTime: "2023-08-03T15:02:51.408498Z",
            duration: {
              value: 4.26,
              unit: "ms",
              raw: 4261917
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.931716Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /owners",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /owners",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 3.9,
                unit: "ms",
                raw: 3895625
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["D076C5BBD0FA8838F2063C7120A72260"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 26.15,
                unit: "ms",
                raw: 26153599.699999988
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["E459E0CCBCE2A1B4400C67E9593FC9BD"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9D767B5368F97B6C6349C45D5EE82AE8",
            spanId: "02C35DE40091E40E",
            startTime: "2023-08-03T15:02:51.727341Z",
            duration: {
              value: 3.14,
              unit: "ms",
              raw: 3136333
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.993182Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /owners/find",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /owners/find",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 2.48,
                unit: "ms",
                raw: 2483917
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["244DAD19FF36A648BFDCF18CEC58EB97"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 14.3,
                unit: "ms",
                raw: 14296334
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["CE966416543013950B27E0295939D336"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "84571EC8F94A546279BAA4B4F9D455A2",
            spanId: "C6D8C5AF551B1741",
            startTime: "2023-08-03T15:02:51.499536Z",
            duration: {
              value: 1.98,
              unit: "ms",
              raw: 1983959
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.954491Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /owners/new",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /owners/new",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 2.01,
                unit: "sec",
                raw: 2014992543
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3CDF279F7208336BC76A80B0E1FBF611"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 2.05,
                unit: "sec",
                raw: 2046338917
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["6A524B7D6F2170A7E933F8645D9FB9E0"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "954EB94F06A76B6A7376BAB6AEAD26E3",
            spanId: "B5CBAC96801B85E3",
            startTime: "2023-08-03T15:03:05.893497Z",
            duration: {
              value: 2.01,
              unit: "sec",
              raw: 2005051293
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:08.005988Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /owners/{ownerId}",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /owners/{ownerId}",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 5.04,
                unit: "ms",
                raw: 5039208.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["ECF264755F95C01B7A21A338C6DF6ED9"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 29.02,
                unit: "ms",
                raw: 29018749.49999996
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["974ADBA5DCC1E662F4832D54D4D5C6C9"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "B8D8219E439656DD91DCEA7785AB40C4",
            spanId: "A055072AD9E71718",
            startTime: "2023-08-03T15:02:51.650539Z",
            duration: {
              value: 4.37,
              unit: "ms",
              raw: 4373375
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.982383Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /owners/{ownerId}/edit",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /owners/{ownerId}/edit",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 8.66,
                unit: "ms",
                raw: 8660417
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["2360B5AA264EBB7D81331A5C2FA85E1D"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 14.46,
                unit: "ms",
                raw: 14459209
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["BEA0F857FCA0FA84DC0B719A231A604B"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "A5B2C18C7F88BF17381ED1FD7B57A3C3",
            spanId: "62EAA95B58D13F90",
            startTime: "2023-08-03T15:03:10.015594Z",
            duration: {
              value: 10,
              unit: "ms",
              raw: 10004291
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:17.912744Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /owners/{ownerId}/pets/new",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /owners/{ownerId}/pets/new",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 8.9,
                unit: "ms",
                raw: 8899208
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["9316AB9977582858CF8486458925BB4A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 33.25,
                unit: "ms",
                raw: 33253500
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["0B9E578557989324EEA1509B22EA2D6E"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9316AB9977582858CF8486458925BB4A",
            spanId: "DC164996503152F6",
            startTime: "2023-08-03T15:03:10.025806Z",
            duration: {
              value: 8.9,
              unit: "ms",
              raw: 8899208
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:17.903451Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /SampleInsights/ErrorHotspot",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/ErrorHotspot",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 5.72,
                unit: "ms",
                raw: 5716208
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 5.72,
                unit: "ms",
                raw: 5716208
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "DF682BEA15DA0737",
            startTime: "2023-08-03T15:03:15.601645Z",
            duration: {
              value: 5.06,
              unit: "ms",
              raw: 5063084
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.933137Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /SampleInsights/ErrorRecordedOnCurrentSpan",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/ErrorRecordedOnCurrentSpan",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.38,
                unit: "ms",
                raw: 1375125
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 1.38,
                unit: "ms",
                raw: 1375125
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "D6CA7DCB818CE309",
            startTime: "2023-08-03T15:03:18.335509Z",
            duration: {
              value: 1.19,
              unit: "ms",
              raw: 1187209
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.993433Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /SampleInsights/ErrorRecordedOnDeeplyNestedSpan",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/ErrorRecordedOnDeeplyNestedSpan",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.94,
                unit: "ms",
                raw: 1936875
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 1.94,
                unit: "ms",
                raw: 1936875
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "AFF6725266841889",
            startTime: "2023-08-03T15:03:18.310698Z",
            duration: {
              value: 1.1,
              unit: "ms",
              raw: 1095209
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.994975Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /SampleInsights/ErrorRecordedOnLocalRootSpan",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/ErrorRecordedOnLocalRootSpan",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 19.89,
                unit: "ms",
                raw: 19887125
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 19.89,
                unit: "ms",
                raw: 19887125
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "9BAD5FC34D41D178",
            startTime: "2023-08-03T15:03:18.332075Z",
            duration: {
              value: 1.61,
              unit: "ms",
              raw: 1611041
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.984199Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /SampleInsights/HighUsage",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/HighUsage",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 8.25,
                unit: "ms",
                raw: 8245042
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 8.25,
                unit: "ms",
                raw: 8245042
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "A6CBD202A10DB50F",
            startTime: "2023-08-03T15:03:18.298969Z",
            duration: {
              value: 6.57,
              unit: "ms",
              raw: 6571416
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.976204Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /SampleInsights/NPlusOneWithInternalSpan",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/NPlusOneWithInternalSpan",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 7.07,
                unit: "ms",
                raw: 7067166
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 7.07,
                unit: "ms",
                raw: 7067166
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "40A3E82F211885ED",
            startTime: "2023-08-03T15:03:15.616734Z",
            duration: {
              value: 1.89,
              unit: "ms",
              raw: 1886417
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.943745Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /SampleInsights/NPlusOneWithoutInternalSpan",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/NPlusOneWithoutInternalSpan",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 2.21,
                unit: "ms",
                raw: 2214875
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 2.21,
                unit: "ms",
                raw: 2214875
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "E829D61C69EE9128",
            startTime: "2023-08-03T15:03:15.618729Z",
            duration: {
              value: 1.91,
              unit: "ms",
              raw: 1911167
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.960793Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /SampleInsights/req-map-get",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/req-map-get",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.62,
                unit: "ms",
                raw: 1618042
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 1.62,
                unit: "ms",
                raw: 1618042
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "1F45660470992C92",
            startTime: "2023-08-03T15:03:18.307371Z",
            duration: {
              value: 1.03,
              unit: "ms",
              raw: 1032792
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.978286Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /SampleInsights/SlowEndpoint",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/SlowEndpoint",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 2.53,
                unit: "sec",
                raw: 2525240210
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 2.53,
                unit: "sec",
                raw: 2525240210
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "C203D01BBBA731EC",
            startTime: "2023-08-03T15:03:12.571576Z",
            duration: {
              value: 2.51,
              unit: "sec",
              raw: 2510482792
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.962496Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /SampleInsights/SpanBottleneck",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/SpanBottleneck",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 253.94,
                unit: "ms",
                raw: 253942833
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 253.94,
                unit: "ms",
                raw: 253942833
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "46F7234DE821AA54",
            startTime: "2023-08-03T15:03:15.336689Z",
            duration: {
              value: 258.4,
              unit: "ms",
              raw: 258403834
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.927494Z"
        },
        {
          span: {
            classification: "EndpointClient",
            role: "Unknown",
            name: "GET PetClinic /vets.html",
            displayName: "HTTP GET ",
            instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
            spanCodeObjectId:
              "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /vets.html",
            methodCodeObjectId: "",
            kind: "Client",
            codeObjectId: ""
          },
          assetType: "EndpointClient",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 3.35,
                unit: "ms",
                raw: 3347209
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["7A2AA0ACFE768816084B2E1EADEF03DA"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 351.89,
                unit: "ms",
                raw: 351893958
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["4D38B1BF14B7D13C45CF7C58B76E2E17"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "E4A02B938FEB0DB76132BDF0F452F48A",
            spanId: "FBA51806DBE86D2E",
            startTime: "2023-08-03T15:02:51.346784Z",
            duration: {
              value: 2.28,
              unit: "ms",
              raw: 2275042
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.930586Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Entry",
            name: "ClientTester.generateInsightData",
            displayName: "ClientTester.generateInsightData",
            instrumentationLibrary:
              "io.opentelemetry.opentelemetry-instrumentation-annotations-1.16",
            spanCodeObjectId:
              "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$ClientTester.generateInsightData",
            methodCodeObjectId:
              "petclinic.client.ClientTester$_$generateInsightData",
            kind: "Internal",
            codeObjectId: "petclinic.client.ClientTester$_$generateInsightData"
          },
          assetType: "CodeLocation",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 8.29,
                unit: "sec",
                raw: 8293080046
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 8.29,
                unit: "sec",
                raw: 8293080046
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SlowEndpoint",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "ClientTester.generateInsightData",
                subtitle: "",
                description: "Median duration 79.58 ms"
              }
            },
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "EndpointChattyApi",
              importance: 3,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "6B726C8E50E57CB7",
            startTime: "2023-08-03T15:03:10.044191Z",
            duration: {
              value: 8.29,
              unit: "sec",
              raw: 8293080046
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.958693Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "OwnerController.findPaginatedForOwnersLastName",
            displayName: "OwnerController.findPaginatedForOwnersLastName",
            instrumentationLibrary:
              "io.opentelemetry.opentelemetry-instrumentation-annotations-1.16",
            spanCodeObjectId:
              "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$OwnerController.findPaginatedForOwnersLastName",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerController$_$findPaginatedForOwnersLastName",
            kind: "Internal",
            codeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerController$_$findPaginatedForOwnersLastName"
          },
          assetType: "CodeLocation",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.21,
                unit: "ms",
                raw: 1213000
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["9D767B5368F97B6C6349C45D5EE82AE8"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 6.91,
                unit: "ms",
                raw: 6912791.8999999985
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["E459E0CCBCE2A1B4400C67E9593FC9BD"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9D767B5368F97B6C6349C45D5EE82AE8",
            spanId: "2411B993DB22E87E",
            startTime: "2023-08-03T15:02:51.72839Z",
            duration: {
              value: 899.92,
              unit: "μs",
              raw: 899917
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:08.000282Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "OwnerValidation.CommunicateWithServer",
            displayName: "OwnerValidation.CommunicateWithServer",
            instrumentationLibrary:
              "io.opentelemetry.opentelemetry-instrumentation-annotations-1.16",
            spanCodeObjectId:
              "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$OwnerValidation.CommunicateWithServer",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.domain.OwnerValidation$_$CommunicateWithServer",
            kind: "Internal",
            codeObjectId:
              "org.springframework.samples.petclinic.domain.OwnerValidation$_$CommunicateWithServer"
          },
          assetType: "CodeLocation",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 2,
                unit: "sec",
                raw: 2000510376
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3CDF279F7208336BC76A80B0E1FBF611"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 2,
                unit: "sec",
                raw: 2003027126
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["6A524B7D6F2170A7E933F8645D9FB9E0"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanEndpointBottleneck",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "954EB94F06A76B6A7376BAB6AEAD26E3",
            spanId: "78AEEF1091C25D85",
            startTime: "2023-08-03T15:03:05.894775Z",
            duration: {
              value: 2,
              unit: "sec",
              raw: 2000223834
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:08.012358Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "OwnerValidation.ValidateOwnerWithExternalService",
            displayName: "OwnerValidation.ValidateOwnerWithExternalService",
            instrumentationLibrary:
              "io.opentelemetry.opentelemetry-instrumentation-annotations-1.16",
            spanCodeObjectId:
              "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$OwnerValidation.ValidateOwnerWithExternalService",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwnerWithExternalService",
            kind: "Internal",
            codeObjectId:
              "org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwnerWithExternalService"
          },
          assetType: "CodeLocation",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 2,
                unit: "sec",
                raw: 2000643792
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3CDF279F7208336BC76A80B0E1FBF611"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 2,
                unit: "sec",
                raw: 2003089251
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["6A524B7D6F2170A7E933F8645D9FB9E0"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "954EB94F06A76B6A7376BAB6AEAD26E3",
            spanId: "4A0C038AFB37745B",
            startTime: "2023-08-03T15:03:05.894769Z",
            duration: {
              value: 2,
              unit: "sec",
              raw: 2000238043
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:08.010792Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "SampleInsightsController.method1",
            displayName: "SampleInsightsController.method1",
            instrumentationLibrary:
              "io.opentelemetry.opentelemetry-instrumentation-annotations-1.16",
            spanCodeObjectId:
              "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$SampleInsightsController.method1",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$method1",
            kind: "Internal",
            codeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$method1"
          },
          assetType: "CodeLocation",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 89.17,
                unit: "μs",
                raw: 89166
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 89.17,
                unit: "μs",
                raw: 89166
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            },
            {
              type: "Errors",
              importance: 5,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "HotSpot",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "D01CA5A988472E9A",
            startTime: "2023-08-03T15:03:15.604147Z",
            duration: {
              value: 49.67,
              unit: "μs",
              raw: 49667
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.971036Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "SampleInsightsController.method2",
            displayName: "SampleInsightsController.method2",
            instrumentationLibrary:
              "io.opentelemetry.opentelemetry-instrumentation-annotations-1.16",
            spanCodeObjectId:
              "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$SampleInsightsController.method2",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$method2",
            kind: "Internal",
            codeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$method2"
          },
          assetType: "CodeLocation",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 78.79,
                unit: "μs",
                raw: 78792
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 78.79,
                unit: "μs",
                raw: 78792
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            },
            {
              type: "Errors",
              importance: 5,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "HotSpot",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "6DBB5D062717E557",
            startTime: "2023-08-03T15:03:15.604152Z",
            duration: {
              value: 41.92,
              unit: "μs",
              raw: 41917
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.934715Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "SampleInsightsController.method3",
            displayName: "SampleInsightsController.method3",
            instrumentationLibrary:
              "io.opentelemetry.opentelemetry-instrumentation-annotations-1.16",
            spanCodeObjectId:
              "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$SampleInsightsController.method3",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$method3",
            kind: "Internal",
            codeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$method3"
          },
          assetType: "CodeLocation",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 68.25,
                unit: "μs",
                raw: 68250
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 68.25,
                unit: "μs",
                raw: 68250
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            },
            {
              type: "HotSpot",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "Errors",
              importance: 5,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "C8085B9727E6ED0B",
            startTime: "2023-08-03T15:03:15.604156Z",
            duration: {
              value: 32.79,
              unit: "μs",
              raw: 32792
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.954738Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "SpanBottleneck 1",
            displayName: "SpanBottleneck 1",
            instrumentationLibrary:
              "io.opentelemetry.opentelemetry-instrumentation-annotations-1.16",
            spanCodeObjectId:
              "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$SpanBottleneck 1",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$doWorkForBottleneck1",
            kind: "Internal",
            codeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$doWorkForBottleneck1"
          },
          assetType: "CodeLocation",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 200.16,
                unit: "ms",
                raw: 200158125
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 200.16,
                unit: "ms",
                raw: 200158125
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 2,
            ScoreExp1000: 2
          },
          insights: [
            {
              type: "SpanEndpointBottleneck",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "ABACB87C41FB8895",
            startTime: "2023-08-03T15:03:15.33804Z",
            duration: {
              value: 202.47,
              unit: "ms",
              raw: 202474792
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.949695Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "SpanBottleneck 2",
            displayName: "SpanBottleneck 2",
            instrumentationLibrary:
              "io.opentelemetry.opentelemetry-instrumentation-annotations-1.16",
            spanCodeObjectId:
              "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$SpanBottleneck 2",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$doWorkForBottleneck2",
            kind: "Internal",
            codeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$doWorkForBottleneck2"
          },
          assetType: "CodeLocation",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 50.5,
                unit: "ms",
                raw: 50496126
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 50.5,
                unit: "ms",
                raw: 50496126
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "CE0512097F998CB1",
            startTime: "2023-08-03T15:03:15.540576Z",
            duration: {
              value: 52.62,
              unit: "ms",
              raw: 52621125
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.946311Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "ResponseFacade.sendError",
            displayName: "ResponseFacade.sendError",
            instrumentationLibrary: "io.opentelemetry.servlet-5.0",
            spanCodeObjectId:
              "span:io.opentelemetry.servlet-5.0$_$ResponseFacade.sendError",
            methodCodeObjectId:
              "org.apache.catalina.connector.ResponseFacade$_$sendError",
            kind: "Internal",
            codeObjectId:
              "org.apache.catalina.connector.ResponseFacade$_$sendError"
          },
          assetType: "CodeLocation",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 7.38,
                unit: "μs",
                raw: 7375
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["F12C235A5888B8FB967ADE1A7197EE44"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 270.96,
                unit: "μs",
                raw: 270958
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["A1C2070890935DC54CB5ACB579A00CED"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "D4E6C460133C68CE7B718A587A335F0B",
            spanId: "EBFEE4AB0B0B66D4",
            startTime: "2023-08-03T15:02:51.465689Z",
            duration: {
              value: 8.21,
              unit: "μs",
              raw: 8208
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.957808Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "OwnerRepository.findById",
            displayName: "OwnerRepository.findById",
            instrumentationLibrary: "io.opentelemetry.spring-data-1.8",
            spanCodeObjectId:
              "span:io.opentelemetry.spring-data-1.8$_$OwnerRepository.findById",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerRepository$_$findById",
            kind: "Internal",
            codeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerRepository$_$findById"
          },
          assetType: "CodeLocation",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.26,
                unit: "ms",
                raw: 1258979
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["8A8CF497B549662BC644037F3BC2FC05"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 5.13,
                unit: "ms",
                raw: 5131124.999999998
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["411AE283DC18465498B2D01D3EEE1053"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9316AB9977582858CF8486458925BB4A",
            spanId: "00A06168C8E3F3AC",
            startTime: "2023-08-03T15:03:10.028539Z",
            duration: {
              value: 1.21,
              unit: "ms",
              raw: 1211292
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:17.913415Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "OwnerRepository.findByLastName",
            displayName: "OwnerRepository.findByLastName",
            instrumentationLibrary: "io.opentelemetry.spring-data-1.8",
            spanCodeObjectId:
              "span:io.opentelemetry.spring-data-1.8$_$OwnerRepository.findByLastName",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerRepository$_$findByLastName",
            kind: "Internal",
            codeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerRepository$_$findByLastName"
          },
          assetType: "CodeLocation",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.19,
                unit: "ms",
                raw: 1193729.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["9D767B5368F97B6C6349C45D5EE82AE8"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 6.58,
                unit: "ms",
                raw: 6582599.999999998
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["E459E0CCBCE2A1B4400C67E9593FC9BD"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9D767B5368F97B6C6349C45D5EE82AE8",
            spanId: "5C19D3077D769F94",
            startTime: "2023-08-03T15:02:51.728404Z",
            duration: {
              value: 881.58,
              unit: "μs",
              raw: 881584
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:08.00023Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "OwnerRepository.findPetTypes",
            displayName: "OwnerRepository.findPetTypes",
            instrumentationLibrary: "io.opentelemetry.spring-data-1.8",
            spanCodeObjectId:
              "span:io.opentelemetry.spring-data-1.8$_$OwnerRepository.findPetTypes",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerRepository$_$findPetTypes",
            kind: "Internal",
            codeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerRepository$_$findPetTypes"
          },
          assetType: "CodeLocation",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 901.98,
                unit: "μs",
                raw: 901979.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["2CD05493B3F64BB401730A4D77076FB2"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 5.93,
                unit: "ms",
                raw: 5928957.999999998
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["0B9E578557989324EEA1509B22EA2D6E"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9316AB9977582858CF8486458925BB4A",
            spanId: "4695A05B24CFD498",
            startTime: "2023-08-03T15:03:10.033754Z",
            duration: {
              value: 268.38,
              unit: "μs",
              raw: 268375
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:17.923456Z"
        },
        {
          span: {
            classification: "Unknown",
            role: "Internal",
            name: "VetRepository.findAll",
            displayName: "VetRepository.findAll",
            instrumentationLibrary: "io.opentelemetry.spring-data-1.8",
            spanCodeObjectId:
              "span:io.opentelemetry.spring-data-1.8$_$VetRepository.findAll",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.vet.VetRepository$_$findAll",
            kind: "Internal",
            codeObjectId:
              "org.springframework.samples.petclinic.vet.VetRepository$_$findAll"
          },
          assetType: "CodeLocation",
          serviceName: "PetClinic",
          endpointCodeObjectId: null,
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 210.8,
                unit: "ms",
                raw: 210803916
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["4D38B1BF14B7D13C45CF7C58B76E2E17"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 210.8,
                unit: "ms",
                raw: 210803916
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["4D38B1BF14B7D13C45CF7C58B76E2E17"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "4D38B1BF14B7D13C45CF7C58B76E2E17",
            spanId: "A34C19D4AAE79903",
            startTime: "2023-08-03T15:02:51.092723Z",
            duration: {
              value: 210.8,
              unit: "ms",
              raw: 210803916
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.945702Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /**",
            displayName: "HTTP GET /**",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /**",
            methodCodeObjectId: "",
            kind: "Server",
            codeObjectId: ""
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId: "endpoint:epHTTP:HTTP GET /**",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.43,
                unit: "ms",
                raw: 1432875
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["D4E6C460133C68CE7B718A587A335F0B"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 39.62,
                unit: "ms",
                raw: 39619666
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["A1C2070890935DC54CB5ACB579A00CED"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "D4E6C460133C68CE7B718A587A335F0B",
            spanId: "EBE0CDEFBBFE74EA",
            startTime: "2023-08-03T15:02:51.465052Z",
            duration: {
              value: 1.43,
              unit: "ms",
              raw: 1432875
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.957981Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /vets.html",
            displayName: "HTTP GET /vets.html",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /vets.html",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.vet.VetController$_$showVetList",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.vet.VetController$_$showVetList"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId: "endpoint:epHTTP:HTTP GET /vets.html",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 2.42,
                unit: "ms",
                raw: 2418666
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["7A2AA0ACFE768816084B2E1EADEF03DA"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 307.67,
                unit: "ms",
                raw: 307672208
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["4D38B1BF14B7D13C45CF7C58B76E2E17"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SlowestSpans",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "HTTP GET /vets.html",
                subtitle: "1 spans",
                description:
                  "SELECT org.springframework.samples.petclinic.vet.Vet 168.91 ms"
              }
            },
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "E4A02B938FEB0DB76132BDF0F452F48A",
            spanId: "46F4A1D81817E01E",
            startTime: "2023-08-03T15:02:51.347316Z",
            duration: {
              value: 1.52,
              unit: "ms",
              raw: 1519042
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.919354Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /oups",
            displayName: "HTTP GET /oups",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /oups",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.system.CrashController$_$triggerException",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.system.CrashController$_$triggerException"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId: "endpoint:epHTTP:HTTP GET /oups",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 29.97,
                unit: "ms",
                raw: 29967187.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["100DE1ECF252299A366B1FDD1567974F"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 57.4,
                unit: "ms",
                raw: 57404750
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["904D24ED9E6C1A1FDDEDEECE41B615E8"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            },
            {
              type: "Errors",
              importance: 5,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "HotSpot",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "100DE1ECF252299A366B1FDD1567974F",
            spanId: "08A41626CCD6ECAC",
            startTime: "2023-08-03T15:02:51.409988Z",
            duration: {
              value: 2.53,
              unit: "ms",
              raw: 2529625
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.930173Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /owners",
            displayName: "HTTP GET /owners",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerController$_$processFindForm",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerController$_$processFindForm"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId: "endpoint:epHTTP:HTTP GET /owners",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 3.16,
                unit: "ms",
                raw: 3160625.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["D076C5BBD0FA8838F2063C7120A72260"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 24.62,
                unit: "ms",
                raw: 24616016.29999999
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["E459E0CCBCE2A1B4400C67E9593FC9BD"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9D767B5368F97B6C6349C45D5EE82AE8",
            spanId: "6D309B819FAFA6A3",
            startTime: "2023-08-03T15:02:51.727867Z",
            duration: {
              value: 2.32,
              unit: "ms",
              raw: 2316417
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.991742Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /SampleInsights/SlowEndpoint",
            displayName: "HTTP GET /SampleInsights/SlowEndpoint",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/SlowEndpoint",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genSlowEndpoint",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genSlowEndpoint"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId:
            "endpoint:epHTTP:HTTP GET /SampleInsights/SlowEndpoint",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 2.52,
                unit: "sec",
                raw: 2515083293
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 2.52,
                unit: "sec",
                raw: 2515083293
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SlowEndpoint",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "HTTP GET /SampleInsights/SlowEndpoint",
                subtitle: "",
                description: "Median duration 25.36 ms"
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "A65337F6C32E922E",
            startTime: "2023-08-03T15:03:12.576873Z",
            duration: {
              value: 2.5,
              unit: "sec",
              raw: 2504879751
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.921587Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /owners/find",
            displayName: "HTTP GET /owners/find",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/find",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerController$_$initFindForm",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerController$_$initFindForm"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId: "endpoint:epHTTP:HTTP GET /owners/find",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.47,
                unit: "ms",
                raw: 1470250
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["E095F72C71CAB2F992C93586CBDEAE42"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 13.62,
                unit: "ms",
                raw: 13622875
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["CE966416543013950B27E0295939D336"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "84571EC8F94A546279BAA4B4F9D455A2",
            spanId: "B8715B2ADF98BA66",
            startTime: "2023-08-03T15:02:51.500086Z",
            duration: {
              value: 1.38,
              unit: "ms",
              raw: 1376334
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.972101Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /owners/new",
            displayName: "HTTP GET /owners/new",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/new",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerController$_$initCreationForm",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerController$_$initCreationForm"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId: "endpoint:epHTTP:HTTP GET /owners/new",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 2.01,
                unit: "sec",
                raw: 2013787084
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3CDF279F7208336BC76A80B0E1FBF611"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 2.05,
                unit: "sec",
                raw: 2045196501
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["6A524B7D6F2170A7E933F8645D9FB9E0"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SlowEndpoint",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "HTTP GET /owners/new",
                subtitle: "",
                description: "Median duration 20.96 ms"
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            },
            {
              type: "SlowestSpans",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "HTTP GET /owners/new",
                subtitle: "1 spans",
                description: "OwnerValidation.CommunicateWithServer 2 sec"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "954EB94F06A76B6A7376BAB6AEAD26E3",
            spanId: "2805D91026FBE6DF",
            startTime: "2023-08-03T15:03:05.894079Z",
            duration: {
              value: 2,
              unit: "sec",
              raw: 2004276293
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:08.007833Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /owners/{ownerId}/edit",
            displayName: "HTTP GET /owners/{ownerId}/edit",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/{ownerId}/edit",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerController$_$initUpdateOwnerForm",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerController$_$initUpdateOwnerForm"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId:
            "endpoint:epHTTP:HTTP GET /owners/{ownerId}/edit",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 6.95,
                unit: "ms",
                raw: 6954291
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["2360B5AA264EBB7D81331A5C2FA85E1D"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 12.9,
                unit: "ms",
                raw: 12902542
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["BEA0F857FCA0FA84DC0B719A231A604B"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "A5B2C18C7F88BF17381ED1FD7B57A3C3",
            spanId: "BF99BA57B3FD51DF",
            startTime: "2023-08-03T15:03:10.016219Z",
            duration: {
              value: 8.77,
              unit: "ms",
              raw: 8771500
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:17.90665Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /owners/{ownerId}/pets/new",
            displayName: "HTTP GET /owners/{ownerId}/pets/new",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/{ownerId}/pets/new",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.owner.PetController$_$initCreationForm",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.owner.PetController$_$initCreationForm"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId:
            "endpoint:epHTTP:HTTP GET /owners/{ownerId}/pets/new",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 8.73,
                unit: "ms",
                raw: 8731042
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["9316AB9977582858CF8486458925BB4A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 31.39,
                unit: "ms",
                raw: 31385666
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["0B9E578557989324EEA1509B22EA2D6E"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "9316AB9977582858CF8486458925BB4A",
            spanId: "0A0D7751A50FEEB0",
            startTime: "2023-08-03T15:03:10.026656Z",
            duration: {
              value: 8.73,
              unit: "ms",
              raw: 8731042
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:17.903065Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /",
            displayName: "HTTP GET /",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId: "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.system.WelcomeController$_$welcome",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.system.WelcomeController$_$welcome"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId: "endpoint:epHTTP:HTTP GET /",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 3.17,
                unit: "ms",
                raw: 3171187
              },
              previousDuration: {
                value: 4.49,
                unit: "ms",
                raw: 4491666.5
              },
              changeTime: "2023-08-03T15:04:15Z",
              changeVerified: true,
              traceIds: ["E4B81BD26CFA28F9AC60C1C272DF6E44"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 14.58,
                unit: "ms",
                raw: 14582833
              },
              previousDuration: {
                value: 13.49,
                unit: "ms",
                raw: 13493391.599999985
              },
              changeTime: "2023-08-03T15:04:15Z",
              changeVerified: true,
              traceIds: ["E4B81BD26CFA28F9AC60C1C272DF6E44"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "5E374DCAC4131F844AF870B6EF58F11D",
            spanId: "14DDF35C702BC220",
            startTime: "2023-08-03T15:05:55.952739Z",
            duration: {
              value: 2.12,
              unit: "ms",
              raw: 2117959
            }
          },
          firstDataSeenTime: "2023-08-03T14:18:06.945586Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /SampleInsights/SpanBottleneck",
            displayName: "HTTP GET /SampleInsights/SpanBottleneck",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/SpanBottleneck",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genSpanBottleneck",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genSpanBottleneck"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId:
            "endpoint:epHTTP:HTTP GET /SampleInsights/SpanBottleneck",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 252.82,
                unit: "ms",
                raw: 252820334
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 252.82,
                unit: "ms",
                raw: 252820334
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SlowestSpans",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "HTTP GET /SampleInsights/SpanBottleneck",
                subtitle: "1 spans",
                description: "SpanBottleneck 1 402.63 ms"
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "92E2E59D60212533",
            startTime: "2023-08-03T15:03:15.337437Z",
            duration: {
              value: 257.51,
              unit: "ms",
              raw: 257506958
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.930177Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /owners/{ownerId}",
            displayName: "HTTP GET /owners/{ownerId}",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/{ownerId}",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerController$_$showOwner",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.owner.OwnerController$_$showOwner"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId: "endpoint:epHTTP:HTTP GET /owners/{ownerId}",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 3.46,
                unit: "ms",
                raw: 3455333.5
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["6989660348554B849D94B4433F933547"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 28.38,
                unit: "ms",
                raw: 28375499.99999996
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["974ADBA5DCC1E662F4832D54D4D5C6C9"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "HighUsage",
              importance: 5,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            },
            {
              type: "HotSpot",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "Errors",
              importance: 5,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "B8D8219E439656DD91DCEA7785AB40C4",
            spanId: "E5D52CEDED04AC84",
            startTime: "2023-08-03T15:02:51.651732Z",
            duration: {
              value: 2.89,
              unit: "ms",
              raw: 2890833
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:07.976146Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /SampleInsights/ErrorHotspot",
            displayName: "HTTP GET /SampleInsights/ErrorHotspot",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/ErrorHotspot",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genErrorHotspot",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genErrorHotspot"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId:
            "endpoint:epHTTP:HTTP GET /SampleInsights/ErrorHotspot",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 4.39,
                unit: "ms",
                raw: 4392875
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 4.39,
                unit: "ms",
                raw: 4392875
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            },
            {
              type: "Errors",
              importance: 5,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "HotSpot",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "7CFC34FA4BCDC48A",
            startTime: "2023-08-03T15:03:15.603532Z",
            duration: {
              value: 2.82,
              unit: "ms",
              raw: 2821666
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.919855Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /SampleInsights/HighUsage",
            displayName: "HTTP GET /SampleInsights/HighUsage",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/HighUsage",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genHighUsage",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genHighUsage"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId:
            "endpoint:epHTTP:HTTP GET /SampleInsights/HighUsage",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 7.47,
                unit: "ms",
                raw: 7470791
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 7.47,
                unit: "ms",
                raw: 7470791
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "3DA527EF15B8B983",
            startTime: "2023-08-03T15:03:18.299467Z",
            duration: {
              value: 5.82,
              unit: "ms",
              raw: 5822125
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.991395Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
            displayName: "HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId:
            "endpoint:epHTTP:HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.54,
                unit: "ms",
                raw: 1544375
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 1.54,
                unit: "ms",
                raw: 1544375
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "EndpointSpaNPlusOne",
              importance: 3,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "941F0F8E4C6C59B1",
            startTime: "2023-08-03T15:03:15.619261Z",
            duration: {
              value: 1.23,
              unit: "ms",
              raw: 1226667
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.974236Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /SampleInsights/req-map-get",
            displayName: "HTTP GET /SampleInsights/req-map-get",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/req-map-get",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$reqMapOfGet",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$reqMapOfGet"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId:
            "endpoint:epHTTP:HTTP GET /SampleInsights/req-map-get",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 848.38,
                unit: "μs",
                raw: 848375
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 848.38,
                unit: "μs",
                raw: 848375
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "D63F1AAAEBD1CF29",
            startTime: "2023-08-03T15:03:18.307729Z",
            duration: {
              value: 503.79,
              unit: "μs",
              raw: 503792
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.981053Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /SampleInsights/ErrorRecordedOnCurrentSpan",
            displayName: "HTTP GET /SampleInsights/ErrorRecordedOnCurrentSpan",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/ErrorRecordedOnCurrentSpan",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genErrorRecordedOnCurrentSpan",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genErrorRecordedOnCurrentSpan"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId:
            "endpoint:epHTTP:HTTP GET /SampleInsights/ErrorRecordedOnCurrentSpan",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 717.21,
                unit: "μs",
                raw: 717208
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 717.21,
                unit: "μs",
                raw: 717208
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            },
            {
              type: "Errors",
              importance: 5,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "AD4D4FE0A11A2170",
            startTime: "2023-08-03T15:03:18.336006Z",
            duration: {
              value: 443.17,
              unit: "μs",
              raw: 443166
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:38.006345Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /SampleInsights/ErrorRecordedOnDeeplyNestedSpan",
            displayName:
              "HTTP GET /SampleInsights/ErrorRecordedOnDeeplyNestedSpan",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/ErrorRecordedOnDeeplyNestedSpan",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genErrorRecordedOnDeeplyNestedSpan",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genErrorRecordedOnDeeplyNestedSpan"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId:
            "endpoint:epHTTP:HTTP GET /SampleInsights/ErrorRecordedOnDeeplyNestedSpan",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 1.38,
                unit: "ms",
                raw: 1381500
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 1.38,
                unit: "ms",
                raw: 1381500
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            },
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "Errors",
              importance: 5,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "58BC12FDA32858AF",
            startTime: "2023-08-03T15:03:18.311066Z",
            duration: {
              value: 539,
              unit: "μs",
              raw: 539000
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.9828Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /SampleInsights/NPlusOneWithInternalSpan",
            displayName: "HTTP GET /SampleInsights/NPlusOneWithInternalSpan",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/NPlusOneWithInternalSpan",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithInternalSpan",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithInternalSpan"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId:
            "endpoint:epHTTP:HTTP GET /SampleInsights/NPlusOneWithInternalSpan",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 5.58,
                unit: "ms",
                raw: 5584625
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 5.58,
                unit: "ms",
                raw: 5584625
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "EndpointSpaNPlusOne",
              importance: 3,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "3871328751120A7C",
            startTime: "2023-08-03T15:03:15.617267Z",
            duration: {
              value: 1.13,
              unit: "ms",
              raw: 1128834
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:37.946461Z"
        },
        {
          span: {
            classification: "Endpoint",
            role: "Entry",
            name: "HTTP GET /SampleInsights/ErrorRecordedOnLocalRootSpan",
            displayName:
              "HTTP GET /SampleInsights/ErrorRecordedOnLocalRootSpan",
            instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/ErrorRecordedOnLocalRootSpan",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genErrorRecordedOnLocalRootSpan",
            kind: "Server",
            codeObjectId:
              "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genErrorRecordedOnLocalRootSpan"
          },
          assetType: "Endpoint",
          serviceName: "PetClinic",
          endpointCodeObjectId:
            "endpoint:epHTTP:HTTP GET /SampleInsights/ErrorRecordedOnLocalRootSpan",
          durationPercentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 19.55,
                unit: "ms",
                raw: 19547667
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 19.55,
                unit: "ms",
                raw: 19547667
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["3A3D10C8C5C6B499DAB699B7DB310E7A"]
            }
          ],
          impactScores: {
            ScoreExp25: 0,
            ScoreExp1000: 0
          },
          insights: [
            {
              type: "EndpointBreakdown",
              importance: 6,
              shortDisplayInfo: {
                title: "Request Breakdown",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "LowUsage",
              importance: 6,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5,
              shortDisplayInfo: {
                title: "Scaling Data",
                targetDisplayName: "",
                subtitle: "",
                description: "Partial scale data is available"
              }
            },
            {
              type: "HotSpot",
              importance: 2,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            },
            {
              type: "Errors",
              importance: 5,
              shortDisplayInfo: {
                title: "",
                targetDisplayName: "",
                subtitle: "",
                description: ""
              }
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "3A3D10C8C5C6B499DAB699B7DB310E7A",
            spanId: "BF20230D9EE14707",
            startTime: "2023-08-03T15:03:18.33264Z",
            duration: {
              value: 918.67,
              unit: "μs",
              raw: 918667
            }
          },
          firstDataSeenTime: "2023-08-03T15:03:38.006385Z"
        }
      ],
      accountId: "00000000-0000-0000-0000-000000000000",
      environment: "SAMPLE_ENV",
      serviceName: "PetClinic"
    }
  ]
};
