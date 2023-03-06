import Component from '@/common/component';
import Tag from '@/common/tag';
import { ImagesStore } from '@/models/images-store';
import { Tags } from '@/types/enums';
import { TFavourite } from '@/types/types';
import cls from './tree-toy.module.scss';

export default class TreeToy extends Component {
  private counter = Tag.create(Tags.div, cls.toyCounter);

  private item: TFavourite;

  constructor(root: HTMLElement, item: TFavourite) {
    super(root);
    this.item = item;
  }

  renderCounter(count: string) {
    this.counter.textContent = count;
  }

  register() {
    const toy = Tag.create(Tags.div, `${cls.toy}`);
    const imgWrap = Tag.create(Tags.div, cls.imgWrap);

    const indexImage = Number(this.item.num) - 1;
    const image = ImagesStore.images.toys[indexImage];
    image.classList.add(cls.toyImg);
    imgWrap.append(ImagesStore.images.toys[indexImage]);

    toy.append(imgWrap, this.counter);

    let target: SVGPolygonElement | null = null;
    const onMouseDown = (event: Event) => {
      const el = <HTMLImageElement>event.currentTarget;

      if (el.classList.contains(cls.above)) {
        el.classList.remove(cls.above);
      }

      const pagex = (<MouseEvent>event).pageX;
      const pagey = (<MouseEvent>event).pageY;

      const x = (<MouseEvent>event).clientX;
      const y = (<MouseEvent>event).clientY;

      const shiftX = x - el.getBoundingClientRect().left;
      const shiftY = y - el.getBoundingClientRect().top;

      if (+this.item.count - 1 !== 0) {
        const clone = el.cloneNode();
        const stl = window.getComputedStyle(el).left;

        if (stl === 'auto') {
          imgWrap.append(clone);
        }

        clone.addEventListener('mousedown', onMouseDown);
      }

      el.style.position = 'absolute';
      el.style.zIndex = '1000';

      const moveAt = (pageX: number, pageY: number) => {
        el.style.left = `${((pageX - shiftX) * 100) / document.documentElement.clientWidth}%`;
        el.style.top = `${pageY - shiftY}px`;
      };

      moveAt(pagex, pagey);

      function onMouseMove(e: MouseEvent) {
        moveAt(e.pageX, e.pageY);

        el.hidden = true;
        const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        el.hidden = false;

        if (!elemBelow) return;

        const droppableBelow = elemBelow.closest('polygon');

        if (target !== droppableBelow) {
          if (target) {
            // el.classList.remove(cls.above);
          }
          target = droppableBelow;
          if (target) {
            // el.classList.add(cls.above);
          }
        }
      }

      document.addEventListener('mousemove', onMouseMove);

      el.onmouseup = () => {
        if (target) {
          el.classList.add(cls.above);

          if (el.classList.contains('on-tree') === false) {
            el.classList.add('on-tree');
            this.item.count = String(+this.item.count - 1);
            this.renderCounter(this.item.count);
          }

          document.removeEventListener('mousemove', onMouseMove);
          el.onmouseup = null;
        } else {
          if (+this.item.count === 0 || +this.item.count === 1) {

            const indexImage = Number(this.item.num) - 1;
            const image = ImagesStore.images.toys[indexImage];
            image.classList.add(cls.toyImg);
            imgWrap.append(ImagesStore.images.toys[indexImage]);


            ImagesStore.images.toys[indexImage].addEventListener('mousedown', onMouseDown);

            if (+this.item.count === 1 && el.classList.contains('on-tree')) {
              imgWrap.childNodes[imgWrap.childNodes.length - 1].remove();
            }
          }

          if (el.classList.contains('on-tree')) {
            this.item.count = String(+this.item.count + 1);
            this.renderCounter(this.item.count);
          }

          document.removeEventListener('mousemove', onMouseMove);
          el.onmouseup = null;
          el.remove();
        }
      };

      el.ondragstart = () => false;
    };

    image.addEventListener('mousedown', onMouseDown);

    this.renderCounter(this.item.count);
    this.root.append(toy);
  }
}