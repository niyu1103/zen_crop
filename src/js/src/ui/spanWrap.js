export default class SpanWrap {
  constructor(target) {

    this.target = this.convertElement(target);
    this.nodes = [...this.target.childNodes];

    this.convert();
  }

  convert() {

    let spanWrapText = ""

    this.nodes.forEach((node) => {
      if (node.nodeType == 3) {//テキストの場合
        const text = node.textContent.replace(/\r?\n/g, '');//テキストから改行コード削除
        //spanで囲んで連結
        spanWrapText = spanWrapText + text.split('').reduce((acc, v) => {
          return acc + `<span>${v}</span>`
        }, "");
      } else {//テキスト以外
        //<br>などテキスト以外の要素をそのまま連結
        spanWrapText = spanWrapText + node.outerHTML
      }
    })

    this.target.innerHTML = spanWrapText

  }

  //jQueryオブジェクトや文字列セレクターを変換
  convertElement(element) {
    if (element instanceof HTMLElement) {
      return element
    }
    // if (element instanceof jQuery) {
    //   return element[0]
    // }
    return document.querySelector(element);
  }

}
