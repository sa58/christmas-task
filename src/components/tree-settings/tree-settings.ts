import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import Tag from '@/common/tag';
import Player from '@/models/player';
import Tree from '@/models/tree';
import { Tags } from '@/types/enums';
import cls from './tree-settings.module.scss';

export default class TreeSettings extends Component {
  private localroot = Tag.create(Tags.div, cls.settingsWrap);

  private musicIcon = Tag.create(Tags.div, cls.player);

  constructor(root: HTMLElement) {
    super(root);
    EventEmitter.subscribe('reset:tree-filter', () => {
      if (this.musicIcon.classList.contains(cls.active)) {
        this.musicIcon.classList.remove(cls.active);
      }

      Player.stopAudio();
    });
  }

  register() {
    if (Tree.filter.filter.player) {
      this.musicIcon.classList.add(cls.active);
    }

    this.localroot.append(this.musicIcon);
    this.root.append(this.localroot);

    this.musicIcon.onclick = (e) => {
      const el = <HTMLElement>(e.target);

      if (el.classList.contains(cls.active)) {
        el.classList.remove(cls.active);
      } else {
        el.classList.add(cls.active);
      }

      Tree.filter.togglePlayer();
    };
  }
}