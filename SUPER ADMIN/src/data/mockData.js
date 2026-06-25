export const mockCompanies = [
  { id: 1, name: 'ООО "ТехЛоджикс"',    phone: '+998 90 123 45 67', tariff: 'Premium',    tariffId: 3, status: 'active',  createdAt: '2025-01-15' },
  { id: 2, name: 'ИП Каримов А.А.',       phone: '+998 91 234 56 78', tariff: 'Basic',      tariffId: 2, status: 'active',  createdAt: '2025-02-20' },
  { id: 3, name: 'АО "СупроМаркет"',     phone: '+998 93 345 67 89', tariff: 'Enterprise', tariffId: 4, status: 'active',  createdAt: '2025-01-08' },
  { id: 4, name: 'ООО "ФастДелив"',      phone: '+998 94 456 78 90', tariff: 'Premium',    tariffId: 3, status: 'blocked', createdAt: '2024-11-30' },
  { id: 5, name: 'ИП Рахимова Д.',        phone: '+998 95 567 89 01', tariff: 'Basic',      tariffId: 2, status: 'active',  createdAt: '2025-03-05' },
  { id: 6, name: 'ООО "ДижиТорг"',       phone: '+998 97 678 90 12', tariff: 'Enterprise', tariffId: 4, status: 'active',  createdAt: '2024-12-18' },
  { id: 7, name: 'АО "Оптима Груп"',     phone: '+998 99 789 01 23', tariff: 'Starter',    tariffId: 1, status: 'blocked', createdAt: '2025-04-01' },
  { id: 8, name: 'ООО "АлфаТрейд"',      phone: '+998 90 890 12 34', tariff: 'Premium',    tariffId: 3, status: 'active',  createdAt: '2025-02-14' },
  { id: 9, name: 'АО "НоваТех"',         phone: '+998 91 901 23 45', tariff: 'Starter',    tariffId: 1, status: 'active',  createdAt: '2025-05-22' },
  { id: 10, name: 'ООО "ПраймСервис"',   phone: '+998 93 012 34 56', tariff: 'Basic',      tariffId: 2, status: 'active',  createdAt: '2025-04-18' },
  { id: 11, name: 'ИП Юсупов Б.',        phone: '+998 94 123 56 78', tariff: 'Premium',    tariffId: 3, status: 'active',  createdAt: '2025-03-30' },
  { id: 12, name: 'ООО "МегаМаркет"',    phone: '+998 95 234 67 89', tariff: 'Enterprise', tariffId: 4, status: 'blocked', createdAt: '2025-01-25' },
]

