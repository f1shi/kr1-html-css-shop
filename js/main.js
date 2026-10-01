/* =========================================================
   МОДАЛЬНОЕ ОКНО + ОБРАБОТКА ФОРМЫ В МОДАЛКЕ (index, catalog, product)
   ========================================================= */

const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button[data-product]');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');

if (orderDialog && orderButtons.length > 0) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.dataset.product || '';
      if (selectedProductInput) selectedProductInput.value = productName;
      orderDialog.showModal();
    });
  });
}

if (closeDialogButton && orderDialog) {
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderForm) {
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

    if (successMessage) successMessage.hidden = false;
    orderForm.reset();
    if (orderDialog) orderDialog.close();
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