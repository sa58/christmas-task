import EventEmitter from '@/common/event-emitter';
import LS from '@/common/local-storage';
import { TFilter, TSorter } from '@/types/types';

export default class TreeFilter {
  filter: any;

  constructor() {
    this.filter = {
      tree: '',
      bg: '',
    };
  }

  setTree(val: string | undefined) {
    if (typeof val === 'string') {
      this.filter.tree = val;
      EventEmitter.emit('change:tree');
    }

    // this.setFilterToLs();
  }

  setBg(val: string | undefined) {
    if (typeof val === 'string') {
      this.filter.bg = val;
      EventEmitter.emit('change:bg');
    }

    // this.setFilterToLs();
  }

  setFilterToLs() {
    LS.setData(this.filter);
  }
}
