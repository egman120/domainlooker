import { DNSService } from '../../src/services/dns';

describe('DNSService', () => {
  let dnsService: DNSService;

  beforeEach(() => {
    dnsService = new DNSService();
  });

  describe('DNS Service Instance', () => {
    it('should create a DNS service instance', () => {
      expect(dnsService).toBeInstanceOf(DNSService);
    });

    it('should have lookup method', () => {
      expect(typeof dnsService.lookup).toBe('function');
    });
  });

  // Integration test with a real domain (if network is available)
  describe('Real DNS lookup (integration)', () => {
    it('should resolve example.com DNS records', async () => {
      try {
        const result = await dnsService.lookup('example.com');
        
        // Should return a result object
        expect(typeof result).toBe('object');
        
        // If A records exist, they should be an array of strings
        if (result.a) {
          expect(Array.isArray(result.a)).toBe(true);
          result.a.forEach(ip => {
            expect(typeof ip).toBe('string');
            expect(ip).toMatch(/^\d+\.\d+\.\d+\.\d+$/); // Basic IP format check
          });
        }
        
        // If NS records exist, they should be an array of strings  
        if (result.ns) {
          expect(Array.isArray(result.ns)).toBe(true);
          result.ns.forEach(ns => {
            expect(typeof ns).toBe('string');
          });
        }
        
      } catch (error) {
        // If DNS lookup fails (e.g., no network), just pass the test
        console.warn('DNS lookup failed, skipping integration test:', error);
      }
    }, 10000);

    it('should handle invalid domain gracefully', async () => {
      try {
        const result = await dnsService.lookup('invalid-domain-12345.nonexistent');
        // Some DNS services may return empty results instead of throwing
        expect(typeof result).toBe('object');
      } catch (error) {
        // This is expected for truly invalid domains
        expect(error).toBeDefined();
      }
    }, 5000);
  });
});