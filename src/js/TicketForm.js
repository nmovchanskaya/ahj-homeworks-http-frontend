/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor() {
    this.addForm = document.createElement('form');
    this.addForm.className = 'ticket__add_form';
    this.addForm.innerHTML = this.addFormMarkup();

    this.onAddCancel = this.onAddCancel.bind(this);
    this.toggleForm = this.toggleForm.bind(this);

    // add listeners
    this.bindToDOMAdd();
  }

  addFormMarkup() {
    return `
        <form class="ticket__add_form">
            <label for="ticket__add_input_name">Name</label>
            <input type="text" class="ticket__add_input" name="name" id="ticket__add_input_name" required>
            <label for="ticket__add_input_descr">Description</label>
            <textarea type="text" class="ticket__add_input" name="descr" id="ticket__add_input_descr" rows="5" cols="25"></textarea>
            <input type="submit" value="Submit" class="ticket__add_submit">
            <input type="button" value="Cancel" class="ticket__add_cancel">
        </form>
    `;
  }

  toggleForm() {
    this.addForm.classList.toggle('ticket__add_form_active');
  }

  bindToDOMAdd() {
    this.nameElemAdd = this.addForm.querySelector('[name="name"]');
    this.descrElemAdd = this.addForm.querySelector('[name="descr"]');
    this.cancelButtonAdd = this.addForm.querySelector('.ticket__add_cancel');

    this.cancelButtonAdd.addEventListener('click', this.onAddCancel);
  }

  onAddCancel(e) {
    if (e.target.className === 'ticket__add_cancel') {
      this.nameElemAdd.value = '';
      this.descrElemAdd.value = '';
      this.addForm.classList.toggle('ticket__add_form_active');
    }
  }
}
