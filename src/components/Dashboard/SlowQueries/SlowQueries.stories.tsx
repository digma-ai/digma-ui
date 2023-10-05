import { Meta, StoryObj } from "@storybook/react";

import { SlowQueries } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SlowQueries> = {
  title: "Dashboard/SlowQueries",
  component: SlowQueries,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    data: {
      data: {
        totalCount: 42,
        entries: [
          {
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$EB8BFCC7CCBFFEB53DE556C5BD7076",
            displayName:
              "CREATE TABLE vets ( id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, first_name VARCHAR(?), last_name VARCHAR(?) )",
            p50: {
              value: 8.75,
              unit: "ms",
              raw: 8754134.0
            },
            p95: null
          },
          {
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$E7282CAD9F8070ED0A44B5DBEB75CC",
            displayName: "DROP TABLE vet_specialties IF EXISTS",
            p50: {
              value: 6.58,
              unit: "ms",
              raw: 6577110.0
            },
            p95: null
          },
          {
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$062DB0F76E94C36D73CB5A6B280BE6",
            displayName:
              "select distinct o1_0.id,o1_0.address,o1_0.city,o1_0.first_name,o1_0.last_name,o1_0.telephone from owners o1_0 left join pets p1_0 on o1_0.id=p1_0.owner_id where o1_0.last_name like (?||?) escape ? offset ? rows fetch first ? rows only",
            p50: {
              value: 5.98,
              unit: "ms",
              raw: 5979191.0
            },
            p95: null
          },
          {
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$AFF8D4B5E9785551A0C4D47C3D17C3",
            displayName:
              "ALTER TABLE vet_specialties ADD CONSTRAINT fk_vet_specialties_vets FOREIGN KEY (vet_id) REFERENCES vets (id)",
            p50: {
              value: 5.44,
              unit: "ms",
              raw: 5435628.0
            },
            p95: null
          },
          {
            spanCodeObjectId:
              "span:io.opentelemetry.jdbc$_$6AC232C4D7113ABD6F3EBF961FAC96",
            displayName:
              "select count(distinct o1_0.id) from owners o1_0 left join pets p1_0 on o1_0.id=p1_0.owner_id where o1_0.last_name like (?||?) escape ?",
            p50: {
              value: 2.31,
              unit: "ms",
              raw: 2305237.0
            },
            p95: null
          }
        ]
      },
      type: "SlowQuery",
      error: null
    }
  }
};
