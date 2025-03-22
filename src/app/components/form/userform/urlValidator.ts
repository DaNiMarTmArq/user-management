import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function imageUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!value) return null;

    const regex = /^https?:\/\//i;

    return regex.test(value) ? null : { invalidImageUrl: true };
  };
}