export const mockUsers = [
  { id: 1,  name: 'Алишер Каримов',    initials: 'АК', phone: '+998 90 123 45 67', companyId: 1,  company: 'ООО "ТехЛоджикс"',  role: 'Admin',  status: 'active',  color: '#3B82F6' },
  { id: 2,  name: 'Дилнора Юсупова',   initials: 'ДЮ', phone: '+998 91 234 56 78', companyId: 1,  company: 'ООО "ТехЛоджикс"',  role: 'Driver', status: 'active',  color: '#8B5CF6' },
  { id: 3,  name: 'Баходир Рахимов',   initials: 'БР', phone: '+998 93 345 67 89', companyId: 2,  company: 'ИП Каримов А.А.',    role: 'Admin',  status: 'active',  color: '#10B981' },
  { id: 4,  name: 'Нилуфар Хасанова',  initials: 'НХ', phone: '+998 94 456 78 90', companyId: 3,  company: 'АО "СупроМаркет"',  role: 'Driver', status: 'blocked', color: '#F97316' },
  { id: 5,  name: 'Отабек Мирзаев',    initials: 'ОМ', phone: '+998 95 567 89 01', companyId: 3,  company: 'АО "СупроМаркет"',  role: 'Driver', status: 'active',  color: '#06B6D4' },
  { id: 6,  name: 'Зулайхо Тошматова', initials: 'ЗТ', phone: '+998 97 678 90 12', companyId: 4,  company: 'ООО "ФастДелив"',   role: 'Admin',  status: 'blocked', color: '#EF4444' },
  { id: 7,  name: 'Санжар Умаров',     initials: 'СУ', phone: '+998 99 789 01 23', companyId: 5,  company: 'ИП Рахимова Д.',     role: 'Driver', status: 'active',  color: '#14B8A6' },
  { id: 8,  name: 'Камола Назарова',   initials: 'КН', phone: '+998 90 890 12 34', companyId: 6,  company: 'ООО "ДижиТорг"',    role: 'Driver', status: 'active',  color: '#EC4899' },
  { id: 9,  name: 'Жасур Холматов',    initials: 'ЖХ', phone: '+998 91 901 23 45', companyId: 7,  company: 'АО "Оптима Груп"',  role: 'Admin',  status: 'active',  color: '#6366F1' },
  { id: 10, name: 'Феруза Эргашева',   initials: 'ФЭ', phone: '+998 93 012 34 56', companyId: 8,  company: 'ООО "АлфаТрейд"',   role: 'Driver', status: 'active',  color: '#7C3AED' },
  { id: 11, name: 'Тимур Абдуллаев',   initials: 'ТА', phone: '+998 94 123 45 67', companyId: 9,  company: 'АО "НоваТех"',      role: 'Driver', status: 'active',  color: '#0EA5E9' },
  { id: 12, name: 'Малика Касымова',   initials: 'МК', phone: '+998 95 234 56 78', companyId: 10, company: 'ООО "ПраймСервис"', role: 'Driver', status: 'blocked', color: '#F59E0B' },
]

export const mockTariffs = [
  {
    id: 1, name: 'Starter',
    price: 99000, currency: 'UZS', period: 'месяц',
    limits: { users: 5, products: 100, orders: 500 },
    features: ['До 5 пользователей', 'До 100 товаров', 'Базовая аналитика'],
    status: 'active', companies: 2,
  },
  {
    id: 2, name: 'Basic',
    price: 299000, currency: 'UZS', period: 'месяц',
    limits: { users: 15, products: 500, orders: 2000 },
    features: ['До 15 пользователей', 'До 500 товаров', 'Расширенная аналитика', 'API доступ'],
    status: 'active', companies: 3,
  },
  {
    id: 3, name: 'Premium',
    price: 699000, currency: 'UZS', period: 'месяц',
    limits: { users: 50, products: 2000, orders: 10000 },
    features: ['До 50 пользователей', 'До 2000 товаров', 'Полная аналитика', 'API доступ', 'Приоритетная поддержка'],
    status: 'active', companies: 4, popular: true,
  },
  {
    id: 4, name: 'Enterprise',
    price: 1499000, currency: 'UZS', period: 'месяц',
    limits: { users: -1, products: -1, orders: -1 },
    features: ['Безлимит пользователей', 'Безлимит товаров', 'Полная аналитика', 'Полный API', 'Персональный менеджер', 'SLA 99.9%'],
    status: 'active', companies: 3,
  },
]

