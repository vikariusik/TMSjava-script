var users = [
    {
        name: "Harry Felton",
        phone: "(09) 897 33 33",
        email: "felton@gmail.com",
        animals: ["cat"],
        cars: ["bmw"],
        hasChildren: false,
        hasEducation: true,
    },
    {
        name: "May Sender",
        phone: "(09) 117 33 33",
        email: "sender22@gmail.com",
        hasChildren: true,
        hasEducation: true,
    },
    {
        name: "Henry Ford",
        phone: "(09) 999 93 23",
        email: "ford0@gmail.com",
        cars: ["bmw", "audi"],
        hasChildren: true,
        hasEducation: false,
    },
];
// 1. Cоздание строки из имен пользователей через запятую
function namesString(users) {
    return users.map(function (user) { return user.name; }).join(", ");
}
console.log("Имена:", namesString(users));
// 2. Подсчёт общего количества машин у пользователей
function totalCars(users) {
    return users.reduce(function (acc, user) { var _a, _b; return acc + ((_b = (_a = user.cars) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0); }, 0);
}
console.log("Общее количество машин:", totalCars(users));
// 3. Фильтрация пользователей, у которых есть образование
function filterByEducation(users) {
    return users.filter(function (user) { return user.hasEducation; });
}
console.log("Cписок с образованием:", filterByEducation(users));
// 4. Фильтрация пользователей с животными
function filterByAnimals(users) {
    return users.filter(function (user) { var _a, _b; return ((_b = (_a = user.animals) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0; });
}
console.log("Список с животными:", filterByAnimals(users));
// 5. Получение строки всех автомобилей через запятую
function getCarsString(users) {
    var allCars = users.reduce(function (acc, user) {
        if (user.cars) {
            acc.push.apply(acc, user.cars);
        }
        return acc;
    }, []);
    return allCars.join(", ");
}
console.log("Строка всех автомобилей:", getCarsString(users));
