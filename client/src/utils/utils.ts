export const shortenAddress = (address: string, num = 3): string => {
  if (!address) return "";
  return !!address
    ? `${address.substring(0, num + 2)}...${address.substring(
        address.length - num - 1
      )}`
    : "";
};

export const getCompanyBytes1 = (companyNumber: string) => {
  switch (companyNumber) {
    case "0":
      return [0x0];
    case "1":
      return [0x1];
    default:
      throw new Error("Company number unknown");
  }
};
