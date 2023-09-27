import TicketService from './TicketService';
import TicketView from './TicketView';
import TicketForm from './TicketForm';
import TicketEditForm from './TicketEditForm';

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;

    this.ticketForm = new TicketForm();
    this.container.insertBefore(this.ticketForm.addForm, null);

    this.ticketEditForm = new TicketEditForm();
    this.container.insertBefore(this.ticketEditForm.editForm, null);

    this.onAddSubmit = this.onAddSubmit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onClickProduct = this.onClickProduct.bind(this);

    this.ticketService = new TicketService();
    this.ticketView = new TicketView();
  }

  bindToDOM() {
    this.addButton = document.querySelector('.button-add');
    this.addButton.addEventListener('click', this.ticketForm.toggleForm);

    this.ticketForm.addForm.addEventListener('submit', this.onAddSubmit);
    this.ticketEditForm.editForm.addEventListener('submit', this.onEditSubmit);
    this.container.addEventListener('click', this.onClickProduct);
  }

  init() {
    this.ticketService.list((data) => {
      const tableElem = this.ticketView.renderTickets(data);
      this.container.insertBefore(tableElem, null);
    });
  }

  onClickProduct(e) {
    if (e.target.className === 'delete') {
      const { id } = e.target.dataset;
      this.ticketService.delete(id, (data) => {
        // refresh tickets table
        this.refreshTickets();
      });
    } else if (e.target.className === 'edit') {
      this.ticketEditForm.toggleForm();
      const { id } = e.target.dataset;
      this.ticketService.get(id, (data) => {
        const ticket = data;
        this.ticketEditForm.nameElemEdit.value = ticket.name;
        this.ticketEditForm.descrElemEdit.value = ticket.description;
        this.ticketEditForm.idElemEdit.value = id;
      });
    } else if (e.target.className === 'check') {
      const { id } = e.target.dataset;
      const status = e.target.textContent;
      let newStatus = 'v';
      if (status.trim() === 'v') {
        newStatus = '';
      }
      const data = { status: newStatus };
      this.ticketService.update(id, data, (d) => {
        // refresh tickets table
        this.refreshTickets();
      });
    } else if (e.target.className === 'ticket-name' || e.target.className === 'ticket-date') {
      // get and show full description or remove
      const parent = e.target.closest('tr');
      const { id } = parent.dataset;
      const descr = parent.querySelector('.ticket-descr');
      if (descr) {
        descr.remove();
      } else {
        this.ticketService.get(id, (data) => {
          const ticket = data;
          const div = document.createElement('div');
          div.className = 'ticket-descr';
          div.textContent = ticket.description;
          const nameElem = parent.querySelector('.ticket-name');
          nameElem.insertBefore(div, null);
        });
      }
    }
  }

  onAddSubmit(e) {
    e.preventDefault();

    const name = this.ticketForm.nameElemAdd.value;
    const description = this.ticketForm.descrElemAdd.value;
    const data = { name, description };

    this.ticketService.create(data, (d) => {
      this.ticketForm.nameElemAdd.value = '';
      this.ticketForm.descrElemAdd.value = '';
      this.ticketForm.toggleForm();

      // refresh tickets table
      this.refreshTickets();
    });
  }

  onEditSubmit(e) {
    e.preventDefault();

    const name = this.ticketEditForm.nameElemEdit.value;
    const description = this.ticketEditForm.descrElemEdit.value;
    const id = this.ticketEditForm.idElemEdit.value;
    const data = { name, description };

    this.ticketService.update(id, data, (d) => {
      this.ticketEditForm.editForm.classList.toggle('ticket__edit_form_active');

      // refresh tickets table
      this.refreshTickets();
    });
  }

  refreshTickets() {
    this.clearTickets();
    this.ticketService.list((data) => {
      const tableElem = this.ticketView.renderTickets(data);
      this.container.insertBefore(tableElem, null);
    });
  }

  clearTickets() {
    document.querySelector('table.tickets').remove();
  }
}
