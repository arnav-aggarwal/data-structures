/**
 * ArrayList.js
 *
 * Since Javscript arrays are array lists, we mimic the functionality
 * of an array list. The array list size is always a power of 2.
 * Resizes when at full capacity and when below 1/4 capacity.
 * Native push/pop methods are rewritten. Length property is now the
 * size of the array, and a new count property refers to the number
 * of elements inside.
 *
 * Todo:
 * Perhaps worth implementing differently - actually creating a new
 * array and copying elements over, instead of resizing the same
 * array, as one would have to do with actual static-sized arrays.
 *
 * Todo: Tests
 */

module.exports = class ArrayList extends Array {
  constructor(...items) {
    super();

    this.length = 4;

    Object.defineProperty(this, 'count', { 
      value: 0,
      writable: true,
    });

    this.push(...items);
  }
  
  push(...items) {
    const newCount = this.count + items.length;
    while(newCount >= this.length) {
      this.length *= 2;
    }
    
    items.forEach((item, index) => this[this.count + index] = item);
    this.count += items.length;
    return items;
  }
  
  pop() {
    if(this.count === 0) {
       throw new Error('Popping from an empty ArrayList');
    }
    
    if(this.count <= this.length / 4 && this.length > 4) {
      this.length /= 2;
    }
    
    const value = this[--this.count];
    delete this[this.count];
    return value;
  }
}
