class Tag {
  static create(el: string, classes?: string) {
    const element = document.createElement(el);

    if (classes) {
      element.className = classes;
    }

    return element;
  }
}

export { Tag };
