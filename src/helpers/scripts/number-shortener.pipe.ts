import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'numberShortener'})
export class NumberShortenerPipe implements PipeTransform {
	transform(price: number): string {
		if (price/1000 < 1) {
			return price + '';
		} else if (price/1000 >= 1 && price/1000 < 1000) {
			return price/1000 + 'K';
		} else if (price/1000 === 1000) {
			return '1M';
		}

		return price;
	}
}