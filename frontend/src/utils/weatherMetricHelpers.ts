export type tempVariantReturnType = {
  value: number;
  message: string;
};

const tempMessage = (number: number): string => {
  const value = Math.abs(number);
  switch (Math.sign(number)) {
    case 1:
      return `The perceived temperature is ${value}°C lower than the actual.`;
    case -1:
      return `The perceived temperature is ${value}°C higher than the actual.`;
    case 0:
      return "The perceived temperature is the same as the actual temperature.";
  }
  return "";
};

export const tempVariant = (
  actualTemp: number,
  feltTemp: number
): tempVariantReturnType => {
  const value = actualTemp - feltTemp;

  return {
    value: value,
    message: tempMessage(value),
  };
};
