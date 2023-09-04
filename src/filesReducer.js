export default function fliesReducer(flies, action) {
  switch (action.type) {
    case 'added': {


      console.log('action',flies,  action)

      const  thead = action.data.shift();
      const theadOption = thead.map(element => {
       return { value: element, label: element }
      });
      return [
        ...flies,
        {
          id: action.id,
          theadOption: theadOption,
          data: action.data,
        },
      ];
    }
    // case 'changed': {
    //   return flies.map((t) => {
    //     if (t.id === action.id) {
    //       return {
    //         id: action.id,
    //         data: action.data,
    //       };
    //     } else {
    //       return t;
    //     }
    //   });
    // }
    case 'deleted': {
      return flies.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}
