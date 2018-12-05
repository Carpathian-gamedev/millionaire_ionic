import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'numberFormatter'})
export class NumberFormatterPipe implements PipeTransform {
	transform(price: number): string {
		let p = price + '';

		if (p < 1000) {
			return p;
		}

		var splittedNum = p.split(''),
            reverted = splittedNum.reverse(),
            pieces = [];

        reverted.forEach(function (item, index) {
            if ((index + 1) % 3 === 0) {
                reverted[index] = ' ' + item;
            }
        });

		return reverted.reverse().join('');
	}
}