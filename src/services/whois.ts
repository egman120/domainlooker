import whois from 'whois';
import { WhoisData } from '../types';

export class WhoisService {
  async lookup(domain: string): Promise<WhoisData> {
    return new Promise((resolve, reject) => {
      whois.lookup(domain, (err: Error | null, data: string) => {
        if (err) {
          reject(err);
          return;
        }
        
        const parsed = this.parseWhoisData(data);
        resolve(parsed);
      });
    });
  }

  private parseWhoisData(data: string): WhoisData {
    const lines = data.split('\n');
    const result: WhoisData = {};

    for (const line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.match(/registrar:/i)) {
        result.registrar = this.extractValue(trimmed);
      } else if (trimmed.match(/creation date|registered on|registration date:/i)) {
        result.registrationDate = this.extractValue(trimmed);
      } else if (trimmed.match(/expir|expiry date|expires on:/i)) {
        result.expirationDate = this.extractValue(trimmed);
      } else if (trimmed.match(/name server|nserver:/i)) {
        if (!result.nameServers) result.nameServers = [];
        const ns = this.extractValue(trimmed);
        if (ns && !result.nameServers.includes(ns)) {
          result.nameServers.push(ns);
        }
      } else if (trimmed.match(/registrant country:/i)) {
        result.registrantCountry = this.extractValue(trimmed);
      } else if (trimmed.match(/status:/i)) {
        if (!result.status) result.status = [];
        const status = this.extractValue(trimmed);
        if (status && !result.status.includes(status)) {
          result.status.push(status);
        }
      }
    }

    return result;
  }

  private extractValue(line: string): string | undefined {
    const parts = line.split(':');
    if (parts.length > 1) {
      return parts.slice(1).join(':').trim();
    }
    return undefined;
  }
}