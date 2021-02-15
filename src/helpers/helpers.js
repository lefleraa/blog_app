export const Img = imgName => {
  return require(`static/images/${imgName}`);
};

export const isValidAspectRatio = aspectRatio => {
  return !!(aspectRatio && aspectRatio[0] && aspectRatio[1]);
};

export const directionalSumOfDimensions = ({ arr = [], type = 'col' }) =>
  arr.reduce((a1, a2) => {
    let maxNumer = Math.max(a1[0], a2[0]);
    let maxDenom = Math.max(a1[1], a2[1]);
    let adjustedA1;
    let adjustedA2;
    let value;
    if (type === 'col') {
      adjustedA1 = [maxNumer, a1[1] * (maxNumer / a1[0])];
      adjustedA2 = [maxNumer, a2[1] * (maxNumer / a2[0])];
      value = [maxNumer, adjustedA1[1] + adjustedA2[1]];
    } else {
      adjustedA1 = [a1[0] * (maxDenom / a1[1]), maxDenom];
      adjustedA2 = [a2[0] * (maxDenom / a2[1]), maxDenom];
      value = [adjustedA1[0] + adjustedA2[0], maxDenom];
    }
    return value;
  });

export const getRatio = aspectRatio => {
  if (!isValidAspectRatio(aspectRatio)) {
    return;
  }
  let ratio = aspectRatio[0] / aspectRatio[1];
  return ratio;
};
