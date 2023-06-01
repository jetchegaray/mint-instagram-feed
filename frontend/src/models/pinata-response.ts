export class PinataResponse {
  status: "success" | "error";
  ipfsHash?: string;
  error?: string;

  constructor(status: "success" | "error", ipfsHash?: string, error?: string) {
    this.status = status;
    this.ipfsHash = ipfsHash;
    this.error = error;
  }
}
