interface IUser {
  name: string;
  phone: string;
  email: string;
  animals?: string[];
  cars?: string[];
  hasChildren: boolean;
  hasEducation: boolean;
}

const users: IUser[] = [
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
function namesString(users: IUser[]): string {
  return users.map((user) => user.name).join(", ");
}
console.log("Имена:", namesString(users));

// 2. Подсчёт общего количества машин у пользователей
function totalCars(users: IUser[]): number {
  return users.reduce((acc, user) => acc + (user.cars?.length ?? 0), 0);
}
console.log("Общее количество машин:", totalCars(users));

// 3. Фильтрация пользователей, у которых есть образование
function filterByEducation(users: IUser[]): IUser[] {
  return users.filter((user) => user.hasEducation);
}
console.log("Cписок с образованием:", filterByEducation(users));

// 4. Фильтрация пользователей с животными
function filterByAnimals(users: IUser[]): IUser[] {
  return users.filter((user) => (user.animals?.length ?? 0) > 0);
}
console.log("Список с животными:", filterByAnimals(users));

// 5. Получение строки всех автомобилей через запятую
function getCarsString(users: IUser[]): string {
  const allCars = users.reduce<string[]>((acc, user) => {
    if (user.cars) {
      acc.push(...user.cars);
    }
    return acc;
  }, []);
  return allCars.join(", ");
}
console.log("Строка всех автомобилей:", getCarsString(users));
