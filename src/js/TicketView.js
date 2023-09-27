/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor() {}

  // return DOM Element for tickets tables
  renderTickets(data) {
    const table = document.createElement('table');
    table.className = 'tickets';

    data.forEach((item) => {
      const elemCode = this.renderTicket(item);
      table.insertAdjacentHTML('beforeend', elemCode);
    });

    return table;
  }

  // return markup for one ticket
  renderTicket(ticket) {
    const date = new Date(ticket.created);
    let status = '';
    if (ticket.status) {
      status = 'v';
    }

    return `
      <tr class="ticket" data-id="${ticket.id}">
        <td>
          <div class="check" data-id="${ticket.id}">${status}</div>
        </td>
        <td class="ticket-name">${ticket.name}</td>
        <td class="ticket-date">
          ${date.getDate().toString().padStart(2, '0')}.${date.getMonth().toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}
        </td>
        <td class="edit_field">
            <span class="edit" data-id="${ticket.id}">&#9998;</span>
            <span class="delete" data-id="${ticket.id}">x</span>
        </td>
      </tr>
    `;
  }
}
