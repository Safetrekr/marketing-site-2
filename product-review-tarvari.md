# TarvaRI -- Product Capabilities Document

**Version:** 2.1
**Date:** February 2026
**Classification:** Internal / Marketing Collateral

---

## Executive Summary

TarvaRI is an enterprise-grade real-time risk intelligence platform that continuously monitors, analyzes, and delivers safety-critical intelligence to protect traveling groups. It serves as the intelligence engine within the Safetrekr ecosystem, automating the full lifecycle of risk data -- from ingestion of raw feeds from authoritative global sources, through AI-powered risk scoring and analyst triage, to multi-channel alert delivery directly to travelers and their leadership in the field.

The platform processes intelligence from 11+ specialized source parsers across weather, seismic, health, humanitarian, aviation, disaster management, and geopolitical domains. Its 12-feature risk scoring model employs Monte Carlo simulation to quantify uncertainty, producing probability-calibrated risk assessments (P5/P50/P95 bands) that inform automated courses of action. TarvaRI delivers alerts via email, SMS, push notification, and real-time in-app channels, with escalation workflows that enforce acknowledgment SLAs down to 5-minute response windows for critical events.

TarvaRI includes a full-featured React/TypeScript analyst console for source management, intelligence triage, risk model configuration, delivery monitoring, system health diagnostics, and audit trail review.

---

## Table of Contents

