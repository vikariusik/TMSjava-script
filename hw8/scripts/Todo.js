export class Todo {
    constructor(id, text) {
      this.id = id;
      this.date = new Date().toLocaleDateString();
      this.text = text;
      this.isChecked = true;
    }
  }