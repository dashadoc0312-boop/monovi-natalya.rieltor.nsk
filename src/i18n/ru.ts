/** Тексты интерфейса на русском. Для другого языка скопируйте файл и переведите значения. */
export const ru = {
  nav: {
    about: "Обо мне",
    services: "Чем помогу",
    contacts: "Контакты",
    main: "Основная навигация",
  },
  cta: {
    book: "Записаться на консультацию",
    bookShort: "Записаться",
    telegram: "Связаться в Telegram",
  },
  about: {
    title: "Обо мне",
    principles: "Как я работаю",
  },
  services: {
    title: "Чем могу помочь",
  },
  form: {
    title: "Заявка на консультацию",
    name: "Ваше имя",
    namePlaceholder: "Как к вам обращаться",
    contact: "Телефон или мессенджер",
    contactPlaceholder: "+7 999 000-00-00 или @telegram",
    contactHint: "Перезвоню или напишу туда, где вам удобнее.",
    comment: "Комментарий",
    optional: "необязательно",
    commentPlaceholder: "Например: ищу двухкомнатную квартиру для семьи",
    submit: "Отправить заявку",
    sending: "Отправляем…",
    consent: "Нажимая кнопку, вы соглашаетесь на обработку указанных данных для ответа на заявку.",
    errors: {
      name: "Укажите имя — хотя бы 2 буквы.",
      contact: "Укажите телефон или ник в мессенджере, чтобы я могла ответить.",
    },
    success: {
      title: "Заявка отправлена",
      text: "Спасибо! Я свяжусь с вами в ближайшее время.",
      again: "Отправить ещё одну",
    },
    failure: {
      title: "Заявка не отправилась",
      text: "Сервер не ответил. Попробуйте ещё раз или отправьте заявку напрямую в мессенджер — текст уже готов.",
      retry: "Попробовать снова",
    },
    messenger: {
      whatsapp: "Отправить в WhatsApp",
      telegram: "Отправить в Telegram",
      copied: "Текст заявки скопирован — вставьте его в чат Telegram.",
      openedTitle: "Осталось отправить сообщение",
      opened: "Мессенджер открыт в новой вкладке. Отправьте сообщение, чтобы заявка дошла.",
    },
    messageHeader: "Здравствуйте! Хочу записаться на консультацию.",
    messageName: "Имя",
    messageContact: "Контакт",
    messageComment: "Комментарий",
  },
  contacts: {
    title: "Контакты",
    lead: "Пишите или звоните — отвечу лично.",
    phone: "Телефон",
    telegram: "Telegram",
    telegramChannel: "Telegram-канал",
    telegramChannelValue: "Читать канал",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    email: "Почта",
    map: "Офис на карте",
    mapValue: "Открыть на карте",
  },
  footer: {
    rights: "Все права защищены.",
  },
  portrait: {
    placeholder: "Здесь будет ваше фото",
  },
};

export type Dictionary = typeof ru;
