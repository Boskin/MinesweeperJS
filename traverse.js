function traverseNext(i, arrLen) {
  var mid = arrLen / 2;
  if(i < mid) {
    return arrLen - i - 1;
  } else if(i > mid) {
    return arrLen - i;
  } else {
    return arrLen;
  }
}