/**
 *  Класс для формы редактирования тикета
 * */
export default class TicketEditForm {
  constructor() {
    this.editForm = document.createElement('form');
    this.editForm.className = 'ticket__edit_form';
    this.editForm.innerHTML = this.editFormMarkup();

    this.onEditCancel = this.onEditCancel.bind(this);
    this.toggleForm = this.toggleForm.bind(this);

    // add listeners
    this.bindToDOMEdit();
  }

  editFormMarkup() {
    return `
        <form class="ticket__edit_form">
            <label for="ticket__edit_input_name">Name</label>
            <input type="text" class="ticket__edit_input" name="name" id="ticket__edit_input_name" required>
            <label for="ticket__edit_input_descr">Description</label>
            <textarea type="text" class="ticket__edit_input" name="descr" id="ticket__edit_input_descr" rows="5" cols="25"></textarea>
            <input type="text" class="hidden" name="id">
            <input type="submit" value="Submit" class="ticket__edit_submit">
            <input type="button" value="Cancel" class="ticket__edit_cancel">
        </form>
    `;
  }

  toggleForm() {
    this.editForm.classList.toggle('ticket__edit_form_active');
  }

  bindToDOMEdit() {
    this.nameElemEdit = this.editForm.querySelector('[name="name"]');
    this.descrElemEdit = this.editForm.querySelector('[name="descr"]');
    this.idElemEdit = this.editForm.querySelector('[name="id"]');
    this.cancelButtonEdit = this.editForm.querySelector('.ticket__edit_cancel');

    this.cancelButtonEdit.addEventListener('click', this.onEditCancel);
  }

  onEditCancel(e) {
    if (e.target.className === 'ticket__edit_cancel') {
      this.nameElemEdit.value = '';
      this.descrElemEdit.value = '';
      this.editForm.classList.toggle('ticket__edit_form_active');
    }
  }
}
