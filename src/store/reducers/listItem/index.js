import {
  FETCH_LIST_ITEM,
  ADD_ITEM,
  REMOVE_ITEM,
  IS_LOADING,
  UPDATE_ERROR,
  UPDATE_LIST_PROP,
} from "../../types";

const listItemState = {
  listItem: [],
  error: "",
  isLoading: false,
  page: 0,
  hasMore: true,
  size: 10,
};

const listItemReducer = (state = listItemState, action) => {
  switch (action.type) {
    case FETCH_LIST_ITEM: {
      const { listItem } = action.payload;
      const hasMore = state.listItem.length + listItem.length < 100;

      return {
        ...state,
        listItem: [...state.listItem, ...listItem],
        page: state.page + 1,
        hasMore,
      };
    }
    case ADD_ITEM: {
      const { item } = action.payload;

      return {
        ...state,
        listItem: [...state.listItem, item],
      };
    }

    case REMOVE_ITEM: {
      const { id } = action.payload;
      const listItem = state.listItem.filter((item) => item.id !== id);
      return {
        ...state,
        listItem,
      };
    }

    case IS_LOADING: {
      const { isLoading } = action.payload;
      return {
        ...state,
        isLoading,
      };
    }

    case UPDATE_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        error,
      };
    }

    case UPDATE_LIST_PROP: {
      const { page, hasMore } = action.payload;
      return {
        ...state,
        page,
        hasMore,
      };
    }

    default:
      return state;
  }
};

export default listItemReducer;
