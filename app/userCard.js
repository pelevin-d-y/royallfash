import $ from "jquery"

const userCards = (data) => {
  $.each(data, function(index, value) {
    $('.popup__text-registration').append(`<div class="registration-item__content registration-item__content-${(value.come === false) ? 'success' : 'error'}">
        <img src="${value.path}" class="registration-item__img">
        <div class="registration-item__text">
          <label class="registration-item__text-label">
            <input class="registration-item__text-input ${(value.come === false) ? '' : 'hidden'}" type="radio" name="card" value="${value._id}">
            <div class="registration-item__text-name">
              ${value.name}
            </div>
          </label>
        </div>
        <div class="registration-item__status-wrapper">
          <div class="registration-item__status">
          ${
            (value.come === false) ? 'Не пришел' : 'Пришел'
          }
          </div>
        </div>
      </div>
    </div>`);
  })
}

export default userCards;