// ============================================================
// MOCK DATA — DO NOT MODIFY THIS FILE DURING THE ASSIGNMENT
// ============================================================

const DATA_STORES = [
  {
    id: "ds-001",
    name: "Production PostgreSQL",
    type: "database",
    platform: "AWS RDS",
    region: "us-east-1",
    owner: "backend-team",
    tags: ["production", "customer-data"],
    lastScanned: "2026-06-14T08:30:00Z",
    status: "connected",
  },
  {
    id: "ds-002",
    name: "Analytics Snowflake",
    type: "data-warehouse",
    platform: "Snowflake",
    region: "us-west-2",
    owner: "data-team",
    tags: ["analytics", "pii"],
    lastScanned: "2026-06-14T12:00:00Z",
    status: "connected",
  },
  {
    id: "ds-003",
    name: "Marketing S3 Bucket",
    type: "object-storage",
    platform: "AWS S3",
    region: "eu-west-1",
    owner: "marketing-team",
    tags: ["marketing", "gdpr"],
    lastScanned: "2026-06-13T22:15:00Z",
    status: "connected",
  },
  {
    id: "ds-004",
    name: "HR MongoDB",
    type: "database",
    platform: "MongoDB Atlas",
    region: "us-east-1",
    owner: "hr-team",
    tags: ["hr", "employee-data", "pii"],
    lastScanned: "2026-06-14T06:00:00Z",
    status: "connected",
  },
  {
    id: "ds-005",
    name: "Legacy MySQL",
    type: "database",
    platform: "On-Premise",
    region: "us-central",
    owner: "backend-team",
    tags: ["legacy", "migration-pending"],
    lastScanned: "2026-06-10T14:00:00Z",
    status: "stale",
  },
  {
    id: "ds-006",
    name: "Customer Support Zendesk",
    type: "saas",
    platform: "Zendesk",
    region: "global",
    owner: "support-team",
    tags: ["support", "customer-data"],
    lastScanned: "2026-06-14T10:45:00Z",
    status: "connected",
  },
  {
    id: "ds-007",
    name: "Finance Google Sheets",
    type: "saas",
    platform: "Google Workspace",
    region: "global",
    owner: "finance-team",
    tags: ["finance", "sensitive"],
    lastScanned: "2026-06-12T09:00:00Z",
    status: "error",
  },
  {
    id: "ds-008",
    name: "Dev Elasticsearch",
    type: "database",
    platform: "Elastic Cloud",
    region: "us-east-1",
    owner: "backend-team",
    tags: ["dev", "logs"],
    lastScanned: "2026-06-14T11:30:00Z",
    status: "connected",
  },
  {
    id: "ds-009",
    name: "Compliance Azure Blob",
    type: "object-storage",
    platform: "Azure Blob",
    region: "eu-central-1",
    owner: "compliance-team",
    tags: ["compliance", "audit-logs", "gdpr"],
    lastScanned: "2026-06-14T07:00:00Z",
    status: "connected",
  },
  {
    id: "ds-010",
    name: "ML Training Data Lake",
    type: "data-warehouse",
    platform: "Databricks",
    region: "us-west-2",
    owner: "ml-team",
    tags: ["ml", "training-data"],
    lastScanned: "2026-06-13T18:00:00Z",
    status: "connected",
  },
];

const SENSITIVITY_LABELS = ["public", "internal", "confidential", "restricted"];

const DATA_CLASSES = [
  "email_address",
  "phone_number",
  "ssn",
  "credit_card",
  "full_name",
  "date_of_birth",
  "ip_address",
  "password_hash",
  "api_key",
  "medical_record",
  "bank_account",
  "home_address",
  "passport_number",
  "driver_license",
  "salary",
];