1. [Intelligence Ingestion Pipeline](#1-intelligence-ingestion-pipeline)
2. [Source Connectors](#2-source-connectors)
3. [Source Parsers and Normalization](#3-source-parsers-and-normalization)
4. [Intelligence Bundling and Deduplication](#4-intelligence-bundling-and-deduplication)
5. [Risk Scoring Engine](#5-risk-scoring-engine)
6. [Hazard Classification](#6-hazard-classification)
7. [Trip Impact Analysis](#7-trip-impact-analysis)
8. [Analyst Triage Workflow](#8-analyst-triage-workflow)
9. [Alert Routing](#9-alert-routing)
10. [Multi-Channel Alert Delivery](#10-multi-channel-alert-delivery)
11. [Escalation and SLA Enforcement](#11-escalation-and-sla-enforcement)
12. [Course of Action Generation](#12-course-of-action-generation)
13. [Dead Letter Queue Management](#13-dead-letter-queue-management)
14. [Delivery Policy Engine](#14-delivery-policy-engine)
15. [Model Versioning and Configuration](#15-model-versioning-and-configuration)
16. [Protection Scoring (Safe Houses and Rally Points)](#16-protection-scoring)
17. [Real-Time Notifications](#17-real-time-notifications)
18. [Admin Console](#18-admin-console)
19. [Observability and Telemetry](#19-observability-and-telemetry)
20. [Data Retention and Cleanup](#20-data-retention-and-cleanup)
21. [Security and Access Control](#21-security-and-access-control)
22. [API and Integration Layer](#22-api-and-integration-layer)
23. [Operational Tooling](#23-operational-tooling)
24. [Deployment and Infrastructure](#24-deployment-and-infrastructure)

---

## 1. Intelligence Ingestion Pipeline

TarvaRI operates a continuous intelligence ingestion pipeline that polls authoritative sources on configurable intervals, fetches raw data via transport-layer connectors, normalizes it through domain-specific parsers, and stores the results in a centralized intelligence database.

**Key capabilities:**

- **Automated polling** with configurable intervals per source (default: 5 minutes), managed by an independent ingest worker process.
- **Health tracking** for every source: last poll time, last successful ingestion, last error with message, and success rate over 24 hours.
- **SHA-256 lineage hashing** for deduplication at ingestion time -- duplicate records are detected and silently dropped before database insertion.
- **Scheduler control** via Redis flags, allowing operators to enable, disable, and monitor the ingest worker without restarting processes.
- **Worker heartbeat monitoring** with TTL-based liveness detection (60-second threshold) -- if a worker stops updating its heartbeat, the system reports it as unresponsive.
- **Graceful shutdown** via POSIX signal handlers (SIGTERM/SIGINT) across all worker processes, ensuring clean disconnection from databases and HTTP clients.
- **Extensible source registry** -- new sources are added by configuring a database record (endpoint URL, parser class, polling interval, authentication) with no code deployment required for sources that match existing connector and parser types.

---

## 2. Source Connectors

Connectors form the transport layer, responsible for fetching raw data from external source APIs. All connectors inherit from a common base class that provides rate limiting, authentication management, and error handling.

**Connector types:**

| Connector | Protocol | Use Cases |
|-----------|----------|-----------|
| **RESTConnector** | HTTP JSON/XML | USGS earthquake feeds, ReliefWeb API, CDC travel notices, FEMA disaster data |
| **RSSConnector** | RSS/Atom feeds | GDACS alerts, NWS weather advisories, generic news feeds |
| **WebSocketConnector** | WebSocket (ws/wss) | Real-time seismic streams, aviation data, live sensor feeds |
| **WMSConnector** | OGC WMS/WFS | Geospatial map services, satellite imagery layers, vector feature queries |

**WebSocket connector features:**
- Auto-reconnection with configurable delay and maximum retry attempts
- Message buffering during temporary disconnections
- Heartbeat/ping-pong for connection health
- Subscription management for topic-based streaming

**WMS/WFS connector features:**
- GetCapabilities, GetMap, GetFeatureInfo, and GetFeature operations
- Temporal and bounding box queries
- Layer selection for multi-layer services

**Common connector capabilities:**
- API key, bearer token, and basic auth support
- Configurable rate limits per source
- Request timeout management
- Structured error reporting with connection-level diagnostics

---

## 3. Source Parsers and Normalization

Parsers transform raw payloads from diverse source formats into a unified `CreateIntelRequest` schema. Every parser inherits from `BaseParser`, which provides lineage hash computation, geographic extraction, and severity mapping utilities.

**Supported parsers (11 implementations, 8 active in parser registry):**

| Parser | Source Domain | Data Format |
|--------|-------------|-------------|
| **NWSCAPParser** | National Weather Service | CAP XML (Common Alerting Protocol) |
| **USGSEarthquakeParser** | US Geological Survey | GeoJSON FeatureCollection |
| **CDCTravelNoticesParser** | Centers for Disease Control | RSS/Atom health notices |
| **ReliefWebParser** | UN OCHA ReliefWeb | REST API JSON |
| **GDACSParser** | Global Disaster Alert System | RSS/Atom multi-hazard alerts |
| **GenericCAPParser** | Any CAP-compliant source | CAP XML (extensible) |
| **GenericRSSParser** | Any RSS feed | RSS/Atom (extensible) |
| **GenericGeoJSONParser** | Any GeoJSON source | GeoJSON features (extensible) |
| **FAANotamCSVParser** | Federal Aviation Administration | CSV (aviation NOTAMs) |
| **StateDeptTravelCSVParser** | US State Department | CSV (travel advisories) |
| **FEMADisasterCSVParser** | Federal Emergency Management Agency | CSV (disaster declarations) |

**Normalization output includes:**
- Title, short summary, and full text
- Severity classification: Extreme, Severe, Moderate, Minor, Unknown
- Category tagging: weather, seismic, health, conflict, humanitarian, infrastructure, fire, flood, storm, other
- GeoJSON geometry (PostGIS-compatible) for spatial operations
- ISO 8601 UTC timestamps
- Source ID and lineage hash for provenance tracking
- 768-dimensional vector embedding field for semantic search (when enabled)

**Parser registry pattern:** A centralized registry maps parser class name strings to implementations, enabling dynamic parser selection from database configuration without code changes. Currently 8 parsers are registered for dynamic lookup. The 3 generic parsers (GenericCAPParser, GenericRSSParser, GenericGeoJSONParser) exist as implementations and can be registered when needed for new source types.

---

## 4. Intelligence Bundling and Deduplication

The Bundler Worker is a critical pipeline stage that transforms individual intelligence records into coherent bundles -- clustered groups of related intelligence from potentially multiple sources about the same event.

**Clustering algorithms:**
- **Geographic clustering** with a 50km radius using the Haversine formula for great-circle distance calculation
- **Temporal clustering** within a 24-hour sliding window
- **Category matching** to ensure only same-category intel is bundled together (e.g., earthquake records bundle separately from weather records)

**Bundle metadata:**
- Unique bundle ID, title, and summary
- Member intel IDs array for full traceability
- Source count and source breakdown (which source contributed how many records)
- Representative coordinates and geographic scope (point + radius)
- Temporal scope (start/end timestamps)
- Deduplication keys for cross-bundle duplicate detection
- Status workflow: pending, under_review, approved, rejected
- Risk score (computed when bundle reaches 3+ intel records)
- Analyst notes field

**Processing characteristics:**
- Batch processing (100 records per cycle) to avoid database overload
- Automatic risk scoring integration once a bundle accumulates 3 or more intelligence records
- Configurable poll interval (default: 5 minutes)
- Full bundle deduplication (feature-flagged, enabled by default)

---

## 5. Risk Scoring Engine

TarvaRI's risk scoring engine is a sophisticated 12-feature model that computes probability-calibrated risk assessments using Monte Carlo simulation.

**12-feature model across 5 domains:**

| Domain | Weight | Features |
|--------|--------|----------|
| **Hazard** | 40% | hazardSeverity, footprintProximity, immediacy, duration, sourceConfidence |
| **Exposure** | 20% | populationAtRisk, segmentCriticality |
| **Vulnerability** | 20% | builtEnvFragility, medicalAccess |
| **Exfiltration** | 15% | groupConstraints, exfilComplexity |
| **Confidence** | 5% | commsResilience |

**Monte Carlo simulation:**
- 500 samples per assessment with 5% Gaussian noise (configurable standard deviation)
- Produces P5, P50, and P95 uncertainty bands on a 0-100 risk scale
- P5 represents the optimistic estimate, P50 the median, and P95 the pessimistic estimate

**Risk driver identification:**
- Automatically identifies the top 5 risk drivers (features contributing most to the overall score)
- Classifies each driver's impact as critical (>=0.10), high (>=0.07), medium (>=0.04), or low

**Trigger matrix:**
- Database-configurable trigger rules applied in priority order
- Matches on P50 risk range and uncertainty level (low/medium/high)
- Determines Course of Action level: minimal, standard, elevated, max
- Supports auto-routing for extreme risk scenarios (P50 >= 80)
- Fallback logic when no trigger rules match

**Hazard-specific adapters:**
- **EarthquakeAdapter**: Extracts seismic-specific features (magnitude, depth, proximity to fault lines)
- **WeatherAdapter**: Extracts meteorological features (storm intensity, precipitation rates, wind speeds)
- **UnrestAdapter**: Extracts conflict-specific features (violence indicators, crowd density, proximity to unrest)

**Lineage and auditability:**
- SHA-256 lineage hash computed for every risk assessment
- Includes model version, feature values, weights, and computed scores
- Full audit trail with timestamps for regulatory compliance

**Bundle-level scoring:**
- Simplified aggregate scoring for bundles (max severity + source confidence boost)
- Source diversity bonus: up to +20% for corroborating sources (5+)
- Confidence scoring based on intel count and source diversity

---

## 6. Hazard Classification

The Hazard Classifier converts raw intelligence alerts into structured hazard bundles with extracted spatial footprints, time windows, and hazard-specific attributes.

**Classification outputs:**
- Category assignment (earthquake, weather, unrest, health, humanitarian, infrastructure)
- Normalized severity (0-1 scale)
- Confidence score
- Spatial footprint (GeoJSON geometry)
- Temporal window (start/end)
- Hazard-specific attributes (e.g., magnitude for earthquakes, wind speed for storms)
- Evidence chain linking back to source intelligence records

---

## 7. Trip Impact Analysis

The Trip Impact Engine identifies which trips are affected by a hazard through spatio-temporal overlap detection and computes trip-level risk aggregation.

**Capabilities:**
- Queries active, upcoming, and in-progress trips
- Converts trip itineraries into segments for granular analysis
- Computes risk assessments for each segment using the full 12-feature model
- Aggregates segment-level scores to trip-level risk
- Supports PostGIS spatial intersection queries for footprint overlap
- Organization-scoped filtering for multi-tenant isolation

---

## 8. Analyst Triage Workflow

TarvaRI provides a structured analyst triage workflow where intelligence bundles are reviewed, prioritized, and routed to affected trips.

**Workflow stages:**
- **Pending**: New bundles awaiting analyst review
- **Under Review**: Bundles currently being evaluated
- **Approved**: Bundles confirmed as relevant and routed to trips
- **Rejected**: Bundles dismissed as not relevant

**Triage decision tracking:**
- Full reviewer action history with versioning and edit tracking
- Priority scoring (0-100) for queue ordering
- Assignment tracking (who is reviewing what)
- Analyst notes for documentation
- Decision timestamps for SLA monitoring

**Review queue features:**
- Sortable by priority, status, creation date, or assigned analyst
- Filterable by status (pending, in_review, approved, rejected, needs_revision)
- Paginated results for high-volume environments

---

## 9. Alert Routing

The Alert Router Worker completes the intelligence pipeline by connecting analyst-approved bundles to specific trips based on multi-factor relevance scoring.

**Relevance scoring algorithm (0-100 scale):**

| Factor | Max Points | Scoring Logic |
|--------|-----------|---------------|
| **Geographic proximity** | 40 | 0-10km: 40pts, 10-50km: 30pts, 50-100km: 20pts, 100-200km: 10pts |
| **Temporal overlap** | 30 | During trip: 30pts, within 7 days: 20pts, within 14 days: 10pts, within 30 days: 5pts |
| **Severity** | 20 | Critical: 20pts, High: 15pts, Medium: 10pts, Low: 5pts |
| **Category relevance** | 10 | Base 5pts + 5pts bonus for high-relevance trip type/category combinations |

**Routing behaviors:**
- Minimum relevance threshold of 30 (configurable) required to create an alert
- Geographic impact radius of 200km for initial trip candidate screening
- 7-day temporal buffer before and after trip dates for trip planning relevance
- Duplicate alert prevention (no duplicate bundle-trip combinations)
- Batch processing of unrouted approved bundles
- Automatic marking of bundles as routed with alert count tracking

---

## 10. Multi-Channel Alert Delivery

TarvaRI delivers alerts through multiple communication channels simultaneously, with intelligent fan-out and comprehensive delivery tracking.

**Delivery channels:**

| Channel | Provider | Status |
|---------|----------|--------|
| **In-App / Real-Time** | Supabase Realtime (WebSocket) | Operational |
| **Email** | Resend API | Operational |
| **SMS** | Twilio | Operational |
| **Push Notification** | FCM/APNS | Planned |

**Delivery pipeline:**
1. Alert published to `alert_outbox` with delivery intents (channels, roles, priority)
2. Delivery Worker polls outbox every 5 seconds (configurable)
3. Concurrent fan-out to all configured channels using asyncio.gather
4. Individual delivery records created for each recipient-channel combination
5. Status tracking: queued, processing, completed, failed

**Email delivery features:**
- Dedicated EmailProvider service wrapping Resend API with automatic mock mode when credentials are not configured
- HTML-formatted alert emails with severity-appropriate styling
- Trip context (trip name, location) embedded in email body
- Duplicate delivery prevention per alert-user-channel combination
- Provider message ID tracking for delivery receipt correlation
- Batch sending support for multiple recipients

**SMS delivery features:**
- Dedicated SMSProvider service wrapping Twilio API with automatic mock mode when credentials are not configured
- E.164 phone number validation
- Severity-appropriate message formatting
- Quiet hours enforcement (no SMS during configured sleep hours)
- Phone number privacy in logs (last 4 digits only)
- Trip context in SMS body
- Batch sending support for multiple recipients

**Real-time delivery features:**
- Organization-scoped channels (org_{orgId}_alerts)
- Trip-scoped channels (trip_{tripId}_alerts)
- Automatic broadcasting via Supabase Postgres Change Events
- Instant push to all connected clients

**Retry and fault tolerance:**
- Exponential backoff retry: 6 attempts with intervals of 1, 2, 4, 8, 16, 32 seconds
- Delivery attempt tracking with last error message
- Automatic DLQ (Dead Letter Queue) escalation after all retries exhausted
- Per-delivery audit trail with timestamps

---

## 11. Escalation and SLA Enforcement

The Escalation Worker monitors alert acknowledgments and enforces response time SLAs, automatically escalating unacknowledged critical alerts through the management chain.

**SLA timeouts by severity:**

| Severity | Acknowledgment SLA | Re-Ping Trigger | Escalation Trigger |
|----------|--------------------|-----------------|--------------------|
| Extreme | 5 minutes | 1x SLA (5 min) | 2x SLA (10 min) |
| Severe | 5 minutes | 1x SLA (5 min) | 2x SLA (10 min) |
| High | 15 minutes | 1x SLA (15 min) | 2x SLA (30 min) |
| Moderate | 60 minutes | 1x SLA (60 min) | 2x SLA (120 min) |
| Low | 120 minutes | 1x SLA (120 min) | 2x SLA (240 min) |
| Minor | 240 minutes | 1x SLA (240 min) | 2x SLA (480 min) |

**Escalation flow:**
1. Alert delivered to chaperone (primary responder)
2. If not acknowledged within SLA window: re-ping chaperone via all channels (push + SMS + email) with critical priority
3. If still not acknowledged after 2x SLA: escalate to org_admin via all channels
4. All escalation events logged in the deliveries table for audit

**Telemetry integration:**
- SLA violation metrics captured with severity and organization dimensions
- Escalation event counters (re_ping vs. escalate) for operational dashboards
- OpenTelemetry spans for distributed tracing of the escalation lifecycle

---

## 12. Course of Action Generation

The COA Service generates role-specific, severity-scaled actionable guidance for every alert using template-based generation. It provides clear instructions for different stakeholders through predefined action templates organized by risk category and severity level. Risk categorization uses keyword-matching against alert headlines and descriptions.

**Capabilities:**
- Automatic risk categorization: weather, natural disaster, health, security, infrastructure, general
- Severity-scaled action templates: extreme (immediate response), moderate (heightened awareness), low (informational)
- Role-specific recipient targeting with priority levels and notification channel preferences
- Approval workflow: pending, approved, implemented (with approval tracking)

**COA recipients by severity:**

| Severity | Chaperone | Org Admin | Traveler |
|----------|-----------|-----------|----------|
| Extreme/Severe | Immediate, actions required, push+SMS+email | Immediate, actions required, push+SMS+email | High, follow guidance, push+in_app |
| High/Moderate | High, actions required, push+email | Medium, informed, email+in_app | Medium, informed, in_app |
| Low/Minor | Low, informational, in_app+email | Low, informational, in_app | Low, informational, in_app |

**Example actions by category:**
- **Weather Extreme**: Activate emergency shelter protocol, contact all travelers, implement alternate routes, coordinate with emergency services, prepare for evacuation
- **Security Moderate**: Avoid affected areas, brief travelers on situational awareness, maintain regular check-ins, have emergency contact plan ready
- **Health Low**: Brief travelers on basic health precautions, ensure first aid supplies available, note health advisory in trip documentation

---

## 13. Dead Letter Queue Management

Failed deliveries that exhaust all retry attempts are moved to a Dead Letter Queue (DLQ) for manual review and replay.

**DLQ capabilities:**
- Automatic capture of failed deliveries with full payload preservation
- Manual replay by administrators with success/failure tracking
- Filtering by organization, channel, and replay status
- Pagination support for high-volume environments
- Summary statistics: total entries, replay success rate, breakdown by channel
- Full audit trail: who replayed, when, and whether the replay succeeded

**Admin API endpoints:**
- `GET /api/admin/dlq/list` -- Browse failed deliveries with filters
- `GET /api/admin/dlq/{id}` -- View full DLQ entry details including original payload
- `POST /api/admin/dlq/replay` -- Manually retry a failed delivery
- `GET /api/admin/dlq/stats/summary` -- Aggregate DLQ statistics

---

## 14. Delivery Policy Engine

The Delivery Policy Service manages per-organization, per-role delivery preferences, including channel opt-in/opt-out, quiet hours enforcement, and severity-based overrides.

**Policy configuration:**
- **Channel preferences**: Enable/disable email, SMS, and push per role per organization
- **Quiet hours**: Configurable start/end times with timezone awareness (e.g., no SMS between 22:00-07:00 EST)
- **Severity exemptions**: Critical and extreme alerts override quiet hours
- **Fallback order**: Ordered channel priority (e.g., try push, then email, then SMS)

**Policy evaluation flow:**
1. Determine target roles for the alert based on severity
2. Fetch delivery policy for each org-role combination
3. Filter out channels that are opt-out or disabled
4. Check quiet hours (with severity exemption logic)
5. Apply fallback order if primary channel is unavailable

---

## 15. Model Versioning and Configuration

TarvaRI provides a comprehensive model lifecycle management system for the risk scoring engine, including version control, weight editing, threshold tuning, backtesting, and calibration monitoring.

**Version management:**
- Create, update, and delete draft model versions
- Publish pending versions to live (with automatic archiving of the current live version)
- Rollback to any previously archived version with documented reason
- Version status flow: draft, pending, live, archived

**Weight configuration:**
- Interactive weight editing for all 12 features across 5 domains
- Global domain weights (Hazard 40%, Exposure 20%, Vulnerability 20%, Exfil 15%, Confidence 5%)
- Per-feature weights within each domain
- Category-specific weight overrides (e.g., different weights for earthquake vs. weather)
- Region-specific weight overrides (e.g., different weights for different ISO country codes)
- Validation enforcement: global weights must sum to 1.0

**Trigger threshold configuration:**
- Decision thresholds for risk levels: immediate, elevated, standard, monitor
- Uncertainty policy configuration (low/medium/high uncertainty bands)
- Hysteresis settings to prevent threshold oscillation
- Trigger simulation endpoint for visualizing decision boundaries

**Backtesting and calibration:**
- Run historical backtests with draft weights over configurable time ranges
- Category and region filtering for targeted backtests
- Calibration metrics: Brier score, log loss, reliability curves, cohort analysis
- Model cards for explainability documentation (changes, rationale, datasets, approvals)

---

## 16. Protection Scoring (Safe Houses and Rally Points)

The Protection Scorer is an AI-powered system that recommends optimal safe houses and rally points for trip segments based on a 12-feature risk model.

**Scoring features:**

| Feature | Weight | Description |
|---------|--------|-------------|
| Risk Severity | 15% | Average risk score in segment |
| Risk Density | 12% | Hazard count per kilometer |
| Segment Duration | 8% | Hours spent in segment |
| Travel Mode | 8% | Walking (high risk), car (medium), transit (low) |
| POI Proximity | 12% | Distance to nearest hospital, embassy, police |
| POI Quality | 10% | OSM quality score, hours, accessibility |
| Population Density | 8% | Urban (more options) vs. rural (critical need) |
| Distance from Start | 7% | Prefer early segment coverage |
| Distance from End | 7% | Prefer endpoint coverage |
| Clustering | 5% | Avoid over-concentration in one area |
| Coverage Gaps | 6% | Prioritize segments with no existing protection |
| Historical Performance | 2% | Past usage and user feedback |

**Thresholds:**
- Safe house confidence threshold: 0.65
- Rally point confidence threshold: 0.55
- Maximum 5 candidates per segment

**Current status:** The Protection Scoring API endpoint (`POST /internal/protection/suggestions`) is implemented but currently disabled pending completion of dependent features. The clustering, historical performance, and population density feature extractors use placeholder values (0.5) that will be replaced with real data integrations.

---

## 17. Real-Time Notifications

TarvaRI leverages Supabase Realtime to deliver instant alert notifications to connected clients via WebSocket channels.

**Channel architecture:**
- **Organization channels** (`org_{orgId}_alerts`): All alerts for an organization
- **Trip channels** (`trip_{tripId}_alerts`): Alerts specific to a trip
- Broadcasts triggered automatically by PostgreSQL change events (INSERT/UPDATE)
- Clients subscribe via the Supabase JavaScript SDK

**Traveler acknowledgment system:**
- Traveler acknowledgment recording with audit metadata (IP address, user agent, notes)
- Acknowledgment statistics per trip and per traveler (total alerts, acknowledged count, unacknowledged count)
- Alert superseding: replace outdated alerts with newer versions
- Acknowledgment types: read, received, completed, dismissed

**User preferences:**
- Per-user, per-trip preference management (theme, alerts banner dismissed, etc.)
- Upsert semantics for preference storage

---

## 18. Admin Console

The TarvaRI Console is a full-featured React/TypeScript admin interface built with Vite, Tailwind CSS, Zustand state management, and Leaflet/MapLibre map visualization.

**Console pages and features:**

### Dashboard (Home)
- System overview with key metrics: intel processed today, active alerts, triage queue size
- Live activity feed with severity badges and relative timestamps
- Quick navigation to all system sections

### Sources Management
- Source inventory with status, category, endpoint URL, parser class, polling interval
- Filtering by status (active, error, paused) and category
- Sorting by name, status, last success time, error rate
- Health metrics per source: success rate (24h), last poll time, last error message
- Source activation and deactivation controls

### Bundles
- Bundle list with status, severity, category, intel count, source count
- Detailed bundle view with member intel records, geographic scope, temporal scope, source breakdown
- Interactive map visualization of bundle locations with clustered pins

### Triage Queue
- Analyst review queue with priority-based ordering
- Status filtering: pending, in_review, approved, rejected, needs_revision
- Sortable by priority, trip ID, status, creation date, assignment
- Bundle review actions with notes

### Alerts
- Active alert monitoring with severity, category, and delivery status
- Alert detail view with associated trip, bundle, and delivery information

### Model Configuration
- **Performance tab**: Calibration charts (Brier score trends, reliability curves), total predictions, average Brier score
- **Weights tab**: Interactive sliders for all 12 feature weights across 5 domains, with real-time sum validation
- **Triggers tab**: Threshold sliders for risk level decision boundaries, uncertainty policy configuration
- **Versions tab**: Full version history with create, publish, rollback, delete, and side-by-side version comparison
- Version details modal with complete weight and threshold inspection
- Version comparison modal for diffing two model versions

### Coverage Map
- Interactive geographic map showing intel source coverage worldwide
- Category-filtered view (seismic, disaster, humanitarian, health, aviation, maritime, infrastructure)
- Pin layer visualization with popup details for each source
- Coverage gap identification

### Analytics
- Intel processing throughput: daily counts, average daily volume
- Source health trends: success rates, error rates across sources
- Model performance metrics: total predictions, calibration accuracy
- Delivery metrics: delivery rate, acknowledgment rate
- Triage productivity metrics

### Delivery Monitoring
- Delivery pipeline overview: total deliveries, delivered, pending, failed
- Acknowledgment rates
- Channel breakdown (email, SMS, push, in-app)

### System Health
- Real-time status for all services: API server, database, Redis, TarvaCORE integration
- Pipeline health monitoring (ingest, bundler, router, delivery workers)
- Delivery subsystem health
- Incident log with severity and timeline
- Component-level health indicators with operational status

### Run / Scheduler Control
- Worker start/stop controls
- Heartbeat monitoring with last-seen timestamps
- Active source count display
- Manual ingestion trigger

### Test Suite
- Integrated system health testing from the console
- Redis connectivity tests (ping, set/get, TTL, connection pool, memory usage)
- Scheduler control tests (status, start, stop, Redis key verification)
- Test execution with real-time log streaming and pass/fail status
- Test run history and results storage

### Settings
- System configuration management
- Feature flag toggles
- Environment information display

### Audit Log
- Comprehensive activity feed with type-based filtering (bundle, alert, triage, user, system, source, model)
- Severity filtering (critical, high, medium, low, info)
- Full-text search across activity messages
- Relative timestamp display

### Documentation
- Built-in API documentation reference (23+ KB of embedded documentation)

### Authentication
- Login page with credential-based authentication
- Role-based access control throughout the console
- Protected routes with session management

---

## 19. Observability and Telemetry

TarvaRI provides enterprise-grade observability through OpenTelemetry integration, structured logging, and Prometheus-compatible metrics.

**Distributed tracing:**
- Full delivery pipeline traces: outbox to delivered
- Worker cycle traces for ingest, bundler, router, delivery, and escalation workers
- SLA checking and escalation lifecycle traces
- Span attributes include alert UID, organization ID, severity, channel, and latency

**Metrics:**
- `alert_delivery_latency_seconds` -- Histogram of time from outbox creation to delivery
- `alert_delivery_attempts` -- Counter of delivery attempts by channel and status
- `alert_sla_violations` -- Counter of SLA timeout violations by severity
- `delivery_channel_results` -- Delivery results counter by channel and outcome (success/failure)
- `escalation_events` -- Counter of escalation events (re_ping, escalate)

**Export targets:**
- OTLP gRPC exporter for distributed tracing platforms
- Prometheus metric reader for metrics scraping
- Configurable export interval (default: 60 seconds)

**Structured logging:**
- JSON-formatted structured logs via structlog
- ISO 8601 timestamps
- Log level annotation
- Correlation IDs for request tracing across services

**Error monitoring:**
- Sentry integration with configurable DSN, environment tagging, and trace sampling rate (default: 10%)

**Current status:** The OpenTelemetry module is fully implemented with all metrics, traces, and exporters defined. FastAPI auto-instrumentation initialization is pending a startup ordering fix. Worker-level telemetry (delivery latency, SLA violations, escalation events) is actively instrumented and will emit metrics once the telemetry provider is initialized. Telemetry can be disabled entirely via the `OTEL_ENABLED` environment variable.

---

## 20. Data Retention and Cleanup

TarvaRI implements a comprehensive data retention policy to prevent unbounded database growth (which can exceed 6GB+ within days without management).

**Cleanup worker capabilities:**
- **Expired record deletion**: Removes records past their explicit expiration date
- **Age-based retention**: Deletes records older than the configurable retention period (default: 30 days)
- **Raw payload archival**: Strips raw payload and full text from records older than 7 days while preserving metadata
- **Batch processing**: 500 records per batch with inter-batch delays to avoid database overload
- **Dry-run mode**: Preview cleanup actions without executing deletions
- **Cleanup logging**: Full audit trail of cleanup operations with records affected, space reclaimed, and execution time

**Operational scripts:**
- `cleanup_old_intel.py` -- Manual cleanup execution with dry-run preview
- `emergency_cleanup.sql` -- Emergency SQL script for immediate database cleanup
- `analyze_database_size.sql` -- Database size analysis and growth diagnostics
- Database cleanup view (`v_cleanup_candidates`) for monitoring cleanup candidates

**Scheduling:**
- Automated daily execution at 2:00 AM
- Environment variable configuration: CLEANUP_ENABLED, RETENTION_DAYS, ARCHIVE_PAYLOAD_DAYS, CLEANUP_DRY_RUN

---

## 21. Security and Access Control

TarvaRI implements multi-layered security with JWT-based authentication, role-based access control, and multi-tenant data isolation.

**Authentication:**
- JWT token verification (HS256 algorithm) with configurable expiration (default: 60 minutes)
- Token-based user lookup against Supabase auth
- Internal API key authentication for service-to-service communication (Safetrekr Core to TarvaRI)

**Role hierarchy:**

| Role | Description | Capabilities |
|------|-------------|-------------|
| sys_admin | System administrator | Full access to all features |
| reviewer_lead | Lead analyst | Triage management, model configuration |
| reviewer | Intelligence analyst | Bundle triage, alert review |
| org_admin | Organization administrator | Org-level management, escalation recipient |
| billing_admin | Billing administrator | Billing and subscription access |
| security_officer | Security officer | Security configuration and audit |
| chaperone | Trip chaperone | Alert receipt, acknowledgment, COA execution |
| traveler | Traveler | Alert viewing, acknowledgment |
| guardian | Guardian (parent/family) | Alert viewing |

**Multi-tenant isolation:**
- Row Level Security (RLS) on all database tables via Supabase
- Organization ID scoping on all queries
- User-to-organization binding in authentication context

**API security:**
- CORS middleware with configurable allowed origins
- Bearer token enforcement on protected endpoints
- Role-based route guards via FastAPI dependency injection
- API documentation (Swagger/ReDoc) disabled in production

**Webhook security:**
- Resend email webhook signature verification (HMAC)
- Twilio SMS webhook signature verification
- Secure header validation for all webhook endpoints

---

## 22. API and Integration Layer

TarvaRI exposes a comprehensive REST API organized into two route groups: core CRUD routes and extended feature routes.

**Core API routes (`/intel/*`, `/triage/*`, `/risk/*`, `/trips/*`):**

| Endpoint Group | Capabilities |
|---------------|-------------|
| **Intel** | Create, read, list, and search normalized intelligence records |
| **Sources** | CRUD operations on intel sources with health metrics and status management |
| **Bundles** | List, detail, and manage intelligence bundles with member intel |
| **Triage** | Analyst review queue, triage decisions with versioned history |
| **Risk** | Risk assessments, hazard bundles, COAs, trigger rules, impacted trip analysis |
| **Trips** | Trip management, trip locations, participant routing |
| **Scheduler** | Start/stop/status of the ingest worker scheduler |

**Extended feature routes:**

| Endpoint Group | Capabilities |
|---------------|-------------|
| **Console** | 94KB admin console API: dashboard metrics, activity feeds, source management, test execution, health diagnostics, coverage analysis, delivery metrics |
| **Model Config** | Model version CRUD, weight/trigger management, publish/rollback, backtest, calibration |
| **Alert Publish** | Alert publishing to outbox, acknowledgment tracking, alert superseding |
| **Trip Alerts** | Trip-specific alert retrieval with bundle/intel joins, acknowledgment stats |
| **DLQ Admin** | Dead letter queue browsing, replay, statistics |
| **Webhooks** | Email (Resend) and SMS (Twilio) delivery receipt webhooks |
| **Source Management** | Connector-based source API with test connectivity |
| **Internal Protection** | Protection scoring suggestions for Safetrekr Core integration (internal API key auth, currently disabled pending completion) |

**Integration points:**
- **Safetrekr Core**: Internal API key-authenticated calls for AI-suggested rally points and protection scoring
- **TarvaCORE**: Optional AI reasoning engine integration (configurable, with mock mode for development)
- **Supabase**: Direct database access with PostGIS spatial queries and pgVector semantic search
- **Redis**: Job queue management, rate limiting, scheduler flags, heartbeat monitoring

**Health and readiness endpoints:**
- `GET /health` -- Service health with database and TarvaCORE connectivity checks
- `GET /ready` -- Kubernetes readiness probe for container orchestration
- `GET /` -- Service info (version, environment, documentation URL)

---

## 23. Operational Tooling

TarvaRI includes an extensive suite of operational scripts for database management, source seeding, and system maintenance.

**Database management:**
- `migrate_database.py` -- Run database migrations (003-014)
- `migrate_database.sql` / `migrate_database_unified.sql` -- SQL migration scripts
- `verify_indexes.py` -- Verify database index health
- `apply_bundle_indexes.py` -- Apply performance indexes for bundle operations
- `analyze_database_size.sql` -- Database growth analysis
- `emergency_cleanup.sql` -- Emergency cleanup for immediate database size reduction

**Source management:**
- `seed_pilot_sources.py` -- Seed 5 pilot intelligence sources with verification
- `seed_master_sources.py` -- Comprehensive source seeding
- `seed_csv_sources.py` -- CSV-format source data seeding
- `activate_intel_sources.py` -- Bulk source activation
- `export_intel_sources.py` -- Export current source configurations
- `update_parser_assignments.py` -- Update parser class assignments
- `deduplicate_intel_sources.py` -- Remove duplicate source entries
- `backfill_source_categories.py` -- Backfill missing category assignments

**Specialized source implementation scripts (18 domain-specific scripts):**
- Air quality, aviation weather, earthquake/tsunami, wildfire, flooding
- Humanitarian/disaster, geospatial, OSINT/news, space weather
- Telecoms/energy, volcano, drought/heat, demographic risk
- Emergency/medical/financial, infrastructure

**Intelligence operations:**
- `bundle_all_intel.py` -- Force-bundle all unbundled intel records
- `check_intel_bundles.py` -- Verify bundle integrity
- `create_test_bundles.py` -- Generate test bundle data
- `seed_trip_alerts.py` -- Seed test trip alerts
- `seed_trigger_matrix.py` -- Seed risk trigger matrix rules
- `seed_unified_data.py` -- Comprehensive test data seeding
- `test_coa_integration.py` -- Test Course of Action generation

**Migration scripts (database schema evolution):**
- 003: Risk engine schema (hazard bundles, risk assessments, trigger matrix)
- 008: Trip alerts, acknowledgments, alert outbox, delivery tracking
- 009: System user creation
- 010: Performance indexes
- 011: Delivery DLQ table
- 012: Poll/ingestion timestamp columns
- 013: Model configuration tables
- 014: Data retention policy (cleanup logs, archival columns, cleanup views)

---

## 24. Deployment and Infrastructure

TarvaRI is designed for containerized deployment with Kubernetes orchestration.

**Runtime components:**

| Component | Technology | Default Port | Scaling |
|-----------|-----------|--------------|---------|
| API Server | FastAPI / Uvicorn | 8000 | Horizontal (configurable workers) |
| Ingest Worker | Python asyncio | -- | Single instance per source set |
| Bundler Worker | Python asyncio | -- | Single instance |
| Alert Router Worker | Python asyncio | -- | Single instance |
| Delivery Worker | Python asyncio | -- | Single instance |
| Escalation Worker | Python asyncio | -- | Single instance |
| Cleanup Worker | Python scheduled | -- | Single instance |
| Admin Console | React / Vite | 5173+ | Static hosting |

**Infrastructure dependencies:**

| Service | Technology | Purpose |
|---------|-----------|---------|
| Database | Supabase (PostgreSQL + pgVector + PostGIS) | Primary data store with Row Level Security |
| Cache/Queue | Redis 7 | Scheduler flags, heartbeat, rate limiting, caching |
| Email | Resend API | Transactional alert emails |
| SMS | Twilio | Alert SMS delivery |
| AI Reasoning | TarvaCORE (optional) | AI-powered risk reasoning and analysis (mock mode available for development) |
| Monitoring | Sentry | Error tracking and performance monitoring |
| Tracing | OpenTelemetry + OTLP | Distributed tracing |
| Metrics | Prometheus | Metrics collection and alerting |

**Configuration management:**
- Environment-based configuration via pydantic-settings
- Feature flags: ENABLE_SEMANTIC_SEARCH, ENABLE_BUNDLE_DEDUPLICATION, ENABLE_TARVACORE_INTEGRATION
- TarvaCORE mock mode for development without external AI service dependency
- Doppler secrets management in production (environment variable injection at runtime)
- Docker Compose profiles: default (API + Redis), intel (+ TarvaRI API), workers (+ all background workers)

**Container orchestration:**
- Kubernetes deployment manifests in `k8s/` directory
- Health and readiness probes for container lifecycle management
- GitHub Actions CI/CD pipeline: Docker build, push to GHCR, deploy via kubectl
- Branch model: develop (dev), master (prod)

---

## Appendix A: Supported Intelligence Categories

| Category | Description | Example Sources |
|----------|-------------|-----------------|
| weather | Meteorological events | NWS, GDACS weather alerts |
| seismic | Earthquake and tectonic activity | USGS, GDACS seismic alerts |
| health | Disease outbreaks and health advisories | CDC, WHO |
| conflict | Armed conflict and civil unrest | ReliefWeb, ACLED |
| humanitarian | Humanitarian crises and displacement | ReliefWeb, UNHCR |
| infrastructure | Transportation and utility disruptions | FAA NOTAMs, infrastructure monitors |
| fire | Wildfires and urban fires | NASA FIRMS, local fire services |
| flood | Flooding events | NWS, GDACS |
| storm | Tropical storms, hurricanes, cyclones | NWS, GDACS |
| other | Uncategorized intelligence | Generic RSS/CAP sources |

## Appendix B: Severity Scale

| Level | Numeric Range | Description | SLA Window |
|-------|--------------|-------------|------------|
| Extreme | 90-100 | Life-threatening, immediate action required | 5 minutes |
| Severe | 70-89 | Serious danger, urgent response needed | 5 minutes |
| Moderate | 40-69 | Significant risk, heightened awareness | 60 minutes |
| Minor | 10-39 | Low risk, informational | 120 minutes |
| Unknown | 0-9 | Insufficient data to classify | 240 minutes |

## Appendix C: Feature Flags

| Flag | Default | Description |
|------|---------|-------------|
| ENABLE_SEMANTIC_SEARCH | Off | Enable 768-dimensional vector embedding search via pgVector |
| ENABLE_BUNDLE_DEDUPLICATION | On | Enable cross-bundle deduplication via dedup_hash |
| ENABLE_TARVACORE_INTEGRATION | Off | Enable AI-powered reasoning via TarvaCORE service |
| TARVACORE_MOCK_MODE | On | Use mock responses instead of live TarvaCORE API |
| OTEL_ENABLED | On | Enable OpenTelemetry tracing, metrics, and Prometheus export |
| CLEANUP_ENABLED | Off | Enable automated data retention cleanup worker |

---

*This document represents the complete feature set of TarvaRI as implemented in the codebase. Features marked as "Planned" have infrastructure in place but await provider integration or full implementation.*
