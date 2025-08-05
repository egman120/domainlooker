# 🕵️ DOMAINLOOKER

> Mission-critical domain intelligence gathering tool inspired by spy thrillers

A stylish CLI domain inspector that would make James Bond proud. Gather comprehensive intelligence on any domain with animated terminal effects and professional-grade reporting.

![Classification: RESTRICTED](https://img.shields.io/badge/Classification-RESTRICTED-red?style=for-the-badge)
![Status: OPERATIONAL](https://img.shields.io/badge/Status-OPERATIONAL-green?style=for-the-badge)

## 🎯 Features

- **🔍 WHOIS Intelligence**: Registration details, expiration dates, and ownership information
- **🌐 DNS Reconnaissance**: Complete DNS record analysis (A, AAAA, MX, NS, TXT, SOA)
- **🔒 SSL Certificate Analysis**: Certificate validation, expiry tracking, and security assessment
- **🌐 Network Scanning**: Port discovery and service identification
- **⚠️ Threat Assessment**: Automated security risk evaluation
- **🎬 Cinematic Interface**: Animated loading sequences and spy-themed styling
- **📊 CSV Export**: Export comprehensive domain intelligence to spreadsheet format
- **📋 JSON Export**: API-ready structured data export with standardized schema
- **🔍 Subdomain Discovery**: Advanced subdomain enumeration using multiple techniques

## 🛠️ Installation

```bash
# Clone the intelligence repository
git clone <repository-url>
cd domainlooker

# Install dependencies
npm install

# Build the application
npm run build

# Make it globally available (optional)
npm link
```

## 🚀 Usage

### Basic Intelligence Gathering
```bash
# Single domain - full reconnaissance mission
npm run dev google.com

# Multiple domains - bulk analysis
npm run dev google.com facebook.com twitter.com

# Control parallel processing (default: 3 domains at once)
npm run dev google.com facebook.com twitter.com github.com -- -p 2

# Quick scan (skips network reconnaissance)
npm run dev google.com -- --quick

# Verbose output for detailed intelligence
npm run dev google.com -- --verbose

# Skip the dramatic banner
npm run dev google.com -- --no-banner

# Export results to CSV file
npm run dev google.com facebook.com -- --export-csv my-analysis

# Export results to structured JSON (API-ready format)
npm run dev google.com facebook.com -- --export-json intelligence-report

# Discover subdomains (advanced reconnaissance)
npm run dev github.com -- --subdomains

# Combine all export options with subdomain discovery
npm run dev github.com -- --subdomains --export-csv github-recon.csv --export-json github-intel.json
```

### Global Usage (if linked)
```bash
domainlooker google.com
domainlooker --help
```

### Data Export & Analysis

#### CSV Export (Spreadsheet Format)
```bash
# Export single domain analysis
npm run dev google.com -- --export-csv google-analysis

# Export multiple domain analysis for comparison
npm run dev google.com facebook.com github.com -- --export-csv competitor-analysis

# Combine with other options
npm run dev domain1.com domain2.com -- --quick --export-csv quick-scan.csv
```

#### JSON Export (API-Ready Format)
```bash
# Export structured intelligence to JSON
npm run dev google.com -- --export-json google-intel

# Export multiple domains with comprehensive data
npm run dev google.com github.com microsoft.com -- --export-json tech-giants-analysis

# Combine with subdomain discovery for complete intelligence
npm run dev target.com -- --subdomains --export-json complete-recon
```

#### Export Formats Comparison

**CSV Export** includes:
- Domain registration information (registrar, dates, status)
- Complete DNS records (A, AAAA, MX, NS, TXT)
- SSL certificate details (issuer, validity, expiry warnings)
- Network services (open ports, identified services)  
- Subdomain enumeration results (total found, by source)
- Automated threat assessment (risk level, specific threats)

**JSON Export** provides:
- **API-Ready Schema**: Standardized structure for REST/GraphQL integration
- **Structured Intelligence**: Hierarchical data with typed responses
- **Comprehensive Metadata**: Request tracking, execution times, version info
- **Advanced Threat Assessment**: Risk scoring with detailed indicators
- **Data Source Attribution**: Track which services provided each piece of intelligence
- **Future-Proof Format**: Designed for easy conversion to web APIs

### Subdomain Discovery Techniques
```bash
# Enable subdomain discovery
npm run dev target.com -- --subdomains
```

DOMAINLOOKER uses multiple advanced techniques:
- **Certificate Transparency Logs**: Queries crt.sh for SSL certificates
- **Common Name Enumeration**: Tests 70+ common subdomain patterns
- **DNS Enumeration**: Attempts zone transfers and DNS queries
- **Smart Filtering**: Deduplicates and validates discovered subdomains

The tool can discover hundreds of subdomains in seconds, providing invaluable reconnaissance data.

## 📋 JSON Export Schema

The JSON export feature provides a standardized, API-ready format designed for easy integration into REST APIs or GraphQL services. Here's the schema structure:

### Response Structure
```json
{
  "meta": {
    "version": "1.0.0",
    "timestamp": "2025-08-05T01:01:17.200Z",
    "requestId": "unique-uuid-v4",
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
      "whois": { /* Structured WHOIS analysis */ },
      "dns": { /* Structured DNS analysis */ },
      "ssl": { /* Structured SSL analysis */ },
      "network": { /* Structured network analysis */ },
      "subdomains": { /* Structured subdomain analysis */ },
      "threatAssessment": {
        "overallRisk": "low",
        "riskScore": 15,
        "threats": [/* Array of threat indicators */],
        "recommendations": [/* Array of security recommendations */]
      },
      "sources": { /* Data source attribution */ }
    }
  ]
}
```

### Key Features
- **Unique Request Tracking**: Each export gets a UUID for correlation
- **Performance Metrics**: Execution time tracking at multiple levels
- **Status Indicators**: Clear success/partial/failed status for each domain
- **Risk Assessment**: Numerical risk scoring with detailed threat indicators
- **Source Attribution**: Track which intelligence gathering method provided each data point
- **Future-Ready**: Schema designed for seamless API conversion

## 📊 Intelligence Report Sections

### 📋 Registration Intelligence
- Registrar information
- Registration and expiration dates
- Registrant country
- Domain status codes

### 🌐 DNS Intelligence
- A Records (IPv4 addresses)
- AAAA Records (IPv6 addresses)
- MX Records (mail servers)
- NS Records (name servers)
- TXT Records (verification records)
- SOA Records (start of authority)

### 🔒 Encryption Intelligence
- SSL certificate details
- Certificate authority information
- Validity period and expiry warnings
- Fingerprint and signature algorithm

### 🌐 Network Intelligence
- Open port detection
- Service identification
- Protocol analysis

### 🔍 Subdomain Intelligence (when enabled)
- Total subdomains discovered
- Breakdown by discovery source
- Complete subdomain listing
- Pattern analysis and statistics

### ⚠️ Threat Assessment
- SSL certificate expiry warnings
- Recently registered domain alerts
- Missing encryption detection

## 🎨 Command Line Options

```
Usage: domainlooker [options] <domains...>

Arguments:
  domains...          Target domain(s) to investigate (space-separated for multiple)

Options:
  -V, --version          display version number
  -v, --verbose          Enable verbose output
  -q, --quick            Quick scan only (skip network reconnaissance)
  -p, --parallel <n>     Number of domains to process in parallel (default: 3)
  --export-csv <file>    Export results to CSV file
  --export-json <file>   Export results to structured JSON file (API-ready format)
  --subdomains          Enable subdomain discovery and enumeration
  --no-banner           Skip the banner
  -h, --help            display help for command
```

## 🔧 Development

```bash
# Development mode with auto-reload
npm run dev <domain>

# Build TypeScript
npm run build

# Watch mode for development
npm run watch
```

## 🏗️ Project Structure

```
src/
├── index.ts              # Main CLI entry point
├── domain-inspector.ts   # Core intelligence gathering logic
├── services/            # Intelligence gathering services
│   ├── whois.ts         # WHOIS data extraction
│   ├── dns.ts           # DNS record analysis
│   ├── ssl.ts           # SSL certificate inspection
│   ├── network.ts       # Network reconnaissance
│   ├── subdomain.ts     # Subdomain discovery and enumeration
│   ├── csv-export.ts    # CSV export functionality
│   └── json-export.ts   # JSON export with API-ready schema
├── ui/                  # User interface and effects
│   └── effects.ts       # Terminal animations and styling
└── types/               # TypeScript type definitions
    ├── index.ts         # Main type definitions
    ├── api-schema.ts    # API-ready JSON schema definitions
    └── whois.d.ts       # WHOIS module declarations
```

## 🎭 Spy-Themed Features

- **Animated Banner**: ASCII art with gradient colors
- **Mission Briefing**: Typewriter-style text animation
- **Intelligence Gathering**: Animated spinners for each operation
- **Classified Reports**: Professional tabular intelligence presentation
- **Threat Assessment**: Color-coded security warnings
- **Mission Complete**: Satisfying completion notifications

## 🔒 Security Features

- **Non-intrusive Scanning**: Read-only intelligence gathering
- **Timeout Protection**: All network operations have timeouts
- **Error Resilience**: Graceful handling of unavailable services
- **Minimal Fingerprint**: Designed to avoid detection

## 📝 Example Output

```
🎯 TARGET ACQUIRED: EXAMPLE.COM
📡 Initiating intelligence gathering operations...

✅ WHOIS intelligence gathered
✅ DNS intelligence captured  
✅ Encryption analysis complete
✅ Network reconnaissance complete

============================================================
🔍 INTELLIGENCE REPORT: EXAMPLE.COM
============================================================

[Detailed tabular reports follow...]
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-intelligence`)
3. Commit your changes (`git commit -m 'Add some intelligence'`)
4. Push to the branch (`git push origin feature/new-intelligence`)
5. Open a Pull Request

## 📜 License

MIT License - See LICENSE file for details

## ⚠️ Disclaimer

This tool is for educational and legitimate security research purposes only. Users are responsible for ensuring compliance with applicable laws and regulations.

---

*🕵️ "The name's Domain... Domain Looker"*