import createRequest from './api/createRequest';

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  constructor(url) {
    this.url = url;
  }

  list(callback) {
    createRequest({
      url: this.url,
      sendMethod: 'GET',
      method: 'allTickets',
      callback,
    });
  }

  get(id, callback) {
    createRequest({
      url: this.url,
      sendMethod: 'GET',
      method: 'ticketById',
      id,
      callback,
    });
  }

  create(data, callback) {
    createRequest({
      url: this.url,
      sendMethod: 'POST',
      method: 'createTicket',
      data,
      callback,
    });
  }

  update(id, data, callback) {
    createRequest({
      url: this.url,
      sendMethod: 'POST',
      method: 'updateById',
      id,
      data,
      callback,
    });
  }

  delete(id, callback) {
    createRequest({
      url: this.url,
      sendMethod: 'GET',
      method: 'deleteById',
      id,
      callback,
    });
  }
}
