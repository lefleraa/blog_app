export const Img = imgName => {
  return require(`static/images/${imgName}`);
};

export const gcd = (a, b) => {
  let num = 2,
    res = 1;
  while (num <= Math.min(a, b)) {
    if (a % num === 0 && b % num === 0) {
      res = num;
    }
    num++;
  }
  return res;
};

export const sumFrac = (a, b) => {
  const aDenom = a[1],
    aNumer = a[0];
  const bDenom = b[1],
    bNumer = b[0];
  let resDenom = aDenom * bDenom;
  let resNumer = aDenom * bNumer + bDenom * aNumer;
  const greatestDivisor = gcd(resDenom, resNumer);
  return [resNumer / greatestDivisor, resDenom / greatestDivisor];
};

export const sumArrayOfFractions = arr => {
  return arr.reduce((acc, val) => sumFrac(acc, val));
};

export const isValidAspectRatio = aspectRatio => {
  return !!(aspectRatio && aspectRatio[0] && aspectRatio[1]);
};

export const getRatio = aspectRatio => {
  if (!isValidAspectRatio(aspectRatio)) {
    return 0;
  }
  let ratio = aspectRatio[0] / aspectRatio[1];
  if (isNaN(ratio)) {
    return 0;
  }
  return ratio;
};
