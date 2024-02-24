// Node class
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

// Hashmap class with methods
class Hashmap {
  constructor(key) {
    this.key = key;
    this.buckets = new Array(16).fill(null).map(() => []);
    this.loadFactor = 0.75;
    this.capacity = this.buckets.length;
    this.occupied = 0;
  }

  // Hashing method
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }

  // Modulo method
  modulo(hash) {
    return hash % 16;
  }

  // Resize method to increase bucket array capacity
  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.buckets.length * 2).fill(null).map(() => []);
    this.occupied = 0;

    for (let oldBucket of oldBuckets) {
      for (let node of oldBucket) {
        this.set(node.key, node.value);
      }
    }
  }

  // Adding node to hashmap method
  set(key, value) {
    const bucketIndex = this.modulo(this.hash(key));

    const currentBucket = this.buckets[bucketIndex];
    for (let node of currentBucket) {
      if (node.key === key) {
        node.value = value;
        return;
      }
    }

    const hashNode = new Node(key, value);
    currentBucket.push(hashNode);
    this.occupied++;

    const currentLoadFactor = this.occupied / this.buckets.length;
    if (currentLoadFactor > this.loadFactor) {
      this.resize();
    }
  }

  // Get node using key method
  get(key) {
    const bucketIndex = this.modulo(this.hash(key));
    const currentBucket = this.buckets[bucketIndex];
    if (currentBucket) {
      for (let node of currentBucket) {
        if (node.key === key) {
          console.log(`Your value of key ${key} is ${node.value}`);
          return node.value;
        }
      }
      console.log(`Key ${key} not found`);
      return;
    }
  }

  // Check if hashmap has key method
  has(key) {
    const bucketIndex = this.modulo(this.hash(key));
    const currentBucket = this.buckets[bucketIndex];
    if (currentBucket) {
      for (let node of currentBucket) {
        if (node.key === key) {
          console.log(`HashMap has ${key} - true`);
          return true;
        }
      }
      console.log(`HashMap do not have ${key} - false`);
      return false;
    }
  }

  // Remove node using key method
  remove(key) {
    const bucketIndex = this.modulo(this.hash(key));
    const currentBucket = this.buckets[bucketIndex];
    if (currentBucket) {
      for (let i = 0; i < currentBucket.length; i++) {
        if (currentBucket[i].key === key) {
          currentBucket.splice(i, 1);
          console.log(`Success remove of key:${key} - true`);
          this.occupied--;
          return true;
        }
      }
      console.log(`Do not found key:${key} to remove - false`);
      return false;
    }
  }

  // Total keys number method
  length() {
    let numberOfKeys = 0;
    for (let bucket of this.buckets) {
      for (let node of bucket) {
        if (node.key) {
          numberOfKeys++;
        }
      }
    }
    console.log(`Total keys: ${numberOfKeys}`);
    return numberOfKeys;
  }

  // Clear buckets method
  clear() {
    this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
    this.occupied = 0;
  }

  // Return an array of keys in hashmap method
  keys() {
    const arrayOfKeys = [];
    for (let bucket of this.buckets) {
      for (let node of bucket) {
        arrayOfKeys.push(node.key);
      }
    }
    console.log(`Your array of keys:${arrayOfKeys}`);
    return arrayOfKeys;
  }

  // Return an array of values in hashmap method
  values() {
    const arrayOfValues = [];
    for (let bucket of this.buckets) {
      for (let node of bucket) {
        arrayOfValues.push(node.value);
      }
    }
    console.log(`Your array of values:${arrayOfValues}`);
    return arrayOfValues;
  }

  // Return an array of keys and values in hashmap method
  entries() {
    const arrayOfEntries = [];
    for (let bucket of this.buckets) {
      for (let node of bucket) {
        arrayOfEntries.push([node.key, node.value]);
      }
    }
    console.log(arrayOfEntries);
    return arrayOfEntries;
  }
}

const hashMap = new Hashmap();
