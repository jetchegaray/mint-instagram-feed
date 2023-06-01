export class WalletResponse {
  status: string;
  address: string;

  constructor(address: string, status: string) {
    this.status = status;
    this.address = address;
  }
}
