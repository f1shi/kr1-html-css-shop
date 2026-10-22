/* =========================================================
   МОДАЛЬНОЕ ОКНО + ОБРАБОТКА ФОРМЫ В МОДАЛКЕ (index, catalog, product)
   ========================================================= */

const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('button[data-product]');
const closeDialogButtons = document.querySelectorAll('[data-close-dialog]');
const selectedProductInput = document.getElementById('selected-product');
const productNameOutput = document.getElementById('order-dialog-product-name');
const dialogBody = document.getElementById('order-dialog-body');
const dialogSuccess = document.getElementById('order-dialog-success');
const orderForm = document.getElementById('order-form');

// Возвращаем окно в исходное состояние: форма видна, ошибки сброшены
function resetOrderDialog() {
  if (dialogBody) dialogBody.hidden = false;
  if (dialogSuccess) dialogSuccess.hidden = true;
  if (orderForm) {
    Array.from(orderForm.elements).forEach((element) => {
      element.removeAttribute('aria-invalid');
    });
  }
}

if (orderDialog && orderButtons.length > 0) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.dataset.product || '';
      if (selectedProductInput) selectedProductInput.value = productName;
      if (productNameOutput) productNameOutput.textContent = productName || 'не выбран';
      resetOrderDialog();
      orderDialog.showModal();
      document.getElementById('order-name')?.focus();
    });
  });
}

if (orderDialog) {
  closeDialogButtons.forEach((button) => {
    button.addEventListener('click', () => {
      orderDialog.close();
    });
  });

  // Клик по затемнённой подложке закрывает окно
  orderDialog.addEventListener('click', (event) => {
    if (event.target === orderDialog) orderDialog.close();
  });
}

if (orderForm) {
  // Как только пользователь исправляет поле, снимаем подсветку ошибки
  orderForm.addEventListener('input', (event) => {
    if (event.target.checkValidity()) event.target.removeAttribute('aria-invalid');
  });

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);

    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      orderForm.reportValidity();
      return;
    }

    orderForm.reset();
    if (dialogBody) dialogBody.hidden = true;
    if (dialogSuccess) {
      dialogSuccess.hidden = false;
      dialogSuccess.querySelector('[data-close-dialog]')?.focus();
    }
  });
}

/* =========================================================
   ФОРМА НА СТРАНИЦЕ order.html
   ========================================================= */

const pageOrderForm = document.getElementById('order-form-page');
const pageSuccessMessage = document.getElementById('success-message-page');

if (pageOrderForm) {
  pageOrderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(pageOrderForm.elements);

    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!pageOrderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      pageOrderForm.reportValidity();
      return;
    }

    if (pageSuccessMessage) pageSuccessMessage.hidden = false;
    pageOrderForm.reset();
  });
}

/* =========================================================
   ФОРМА ОБРАТНОЙ СВЯЗИ НА contacts.html
   ========================================================= */

const feedbackForm = document.getElementById('feedback-form');
const feedbackSuccess = document.getElementById('success-message-contacts');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(feedbackForm.elements);

    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!feedbackForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      feedbackForm.reportValidity();
      return;
    }

    if (feedbackSuccess) feedbackSuccess.hidden = false;
    feedbackForm.reset();
  });
}