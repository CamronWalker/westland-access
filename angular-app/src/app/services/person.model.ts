export interface Person {
    companyName: string;
    firstName: string;
    lastName: string;
    imageLocation: string;
    lastScanned?: Date;
    status: 'Allowed' | 'No Access' | 'Escort Required' | 'See Description';
    statusDesc?: string;
    tradeName: string;

  }