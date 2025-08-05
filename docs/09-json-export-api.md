# 📋 JSON Export & API Schema Documentation

## Overview

The JSON Export feature provides a standardized, API-ready format for DOMAINLOOKER intelligence data. This system is designed to facilitate easy integration into REST APIs, GraphQL services, and other data processing pipelines.

## 🎯 Key Features

### API-Ready Design
- **Standardized Schema**: Consistent structure across all exports
- **TypeScript Types**: Full type safety with comprehensive interfaces
- **Future-Proof**: Designed for seamless conversion to web APIs
- **Versioned**: Schema version tracking for backward compatibility

### Advanced Data Processing
- **Risk Assessment**: Numerical scoring with detailed threat indicators
- **Source Attribution**: Track which intelligence gathering method provided each data point
- **Performance Metrics**: Execution time tracking at request and domain levels
- **Status Indicators**: Clear success/partial/failed status for each domain

## 📊 Schema Architecture

### Response Structure

```typescript
interface DomainAnalysisResponse {
  meta: ResponseMetadata;
  data: DomainAnalysisData[];
  errors?: ApiError[];
}
```

### Core Components

#### 1. Response Metadata
```typescript
interface ResponseMetadata {
  version: string;           // Schema version (e.g., "1.0.0")
  timestamp: string;         // ISO 8601 timestamp
  requestId: string;         // UUID v4 for request correlation
  executionTimeMs: number;   // Total processing time
  totalDomains: number;      // Number of domains analyzed
  options: AnalysisOptions;  // Analysis configuration used
}
```

#### 2. Domain Analysis Data
```typescript
interface DomainAnalysisData {
  domain: string;
  status: 'success' | 'partial' | 'failed';
  timestamp: string;
  executionTimeMs: number;
  
  // Intelligence data
  whois: WhoisAnalysis | null;
  dns: DnsAnalysis | null;
  ssl: SslAnalysis | null;
  network: NetworkAnalysis | null;
  subdomains: SubdomainAnalysis | null;
  
  // Risk assessment
  threatAssessment: ThreatAssessment;
  
  // Data provenance
  sources: DataSources;
}
```

#### 3. Intelligence Analysis Structures

Each intelligence type follows a consistent pattern:

```typescript
interface IntelligenceAnalysis {
  status: 'success' | 'partial' | 'failed' | 'skipped' | 'not_available' | 'no_certificate';
  data: /* type-specific data structure */ | null;
  error?: string;
}
```

## 🔒 Threat Assessment System

### Risk Scoring Algorithm

The threat assessment system provides numerical risk scoring (0-100) based on multiple factors:

#### SSL Certificate Analysis
- **Missing SSL**: +25 points (High severity)
- **Expiring Soon**: +20-30 points (High/Critical severity based on days remaining)

#### Domain Age Analysis  
- **Recently Registered** (<30 days): +15 points (Medium severity)

#### Network Exposure
- **Multiple Open Ports** (>5): +10 points (Medium severity)

### Risk Levels
- **Low**: 0-19 points
- **Medium**: 20-39 points  
- **High**: 40-69 points
- **Critical**: 70+ points

### Threat Indicators

```typescript
interface ThreatIndicator {
  type: 'ssl_expiry' | 'missing_ssl' | 'recent_registration' | 'open_ports' | 'suspicious_subdomain' | 'malware_detected';
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  recommendation?: string;
  evidence?: any;
}
```

## 📈 Data Source Attribution

The system tracks which intelligence gathering methods provided each piece of data:

```typescript
interface DataSources {
  whois: string[];              // ["WHOIS Registry"]
  dns: string[];                // ["System DNS Resolver"]
  ssl: string[];                // ["TLS Connection"]
  network: string[];            // ["TCP Port Scan"]
  subdomains: string[];         // ["Certificate Transparency (crt.sh)", "Common Name Enumeration", "DNS Enumeration"]
  threatIntelligence: string[]; // ["Internal Analysis Engine"]
}
```

## 🚀 Usage Examples

### Basic Export
```bash
# Single domain export
domainlooker example.com --export-json my-analysis

# Multiple domains
domainlooker google.com github.com microsoft.com --export-json tech-giants
```

### Advanced Usage
```bash
# Complete intelligence gathering
domainlooker target.com --subdomains --export-json complete-recon

# Quick scan with JSON export
domainlooker domain.com --quick --export-json quick-intel

# Combined exports
domainlooker domain.com --export-csv spreadsheet.csv --export-json api-data.json
```

### Programmatic Usage

