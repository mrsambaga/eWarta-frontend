export type DropdownOption = {
    content: string;
    value: string;
};

export const CategoryDropdown: DropdownOption[] = [
    {
      value: 'business',
      content: 'Business',
    },
    {
      value: 'technology',
      content: 'Technology',
    },
    {
      value: 'politic',
      content: 'Politic',
    },
    {
      value: 'sport',
      content: 'Sport',
    },
    {
      value: 'science',
      content: 'Science',
    },
    {
      value: 'economy',
      content: 'Economy',
    },
];

export const TypeDropdown: DropdownOption[] = [
    {
      value: 'free',
      content: 'Free',
    },
    {
      value: 'paid',
      content: 'Paid',
    },
];

export const SortDateDropdown: DropdownOption[] = [
    {
      value: 'asc',
      content: 'Newest',
    },
    {
      value: 'desc',
      content: 'Latest',
    },
];