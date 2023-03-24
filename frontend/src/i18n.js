import i18n from "i18next"
import { initReactI18next } from "react-i18next";

i18n
.use(initReactI18next)
.init({
    lng: "ru",
    debug: true,
    fallbacklng: "ru",
    interpolation: {
        escapeValue: false, 
      },
    resources: {
        ru: {
          translation: {
            text: {
              chanel: "Каналы",
              enter: "Войти", 
              exit: "Выйти",
              hexletHeader: 'Hexlet Chat',
              registration: "Регистрация",
              register: "Зарегестрироваться",
              confirmPassword: "Подтвердить пароль",
              password: "Пароль",
              userName: "Ваш ник",
              noAccount: "Нет аккаунта?",
              sendForm: "Отправить", 
              messeges: "сообщений",
              rename: "Переименовать", 
              remove: "Удалить",
              nameChanel: "Имя канала",
              addChanel: "Добавить канал",
              cancel: "Отменить",
              confirm: "Уверены?",
              deleteChanel: "Удалить канал",
              delete: "Удалить",
              renameChannel: "Переименовать канал",
            },
              errors: {
                passwordNotMatch: "Пароли должны совпадать",
                required: "Обязательное поле",
                longText: "От 3 до 20 символов",
                tooShortPassword: "Не менее 6 символов",
                differentPassword: "Пароли должны совпадать",
                existUser: "Такой пользователь уже существует",
                enterNickPassword: "Неверные имя пользователя или пароль",
                existChanel: "Должно быть уникальным"
              },
          },
        },
    },
})

export default i18n;
