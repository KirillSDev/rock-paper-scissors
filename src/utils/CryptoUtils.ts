const crypto = require("crypto");

interface ICryptoUtils {
  key: string;
}
class CryptoUtils implements ICryptoUtils {
  key: string;
  constructor() {
    this.key = "";
  }
  generateKey() {
    const bytes = crypto.randomBytes(32);
    this.key = bytes.toString("hex");
    return this.key;
  }

  generateHMAC(move: string) {
    const HMAC = crypto
      .createHmac("sha256", this.key)
      .update(move)
      .digest("hex");

    return HMAC;
  }
}

const cryptoUtils = new CryptoUtils();
export default cryptoUtils;
