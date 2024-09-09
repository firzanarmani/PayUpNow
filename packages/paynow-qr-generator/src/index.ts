import { crc16ccitt } from "crc";
import { Dayjs } from "dayjs";
import { toString } from "qrcode";

export type PayNowOptions = {
  uen: string;
  editable: boolean;
  expiry: Dayjs;
  amount: number;
  refNumber: string;
};

function crc(str: string) {
  return ((crc16ccitt(str) ^ 0) & 0xffff)
    .toString(16)
    .toUpperCase()
    .padStart(4, "0");
}

const createQrSvg = (inputStr: string) =>
  new Promise<string>((resolve, reject) =>
    toString(inputStr, { type: "svg" }, (err, str) => {
      if (err) reject(err);

      resolve(str);
    })
  );

export function generatePayNow(options: PayNowOptions) {
  const p = [
    { id: "00", value: "01" }, // ID 00: Payload Format Indicator (Fixed to '01')
    { id: "01", value: "12" }, // ID 01: Point of Initiation Method 11: static, 12: dynamic
    {
      id: "26",
      // ID 26: Merchant Account Info Template
      value: [
        { id: "00", value: "SG.PAYNOW" },
        { id: "01", value: "0" }, // 0 for mobile, 2 for UEN. 1 is not used.
        { id: "02", value: options.uen }, // PayNow UEN (Company Unique Entity Number)
        { id: "03", value: options.editable ? "1" : "0" }, // 1 = Payment amount is editable, 0 = Not Editable
        { id: "04", value: options.expiry.format("YYYYMMDD") },
      ], // Expiry date (YYYYMMDD)
    },
    { id: "52", value: "0000" }, // ID 52: Merchant Category Code (not used)
    { id: "53", value: "702" }, // ID 53: Currency. SGD is 702
    { id: "54", value: options.amount.toString() }, // ID 54: Transaction Amount
    { id: "58", value: "SG" }, // ID 58: 2-letter Country Code (SG)
    { id: "59", value: "COMPANY NAME" }, // ID 59: Company Name
    { id: "60", value: "Singapore" }, // ID 60: Merchant City
    {
      id: "62",
      value: [
        {
          // ID 62: Additional data fields
          id: "01",
          value: options.refNumber, // ID 01: Bill Number
        },
      ],
    },
  ];

  const str = p.reduce((final, current) => {
    if (Array.isArray(current.value)) {
      //nest loop
      current.value = current.value.reduce((f, c) => {
        f += c.id + c.value.length.toString().padStart(2, "0") + c.value;
        return f;
      }, "");
    }
    final +=
      current.id +
      current.value.length.toString().padStart(2, "0") +
      current.value;
    return final;
  }, "");

  // Here we add "6304" to the previous string
  // ID 63 (Checksum) 04 (4 characters)
  // Do a CRC16 of the whole string including the "6304"
  // then append it to the end.
  const result = str + "6304" + crc(str + "6304");

  return createQrSvg(result);
}
