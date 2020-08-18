import { IValidation } from '..';
const Astracore = require('astracore-lib');

export class BtcValidation implements IValidation {
  validateAddress(network: string, address: string): boolean {
    const Address = Astracore.Address;
    // Regular Address: try Bitcoin
    return Address.isValid(address, network);
  }

  validateUri(addressUri: string): boolean {
    // Check if the input is a valid uri or address
    const URI = Astracore.URI;
    // Bip21 uri
    return URI.isValid(addressUri);
  }
}
