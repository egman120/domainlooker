# DOMAINLOOKER

**Professional domain intelligence gathering CLI tool**

Get comprehensive information about any domain including WHOIS data, DNS records, SSL certificates, network analysis, and subdomain discovery. Perfect for security researchers, developers, and system administrators.

[![npm version](https://badge.fury.io/js/domainlooker.svg)](https://www.npmjs.com/package/domainlooker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI/CD Pipeline](https://github.com/AroraShreshth/domainlooker/actions/workflows/ci.yml/badge.svg)](https://github.com/AroraShreshth/domainlooker/actions/workflows/ci.yml)
[![Security & Maintenance](https://github.com/AroraShreshth/domainlooker/actions/workflows/security.yml/badge.svg)](https://github.com/AroraShreshth/domainlooker/actions/workflows/security.yml)

## Quick Start

Install globally:
```bash
npm install -g domainlooker
```

Analyze a domain:
```bash
domainlooker example.com
```

## Features

- **WHOIS Data** - Registration details and ownership information
- **DNS Analysis** - Complete DNS record lookup (A, AAAA, MX, NS, TXT, SOA)
- **SSL Certificates** - Certificate validation and expiry monitoring
- **Network Scanning** - Port discovery and service identification
- **Subdomain Discovery** - Find subdomains using multiple techniques
- **Export Options** - Save results as CSV or JSON
- **Threat Assessment** - Automated security risk evaluation
- **Batch Processing** - Analyze multiple domains at once

## Usage Examples

### Single Domain Analysis
```bash
domainlooker example.com
```

### Multiple Domains
```bash
domainlooker google.com github.com microsoft.com
```

### Export Results
```bash
# Export to CSV
domainlooker example.com --export-csv report.csv

# Export to JSON (API-ready format)
domainlooker example.com --export-json report.json
```

### Advanced Options
```bash
# Include subdomain discovery
domainlooker example.com --subdomains

# Quick scan (skip network analysis)
domainlooker example.com --quick

# Verbose output
domainlooker example.com --verbose

# Process multiple domains in parallel
domainlooker domain1.com domain2.com domain3.com --parallel 5
```

## Command Line Options

```
Usage: domainlooker [options] <domains...>

Arguments:
  domains...               Target domain(s) to investigate

Options:
  -V, --version           Display version number
  -v, --verbose           Enable verbose output
  -q, --quick            Quick scan (skip network analysis)
  -p, --parallel <n>     Domains to process in parallel (default: 3)
  --export-csv <file>    Export results to CSV file
  --export-json <file>   Export results to JSON file
  --subdomains          Enable subdomain discovery
  --no-banner           Skip the banner
  -h, --help            Display help
```

## Output Example

```
🎯 TARGET ACQUIRED: EXAMPLE.COM
📡 Initiating intelligence gathering operations...

============================================================
🔍 INTELLIGENCE REPORT: EXAMPLE.COM
============================================================

📋 REGISTRATION INTELLIGENCE
┌──────────────────┬──────────────────────────────────────┐
│ Registrar        │ Example Registrar Inc.               │
│ Registered       │ 2010-01-01T00:00:00Z                 │
│ Expires          │ 2026-01-01T00:00:00Z                 │
│ Country          │ US                                   │
└──────────────────┴──────────────────────────────────────┘

🌐 DNS INTELLIGENCE
┌─────────────────┬───────────────────────────────────────┐
│ A Records       │ 192.0.2.1                            │
│ MX Records      │ 10 mail.example.com                  │
│ NS Records      │ ns1.example.com, ns2.example.com     │
└─────────────────┴───────────────────────────────────────┘

🔒 SSL CERTIFICATE
┌─────────────────┬───────────────────────────────────────┐
│ Subject         │ CN=example.com                        │
│ Issuer          │ DigiCert Inc                          │
│ Valid From      │ 2025-01-01                            │
│ Valid To        │ 2026-01-01                            │
│ Days Until Exp  │ 180 days                              │
└─────────────────┴───────────────────────────────────────┘

⚠️ THREAT ASSESSMENT
✅ No immediate threats detected
```

## What You Get

- **Complete Domain Profile** - Registration info, DNS records, SSL details
- **Security Analysis** - Certificate validation, threat assessment, vulnerability detection
- **Export Options** - CSV for spreadsheets, JSON for APIs and automation
- **Subdomain Discovery** - Find hidden subdomains using multiple techniques
- **Professional Reports** - Clean, organized output with threat indicators

## Use Cases

- **Security Research** - Analyze domains for vulnerabilities and misconfigurations
- **Development** - Verify domain configurations and SSL certificate status
- **System Administration** - Monitor domain health and expiration dates
- **Competitive Analysis** - Compare domain setups and infrastructure
- **Compliance** - Generate reports for security audits and documentation

## Requirements

- Node.js 16.0.0 or higher
- Internet connection for domain lookups

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/AroraShreshth/domainlooker).

---

**Made with ❤️ for the cybersecurity and developer community**