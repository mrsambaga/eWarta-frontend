export type DropdownOption = {
    content: string;
    value: string;
};

export const CategoryDropdown: DropdownOption[] = [
    {
        value: "",
        content: "All Categories"
    },
    {
      value: 'Business',
      content: 'Business',
    },
    {
      value: 'Technology',
      content: 'Technology',
    },
    {
      value: 'Politic',
      content: 'Politic',
    },
    {
      value: 'Sport',
      content: 'Sport',
    },
    {
      value: 'Science',
      content: 'Science',
    },
    {
      value: 'Economy',
      content: 'Economy',
    },
];

export const TypeDropdown: DropdownOption[] = [
    {
        value: '',
        content: 'All Type'
    },
    {
        value: 'free',
        content: 'Free',
    },
    {
        value: 'paid',
        content: 'Paid',
    },
];

export const PostTypeDropdown: DropdownOption[] = [
  {
    value: '',
    content: 'All Type'
  },
  {
      value: 'free',
      content: 'Free',
  },
  {
      value: 'premium',
      content: 'Premium',
  },
  {
    value: 'vip',
    content: 'Vip',
  },
];

export const SortDateDropdown: DropdownOption[] = [
    {
      value: 'desc',
      content: 'Newest',
    },
    {
      value: 'asc',
      content: 'Latest',
    },
];