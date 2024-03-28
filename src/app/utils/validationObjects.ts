export const required = {
  required: {
    value: true,
    message: 'Обязательное поле',
  },
};
export const Min5 = {
  minLength: {
    value: 5,
    message: 'Минимальная длина 5',
  },
};

export const emailValidation = {
  required,
  pattern: {
    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    message: 'Некорректная почта',
  },
};

export const ReqMin5Max10Validation = {
  ...required,
  ...Min5,
  maxLength: {
    value: 10,
    message: 'Максимальная длина 10',
  },
};
