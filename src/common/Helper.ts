export default class Helper {
  // static getChunks(arr, size) {
  //   return arr.reduce((p, c) => {
  //     if (p[p.length - 1].length === size) {
  //       p.push([]);
  //     }

  //     p[p.length - 1].push(c);
  //     return p;
  //   }, [[]]);
  // }

  static getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // static shuffle(array) {
  //   const copy = array;

  //   for (let i = array.length - 1; i > 0; i -= 1) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [copy[i], copy[j]] = [array[j], array[i]];
  //   }

  //   return array;
  // }

  // static getImage(url, imageNum, className) {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.className = className;
  //     img.src = `${url}${imageNum}${process.env.IMG_FRMT_JPG}`;

  //     img.onload = () => {
  //       resolve(img);
  //     };
  //     img.onerror = (err) => {
  //       reject(err);
  //     };
  //   });
  // }
}
