import { registerDecorator } from 'class-validator';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
export function DateIsValid() {
  return function (object, propertyName: string) {
    registerDecorator({
      name: 'DateIsValid',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [propertyName],
      options: {
        message:
          '$property is not valid. The format is invalid or the provided date does not exist. The accepted format is YYYY-MM-DD',
      },
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') {
            return false;
          } else {
            return dayjs(value, 'YYYY-MM-DD', true).isValid();
          }
        },
      },
    });
  };
}
