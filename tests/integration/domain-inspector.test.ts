import { DomainInspector } from '../../src/domain-inspector';
import { InspectionOptions } from '../../src/types';
import * as fs from 'fs';

// Mock fs for export tests
jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn()
  }
}));

// Mock console methods to avoid noise in tests
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

describe('DomainInspector Integration Tests', () => {
  let inspector: DomainInspector;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  describe('Basic functionality', () => {
    it('should create inspector with default options', () => {
      inspector = new DomainInspector();
      expect(inspector).toBeInstanceOf(DomainInspector);
    });

    it('should create inspector with custom options', () => {
      const options: InspectionOptions = {
        verbose: true,
        quick: true,
        exportCsv: 'test.csv',
        exportJson: 'test.json',
        subdomains: true
      };
      
      inspector = new DomainInspector(options);
      expect(inspector).toBeInstanceOf(DomainInspector);
    });
  });

  describe('investigate', () => {
    beforeEach(() => {
      inspector = new DomainInspector({ quick: true }); // Use quick mode to avoid network timeouts
    });

    it('should investigate a domain successfully', async () => {
      // Use a reliable domain for testing
      await expect(inspector.investigate('example.com')).resolves.not.toThrow();
      
      // Verify that console output was called (intelligence reports)
      expect(mockConsoleLog).toHaveBeenCalled();
    }, 15000);

    it('should handle invalid domain gracefully', async () => {
      await expect(inspector.investigate('invalid-domain-12345.invalid')).resolves.not.toThrow();
    }, 10000);
  });

  describe('investigateMultiple', () => {
    beforeEach(() => {
      inspector = new DomainInspector({ quick: true });
    });

    it('should investigate multiple domains', async () => {
      const domains = ['example.com', 'google.com'];
      
      await expect(inspector.investigateMultiple(domains, 1)).resolves.not.toThrow();
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('MULTIPLE TARGETS ACQUIRED')
      );
    }, 30000);

    it('should handle parallel processing correctly', async () => {
      const domains = ['example.com', 'github.com'];
      
      await expect(inspector.investigateMultiple(domains, 2)).resolves.not.toThrow();
    }, 25000);
  });

  describe('Export functionality', () => {
    it('should export to CSV when configured', async () => {
      inspector = new DomainInspector({ 
        quick: true, 
        exportCsv: 'test-export' 
      });
      
      await inspector.investigate('example.com');
      
      // Verify CSV export was called
      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('test-export.csv'),
        expect.stringContaining('Domain,Registrar'),
        'utf8'
      );
    }, 15000);

    it('should export to JSON when configured', async () => {
      inspector = new DomainInspector({ 
        quick: true, 
        exportJson: 'test-json-export' 
      });
      
      await inspector.investigate('example.com');
      
      // Verify JSON export was called
      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('test-json-export.json'),
        expect.stringContaining('"domain": "example.com"'),
        'utf8'
      );
    }, 15000);

    it('should export both CSV and JSON when both configured', async () => {
      inspector = new DomainInspector({ 
        quick: true, 
        exportCsv: 'test-csv', 
        exportJson: 'test-json' 
      });
      
      await inspector.investigate('example.com');
      
      // Verify both exports were called
      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('test-csv.csv'),
        expect.any(String),
        'utf8'
      );
      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('test-json.json'),
        expect.any(String),
        'utf8'
      );
    }, 15000);
  });

  describe('Error handling', () => {
    beforeEach(() => {
      inspector = new DomainInspector({ quick: true });
    });

    it('should handle network errors gracefully', async () => {
      // Test with a domain that should cause network issues
      await expect(inspector.investigate('192.0.2.1')).resolves.not.toThrow();
    }, 10000);

    it('should continue processing other domains when one fails', async () => {
      const domains = ['invalid-domain-12345.invalid', 'example.com'];
      
      await expect(inspector.investigateMultiple(domains, 1)).resolves.not.toThrow();
    }, 20000);
  });

  describe('Subdomain discovery', () => {
    it('should perform subdomain discovery when enabled', async () => {
      inspector = new DomainInspector({ 
        quick: true, 
        subdomains: true 
      });
      
      await inspector.investigate('example.com');
      
      // Verify subdomain discovery output
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('Discovering subdomains')
      );
    }, 20000);
  });
});