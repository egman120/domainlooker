# 🏗️ System Architecture

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLI INTERFACE                          │
│  ┌─────────────────┐  ┌──────────────────────────────────┐ │
│  │   Commander.js  │  │        UI Effects                │ │
│  │   Arguments     │  │  - Figlet Banner                 │ │
│  │   Options       │  │  - Typewriter Animation         │ │
│  │   Help          │  │  - Loading Spinners              │ │
│  └─────────────────┘  │  - Color Coding                  │ │
│                       │  - Table Formatting              │ │
│                       └──────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                DOMAIN INSPECTOR                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │           ORCHESTRATION LAYER                           ││
│  │  - Parallel Service Coordination                       ││
│  │  - Error Handling & Recovery                           ││
│  │  - Progress Tracking                                   ││
│  │  - Report Generation                                   ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                                │
                    ┌───────────┼───────────┐
                    ▼           ▼           ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  WHOIS SERVICE  │ │   DNS SERVICE   │ │   SSL SERVICE   │
│                 │ │                 │ │                 │
│ • Registration  │ │ • A Records     │ │ • Certificate   │
│ • Expiration    │ │ • AAAA Records  │ │ • Validation    │
│ • Registrar     │ │ • MX Records    │ │ • Expiry Check  │
│ • Name Servers  │ │ • NS Records    │ │ • CA Details    │
│ • Status        │ │ • TXT Records   │ │ • Fingerprint   │
│                 │ │ • SOA Records   │ │                 │
└─────────────────┘ └─────────────────┘ └─────────────────┘
                                │
                                ▼
                    ┌─────────────────┐
                    │ NETWORK SERVICE │
                    │                 │
                    │ • Port Scanning │
                    │ • Service ID    │
                    │ • Protocol Det. │
                    │ • Version Info  │
                    └─────────────────┘
```

## 🔧 Component Breakdown

### 1. CLI Interface Layer
**File**: `src/index.ts`

```typescript
// Entry point with Commander.js configuration
program
  .argument('<domain>', 'Target domain to investigate')
  .option('-v, --verbose', 'Enable verbose output')
  .option('-q, --quick', 'Quick scan only')
  .action(async (domain: string, options) => {
    const inspector = new DomainInspector(options);
    await inspector.investigate(domain);
  });
```

**Responsibilities**:
- Command-line argument parsing
- Option validation
- Help system
- Error handling at CLI level

### 2. UI Effects System
**File**: `src/ui/effects.ts`

```typescript
// Cinematic interface components
export async function displayBanner(): Promise<void>
export async function typeWriter(text: string, delay: number): Promise<void>
export function createSpinner(text: string): Ora
export function missionComplete(message: string): void
export function criticalAlert(message: string): void
```

**Key Features**:
- ANSI Shadow figlet font for dramatic banner
- Blue gradient coloring (Claude Code inspired)
- Typewriter animation for initialization
- Animated spinners for operations
- Professional boxed reports

### 3. Domain Inspector (Orchestration)
**File**: `src/domain-inspector.ts`

```typescript
export class DomainInspector {
  private whoisService = new WhoisService();
  private dnsService = new DNSService();
  private sslService = new SSLService();
  private networkService = new NetworkService();

