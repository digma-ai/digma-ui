import type { IncidentAgentEvent } from "../../../../redux/services/types";

export const mockedAgentEvents: IncidentAgentEvent[] = [
  {
    id: "1",
    type: "human",
    message: "Can you help me understand why my API response time is slow?",
    agent_name: "agent"
  },
  {
    id: "2",
    type: "token",
    message: "Let me analyze your application's performance data...",
    agent_name: "agent"
  },
  {
    id: "3",
    type: "token",
    message:
      "I've found several performance issues in your application:\n\n1. **Database Query Optimization**: Your user lookup queries are taking an average of 2.3 seconds\n2. **Memory Usage**: High memory allocation in the user service\n3. **Cache Misses**: 78% cache miss rate on user data\n\nWould you like me to suggest specific optimizations for any of these areas?",
    agent_name: "agent",
    section: {
      id: "observability",
      name: "Observability Investigator",
      description: "Objective: Look for any issues in the traces",
      status: "running"
    }
  },
  {
    id: "4",
    type: "tool",
    agent_name: "agent",
    message:
      '\n```json\n{\n  "success": false,\n  "blockers": "Limited tool access prevents thorough investigation of system-wide issues, infrastructure problems, service mesh configurations, and external dependencies. Need access to Kubernetes API, service mesh telemetry, network monitoring tools, and container logs.",\n  "result": {\n    "is_relevant": true,\n    "objective_success": false,\n    "blockers": "Limited tool access prevents thorough investigation of system-wide issues, infrastructure problems, service mesh configurations, and external dependencies. Need access to Kubernetes API, service mesh telemetry, network monitoring tools, and container logs.",\n    "beyond_the_result": {\n      "summary": "Unable to fully investigate alternative causes due to tool limitations, but analysis suggests potential issues in service mesh, network policies, or external dependencies",\n      "description": "The investigation revealed a severe performance degradation (2650%) in the PipelineConnector Execute operation that has been ongoing for over 24 hours. While direct investigation was limited by tool access, the pattern and severity suggest potential issues with service mesh routing, network policies, cross-namespace communication, or external service dependencies rather than simple resource constraints.",\n      "confidence_level": "30",\n      "confidence_level_reason": "Limited tool access prevents thorough investigation of infrastructure and network-related causes. The assessment is based primarily on timing patterns and service impact analysis rather than direct evidence."\n    },\n    "next_steps_suggestions": "1. Request access to Kubernetes cluster information and API\\n2. Obtain access to service mesh telemetry and dashboard\\n3. Deploy network monitoring tools\\n4. Enable access to container logs\\n5. Once access is granted, conduct thorough analysis of namespace configurations, service mesh settings, network policies, and external service dependencies",\n    "actions_taken": [\n      {\n        "action": "Gathered relevant objects",\n        "action_execution_success": true,\n        "action_command": "list_relevant_incident_objects",\n        "resolution_success_status": "PARTIAL",\n        "resolution_explanation": "Successfully identified the critical trace ID but couldn\'t gather infrastructure-related objects",\n        "resolution_success_evidence": "Retrieved trace ID FB0C56FA98816BBBFBB934CCEDEA72E4 showing the performance degradation",\n        "state_changes_confirmed_due_to_actions": "Confirmed existence of trace showing 2650% performance degradation in PipelineConnector Execute operation"\n      },\n      {\n        "action": "Tracked relevant trace",\n        "action_execution_success": true,\n        "action_command": "track_incident_relevant_object",\n        "resolution_success_status": "PARTIAL",\n        "resolution_explanation": "Successfully tracked the critical trace ID for future reference",\n        "resolution_success_evidence": "Trace ID FB0C56FA98816BBBFBB934CCEDEA72E4 was successfully tracked",\n        "state_changes_confirmed_due_to_actions": "Added trace to tracked objects for future investigation"\n      }\n    ]\n  }\n}\n```\n',
    tool_name: "kubernetes_resolution_expert_tool",
    mcp_name: "",
    status: "success",
    section: {
      id: "observability",
      name: "Observability Investigator",
      description: "Objective: Look for any issues in the traces",
      status: "running"
    }
  },
  {
    id: "5",
    type: "token",
    message:
      "Here are my recommendations for optimizing your database queries:\n\n```sql\n-- Add an index on the email column\nCREATE INDEX idx_users_email ON users(email);\n\n-- Use prepared statements\nSELECT id, name, email FROM users WHERE email = ?\n```\n\nThis should reduce your query time from 2.3s to under 100ms.",
    agent_name: "agent",
    section: {
      id: "code",
      name: "Code Investigator",
      description: "Objective: Look for any issues in the repo codebase",
      status: "waiting"
    }
  }
];
