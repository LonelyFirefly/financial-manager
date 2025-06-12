export enum EssentialCategory {
  Maintenance = 'Maintenance',
  Transport = 'Transport',
  Groceries = 'Groceries',
  House = 'House',
  HouseUtilities = 'House Utilities',
  PersonalCareAndMedicine = 'Personal Care & Medicine',
  Sport = 'Sport',
}

export enum NonEssentialCategory {
  Entertainment = 'Entertainment',
  EatingOut = 'Eating out',
  Clothes = 'Clothes',
}

export type Category = EssentialCategory | NonEssentialCategory;