  async investigate(domain: string): Promise<void> {
    // Parallel intelligence gathering
    // Error handling and recovery
    // Progress indication
    // Report generation
  }
}
```

**Core Responsibilities**:
- **Service Coordination**: Manages all intelligence gathering services
- **Parallel Execution**: Runs multiple services concurrently
- **Error Recovery**: Handles service failures gracefully
- **Progress Tracking**: Updates UI during operations
- **Report Assembly**: Combines all intelligence into cohesive report

### 4. Intelligence Services

#### WHOIS Service
**File**: `src/services/whois.ts`

```typescript
export class WhoisService {
  async lookup(domain: string): Promise<WhoisData>
  private parseWhoisData(data: string): WhoisData
}
```

**Capabilities**:
- Raw WHOIS data retrieval
- Intelligent parsing of various WHOIS formats
- Extraction of key registration details
- Status code interpretation

#### DNS Service
**File**: `src/services/dns.ts`

```typescript
export class DNSService {
  async lookup(domain: string): Promise<DNSData>
  private async getARecords(domain: string): Promise<string[]>
  private async getMXRecords(domain: string): Promise<MXRecord[]>
  // ... other record types
}
```

**Capabilities**:
- Complete DNS record type coverage
- Parallel DNS queries for performance
- Error-resilient record retrieval
- SOA record parsing for authoritative info

#### SSL Service
**File**: `src/services/ssl.ts`

```typescript
export class SSLService {
  async getCertificate(domain: string, port: number = 443): Promise<SSLData>
  private isCertificateValid(cert: any): boolean
  private getDaysUntilExpiry(validTo: string): number
}
```

**Capabilities**:
- TLS connection establishment
- Certificate extraction and parsing
- Validity period calculation
- Security assessment

#### Network Service
**File**: `src/services/network.ts`

```typescript
export class NetworkService {
  async scanPorts(domain: string, extended: boolean): Promise<number[]>
  async getNetworkInfo(domain: string): Promise<NetworkData>
  private identifyServices(ports: number[]): ServiceInfo[]
}
```

**Capabilities**:
- TCP port scanning
- Service identification
- Protocol detection
- Timeout-based availability checking

## 🔄 Data Flow Architecture

### 1. **Request Flow**
```
CLI Input → Domain Inspector → Parallel Services → Data Aggregation → Report Generation
```

### 2. **Parallel Processing Pattern**
```typescript
// Current sequential approach
const whoisSpinner = createSpinner('...');
await whoisService.lookup(domain);
whoisSpinner.succeed();

const dnsSpinner = createSpinner('...');
await dnsService.lookup(domain);
dnsSpinner.succeed();
```

### 3. **Error Handling Strategy**
```typescript
// Service-level error isolation
try {
  domainInfo.whois = await this.whoisService.lookup(domain);
  whoisSpinner.succeed();
} catch (error) {
  whoisSpinner.fail();
  // Continue with other services
}
```

## 🎯 Design Patterns Used

### 1. **Service Layer Pattern**
- Clean separation between UI and business logic
- Each intelligence type has dedicated service
- Consistent interface across all services

### 2. **Strategy Pattern**
- Different scanning strategies (quick vs full)
- Configurable verbosity levels
- Optional service execution

### 3. **Observer Pattern**
- UI progress updates during operations
- Spinner state management
- Error notification system

### 4. **Factory Pattern**
- Service instantiation in DomainInspector
- UI effect creation
- Report section generation

## 🔒 Security Architecture

### 1. **Read-Only Operations**
- No modification of target systems
- Passive information gathering only
- Respect for target system resources

### 2. **Timeout Protection**
```typescript
socket.setTimeout(10000, () => {
  socket.destroy();
  reject(new Error('SSL connection timeout'));
});
```

### 3. **Error Isolation**
- Service failures don't crash entire application
- Graceful degradation of functionality
- Clear error reporting to user

### 4. **Rate Limiting Consideration**
- Timeouts prevent overwhelming targets
- Sequential operations where appropriate
- Respectful scanning intervals

## 📊 Performance Considerations

### 1. **Parallel Operations**
- DNS queries run concurrently by record type
- Independent service execution
- Opportunity for further parallelization

### 2. **Efficient Resource Usage**
- Connection reuse where possible
- Timeout-based resource cleanup
- Memory-efficient data structures

### 3. **Caching Opportunities**
- DNS response caching (future enhancement)
- SSL certificate caching
- WHOIS data temporary storage

## 🔧 Extensibility Points

### 1. **New Intelligence Sources**
```typescript
// Easy to add new services
class GeoLocationService {
  async lookup(domain: string): Promise<GeoData> {
    // Implementation
  }
}
```

### 2. **Output Formats**
- JSON export capability
- XML report generation
- Custom report templates

### 3. **Enhanced UI**
- Interactive mode
- Real-time updates
- Progress bars

---

*This architecture provides a solid foundation for comprehensive domain intelligence gathering while maintaining clean separation of concerns and extensibility.*