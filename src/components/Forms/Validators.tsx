import { Address } from "@ton/core";

export function websiteValidator(value: string) {
  let validators = [
    (value: string) => {
      // url validation
      const pattern = new RegExp(
        "\\b(?:(https?|ftp|file)://|www\\.)?[-A-Z0-9+&#/%?=~_|$!:,.;]*[A-Z0-9+&@#/%=~_|$]\\.[-A-Z0-9+&@#/%?=~_|$!:,.;]*[A-Z0-9+&@#/%=~_|$]",
        "i",
      );
      if (!pattern.test(value)) return "error.url"//"Invalid Url";
      return null;
    },
    (value: string) => {
      // not http or https
      if (value.startsWith("http://") || value.startsWith("https://"))
        return "error.webProtocol";// "Please do not include http or https";
    },
    (value: string) => {
      // no whitespace
      if (value.includes(" ")) return "error.whitespace";// "No whitespace allowed";
    },
  ];

  for (let i = 0; i < validators.length; i++) {
    let result = validators[i](value);
    if (result !== null) {
      return result;
    }
  }
  return null;
}

export function addressValidator(value: string) {
  try {
   Address.parse(value);

    return null;
  } catch (e) {
    return "error.address";//"Invalid Address";
  }
}
