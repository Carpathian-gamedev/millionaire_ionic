import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'numberFormatter'})
export class NumberFormatterPipe implements PipeTransform {
	transform(price: number): string {
		price += '';

		if (price < 1000) {
			return price;
		}

		var splittedNum = price.split(''),
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