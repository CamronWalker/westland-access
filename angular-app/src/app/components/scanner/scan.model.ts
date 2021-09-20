export interface Scan {
    personId: string;
    personName: string;
    scanResult: string;
    scanResultDesc?: string;
    scannerUID: string;
    scannerName: string;
    timeScanned: Date;
  }