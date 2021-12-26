import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import Tree from '@/models/tree';
import { Tags } from '@/types/enums';
import cls from './filter-tree.module.scss';

export default class FilterTree extends Component {
  private treeRoot = Tag.create(Tags.div, cls.treeRoot);

  constructor(root: HTMLElement) {
    super(root);
    // EventEmitter.subscribe('reset:filter', () => {
    //   this.treeRoot.innerHTML = '';
    //   this.renderColors();
    // });
  }

  renderTrees() {
    const colors = ['1', '2', '4', '6'];

    colors.forEach((num, i) => {
      const el = <HTMLImageElement>Tag.create(Tags.img, `${cls.tree}`);
      el.src = `/src/assets/tree/${num}.png`;

      el.dataset.num = num;

      if (Tree.filter.filter.tree) {
        el.classList.add(cls.active);
      } else if (i === 0) {
        el.classList.add(cls.active);
      }

      this.treeRoot.append(el);
    });
  }

  register() {
    const name = `
      <div class=${cls.filterName}>Елка</div>
    `;

    const wrap = Tag.create(Tags.div, cls.wrap);
    const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    nameTpl.innerHTML = name;
    wrap.append(nameTpl.content);
    this.root.append(wrap, this.treeRoot);

    this.renderTrees();

    this.treeRoot.addEventListener('click', (e) => {
      const active = this.treeRoot.querySelector(`.${cls.active}`);

      if (active) {
        active.classList.remove(cls.active);
      }
      const el = (<HTMLElement>e.target);
      el.classList.add(cls.active);
      const key = (<DOMStringMap>el.dataset).num;
      Tree.filter.setTree(key);
    });
  }
}