const FINDINGS = [
  // ds-001: Production PostgreSQL
  { id: "f-001", dataStoreId: "ds-001", table: "users", column: "email", dataClass: "email_address", sensitivity: "confidential", recordCount: 245000, autoClassified: true, overridden: false },
  { id: "f-002", dataStoreId: "ds-001", table: "users", column: "phone", dataClass: "phone_number", sensitivity: "confidential", recordCount: 198000, autoClassified: true, overridden: false },
  { id: "f-003", dataStoreId: "ds-001", table: "users", column: "name", dataClass: "full_name", sensitivity: "internal", recordCount: 245000, autoClassified: true, overridden: false },
  { id: "f-004", dataStoreId: "ds-001", table: "users", column: "ssn", dataClass: "ssn", sensitivity: "restricted", recordCount: 12500, autoClassified: true, overridden: false },
  { id: "f-005", dataStoreId: "ds-001", table: "orders", column: "card_number", dataClass: "credit_card", sensitivity: "restricted", recordCount: 89000, autoClassified: true, overridden: false },
  { id: "f-006", dataStoreId: "ds-001", table: "orders", column: "billing_address", dataClass: "home_address", sensitivity: "confidential", recordCount: 89000, autoClassified: true, overridden: false },
  { id: "f-007", dataStoreId: "ds-001", table: "sessions", column: "ip", dataClass: "ip_address", sensitivity: "internal", recordCount: 1200000, autoClassified: true, overridden: false },
  { id: "f-008", dataStoreId: "ds-001", table: "auth", column: "pwd_hash", dataClass: "password_hash", sensitivity: "restricted", recordCount: 245000, autoClassified: true, overridden: false },

  // ds-002: Analytics Snowflake
  { id: "f-009", dataStoreId: "ds-002", table: "user_events", column: "user_email", dataClass: "email_address", sensitivity: "confidential", recordCount: 5400000, autoClassified: true, overridden: false },
  { id: "f-010", dataStoreId: "ds-002", table: "user_events", column: "ip_address", dataClass: "ip_address", sensitivity: "internal", recordCount: 5400000, autoClassified: true, overridden: false },
  { id: "f-011", dataStoreId: "ds-002", table: "user_profiles", column: "full_name", dataClass: "full_name", sensitivity: "internal", recordCount: 320000, autoClassified: true, overridden: false },
  { id: "f-012", dataStoreId: "ds-002", table: "user_profiles", column: "dob", dataClass: "date_of_birth", sensitivity: "confidential", recordCount: 320000, autoClassified: true, overridden: false },
  { id: "f-013", dataStoreId: "ds-002", table: "revenue", column: "customer_name", dataClass: "full_name", sensitivity: "internal", recordCount: 89000, autoClassified: false, overridden: false },

  // ds-003: Marketing S3 Bucket
  { id: "f-014", dataStoreId: "ds-003", table: "campaign_exports/", column: "email_list.csv", dataClass: "email_address", sensitivity: "confidential", recordCount: 1500000, autoClassified: true, overridden: false },
  { id: "f-015", dataStoreId: "ds-003", table: "campaign_exports/", column: "contacts.csv", dataClass: "phone_number", sensitivity: "confidential", recordCount: 890000, autoClassified: true, overridden: false },
  { id: "f-016", dataStoreId: "ds-003", table: "gdpr_exports/", column: "full_export.json", dataClass: "home_address", sensitivity: "restricted", recordCount: 45000, autoClassified: true, overridden: false },

  // ds-004: HR MongoDB
  { id: "f-017", dataStoreId: "ds-004", table: "employees", column: "ssn", dataClass: "ssn", sensitivity: "restricted", recordCount: 3200, autoClassified: true, overridden: false },
  { id: "f-018", dataStoreId: "ds-004", table: "employees", column: "salary", dataClass: "salary", sensitivity: "restricted", recordCount: 3200, autoClassified: true, overridden: false },
  { id: "f-019", dataStoreId: "ds-004", table: "employees", column: "home_address", dataClass: "home_address", sensitivity: "confidential", recordCount: 3200, autoClassified: true, overridden: false },
  { id: "f-020", dataStoreId: "ds-004", table: "employees", column: "bank_account", dataClass: "bank_account", sensitivity: "restricted", recordCount: 3200, autoClassified: true, overridden: false },
  { id: "f-021", dataStoreId: "ds-004", table: "employees", column: "passport", dataClass: "passport_number", sensitivity: "restricted", recordCount: 1800, autoClassified: true, overridden: false },
  { id: "f-022", dataStoreId: "ds-004", table: "employees", column: "dl_number", dataClass: "driver_license", sensitivity: "restricted", recordCount: 2900, autoClassified: true, overridden: false },
  { id: "f-023", dataStoreId: "ds-004", table: "candidates", column: "email", dataClass: "email_address", sensitivity: "confidential", recordCount: 18000, autoClassified: true, overridden: false },
  { id: "f-024", dataStoreId: "ds-004", table: "candidates", column: "phone", dataClass: "phone_number", sensitivity: "confidential", recordCount: 15000, autoClassified: true, overridden: false },
  { id: "f-025", dataStoreId: "ds-004", table: "medical", column: "record", dataClass: "medical_record", sensitivity: "restricted", recordCount: 2100, autoClassified: true, overridden: false },

  // ds-005: Legacy MySQL
  { id: "f-026", dataStoreId: "ds-005", table: "customers", column: "cc_number", dataClass: "credit_card", sensitivity: "restricted", recordCount: 67000, autoClassified: true, overridden: false },
  { id: "f-027", dataStoreId: "ds-005", table: "customers", column: "email", dataClass: "email_address", sensitivity: "confidential", recordCount: 120000, autoClassified: true, overridden: false },
  { id: "f-028", dataStoreId: "ds-005", table: "customers", column: "api_token", dataClass: "api_key", sensitivity: "restricted", recordCount: 45000, autoClassified: false, overridden: false },

  // ds-006: Zendesk
  { id: "f-029", dataStoreId: "ds-006", table: "tickets", column: "customer_email", dataClass: "email_address", sensitivity: "confidential", recordCount: 890000, autoClassified: true, overridden: false },
  { id: "f-030", dataStoreId: "ds-006", table: "tickets", column: "description", dataClass: "credit_card", sensitivity: "restricted", recordCount: 1200, autoClassified: true, overridden: true },
  { id: "f-031", dataStoreId: "ds-006", table: "tickets", column: "phone", dataClass: "phone_number", sensitivity: "confidential", recordCount: 340000, autoClassified: true, overridden: false },

  // ds-007: Finance Google Sheets
  { id: "f-032", dataStoreId: "ds-007", table: "payroll_2026", column: "salary", dataClass: "salary", sensitivity: "restricted", recordCount: 450, autoClassified: true, overridden: false },
  { id: "f-033", dataStoreId: "ds-007", table: "payroll_2026", column: "bank_details", dataClass: "bank_account", sensitivity: "restricted", recordCount: 450, autoClassified: true, overridden: false },
  { id: "f-034", dataStoreId: "ds-007", table: "vendor_contacts", column: "email", dataClass: "email_address", sensitivity: "internal", recordCount: 120, autoClassified: true, overridden: false },

  // ds-008: Elasticsearch
  { id: "f-035", dataStoreId: "ds-008", table: "app-logs", column: "user_ip", dataClass: "ip_address", sensitivity: "internal", recordCount: 45000000, autoClassified: true, overridden: false },
  { id: "f-036", dataStoreId: "ds-008", table: "app-logs", column: "user_email", dataClass: "email_address", sensitivity: "confidential", recordCount: 12000000, autoClassified: false, overridden: false },

  // ds-009: Azure Blob
  { id: "f-037", dataStoreId: "ds-009", table: "audit-logs/", column: "access_log.json", dataClass: "ip_address", sensitivity: "internal", recordCount: 8900000, autoClassified: true, overridden: false },
  { id: "f-038", dataStoreId: "ds-009", table: "compliance-reports/", column: "gdpr_report.pdf", dataClass: "full_name", sensitivity: "confidential", recordCount: 5600, autoClassified: true, overridden: false },

  // ds-010: Databricks
  { id: "f-039", dataStoreId: "ds-010", table: "training_set_v3", column: "user_features", dataClass: "email_address", sensitivity: "confidential", recordCount: 2300000, autoClassified: true, overridden: false },
  { id: "f-040", dataStoreId: "ds-010", table: "training_set_v3", column: "demographic", dataClass: "date_of_birth", sensitivity: "confidential", recordCount: 2300000, autoClassified: false, overridden: false },
];

