export interface Scan {
    personId: string;
    scanResult: string;
    scanResultDesc?: string;
    scannerUID: string;
    scannerName: string;
    timeScanned: Date;
  }