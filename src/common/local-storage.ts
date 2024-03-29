import {
  TFavourite, TFilter, TSorter, TTreeFilter,
} from '@/types/types';

type TLs = {
  fav: TFavourite[],
  filter: TFilter,
  sorter: TSorter,
  tree: TTreeFilter,
};

class LS {
  static ls: TLs = {
    fav: [],
    sorter: {
      name: '',
      direction: '',
    },
    filter: {
      favourite: [],
      isFavourite: false,
      search: '',
      colors: {
        white: false,
        yellow: false,
        red: false,
        blue: false,
        green: false,
      },
      shapes: {
        ball: false,
        bell: false,
        toy: false,
        pine: false,
        snowflake: false,
        star: false,
      },
      sizes: {
        S: false,
        M: false,
        L: false,
      },
      yearRange: {
        percent: [],
        years: [],
      },
      qtyRange: {
        percent: [],
        years: [],
      },
    },
    tree: {
      tree: '',
      bg: '',
      garland: '',
      player: false,
      snow: false,
    },
  };

  static initLocalStorage() {
    if (localStorage.getItem('app') === null) {
      localStorage.setItem('app', JSON.stringify(this.ls));
    } else {
      const value = localStorage.getItem('app');

      if (typeof value === 'string') {
        LS.ls = JSON.parse(value);
      }
    }
  }

  static setLocalStorage() {
    localStorage.setItem('app', JSON.stringify(this.ls));
  }

  static getLocalStorage() {
    const value = localStorage.getItem('app');

    if (typeof value === 'string') {
      LS.ls = JSON.parse(value);
    }
  }

  static setFavourite(fav: TFavourite[]) {
    LS.getLocalStorage();

    LS.ls.fav = fav;
    LS.ls.filter.favourite = fav;
    LS.setLocalStorage();
  }

  static setData(filter: TFilter) {
    this.ls.filter = filter;
    this.setLocalStorage();
  }

  static setSorterToLs(sorter: TSorter) {
    this.ls.sorter = sorter;
    this.setLocalStorage();
  }

  static setTreeInfo(tree: TTreeFilter) {
    this.ls.tree = tree;
    this.setLocalStorage();
  }
}

export { LS };
