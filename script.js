class Hashmap {
  constructor(key) {
    this.key = key;
    this.buckets = new Array(16);
    this.loadFactor = 0.75;
    this.capacity = this.buckets.length;
    this.occupied = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }

  modulo(hash) {
    return hash % 16;
  }

  resize() {
    const oldArray = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.occupied = 0;

    for (let oldBucket of oldArray) {
      if (oldBucket) {
        for (let node of oldBucket) {
          const newBucketIndex = this.modulo(this.hash(node.key));
          if (!this.buckets[newBucketIndex]) {
            this.buckets[newBucketIndex] = [node];
            this.occupied++;
          } else {
            this.buckets[newBucketIndex].push(node);
            this.occupied++;
          }
        }
      }
    }
  }

  set(key, value) {
    const hashNode = new Node(key, value);
    const bucketIndex = this.modulo(this.hash(key));
    if (bucketIndex < 0 || bucketIndex >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    } else if (!this.buckets[bucketIndex]) {
      this.buckets[bucketIndex] = [hashNode];
      this.occupied++;
    } else if (this.buckets[bucketIndex]) {
      this.buckets[bucketIndex].push(hashNode);
      this.occupied++;
    }

    const currentLoadFactor = this.occupied / this.capacity;
    if (currentLoadFactor > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const bucketIndex = this.modulo(this.hash(key));
    if (this.buckets[bucketIndex]) {
      const nodeValue = this.buckets[bucketIndex][0].value;
      console.log(`Your value of key ${key} is ${nodeValue}`);
    }
  }

  has(key) {
    const bucketIndex = this.modulo(this.hash(key));
    if (this.buckets[bucketIndex]) {
      console.log(`HashMap has ${key} - true`);
      return true;
    } else {
      console.log(`HashMap do not have ${key} - false`);
      return false;
    }
  }

  remove(key) {
    const bucketIndex = this.modulo(this.hash(key));
    if (this.buckets[bucketIndex]) {
      this.buckets[bucketIndex].splice(0, 1);
      console.log(`Success remove of key:${key} - true`);
      return true;
    } else {
      console.log(`Do not found key:${key} to remove - false`);
      return false;
    }
  }

  length() {
    let numberOfKeys = 0;
    for (let bucket of this.buckets) {
      if (bucket !== undefined && bucket.length !== 0) {
        numberOfKeys++;
      }
    }
    console.log(numberOfKeys);
  }

  clear() {
    for (let bucket of this.buckets) {
      if (bucket !== undefined && bucket.length !== 0) {
        bucket.splice(0, 1);
      }
    }
  }

  keys() {
    const arrayOfKeys = [];
    for (let bucket of this.buckets) {
      if (bucket !== undefined && bucket.length !== 0) {
        arrayOfKeys.push(bucket[0].key);
      }
    }
    console.log(`Your array of keys:${arrayOfKeys}`);
  }

  values() {
    const arrayOfValues = [];
    for (let bucket of this.buckets) {
      if (bucket !== undefined && bucket.length !== 0) {
        arrayOfValues.push(bucket[0].value);
      }
    }
    console.log(`Your array of values:${arrayOfValues}`);
  }

  entries() {
    const arrayOfEntries = [];
    for (let bucket of this.buckets) {
      if (bucket !== undefined && bucket.length !== 0) {
        arrayOfEntries.push([bucket[0].key, bucket[0].value]);
      }
    }
    console.log(arrayOfEntries);
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

const hashMap = new Hashmap();

hashMap.get("Soda");
hashMap.keys();
hashMap.values();
hashMap.entries();

hashMap.length();
console.log(hashMap.buckets);
