import { mergeOptions } from '../tools/mergeOptions';

export function needleRoundedEnd(/* options */) {
  return function needleRoundedEndDyn(needleHeight, needleBaseWidth) {
    const h = needleHeight;        // Overall height, starts from origin
    const r = needleBaseWidth / 2; // Base width === diameter

    const p1 = '-' + r + ' 0';
    const p2 = '0 -' + h;
    const p3 = r + ' 0';
    const a = [r + ' ' + r, 0, 0, 1, '-' + r + ' 0'].join(',');
    const path = ['M', p1, p2, p3, 'A', a, 'Z'].join(' ');

    return path;
  };
}

export function needleFlatEnd(/* options */) {
  return function needleFlatEndDyn(needleHeight, needleBaseWidth) {
    const h = needleHeight;
    const w = needleBaseWidth / 2;

    const p1 = '-' + w + ' 0';
    const p2 = '0 -' + h;
    const p3 = w + ' 0';
    const path = ['M', p1, p2, p3, 'Z'].join(' ');

    return path;
  };
}

const NEEDLE_EXT = {
  smallNeedleHeight: 0,
  smallNeedleRatio: 0.05,
};

export function needleExtraPointer(options) {
  const opts = mergeOptions(options, NEEDLE_EXT);

  return function needleExtraPointerDyn(needleHeight, needleBaseWidth) {
    const h1 = needleHeight;
    const h2 = opts.smallNeedleHeight || (needleHeight * opts.smallNeedleRatio);
    const w = needleBaseWidth / 2;

    const p1 = '-' + w + ' 0';
    const p2 = '0 -' + h1;
    const p3 = w + ' 0';
    const p4 = '0 ' + h2;
    const path = ['M', p1, p2, p3, p4, 'Z'].join(' ');

    return path;
  };
}

export function needleRect(options) {
  const opts = mergeOptions(options, NEEDLE_EXT);

  return function neddleRectDyn(needleHeight, needleBaseWidth) {
    const h1 = needleHeight;
    const h2 = opts.smallNeedleHeight || (needleHeight * opts.smallNeedleRatio);
    const w = needleBaseWidth / 2;

    return `M -${w} 0  -${w} -${h1}  ${w} -${h1}  ${w} 0 ${w} ${h2} -${w} ${h2} Z`;
  };
}

// export function needleCircleBase(options) {
//   const opts = _.defaultsDeep({}, options, NEEDLE_EXTRA_POINTER);
//
//   return function needle_extra_pointer(needleHeight, needleBaseWidth) {
//     const h1 = needleHeight;
//     const h2 = opts.smallNeedleHeight || (needleHeight * opts.smallNeedleRatio);
//     const w = needleBaseWidth / 2;
//
//     const p1 = '-' + w + ' 0';
//     const p2 = '0 -' + h1;
//     const p3 = w + ' 0';
//     const p4 = '0 ' + h2;
//     const path = ['M', p1, p2, p3, p4, 'Z'].join(' ');
//
//     return path;
//   }
// }
