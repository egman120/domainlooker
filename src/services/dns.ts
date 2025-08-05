import { promises as dns } from 'dns';
import { DNSData } from '../types';

export class DNSService {
  async lookup(domain: string): Promise<DNSData> {
    const result: DNSData = {};

    try {
      // Execute all DNS queries in parallel
      const dnsPromises = [
        this.getARecords(domain),
        this.getAAAARecords(domain),
        this.getMXRecords(domain),
        this.getNSRecords(domain),
        this.getTXTRecords(domain),
        this.getSOARecord(domain)
      ];

      const dnsResults = await Promise.allSettled(dnsPromises);

      // Process A Records
      if (dnsResults[0].status === 'fulfilled' && dnsResults[0].value && Array.isArray(dnsResults[0].value) && dnsResults[0].value.length > 0) {
        result.a = dnsResults[0].value as string[];
      }

      // Process AAAA Records
      if (dnsResults[1].status === 'fulfilled' && dnsResults[1].value && Array.isArray(dnsResults[1].value) && dnsResults[1].value.length > 0) {
        result.aaaa = dnsResults[1].value as string[];
      }

      // Process MX Records
      if (dnsResults[2].status === 'fulfilled' && dnsResults[2].value && Array.isArray(dnsResults[2].value) && dnsResults[2].value.length > 0) {
        result.mx = dnsResults[2].value as Array<{ priority: number; exchange: string }>;
      }

      // Process NS Records
      if (dnsResults[3].status === 'fulfilled' && dnsResults[3].value && Array.isArray(dnsResults[3].value) && dnsResults[3].value.length > 0) {
        result.ns = dnsResults[3].value as string[];
      }

      // Process TXT Records
      if (dnsResults[4].status === 'fulfilled' && dnsResults[4].value && Array.isArray(dnsResults[4].value) && dnsResults[4].value.length > 0) {
        result.txt = dnsResults[4].value as string[];
      }

      // Process SOA Record
      if (dnsResults[5].status === 'fulfilled' && dnsResults[5].value && !Array.isArray(dnsResults[5].value)) {
        result.soa = dnsResults[5].value as DNSData['soa'];
      }

    } catch (error) {
      console.error('DNS lookup error:', error);
    }

    return result;
  }

  private async getARecords(domain: string): Promise<string[]> {
    try {
      return await dns.resolve4(domain);
    } catch {
      return [];
    }
  }

  private async getAAAARecords(domain: string): Promise<string[]> {
    try {
      return await dns.resolve6(domain);
    } catch {
      return [];
    }
  }

  private async getMXRecords(domain: string): Promise<Array<{ priority: number; exchange: string }>> {
    try {
      return await dns.resolveMx(domain);
    } catch {
      return [];
    }
  }

  private async getNSRecords(domain: string): Promise<string[]> {
    try {
      return await dns.resolveNs(domain);
    } catch {
      return [];
    }
  }

  private async getTXTRecords(domain: string): Promise<string[]> {
    try {
      const records = await dns.resolveTxt(domain);
      return records.map(record => record.join(''));
    } catch {
      return [];
    }
  }

  private async getSOARecord(domain: string): Promise<DNSData['soa'] | undefined> {
    try {
      const soa = await dns.resolveSoa(domain);
      return {
        primary: soa.nsname,
        admin: soa.hostmaster,
        serial: soa.serial,
        refresh: soa.refresh,
        retry: soa.retry,
        expiration: soa.expire,
        minimum: soa.minttl
      };
    } catch {
      return undefined;
    }
  }
}