const ACTIVITY_LOG = [
  { id: "a-001", dataStoreId: "ds-001", action: "scan_completed", user: "system", timestamp: "2026-06-14T08:30:00Z", details: "Full scan completed. 8 findings." },
  { id: "a-002", dataStoreId: "ds-001", action: "classification_override", user: "alice@company.com", timestamp: "2026-06-14T09:15:00Z", details: "Changed sessions.ip from 'confidential' to 'internal'." },
  { id: "a-003", dataStoreId: "ds-004", action: "scan_completed", user: "system", timestamp: "2026-06-14T06:00:00Z", details: "Full scan completed. 9 findings." },
  { id: "a-004", dataStoreId: "ds-004", action: "new_finding", user: "system", timestamp: "2026-06-14T06:01:00Z", details: "New restricted data found: medical.record (medical_record)." },
  { id: "a-005", dataStoreId: "ds-007", action: "connection_error", user: "system", timestamp: "2026-06-12T09:00:00Z", details: "OAuth token expired. Re-authentication required." },
  { id: "a-006", dataStoreId: "ds-005", action: "scan_completed", user: "system", timestamp: "2026-06-10T14:00:00Z", details: "Full scan completed. 3 findings." },
  { id: "a-007", dataStoreId: "ds-005", action: "alert", user: "system", timestamp: "2026-06-10T14:05:00Z", details: "API keys found in legacy database — immediate review recommended." },
  { id: "a-008", dataStoreId: "ds-006", action: "classification_override", user: "bob@company.com", timestamp: "2026-06-13T16:30:00Z", details: "Marked tickets.description credit_card finding as false positive (overridden)." },
  { id: "a-009", dataStoreId: "ds-003", action: "scan_completed", user: "system", timestamp: "2026-06-13T22:15:00Z", details: "Full scan completed. 3 findings." },
  { id: "a-010", dataStoreId: "ds-002", action: "scan_completed", user: "system", timestamp: "2026-06-14T12:00:00Z", details: "Full scan completed. 5 findings." },
  { id: "a-011", dataStoreId: "ds-010", action: "scan_completed", user: "system", timestamp: "2026-06-13T18:00:00Z", details: "Full scan completed. 2 findings. 1 manually classified." },
  { id: "a-012", dataStoreId: "ds-009", action: "scan_completed", user: "system", timestamp: "2026-06-14T07:00:00Z", details: "Full scan completed. 2 findings." },
];

export { DATA_STORES, FINDINGS, ACTIVITY_LOG, SENSITIVITY_LABELS, DATA_CLASSES };
