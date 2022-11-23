export const jwtsecret = process.env.JWTSECRET || 'default_secret';
export const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

export const urlPattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&/=]*$/;

export const defaultName = 'Жак-Ив Кусто';
export const defaultAbout = 'Исследователь';
export const defaultAvatar = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

// status codes

export const STATUS_201 = 201;
export const STATUS_204 = 204;
export const STATUS_400 = 400;
export const STATUS_401 = 401;
export const STATUS_403 = 403;
export const STATUS_404 = 404;
export const STATUS_409 = 409;
export const STATUS_500 = 500;

export const DEFAULT_PORT = 3000;

export const messageUserCreated = 'Пользователь успешно создан';
export const messageUserIdNotFound = 'Пользователя с таким id не существует';
export const messageUserAlreadyExist = 'Имейл уже зарегистрирован';
export const messageNotValidEmailOrPassword = 'Необходимо предоставить корректные имейл и пароль';
export const messageNoEmailOrPassword = 'Необходимо предоставить имейл и пароль';
export const messageNameOrLinkNotProvided = 'Необходимо предоставить имя и ссылку на фотографию';
export const messageLinkNotProvided = 'Необходимо предоставить ссылку на фотографию';
export const messageNameNotValid = 'Имя должно содержать от 2 до 30 букв';
export const messageAboutNotValid = 'Описание должно содержать от 2 до 200 букв';
export const messageUserIdNotProvided = 'Необходимо предоставить id пользователя';
export const messageCardNotFound = 'Карточка не найдена';
export const messageServerError = 'Ошибка сервера';
export const messageNeedAuthorization = 'Необходима авторизация';
export const messageNoRights = 'Нельзя удалять карточки других пользователей';
export const messageAuthorizationFailed = 'Неправильные почта или пароль';
export const messageNotValidId = 'Не корректный id';
export const messageNotValidLink = 'Не корректная ссылка';
export const messageNoContentFound = 'Такой страницы не существует';

export const CAST_ERROR = 'CastError';
export const VALIDATION_ERROR = 'ValidationError';

export const ONE_WEEK = '7d';
export const ONE_WEEK_IN_MS = 604800000;
