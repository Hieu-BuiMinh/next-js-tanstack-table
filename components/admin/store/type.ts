interface IMenu {
  name: string,
  children?: [
    {
      name: string,
      path: string,
      title: string,
      hidden: boolean,
      meta: {
        list?: string,
        create?: string,
        edit?: string,
        view?: string,
        delete?: string,
      },
    },
  ],
}