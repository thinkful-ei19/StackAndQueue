'use strict';
class _Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class _DoublyNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class GhettoQueue {
  constructor() {
    this.stackOne = null;
    this.stackTwo = null;
  }

  enqueue(data) {
    if (!this.stackOne) {
      this.stackOne = new Stack();
      this.stackTwo = new Stack();
    }
    this.stackOne.push(data);
    let temp = this.stackOne.top;
    while (temp) {
      this.stackTwo.push(temp.data);
      temp = temp.next;
    }
	}
	
	dequeue() {
    if (!this.stackOne.top) {
      return 'list is empty, cannot remove';
    }
    this.stackTwo.pop();
    let tempNode = peek(this.stackOne);
    while(this.stackOne.top) {
      this.stackTwo.push(this.stackOne.pop());
    }
    this.stackTwo.pop();
    while(this.stackTwo.top.data !== tempNode) {
      this.stackOne.push(this.stackTwo.pop());
    }
    this.stackOne.push(this.stackTwo.pop());
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    const node = new _DoublyNode(data);

    if (this.first === null) {
      this.first = node;
    }

    if (this.last) {
      node.next = this.last;
      this.last.prev = node;
    }

    this.last = node;
  }

  dequeue() {
    if (this.first === null) {
      return;
    }

    const node = this.first;
    this.first = node.prev;

    if (node === this.last) {
      this.last = null;
    }

    return node.value;
  }
}

function QPeek(queue) {
  return queue.first ? queue.first : '';
}

function Qdisplay(queue) {
  let runner = queue.first;
  while (runner) {
    console.log(runner.value);
    runner = runner.prev;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  push(data) {
    if (this.top === null) {
      this.top = new _Node(data, null);
      return this.top;
    }
    const node = new _Node(data, this.top);
    this.top = node;
  }

  pop() {
    const node = this.top;
    this.top = node.next;
    return node.data;
  }
}

function peek(stack) {
  return stack.top ? stack.top.data: null;
}

function display(stack) {
  let runner = stack.top;
  while(runner) {
    console.log(runner.data);
    runner = runner.next;
  }
}

function is_palindrome(s) {
  s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  let holder = new Stack();
  for (let i=0; i < s.length; i++) {
    holder.push(s.charAt(i));
  }
  for (let j=0; j < s.length; j++) {
    if (s[j] === holder.pop()) continue;
    else return false;
  }
  return true;
}

function matchParenth(str) {
  let count = 0;
  let holder = new Stack();
  for (let i=0; i < str.length; i++) {
    if (str[i] === '(') {
      count++;
      holder.push(str[i]);
    }
    if (str[i] === ')' && !holder.top) {
      return new Error(`right parenth at ${count} has no open pair`);
    }
    if (str[i] === ')' && holder.top) {
      count++;
      holder.pop();
    }
  }
  if (holder.top) {
    return new Error(`left parenth at ${count} not closed`);
  }
  else return true;
}

function isStackEmpty(s) {
  return s.top === null;
}

// function sortStack(stack) {
//   let holder1 = new Stack();
//   let max = 0;
//   while (stack.top || holder1.top) {
// 		if (holder1.top && !stack.top) {
			
// 		}
//     if (stack.peek() > max) {
//       max = stack.peek();
//       holder2.push(stack.pop());
//     }
//     else {
//       holder1.push(stack.pop());
// 		}
// 	}
// }

function sortStack(primary) {
  let holder = new Stack();
  while (!isStackEmpty(primary)) {
    let temp = primary.pop();
    while (!isStackEmpty(holder) && (peek(holder) > temp)) {
      primary.push(holder.pop());
    }
    holder.push(temp);
  }
	
  while(!isStackEmpty(holder)) {
    primary.push(holder.pop());
  }
}

function stack() {
  let starTrek = new Stack();
  starTrek.push('Kirk');
  starTrek.push('Spock');
  starTrek.push('McCoy');
  starTrek.push('Scotty');
  console.log('PEEK', peek(starTrek));
  starTrek.pop();
  display(starTrek);
}

function queue() {
  let starTrekQ = new GhettoQueue();
  starTrekQ.enqueue('Kirk');
  starTrekQ.enqueue('Spock');
  starTrekQ.enqueue('Uhura');
  starTrekQ.enqueue('Sulu');
  starTrekQ.enqueue('Checkov');
  starTrekQ.dequeue();
  console.log(starTrekQ);
}

// stack();
// console.log(is_palindrome("100"));
// console.log(matchParenth('()(())()'));
// let newStack = new Stack();
// for (let i=0; i<10; i++) {
// 	newStack.push(Math.floor(Math.random()*100));
// }
// sortStack(newStack);

// console.log(newStack);

queue();