```typescript
import { JsonExportService } from './services/json-export';
import { DomainAnalysisResponse } from './types/api-schema';

// Initialize export service
const exporter = new JsonExportService(options);

// Add domain data
exporter.addDomain(domainInfo);

// Get structured data for API use
const apiResponse: DomainAnalysisResponse = exporter.getStructuredData();

// Export to file
await exporter.exportToFile('intelligence-report.json');
```

## 📋 Example JSON Output

### Minimal Example
```json
{
  "meta": {
    "version": "1.0.0",
    "timestamp": "2025-08-05T01:01:17.200Z",
    "requestId": "550e8400-e29b-41d4-a716-446655440000",
    "executionTimeMs": 3049,
    "totalDomains": 1,
    "options": {
      "includeSubdomains": false,
      "includeNetworkScan": true,
      "quickScan": false,
      "verbose": false
    }
  },
  "data": [
    {
      "domain": "example.com",
      "status": "success",
      "timestamp": "2025-08-05T01:01:17.199Z",
      "executionTimeMs": 1,
      "whois": {
        "status": "success",
        "data": {
          "registrar": "Example Registrar Inc.",
          "registrationDate": "2010-01-01T00:00:00Z",
          "expirationDate": "2026-01-01T00:00:00Z",
          "registrantCountry": "US",
          "daysUntilExpiry": 365
        }
      },
      "dns": {
        "status": "success",
        "data": {
          "records": {
            "a": ["192.0.2.1"],
            "mx": [{"priority": 10, "exchange": "mail.example.com"}]
          },
          "summary": {
            "totalRecords": 2,
            "recordTypes": ["a", "mx"],
            "hasIpv4": true,
            "hasIpv6": false,
            "hasMail": true
          }
        }
      },
      "ssl": {
        "status": "success",
        "data": {
          "certificate": {
            "subject": "CN=example.com",
            "issuer": "CN=Example CA",
            "validFrom": "2025-01-01T00:00:00Z",
            "validTo": "2026-01-01T00:00:00Z",
            "fingerprint": "AA:BB:CC:DD:EE:FF..."
          },
          "validation": {
            "isValid": true,
            "daysUntilExpiry": 180,
            "isExpired": false,
            "isSelfSigned": false
          }
        }
      },
      "network": {
        "status": "success",
        "data": {
          "ports": {
            "open": [80, 443],
            "total": 2
          },
          "services": [
            {
              "port": 80,
              "protocol": "TCP",
              "service": "HTTP",
              "confidence": "high"
            },
            {
              "port": 443,
              "protocol": "TCP", 
              "service": "HTTPS",
              "confidence": "high"
            }
          ],
          "summary": {
            "totalOpenPorts": 2,
            "commonServices": ["HTTP", "HTTPS"],
            "unusualPorts": []
          }
        }
      },
      "subdomains": {
        "status": "skipped",
        "data": null,
        "error": "Subdomain discovery was not enabled"
      },
      "threatAssessment": {
        "overallRisk": "low",
        "riskScore": 5,
        "threats": [],
        "recommendations": [],
        "summary": {
          "criticalIssues": 0,
          "warnings": 0,
          "informational": 0
        }
      },
      "sources": {
        "whois": ["WHOIS Registry"],
        "dns": ["System DNS Resolver"],
        "ssl": ["TLS Connection"],
        "network": ["TCP Port Scan"],
        "subdomains": [],
        "threatIntelligence": ["Internal Analysis Engine"]
      }
    }
  ]
}
```

## 🔮 Future API Conversion

The JSON export schema is designed for easy conversion to REST APIs:

### Potential Endpoints
```
POST /api/v1/analyze
GET  /api/v1/analysis/{requestId}
GET  /api/v1/analysis/{requestId}/status
POST /api/v1/bulk-analyze
```

### Webhook Support
The schema includes webhook configuration options for asynchronous processing:

```typescript
interface AnalysisRequest {
  domains: string[];
  options?: Partial<AnalysisOptions>;
  webhook?: {
    url: string;
    headers?: { [key: string]: string };
  };
}
```

### Job Status Tracking
```typescript
interface AnalysisJobStatus {
  jobId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
  estimatedCompletion?: string;
  results?: DomainAnalysisResponse;
}
```

## 🛠️ Implementation Details

### Service Architecture
- **JsonExportService**: Main export service class
- **Data Transformation**: Converts internal data structures to API schema
- **Threat Assessment Engine**: Analyzes security risks and generates scores
- **Source Attribution**: Tracks data provenance across all intelligence types

### Error Handling
- Graceful degradation when services fail
- Structured error reporting in JSON output
- Status indicators for partial successes

### Performance Considerations
- Streaming JSON generation for large datasets
- Efficient memory usage with structured data transformation
- Execution time tracking for performance monitoring

---

*This documentation covers the JSON Export & API Schema system implemented for DOMAINLOOKER v1.0.0*