import i18n from "i18next"
import { initReactI18next } from "react-i18next";
import ICU from "i18next-icu";


i18n
.use(initReactI18next)
.use(ICU)
.init({
    lng: "ru",
    debug: true,
    fallbacklng: "ru",
    resources: {
        ru: {
          translation: {
            icu:"{count, plural, =0 {# сообщений} =1 {# сообщение} =2 {# сообщения} =3 {# сообщения} =4 {# сообщения} other {# сообшений}}",
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
              createChanalSuccess: "Канал создан", 
              removeChanalSuccess: "Канал удален",
              renameChanalSuccess: "Канал переименован",
              pageNotFound: "Страница не найдена",
              dontEnter: "Но вы можете перейти ",
              goToMainPage: "на главную страницу",
            },
              errors: {
                passwordNotMatch: "Пароли должны совпадать",
                required: "Обязательное поле",
                longText: "От 3 до 20 символов",
                tooShortPassword: "Не менее 6 символов",
                differentPassword: "Пароли должны совпадать",
                existUser: "Такой пользователь уже существует",
                enterNickPassword: "Неверные имя пользователя или пароль",
                existChanel: "Должно быть уникальным",
                errorConnect: "Ошибка соединения"
              },
          },
        },
    },
})

export default i18n;
