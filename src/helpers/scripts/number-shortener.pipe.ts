import { Pipe } from '@angular/core';

@Pipe({name: 'numberFormatter'})
export class NumberFormatterPipe {
	transform(price: number): string {
		let p = price + '';

		if (price < 1000) {
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