import Component from '@/common/component';
import Tag from '@/common/tag';
import AsideToys from '@/components/aside-toys/aside-toys';
import FilterTree from '@/components/filter-tree/filter-tree';
import Header from '@/components/header/header';
import Tree from '@/components/tree-view/tree-view';
import { Tags } from '@/types/enums';
import cls from './tree-layout.module.scss';

class TreeLayout extends Component {
  private container = Tag.create(Tags.div, `${cls.treeLayout} content`);

  register() {
    const wrapHeader = Tag.create(Tags.div, cls.head);
    const header = new Header(wrapHeader);
    header.register();

    this.root.append(wrapHeader, this.container);

    const wrapAsideTree = Tag.create(Tags.div, `${cls.asideTree} col`);
    const wrapAsideToys = Tag.create(Tags.div, `${cls.asideToys} col`);
    const wrapTree = Tag.create(Tags.div, `${cls.tree} col`);

    this.container.append(
      wrapAsideTree,
      wrapTree,
      wrapAsideToys,
    );

    const filterTree = new FilterTree(wrapAsideTree);
    filterTree.register();

    const asideToys = new AsideToys(wrapAsideToys);
    asideToys.register();

    const tree = new Tree(wrapTree);
    tree.register();
  }
}

export default TreeLayout;
