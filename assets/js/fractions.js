const Fractions = {
  // helpers
  isCorrectMixed(whole, num, denom){
    return !(!whole && !num && !denom || !num && denom || num && !denom);
  },
  buildFrac(whole, num, denom){
    whole = Number(whole);
    num = Number(num);
    denom = Number(denom);
    return num && denom ? 
      math.fraction(
        (math.sign(whole) || 1) * (math.sign(num) || 1) * (math.sign(denom) || 1) * 
        (math.abs(whole) * math.abs(denom) + math.abs(num)), math.abs(denom)
      ) :
      math.fraction(whole, 1)
    ;
  },
  getFracPart(frac){
    return frac.d != 1 ? {
      num: frac.n % frac.d, denom: frac.d,
    } : '';
  },
  getWholePart(frac){
    const sign = frac.s == -1 ? '-' : '';
    const wholePart = (frac.n - frac.n % frac.d) / frac.d;
    if(wholePart == 0 && this.getFracPart(frac)) return sign;
    return sign + wholePart;
  },
  getChartData(frac){
    const fracPart = this.getFracPart(frac);
    const wholePart = this.getWholePart(frac);
    return fracPart ? [fracPart.num, fracPart.denom-fracPart.num] : (wholePart == 0 ? [0,1]:[1,0]);
  },
  outputFrac(frac, prefix){
    const isWhole = frac.d == 1;
    const sign = frac.s == -1 ? '-' : ''; 
    _(prefix+'Whole').classList[!isWhole && !sign ? 'add':'remove']('hidden');
    _(prefix+'Whole').innerText = sign + (isWhole ? frac.n : '');
    _(prefix+'Frac').classList[isWhole?'add':'remove']('hidden');
    _(prefix+'Num').innerText = frac.n;
    _(prefix+'Denom').innerText = frac.d;
  },
  outputMixed(frac, prefix){
    const fracPart = this.getFracPart(frac);
    const wholePart = this.getWholePart(frac);
    _(prefix+'Whole').classList[!wholePart?'add':'remove']('hidden');
    _(prefix+'Whole').innerText = wholePart;
    _(prefix+'Frac').classList[!fracPart?'add':'remove']('hidden');
    _(prefix+'Num').innerText = fracPart.num;
    _(prefix+'Denom').innerText = fracPart.denom;
  }
}
