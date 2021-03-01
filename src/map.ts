export function map(
    num: number,
    frombottom: number,
    fromtop: number,
    tobottom: number,
    totop: number): number {

    let a = num - frombottom;
    a *= (totop-tobottom)/(fromtop-frombottom);
    a += tobottom;
    return a;
}
