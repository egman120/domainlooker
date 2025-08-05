// Standardized API schema for DOMAINLOOKER
// This schema is designed to be API-ready for future REST/GraphQL endpoints

export interface DomainAnalysisResponse {
  meta: ResponseMetadata;
  data: DomainAnalysisData[];
  errors?: ApiError[];
}

export interface ResponseMetadata {
  version: string;
  timestamp: string;
  requestId: string;
  executionTimeMs: number;
  totalDomains: number;
  options: AnalysisOptions;
}

export interface AnalysisOptions {
  includeSubdomains: boolean;
  includeNetworkScan: boolean;
  quickScan: boolean;
  verbose: boolean;
}

export interface DomainAnalysisData {
  domain: string;
  status: 'success' | 'partial' | 'failed';
  timestamp: string;
  executionTimeMs: number;
  
  // Core intelligence data
  whois: WhoisAnalysis | null;
  dns: DnsAnalysis | null;
  ssl: SslAnalysis | null;
  network: NetworkAnalysis | null;
  subdomains: SubdomainAnalysis | null;
  
  // Risk assessment
  threatAssessment: ThreatAssessment;
  
  // Data collection metadata
  sources: DataSources;
}

export interface WhoisAnalysis {
  status: 'success' | 'failed' | 'not_available';
  data: {
    registrar?: string;
    registrationDate?: string;
    expirationDate?: string;
    registrantCountry?: string;
    nameServers?: string[];
    status?: string[];
    daysUntilExpiry?: number;
  } | null;
  error?: string;
}

export interface DnsAnalysis {
  status: 'success' | 'partial' | 'failed';
  data: {
    records: {
      a?: string[];
      aaaa?: string[];
      mx?: Array<{ priority: number; exchange: string }>;
      ns?: string[];
      txt?: string[];
      cname?: string[];
      soa?: {
        primary: string;
        admin: string;
        serial: number;
        refresh: number;
        retry: number;
        expiration: number;
        minimum: number;
      };
    };
    summary: {
      totalRecords: number;
      recordTypes: string[];
      hasIpv4: boolean;
      hasIpv6: boolean;
      hasMail: boolean;
    };
  } | null;
  error?: string;
}

export interface SslAnalysis {
  status: 'success' | 'failed' | 'no_certificate';
  data: {
    certificate: {
      subject: string;
      issuer: string;
      validFrom: string;
      validTo: string;
      serialNumber: string;
      fingerprint: string;
      signatureAlgorithm?: string;
    };
    validation: {
      isValid: boolean;
      daysUntilExpiry: number;
      isExpired: boolean;
      isSelfSigned: boolean;
    };
    security: {
      keySize?: number;
      protocol?: string;
      vulnerabilities?: string[];
    };
  } | null;
  error?: string;
}

export interface NetworkAnalysis {
  status: 'success' | 'partial' | 'failed' | 'skipped';
  data: {
    ports: {
      open: number[];
      filtered: number[];
      total: number;
    };
    services: Array<{
      port: number;
      protocol: string;
      service: string;
      version?: string;
      confidence: 'high' | 'medium' | 'low';
    }>;
    summary: {
      totalOpenPorts: number;
      commonServices: string[];
      unusualPorts: number[];
    };
  } | null;
  error?: string;
}

export interface SubdomainAnalysis {
  status: 'success' | 'partial' | 'failed' | 'skipped';
  data: {
    subdomains: string[];
    sources: {
      certificateTransparency: string[];
      dnsEnumeration: string[];
      commonNames: string[];
    };
    statistics: {
      total: number;
      bySource: { [source: string]: number };
      patterns: { [pattern: string]: number };
      depthAnalysis: { [depth: number]: number };
    };
  } | null;
  error?: string;
}

export interface ThreatAssessment {
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number; // 0-100
  threats: ThreatIndicator[];
  recommendations: string[];
  summary: {
    criticalIssues: number;
    warnings: number;
    informational: number;
  };
}

export interface ThreatIndicator {
  type: 'ssl_expiry' | 'missing_ssl' | 'recent_registration' | 'suspicious_subdomain' | 'open_ports' | 'malware_detected';
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  recommendation?: string;
  evidence?: any;
}

export interface DataSources {
  whois: string[];
  dns: string[];
  ssl: string[];
  network: string[];
  subdomains: string[];
  threatIntelligence: string[];
}

export interface ApiError {
  code: string;
  message: string;
  domain?: string;
  timestamp: string;
  details?: any;
}

// Utility types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ResponseMetadata;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Future API endpoint interfaces
export interface AnalysisRequest {
  domains: string[];
  options?: Partial<AnalysisOptions>;
  webhook?: {
    url: string;
    headers?: { [key: string]: string };
  };
}

export interface AnalysisJobStatus {
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