export const mockTransactions = [
  { id: 1,  company: 'ООО "ТехЛоджикс"',  tariff: 'Premium',    amount: 699000,  method: 'Click',    date: '2025-04-01', status: 'success' },
  { id: 2,  company: 'АО "СупроМаркет"',  tariff: 'Enterprise', amount: 1499000, method: 'Payme',    date: '2025-04-01', status: 'success' },
  { id: 3,  company: 'ИП Каримов А.А.',   tariff: 'Basic',      amount: 299000,  method: 'Click',    date: '2025-03-28', status: 'success' },
  { id: 4,  company: 'ИП Рахимова Д.',    tariff: 'Basic',      amount: 299000,  method: 'Uzum',     date: '2025-03-25', status: 'pending' },
  { id: 5,  company: 'ООО "АлфаТрейд"',  tariff: 'Premium',    amount: 699000,  method: 'Наличные', date: '2025-03-20', status: 'success' },
  { id: 6,  company: 'ООО "ФастДелив"',  tariff: 'Premium',    amount: 699000,  method: 'Payme',    date: '2025-03-15', status: 'failed'  },
  { id: 7,  company: 'ООО "ДижиТорг"',   tariff: 'Enterprise', amount: 1499000, method: 'Uzum',     date: '2025-03-10', status: 'success' },
  { id: 8,  company: 'АО "Оптима Груп"', tariff: 'Starter',    amount: 99000,   method: 'Наличные', date: '2025-03-05', status: 'pending' },
  { id: 9,  company: 'ООО "ТехЛоджикс"', tariff: 'Premium',    amount: 699000,  method: 'Click',    date: '2025-03-01', status: 'success' },
  { id: 10, company: 'АО "СупроМаркет"', tariff: 'Enterprise', amount: 1499000, method: 'Payme',    date: '2025-02-28', status: 'success' },
  { id: 11, company: 'ООО "ПраймСервис"',tariff: 'Basic',      amount: 299000,  method: 'Uzum',     date: '2025-02-20', status: 'success' },
  { id: 12, company: 'АО "НоваТех"',     tariff: 'Starter',    amount: 99000,   method: 'Наличные', date: '2025-02-15', status: 'failed'  },
]

export const mockNotifications = [
  { id: 1, title: 'Плановое обслуживание', message: 'Сервис будет недоступен 25 апреля с 02:00 до 04:00. Заранее сохраните данные.', recipient: 'Все пользователи', recipientType: 'all_users',    type: 'warning', sentAt: '2025-04-20' },
  { id: 2, title: 'Обновление тарифа Enterprise', message: 'Мы обновили тариф Enterprise — добавлены новые возможности. Подробнее в личном кабинете.', recipient: 'Все компании',    recipientType: 'all_companies', type: 'info',    sentAt: '2025-04-15' },
  { id: 3, title: 'Платёж прошёл успешно', message: 'Ваш платёж 699 000 UZS за тариф Premium был успешно обработан.', recipient: 'ООО "ТехЛоджикс"', recipientType: 'company',       type: 'success', sentAt: '2025-04-01' },
  { id: 4, title: 'Аккаунт заблокирован', message: 'Ваш аккаунт заблокирован администратором. Свяжитесь с поддержкой для выяснения причин.', recipient: 'Зулайхо Тошматова', recipientType: 'user', type: 'error', sentAt: '2025-03-28' },
  { id: 5, title: 'Срок тарифа истекает', message: 'До истечения срока действия тарифа осталось 3 дня. Продлите подписку, чтобы не потерять доступ.', recipient: 'АО "Оптима Груп"', recipientType: 'company', type: 'warning', sentAt: '2025-03-25' },
]

export const revenueData = [
  { month: 'Янв', revenue: 3200000 },
  { month: 'Фев', revenue: 4100000 },
  { month: 'Мар', revenue: 3800000 },
  { month: 'Апр', revenue: 5200000 },
  { month: 'Май', revenue: 4700000 },
  { month: 'Июн', revenue: 6100000 },
]

export const recentActions = [
  { id: 1, message: 'Новая компания "АлфаТрейд" зарегистрирована', time: '5 минут назад',  type: 'company' },
  { id: 2, message: 'Компания "СупроМаркет" сменила тариф на Enterprise', time: '1 час назад',   type: 'tariff'  },
  { id: 3, message: 'Получен платёж от "ТехЛоджикс" — 699 000 UZS', time: '3 часа назад',  type: 'payment' },
  { id: 4, message: 'Пользователь Зулайхо Тошматова заблокирована', time: '5 часов назад', type: 'block'   },
  { id: 5, message: 'Компания "ФастДелив" заблокирована', time: '1 день назад', type: 'block'   },
]
