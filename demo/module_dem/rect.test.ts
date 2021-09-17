import { expect } from 'chai';
import {Rect} from './rect'

test('Rect Exist', () => {
    let rect:Rect = new Rect(0,0, 10, 10)
    expect(rect.w).equals(10)
});